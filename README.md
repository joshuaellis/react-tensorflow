# React-Tensorflow

![Typed with TypeScript][typescript]
[![codecov](https://codecov.io/gh/joshuaellis/react-tensorflow/branch/master/graph/badge.svg)](https://codecov.io/gh/joshuaellis/react-tensorflow)
[![CircleCI](https://circleci.com/gh/joshuaellis/react-tensorflow.svg?style=svg)](https://circleci.com/gh/joshuaellis/react-tensorflow)
![npm](https://img.shields.io/npm/v/react-tensorflow)
[![twitter-badge]][twitter]
[![github-star-badge]][github-star]

> A library of React hooks and HOCs written in Typescript to use Tensorflow models in your application! 🤖🧠

[Demo application with Code Examples](https://react-tensorflow-example.vercel.app/)

## Installation

```sh
yarn add react-tensorflow
```

```sh
npm i react-tensorflow -S
```

### Peer dependencies

- [react](https://www.npmjs.com/package/react) >=16.8.0
- [@tensorflow/tfjs](https://www.npmjs.com/package/@tensorflow/tfjs) >=2.0.0

## Basic usage

```js
import { useModel } from 'react-tensorflow'

const MyModelComponent = () => {
  const model = useModel({ modelUrl: `${PATH_TO_MODEL}` })

  // ...do something with the model

  return null
}
```

## API

### useModel

```js
useModel({model?: any, modelUrl?: string, layers?: boolean}): GraphModel | LayersModel | null
```

If `model` or `modelUrl` is omitted useModel will look to find the ModelProvider as it's context for returning the model. When loading a model with this hook, the `layers` boolean is passed if your TF model should be loaded with the function `tf.loadLayersModel` otherwise it is assumed the model should be loaded with `tf.loadGraphModel`.

### ModelProvider

```js
<ModelProvider url={string} layers={boolean}>
  <App />
</ModelProvider>
```

Wraps the children in a React Provider to be consumed by Context's in either the `useModel` hook or `withModel` HOC. The props passed to this provider are the same as the documented props for `useModel`.

### withModel

```js
withModel(Component: React.ComponentType): JSX.Element
```

Wraps the provided component in a React Context, passing the model give to the provider as a prop.

### useWebcam

```js
useWebcam (options?: {
    width?: number
    height?: number
    facingMode?: string
  }): [React.MutableRefObject<HTMLVideoElement>, tf.Tensor | null]
```

Provides a ref to be used on a video element, the hook then returns a tensor with shape `[1, width, height, 3]` where the width and height are either dictated by the element's width & height or the provided argument documented above. The options argument while documented above can infact take all the properties of the [MediaStreamConstraints](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamConstraints).

### usePrediction

```js
usePrediction (options?: {
  predictConfig?: {},
  useExecute?: boolean = false,
  outputName?: string,
  predictionFunction?: string,
  modelUrl?: string,
  layers?: boolean,
}): [(data: tf.Tensor) => void, tf.Tensor | tf.Tensor[] | tf.NamedTensorMap | null]
```

Provides a function to set the data you want to use to create a prediction. The data must be in the form of a tensor. It then returns a new tensor as the prediction using either the model set with the `ModelProvider` component or by passing a modelUrl as an argument as it uses `useModel` under the hood. You can then perform different actions such as normalizing the data for to classify the original input. By default `usePrediction` uses `.predict`, if you want to force the use of `.execute` set `useExecute: true` and if you want to use a custom predict function, pass it's name via the `predictionFunction` key. If you're using a LayersModel you must set `outputName`.

:no_entry_sign: Using a `@tensorflow/tfjs-models` model with this hook will cause typescript errors if the model predicition method is called or will simply return null because the model either does not have an execute or predict function or it does, and it has not returned a Tensor. :no_entry_sign:

### useClassifier

```js
useClassifer(options?: {
  classes?: {},
  returns?: number,
  modelUrl?: string,
  layers?: boolean,
}): [(data: tf.Tensor) => void, Array<{class: number, probability: number}>, Array<{class: string, probability: number}>, null]
```

uses `usePrediction` under the hood so it provides a function to set the data, it must be in the form of a tensor. It then returns an array of classifications (be default, the array will have length 5). If the classes argument is provided, the class key in the returned array will be the class at the index of the prediction.

## Contributing

Contributions are very welcome and wanted.

**Before submitting** a new pull request, please make sure:

1. Consider if the pull-request should be going to the master branch or the latest release branch.
2. If merging to master, you have updated the package.json version.
3. You report your changes into the CHANGELOG file.
4. make sure you run the test and build script before submitting your merge request.
5. make sure you've added the documentation of your changes.

[typescript]: https://flat.badgen.net/badge/icon/Typed?icon=typescript&label&labelColor=blue&color=555555
[github-star-badge]: https://img.shields.io/github/stars/joshuaellis/react-tensorflow.svg?style=social
[github-star]: https://github.com/joshuaellis/react-tensorflow/stargazers
[twitter]: https://twitter.com/intent/tweet?text=Check%20out%20react-tensorflow%20by%20@Josh%20Ellis%20https://github.com/joshuaellis/react-tensorflow%20%F0%9F%91%8D
[twitter-badge]: https://img.shields.io/twitter/url/https/github.com/kentcdodds/testing-workshop.svg?style=social
