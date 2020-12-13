import * as React from 'react'
import { waitFor } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'

import ModelProvider from 'components/ModelProvider'

import useModel from '../useModel'
import { modelFailedLoad } from 'references/errors'

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

  const errorSpy = jest.spyOn(console, 'error')

  beforeEach(() => {
    jest.clearAllMocks()
  })

  acceptedModelUrls.forEach(url => {
    test(`Returns model using ${url}`, async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
        useModel({ modelUrl: url })
      )
      expect(result.current).toBeNull()
      await waitForNextUpdate()
      expect(result.current).toMatchObject({ name: 'TF Graph Model' })
      expect(errorSpy).not.toHaveBeenCalled()
    })
  })

  notAcceptedModelsUrls.forEach((url: string, i) => {
    test(`Won't return model using ${url}`, () => {
      const { result } = renderHook(() => useModel({ modelUrl: url }))
      expect(result.current).toBeNull()
      expect(errorSpy).toHaveBeenCalled()
    })
  })

  test('Will return a model if the layers option is passed', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useModel({ modelUrl: acceptedModelUrls[0], layers: true })
    )
    expect(result.current).toBeNull()
    await waitForNextUpdate()
    expect(result.current).toMatchObject({ name: 'TF Layer Model' })
    expect(errorSpy).not.toHaveBeenCalled()
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
    expect(errorSpy).not.toHaveBeenCalled()
  })

  test('it should accept a node_module model', async () => {
    const promise = new Promise(resolve =>
      resolve({
        dispose: jest.fn()
      })
    )

    const model = {
      load: async () => await promise
    }

    const loadSpy = jest.spyOn(model, 'load')

    const { result, waitForNextUpdate } = renderHook(() =>
      useModel({
        model
      })
    )
    expect(result.current).toBe(null)
    await waitForNextUpdate()
    expect(loadSpy).toBeCalled()
  })

  test('it should print an error if it fails to load the model', async () => {
    const { result } = renderHook(() =>
      useModel({
        model: {
          load: async () => await new Promise(resolve => resolve(undefined))
        }
      })
    )

    expect(result.current).toBe(null)
    await waitFor(() => expect(errorSpy).toHaveBeenCalled())
    expect(errorSpy).toBeCalledWith(modelFailedLoad('useModel'))
  })

  test("if there's no model available at all, it should print an error", () => {
    renderHook(() => useModel())

    expect(errorSpy).toHaveBeenCalled()
  })

  test('should handle an onLoad callback if passed one', async () => {
    const handleLoad = jest.fn()
    const { result, waitForNextUpdate } = renderHook(() => useModel({ modelUrl: acceptedModelUrls[0], onLoadCallback: handleLoad }))

    expect(result.current).toBe(null)
    await waitForNextUpdate()

    expect(handleLoad).toHaveBeenCalled()
  })
})
