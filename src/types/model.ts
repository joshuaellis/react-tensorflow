import * as tf from '@tensorflow/tfjs'

export declare interface GraphModel extends tf.InferenceModel {
  name?: string
}

export declare interface LayersModel extends tf.LayersModel {}

export declare interface LoadOptionsType {
  layers: boolean
}

export declare type ModelContextInterface = GraphModel | LayersModel | null

export declare type ModelProviderProps = {
  url?: string
  children?: React.ReactNode
  layerModel?: boolean
}
