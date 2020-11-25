export const hocExample = `import * as React from 'react'
import { withModel } from 'react-tensorflow'

import classes from '../my-classes'

import { getTensorFromImg, classify } from '../helpers'

class ModelPredictor extends React.PureComponent {
  imgRef = React.createRef()

  state = {
    prediction: [],
    imgLoaded: false
  }

  componentDidUpdate (_, prevState) {
    const { model } = this.props
    const { imgLoaded: currLoad } = this.state
    const { imgLoaded: prevLoad } = prevState

    if(model && currLoad && currLoad !== prevLoad) {
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

  handleImgLoad = () => this.setState({
    imgLoaded: true
  })

  render () {
    return <img onLoad={this.handleImgLoad} ref={imgRef} src={MY_IMAGE_PATH} />
  }
}

export default withModel(ModelPredictor)
`

export const predictionExample = `import * as React from 'react'
import { usePrediction, useWebcam } from 'react-tensorflow'

import classes from '../my-classes'

import { classify } from '../helpers'

export default Predictor () {
  const [classification, setClassification] = React.useState(null)

  const [ videoRef, webcamTensor ] = useWebcam({ height: 192, width: 192 })
  const [ dataRef, prediction ] = usePrediction({ modelUrl:
    'https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v2_050_192/classification/3/default/1' })

  React.useEffect(() => {
    dataRef.current = webcamTensor?.clone()
  }, [webcamTensor])

  React.useEffect(() => {
    if (prediction) {
      const classifiedResult = classify(
        prediction,
        1,
        classes
      )
      setClassification(classifiedResult)
    }
  }, [prediction])
  
  return (
    <div>
      <video ref={videoRef} />
      <h1>{classification[0].className}</h1>
      <h2>{Math.floor(classification[0].probability * 100)}</h2>
    </div>
  )
}`
