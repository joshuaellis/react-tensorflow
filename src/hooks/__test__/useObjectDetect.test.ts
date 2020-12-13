import * as tf from '@tensorflow/tfjs'
import { renderHook, act } from '@testing-library/react-hooks'

import useObjectDetect from '../useObjectDetect'

describe('useObjectDetect', () => {
  const errorSpy = jest.spyOn(console, 'error')

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
      class: 8,
      probability: 0.2798840403556824,
      boundingBox: { x: 0, y: 0, width: 10, height: 10 }
    },
    {
      class: 5,
      probability: 0.12999391555786133,
      boundingBox: { x: 1, y: 1, width: 20, height: 20 }
    },
    {
      class: 0,
      probability: 0.11181672662496567,
      boundingBox: { x: 2, y: 2, width: 30, height: 30 }
    },
    {
      class: 10,
      probability: 0.09314952045679092,
      boundingBox: { x: 3, y: 3, width: 40, height: 40 }
    },
    {
      class: 2,
      probability: 0.08755432814359665,
      boundingBox: { x: 4, y: 4, width: 50, height: 50 }
    }
  ]

  it('should return null and print an error if there is no model available', async () => {
    const { result } = renderHook(() => useObjectDetect())

    expect(result.current[1]).toBeNull()
    expect(errorSpy).toHaveBeenCalled()
  })

  it('should return a maximum of 5 raw predictions with no parameters set', async () => {
    const { result, waitFor } = renderHook(() =>
      useObjectDetect({
        modelUrl:
          'https://tfhub.dev/google/tfjs-model/imagenet/inception_v3/classification/3/default/1'
      })
    )

    console.log([
      tf.ones([1, 1917, 90]).dataSync(),
      tf.ones([1, 1917, 1, 4]).dataSync()
    ])

    // expect(result.current[1]).toBeNull()

    // void act(() => {
    //   result.current[0](tf.tensor(mockData))
    // })

    // await waitFor(() => expect(result.current[1]).not.toBeNull())
    // expect(result.current[1]).toEqual(expectedReturn)
  })

  it('should return one prediction when a return amount parameter has been set', async () => {
    expect(false).toBe(true)
  })

  it('should return a prediction in the format of class:confidence%:boundingBox when classes are passed', async () => {
    expect(false).toBe(true)
  })

  it('should return a different result if new data is passed', async () => {
    expect(false).toBe(true)
  })
})
