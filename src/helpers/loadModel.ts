import * as tf from '@tensorflow/tfjs'

import { LoadOptionsType, ModelInterface } from 'types/index'

const ERR_MSG =
  'Failed to pass a url using a valid scheme - https://www.tensorflow.org/js/guide/save_load#loading_a_tfmodel'

const loadModel = async (
  url: string | undefined,
  opts: LoadOptionsType | undefined = {}
): Promise<ModelContextInterface> => {
  const { layers = false } = opts
  try {
    if (url === undefined) {
      throw new Error(ERR_MSG)
    }

    const [isUrlAccepted, isUrlFromTFHub] = testUrlForAcceptance(url)

    if (isUrlAccepted && !layers) {
      const graphModel = await tf.loadGraphModel(url, {
        fromTFHub: isUrlFromTFHub
      })
      return graphModel
    } else if (isUrlAccepted && layers) {
      const layerModel = await tf.loadLayersModel(url)
      return layerModel
    } else {
      throw new Error(ERR_MSG)
    }
  } catch (err) {
    console.error(err.message)
    return null
  }
}

const testUrlForAcceptance = (url: string): boolean[] => {
  const acceptedFilePrefixes = [
    /localstorage:\/\//,
    /indexeddb:\/\//,
    /http:\/\//,
    /https:\/\//,
    /file:\/\//
  ]
  const isUrlFromTFHub = url.includes('tfhub.dev')

  let isUrlAccepted = false

  if (isUrlFromTFHub) {
    isUrlAccepted = acceptedFilePrefixes.some(rex => rex.test(url))
  } else {
    isUrlAccepted =
      acceptedFilePrefixes.some(rex => rex.test(url)) && url.includes('.json')
  }

  return [isUrlAccepted, isUrlFromTFHub]
}

export default loadModel
