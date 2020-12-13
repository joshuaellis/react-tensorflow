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
  onLoadCallback?: (model: ModelInterface) => void
}

export type ModelContext = {
  model: ModelInterface
} | null

export type ModelInterface = GraphModel | LayersModel | null

export interface ModelProviderProps extends LoadOptionsType{
  url?: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  model?: any
  children?: React.ReactNode
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

export type setDataRef = (data: tf.Tensor) => void

export let PredictionReturn: [setDataRef, Prediction]

export interface UseClassifierProps extends UsePredictionProps {
  returns?: number
  classes?: { [classId: number]: string }
}

export type ClassifiedResults = Array<{class: string, probability: number}>

export type NonClassifiedResults = Array<{class: number, probability: number}>

export type Classification = ClassifiedResults | NonClassifiedResults | null

export let ClassificationReturn: [setDataRef, Classification]

export let UseDataRefReturn: [tf.Tensor | null, setDataRef]
