// import * as React from 'react'

import { PredictionReturn, UseClassifierProps } from 'types/index'

import usePrediction from './usePrediction'

export default function useClassifier ({
  ...props
}: UseClassifierProps = {}): typeof PredictionReturn {
  const [dataRef, prediction] = usePrediction({ ...props })

  return [dataRef, prediction]
}
