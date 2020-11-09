import { renderHook } from '@testing-library/react-hooks'

import useModel from '../useModel'

describe('useModel Hook', () => {
  const acceptedModelUrls = [
    'https://tfhub.dev/google/tfjs-model/imagenet/inception_v3/classification/3/default/1'
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
      expect(result.current).toMatchObject({})
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
    expect(result.current).toMatchObject({})
  })
})
