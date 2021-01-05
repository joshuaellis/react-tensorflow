import * as tf from '@tensorflow/tfjs'
import { renderHook, act } from '@testing-library/react-hooks'

import useObjectDetect from '../useObjectDetect'

describe('useObjectDetect', () => {
  const errorSpy = jest.spyOn(console, 'error')
  const warnSpy = jest.spyOn(console, 'warn')

  const mockData = [
    0.0032448014244437218,
    9.299898096060133,
    0.000020586936443578452,
    2.728165782173164,
    7.533527650593896,
    7.365694898453512,
    0.0000016460775214000023,
    8.527451882400783,
    0.00022167805582284927,
    7.938750172797882,
    2.068294335799692
  ]

  const mockClasses: { [classId: number]: string } = {
    0: 'tench, Tinca tinca',
    1: 'goldfish, Carassius auratus',
    2: 'great white shark, white shark, man-eater, man-eating shark, Carcharodon carcharias',
    3: 'tiger shark, Galeocerdo cuvieri',
    4: 'hammerhead, hammerhead shark',
    5: 'electric ray, crampfish, numbfish, torpedo',
    6: 'stingray',
    7: 'cock',
    8: 'hen',
    9: 'ostrich, Struthio camelus',
    10: 'brambling, Fringilla montifringilla',
    11: 'goldfinch, Carduelis carduelis'
  }
  const expectedReturn = [
    {
      class: 1,
      probability: 1,
      boundingBox: []
    },
    {
      class: 1,
      probability: 1,
      boundingBox: [300, 300, 0, 0]
    },
    {
      class: mockClasses[1],
      probability: 1,
      boundingBox: []
    }
  ]

  it('should return null and print an error if there is no model available', async () => {
    const { result } = renderHook(() => useObjectDetect())

    expect(result.current[1]).toBeNull()
    expect(errorSpy).toHaveBeenCalled()
  })

  it('should return a prediction with no parameters set, no class name & bounding box should be empty', async () => {
    const { result, waitFor } = renderHook(() =>
      useObjectDetect({
        modelUrl:
          'https://tfhub.dev/google/tfjs-model/imagenet/inception_v3/classification/3/default/1',
        useExecute: true
      })
    )

    expect(result.current[1]).toBeNull()
    expect(warnSpy).toBeCalled()

    void act(() => {
      result.current[0](tf.tensor(mockData))
    })

    await waitFor(() => expect(result.current[1]).not.toBeNull())
    expect(result.current[1]).toEqual([expectedReturn[0]])
  })

  it('should return a prediction with an array of numbers for bounding box if height & width are passed', async () => {
    const { result, waitFor } = renderHook(() =>
      useObjectDetect({
        modelUrl:
          'https://tfhub.dev/google/tfjs-model/imagenet/inception_v3/classification/3/default/1',
        useExecute: true,
        width: 300,
        height: 300
      })
    )

    expect(result.current[1]).toBeNull()

    void act(() => {
      result.current[0](tf.tensor(mockData))
    })

    await waitFor(() => expect(result.current[1]).not.toBeNull())
    expect(result.current[1]).toEqual([expectedReturn[1]])
  })

  it('should return a prediction in the format of class:confidence%:boundingBox when classes are passed', async () => {
    const { result, waitFor } = renderHook(() =>
      useObjectDetect({
        modelUrl:
          'https://tfhub.dev/google/tfjs-model/imagenet/inception_v3/classification/3/default/1',
        useExecute: true,
        classes: mockClasses
      })
    )

    expect(result.current[1]).toBeNull()
    expect(warnSpy).toBeCalled()

    void act(() => {
      result.current[0](tf.tensor(mockData))
    })

    await waitFor(() => expect(result.current[1]).not.toBeNull())
    expect(result.current[1]).toEqual([expectedReturn[2]])
  })
})
