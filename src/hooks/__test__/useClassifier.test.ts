import * as tf from '@tensorflow/tfjs'
import { renderHook, act } from '@testing-library/react-hooks'

import useClassifier from '../useClassifier'

describe('useClassifier', () => {
  const errorSpy = jest.spyOn(console, 'error')

  const mockData = [
    0.04010665416717529,
    -1.6539305448532104,
    -0.20449502766132355,
    -1.1181687116622925,
    -1.1654853820800781,
    0.1907331347465515,
    -0.8865441679954529,
    -0.6332441568374634,
    0.9576209187507629,
    -1.4043831825256348,
    -0.14254844188690186,
    -0.28499636054039
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
      class: 8,
      probability: 0.2798840403556824
    },
    {
      class: 5,
      probability: 0.12999391555786133
    },
    {
      class: 0,
      probability: 0.11181672662496567
    },
    {
      class: 10,
      probability: 0.09314952045679092
    },
    {
      class: 2,
      probability: 0.08755432814359665
    }
  ]

  it('should return null and print an error if there is no model available', async () => {
    const { result } = renderHook(() => useClassifier())

    expect(result.current[1]).toBeNull()
    expect(errorSpy).toHaveBeenCalled()
  })

  it('should return a maximum of 5 raw predictions with no parameters set', async () => {
    const { result, waitFor } = renderHook(() =>
      useClassifier({
        modelUrl:
          'https://tfhub.dev/google/tfjs-model/imagenet/inception_v3/classification/3/default/1'
      })
    )

    expect(result.current[1]).toBeNull()

    void act(() => {
      result.current[0](tf.tensor(mockData))
    })

    await waitFor(() => expect(result.current[1]).not.toBeNull())
    expect(result.current[1]).toEqual(expectedReturn)
  })

  it('should return one prediction when a return amount parameter has been set', async () => {
    const { result, waitFor } = renderHook(() =>
      useClassifier({
        modelUrl:
          'https://tfhub.dev/google/tfjs-model/imagenet/inception_v3/classification/3/default/1',
        returns: 1
      })
    )

    void act(() => {
      result.current[0](tf.tensor(mockData))
    })

    await waitFor(() => expect(result.current[1]).not.toBeNull())
    expect(result.current[1]).toEqual(expectedReturn.slice(0, 1))
  })

  it('should return a prediction in the format of class:confidence percentage when classes are passed', async () => {
    const expectedClassReturn = expectedReturn.map(
      ({ probability, class: classInd }) => ({
        class: mockClasses[classInd],
        probability
      })
    )

    const { result, waitFor } = renderHook(() =>
      useClassifier({
        modelUrl:
          'https://tfhub.dev/google/tfjs-model/imagenet/inception_v3/classification/3/default/1',
        classes: mockClasses
      })
    )

    void act(() => {
      result.current[0](tf.tensor(mockData))
    })

    await waitFor(() => expect(result.current[1]).not.toBeNull())
    expect(result.current[1]).toEqual(expectedClassReturn)
  })

  it('should return a different result if new data is passed', async () => {
    const { result, waitFor } = renderHook(() =>
      useClassifier({
        modelUrl:
          'https://tfhub.dev/google/tfjs-model/imagenet/inception_v3/classification/3/default/1'
      })
    )

    expect(result.current[1]).toBeNull()

    void act(() => {
      result.current[0](tf.tensor(mockData))
    })

    await waitFor(() => expect(result.current[1]).not.toBeNull())
    console.log('asseting initial mock data')
    expect(result.current[1]).toEqual(expectedReturn)

    void act(() => {
      console.log('changing that mock data')
      result.current[0](tf.tensor([0.12351241, 12.141463461, -1.123123]))
    })

    await waitFor(() => expect(result.current[1]).not.toEqual(expectedReturn))
    console.log('asseting changed mock data')
    expect(result.current[1]).toEqual([
      {
        class: 1,
        probability: 0.9999922513961792
      },
      {
        class: 0,
        probability: 0.000006034854777681176
      },
      {
        class: 2,
        probability: 0.0000017348420442431234
      }
    ])
  })
})
