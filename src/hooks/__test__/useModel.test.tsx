import * as React from 'react'
import { renderHook } from '@testing-library/react-hooks'

import ModelProvider from 'components/ModelProvider'

import useModel from '../useModel'

describe('useModel Hook', () => {
  const acceptedModelUrls = [
    'https://tfhub.dev/google/tfjs-model/imagenet/inception_v3/classification/3/default/1',
    'https://tfhub.dev/tensorflow/tfjs-model/universal-sentence-encoder-lite/1/default/1'
  ]
  const notAcceptedModelsUrls = [
    'https://www.google.com',
    '1uibiwfbjnwe',
    './../../model/model.json'
  ]

  acceptedModelUrls.forEach(url => {
    test(`Returns model using ${url}`, async () => {
      const { result, waitForNextUpdate } = renderHook(() => useModel(url))
      expect(result.current).toBeNull()
      await waitForNextUpdate()
      expect(result.current).toMatchObject({ name: 'TF Graph Model' })
    })
  })

  notAcceptedModelsUrls.forEach((url: string) => {
    test(`Won't return model using ${url}`, () => {
      const { result } = renderHook(() => useModel(url))
      expect(result.current).toBeNull()
    })
  })

  test('Will return a model if the layers option is passed', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useModel(acceptedModelUrls[0], { layers: true })
    )
    expect(result.current).toBeNull()
    await waitForNextUpdate()
    expect(result.current).toMatchObject({ name: 'TF Layer Model' })
  })

  test('If not passed url, the model should use the Model Context', async () => {
    const wrapper: React.FC<{ children: React.ComponentType }> = ({
      children
    }) => (
      <ModelProvider url='https://tfhub.dev/google/tfjs-model/imagenet/inception_v3/classification/3/default/1'>
        {children}
      </ModelProvider>
    )
    const { result, waitForNextUpdate } = renderHook(() => useModel(), {
      wrapper
    })

    expect(result.current).toBeNull()
    await waitForNextUpdate()
    expect(result.current).toMatchObject({ name: 'TF Graph Model' })
  })
})
