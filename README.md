# React-Tensorflow

![Typed with TypeScript][typescript]
[![codecov](https://codecov.io/gh/joshuaellis/react-tensorflow/branch/master/graph/badge.svg)](https://codecov.io/gh/joshuaellis/react-tensorflow)
[![CircleCI](https://circleci.com/gh/joshuaellis/react-tensorflow.svg?style=svg)](https://circleci.com/gh/joshuaellis/react-tensorflow)
![npm](https://img.shields.io/npm/v/react-tensorflow)
[![twitter-badge]][twitter]
[![github-star-badge]][github-star]

> A library of React hooks and HOCs written in Typescript to use Tensorflow models in your application! 🤖🧠

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
  const model = useModel(`${PATH_TO_MODEL}`)

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
  }): [React.MutableRefObject, tf.Tensor | null]
```

Provides a ref to be used on a video element, the hook then returns a tensor with shape `[1, width, height, 3]` where the width and height are either dictated by the element's width & height or the provided argument documented above. The options argument while documented above can infact take all the properties of the [MediaStreamConstraints](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamConstraints).

### usePrediction

```js
usePrediction (options?: {
  predictConfig?: {},
  useExecute?: boolean = false,
  outputName?: string,
  predictionFunction?: string,
  ...useModelProps,
}): [React.MutableRefObject<tf.Tensor>, tf.Tensor | tf.Tensor[] | tf.NamedTensorMap | null]
```

Provides a ref to the data you want to use to create a prediction. The data must be in the form of a tensor. It then returns a new tensor as the prediction using either the model set with the `ModelProvider` component or by passing a modelUrl as an argument as it uses `useModel` under the hood. You can then perform different actions such as normalizing the data for to classify the original input. By default `usePrediction` uses `.predict`, if you want to force the use of `.execute` set `useExecute: true` and if you want to use a custom predict function, pass it's name via the `predictionFunction` key. If you're using a LayersModel you must set `outputName`. At this time using a `@tensorflow-models` model is not supported with `usePrediction`.

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
