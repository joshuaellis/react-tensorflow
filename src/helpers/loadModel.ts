import * as tf from '@tensorflow/tfjs'

import { GraphModel, LayersModel, LoadOptionsType } from 'types/model'

const loadModel = async (
  url: string,
  opts: LoadOptionsType | undefined = { layers: false }
): Promise<GraphModel | LayersModel | null> => {
  const { layers } = opts
  try {
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
      throw new Error(
        'Failed to pass a url using a valid scheme - https://www.tensorflow.org/js/guide/save_load#loading_a_tfmodel'
      )
    }
  } catch (err) {
    console.error(err)
    return null
  }
}

const testUrlForAcceptance = (url: string) => {
  const acceptedFilePrefixes = [
    /localstorage:\/\//,
    /indexeddb:\/\//,
    /http:\/\//,
    /https:\/\//,
    /file:\/\//
  ]
  const fileTypeRegex = /\.json/
  const isUrlFromTFHub = /tfhub\.dev/.test(url)

  let isUrlAccepted = false

  if (isUrlFromTFHub) {
    isUrlAccepted = acceptedFilePrefixes.some(rex => rex.test(url))
  } else {
    isUrlAccepted =
      acceptedFilePrefixes.some(rex => rex.test(url)) && fileTypeRegex.test(url)
  }

  return [isUrlAccepted, isUrlFromTFHub]
}

export default loadModel
