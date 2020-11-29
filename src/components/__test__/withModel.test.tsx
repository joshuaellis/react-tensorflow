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

  it('should re-render and pass the new ctx value if the provider has different props', async () => {
    // initial render, use Graph Model
    const { rerender, getByTestId, getByRole } = customRender({
      url:
        'https://tfhub.dev/google/tfjs-model/imagenet/inception_v3/classification/3/default/1'
    })

    expect(getByTestId('model-name')).toBeTruthy()
    await waitFor(() => getByRole('title'))
    expect(getByRole('title')).toHaveTextContent('TF Graph Model')

    // changes to use Layer Model & a different URL
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

    // changes to use a Graph Model, without changing url
    rerender(
      <ModelProvider
        layerModel={false}
        url='https://tfhub.dev/tensorflow/tfjs-model/universal-sentence-encoder-lite/1/default/1'
      >
        <ExampleComponent />
      </ModelProvider>
    )

    await waitFor(() =>
      expect(getByRole('title')).toHaveTextContent('TF Graph Model')
    )
    expect(getByRole('title')).toHaveTextContent('TF Graph Model')

    const promise = new Promise(resolve => resolve({ name: 'PKG Model' }))

    // changes to use a PKG model
    rerender(
      <ModelProvider
        model={{
          load: async () => await promise
        }}
      >
        <ExampleComponent />
      </ModelProvider>
    )

    await waitFor(() => getByRole('title'))
    expect(getByRole('title')).toHaveTextContent('PKG Model')
  })

  it("it should throw an error if there's no model provider accessible", () => {
    expect(() => render(<ExampleComponent />)).toThrowError()
    expect(console.error).toHaveBeenCalled()
  })
})
