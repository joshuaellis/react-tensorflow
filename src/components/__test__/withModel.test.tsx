import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'

import { ModelInterface } from 'types/index'

import ModelProvider from '../ModelProvider'
import withModel from '../withModel'

const ExampleComponent = withModel(({ model }: { model: ModelInterface }) => (
  <div data-testid='model-name'>
    {model !== null ? <h1 role='title'>{model.name}</h1> : null}
  </div>
))

describe('withModel', () => {
  it("should render it's children if theres no model provided", () => {
    render(
      <ModelProvider>
        <ExampleComponent />
      </ModelProvider>
    )

    expect(screen.getByTestId('model-name')).toBeTruthy()
  })

  it('should pass the model to the child component', async () => {
    render(
      <ModelProvider url='https://tfhub.dev/google/tfjs-model/imagenet/inception_v3/classification/3/default/1'>
        <ExampleComponent />
      </ModelProvider>
    )

    expect(screen.getByTestId('model-name')).toBeTruthy()
    await waitFor(() => screen.getByRole('title'))
    expect(screen.getByRole('title')).toHaveTextContent('TF Graph Model')
  })

  it('should re-render and pass the new model if the provider is given a different url', async () => {
    const { rerender } = render(
      <ModelProvider url='https://tfhub.dev/google/tfjs-model/imagenet/inception_v3/classification/3/default/1'>
        <ExampleComponent />
      </ModelProvider>
    )

    expect(screen.getByTestId('model-name')).toBeTruthy()
    await waitFor(() => screen.getByRole('title'))
    expect(screen.getByRole('title')).toHaveTextContent('TF Graph Model')

    rerender(
      <ModelProvider
        url='https://tfhub.dev/tensorflow/tfjs-model/universal-sentence-encoder-lite/1/default/1'
        layerModel
      >
        <ExampleComponent />
      </ModelProvider>
    )

    await waitFor(() => screen.getByRole('title'))
    expect(screen.getByRole('title')).toHaveTextContent('TF Layer Model')
  })
})
