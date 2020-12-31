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

export const classificationExample = `import * as React from 'react'
import { useClassifier, useWebcam } from 'react-tensorflow'

import classes from '../my-classes'

export default Predictor () {
  const [ videoRef, webcamTensor ] = useWebcam({ height: 192, width: 192 })
  const [ setDataRef, classification ] = useClassifier({ 
    modelUrl:
      'https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v2_050_192/classification/3/default/1',
    returns: 1,
    classes
   })

  React.useEffect(() => {
    setDataRef(webcamTensor?.clone())
  }, [webcamTensor])
  
  return (
    <div>
      <video ref={videoRef} />
      <h1>{classification[0].class}</h1>
      <h2>{Math.floor(classification[0].probability * 100)}</h2>
    </div>
  )
}`

export const objectsExample = `import * as React from 'react'
import { useObjectDetect } from 'react-tensorflow'

import classes from '../my-classes'

export default ObjectDetector () {
  const imgRef = React.useRef()
  const [imgLoaded, setImgLoad] = React.useState(false)

  const handleImgLoad = () => setImgLoad(true)

  const onLoadCallback = React.useCallback(async (model: ModelInterface) => {
    if (model && model instanceof tf.GraphModel) {
      const zeroTensor = tf.zeros([1, 300, 300, 3], 'int32')
      const result = (await model.executeAsync(zeroTensor)) as tf.Tensor[]
      await Promise.all(result.map(t => t.data()))
      result.map(t => t.dispose())
      zeroTensor.dispose()
    }
  }, [])

  const [setData, objects] = useObjectDetect({
    modelUrl:
      'https://tfhub.dev/tensorflow/tfjs-model/ssd_mobilenet_v2/1/default/1',
    onLoadCallback,
    useExecute: true
  })

  React.useEffect(() => {
    if (imgLoaded) {
      const { current: img } = imgRef
      const tensor = getTensorFromImg(img).cast('int32')
      if (tensor) {
        setData(tensor)
      }
    }
  }, [imgLoaded])
  
  return (
    <div>
      <img onLoad={handleImgLoad} ref={imgRef} src={MY_IMAGE_PATH} />
      {objects.map(object => 
        <div key={object.class}>
          <h1>{object.class}</h1>
          <h2>{Math.floor(object.probability * 100)}</h2>
        </div>
      )}
    </div>
  )
}`
