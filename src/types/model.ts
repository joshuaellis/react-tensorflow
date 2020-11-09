import * as tf from '@tensorflow/tfjs'

export interface GraphModel extends tf.InferenceModel {}

export interface LayersModel extends tf.LayersModel {}

export interface LoadOptionsType {
  layers: boolean
}
