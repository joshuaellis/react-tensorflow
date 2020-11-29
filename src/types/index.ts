import * as tf from '@tensorflow/tfjs'

export interface GraphModel extends tf.GraphModel {
  name?: string
}

export interface LayersModel extends tf.LayersModel {}

export interface UseModelProps extends LoadOptionsType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  model?: any
  modelUrl?: string | undefined
}

export interface LoadOptionsType {
  layers?: boolean
}

export type ModelContext = {
  model: ModelInterface
} | null

export type ModelInterface = GraphModel | LayersModel | null

export interface ModelProviderProps {
  url?: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  model?: any
  children?: React.ReactNode
  layerModel?: boolean
}

export interface ModelProviderState {
  model: ModelInterface
}

export interface AttachWebcamOptions extends MediaStreamConstraints {
  width?: number
  height?: number
  facingMode?: string
}

export interface UsePredictionProps extends UseModelProps {
  predictConfig?: tf.ModelPredictConfig
  useExecute?: boolean
  outputName?: string
}

export type Prediction = tf.Tensor | tf.Tensor[] | tf.NamedTensorMap | null

export let PredictionReturn: [React.MutableRefObject<tf.Tensor | null>, Prediction]
