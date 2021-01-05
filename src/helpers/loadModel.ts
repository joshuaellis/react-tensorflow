import * as tf from '@tensorflow/tfjs'

import { LoadOptionsType, ModelInterface } from 'types/index'

import { modelUrlError } from 'references/errors'

const loadModel = async (
  url: string,
  { layers = false }: LoadOptionsType | undefined = {}
): Promise<ModelInterface> => {
  try {
    if (!url) {
      throw new Error(modelUrlError())
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
      throw new Error(modelUrlError())
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
