import loadModel from '../loadModel'

describe('utils/loadModel', () => {
  jest.setTimeout(100000)

  jest.mock('@tensorflow/tfjs', () => ({
    loadGraphModel: jest.fn()
  }))

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
      const model = await loadModel(url)
      expect(model).toMatchObject({})
    })
  })

  notAcceptedModelsUrls.forEach(url => {
    test(`Won't return model using ${url}`, async () => {
      const model = await loadModel(url)
      expect(model).toBeNull()
    })
  })

  test('Will return a model if the layers option is passed', async () => {
    const model = await loadModel(acceptedModelUrls[0], { layers: true })

    expect(model).toMatchObject({})
  })
})
