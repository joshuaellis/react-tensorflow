import React from 'react'
import { render, RenderResult, waitFor } from '@testing-library/react'

import { ModelInterface, ModelProviderProps } from 'types/index'

import ModelProvider from '../ModelProvider'
import withModel from '../withModel'

const ExampleComponent = withModel(({ model }: { model: ModelInterface }) => (
  <div data-testid='model-name'>
    {model ? <h1 role='title'>{model.name}</h1> : null}
  </div>
))

describe('withModel', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const errorSpy = jest.spyOn(console, 'error')

  const customRender = (props?: ModelProviderProps): RenderResult =>
    render(
      <ModelProvider {...props}>
        <ExampleComponent />
      </ModelProvider>
    )

  it("should render it's children if theres no model provided", () => {
    const { getByTestId } = customRender()

    expect(getByTestId('model-name')).toBeTruthy()
  })

  it('should pass the model to the child component', async () => {
    const { getByTestId, getByRole } = customRender({
      url:
        'https://tfhub.dev/google/tfjs-model/imagenet/inception_v3/classification/3/default/1'
    })

    expect(getByTestId('model-name')).toBeTruthy()
    await waitFor(() => getByRole('title'))
    expect(getByRole('title')).toHaveTextContent('TF Graph Model')
    expect(errorSpy).not.toHaveBeenCalled()
  })

  it('should re-render and pass the new model if the provider is given a different url', async () => {
    const { rerender, getByTestId, getByRole } = customRender({
      url:
        'https://tfhub.dev/google/tfjs-model/imagenet/inception_v3/classification/3/default/1'
    })

    expect(getByTestId('model-name')).toBeTruthy()
    await waitFor(() => getByRole('title'))
    expect(getByRole('title')).toHaveTextContent('TF Graph Model')

    rerender(
      <ModelProvider
        url='https://tfhub.dev/tensorflow/tfjs-model/universal-sentence-encoder-lite/1/default/1'
        layerModel
      >
        <ExampleComponent />
      </ModelProvider>
    )

    await waitFor(() => getByRole('title'))
    expect(getByRole('title')).toHaveTextContent('TF Layer Model')
  })

  it("it should throw an error if there's no model provider accessible", () => {
    expect(() => render(<ExampleComponent />)).toThrowError()
    expect(console.error).toHaveBeenCalled()
  })
})
