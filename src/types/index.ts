import * as tf from '@tensorflow/tfjs'

export declare namespace ReactTensorflow {
  interface GraphModel extends tf.InferenceModel {
    name?: string
  }

  interface LayersModel extends tf.LayersModel {}

  interface LoadOptionsType {
    layers: boolean
  }

  type ModelContextInterface = GraphModel | LayersModel | null

  type ModelProviderProps = {
    url?: string
    children?: React.ReactNode
    layerModel?: boolean
  }

  interface AttachWebcamOptions extends MediaStreamConstraints {
    width?: number
    height?: number
    facingMode?: string
  }
}
