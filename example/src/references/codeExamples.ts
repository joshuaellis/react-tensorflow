export const hocExample = `import * as React from 'react'
import { withModel } from 'react-tensorflow'

import classes from '../my-classes'

import { getTensorFromImg, classify } from '../helpers'

class ModelPredictor extends React.PureComponent {
  imgRef = React.createRef()

  state = {
    prediction: []
  }

  componentDidMount () {
    const { model } = this.props
    const { current: img} = imgRef

    if(model && img) {
      this.createPrediction(model, img)
    }
  }

  createPrediction = async (model, image) => {
    const tensor = getTensorFromImg(img)
    const result = await model.predict(tensor)
    const prediction = classify(result, 1, classes)

    tensor.dispose()
    result.dispose()

    this.setState({
      prediction
    })
  }

  render () {
    return <img ref={imgRef} src={MY_IMAGE_PATH} />
  }
}

export default withModel(ModelPredictor)
`

export const predictionExample = `import * as React from 'react'
import { usePrediction, useWebcam } from 'react-tensorflow'
import * as mobilenet from '@tensorflow-models/mobilenet'

export default Predictor () {
  const [ videoRef, webcamTensor ] = useWebcam({ height: 244, width: 244 })
  const [ dataRef, prediction ] = usePrediction({ model: mobilenet })

  React.useEffect(() => {
    dataRef.current = webcamTensor
  }, [webcamTensor])
  
  return (
    <div>
      <video ref={videoRef} width={299} height={299} />
      <h1>{prediction[0].result}</h1>
    </div>
  )
}`
