import ModelProvider from 'components/ModelProvider'
import withModel from 'components/withModel'

import useClassifier from 'hooks/useClassifier'
import useModel from 'hooks/useModel'
import useObjectDetect from 'hooks/useObjectDetect'
import usePrediction from 'hooks/usePrediction'
import useWebcam from 'hooks/useWebcam'

export * from './types/index'

export {
  ModelProvider,
  withModel,
  useClassifier,
  useModel,
  useObjectDetect,
  usePrediction,
  useWebcam
}
