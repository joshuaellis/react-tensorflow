import * as React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import * as cocoSSD from '@tensorflow-models/coco-ssd'

import ModelProvider from 'components/ModelProvider'

import useModel from '../useModel'

describe('useModel Hook', () => {
  const acceptedModelUrls = [
    'https://tfhub.dev/google/tfjs-model/imagenet/inception_v3/classification/3/default/1',
    'file://../../api/model/model.json'
  ]

  const notAcceptedModelsUrls = [
    'https://www.google.com',
    '1uibiwfbjnwe',
    './../../model/model.json'
  ]

  jest.spyOn(console, 'error')

  acceptedModelUrls.forEach(url => {
    test(`Returns model using ${url}`, async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
        useModel({ modelUrl: url })
      )
      expect(result.current).toBeNull()
      await waitForNextUpdate()
      expect(result.current).toMatchObject({ name: 'TF Graph Model' })
    })
  })

  notAcceptedModelsUrls.forEach((url: string, i) => {
    test(`Won't return model using ${url}`, () => {
      const { result } = renderHook(() => useModel({ modelUrl: url }))
      expect(result.current).toBeNull()
      expect(console.error).toHaveBeenCalledTimes(i + 1)
    })
  })

  test('Will return a model if the layers option is passed', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useModel({ modelUrl: acceptedModelUrls[0], layers: true })
    )
    expect(result.current).toBeNull()
    await waitForNextUpdate()
    expect(result.current).toMatchObject({ name: 'TF Layer Model' })
  })

  test('If not passed a model, the model should use the Model Context', async () => {
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

  test('it should accept a node_module model', async () => {
    const cocoSpy = jest
      .spyOn(cocoSSD, 'load')
      .mockImplementation(
        async () => await new Promise(resolve => resolve(undefined))
      )

    const { result, waitForNextUpdate } = renderHook(() =>
      useModel({ model: cocoSSD })
    )
    expect(result.current).toBe(null)
    await waitForNextUpdate()
    expect(cocoSpy).toBeCalled()
  })
})
