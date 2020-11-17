import * as tf from '@tensorflow/tfjs'

export interface GraphModel extends tf.InferenceModel {
  name?: string
}

export interface LayersModel extends tf.LayersModel {}

export interface LoadOptionsType {
  layers: boolean
}

export type ModelContextInterface = GraphModel | LayersModel | null

export interface ModelProviderProps {
  url?: string
  children?: React.ReactNode
  layerModel?: boolean
}

export interface AttachWebcamOptions extends MediaStreamConstraints {
  width?: number
  height?: number
  facingMode?: string
}

export interface UsePredictionOptions {
  modelUrl?: string
}

export type Prediction = tf.Tensor | tf.Tensor[] | tf.NamedTensorMap | null
