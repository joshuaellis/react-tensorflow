import React from 'react'
import { render, screen, RenderResult, waitFor } from '@testing-library/react'

import { ModelProviderProps } from 'types/index'

import { modelFailedLoad, noModelError } from 'references/errors'

import ModelProvider from '../ModelProvider'

const customRender = (
  ui: React.ReactNode,
  providerProps?: ModelProviderProps
): RenderResult =>
  render(<ModelProvider {...providerProps}>{ui}</ModelProvider>)

describe('ModelProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const errorSpy = jest.spyOn(console, 'error')

  it("should render it's children and log an error if no url or model is provided", () => {
    customRender(<h1>Hello World</h1>)

    expect(screen.getByText('Hello World')).toBeTruthy()
    expect(errorSpy).toHaveBeenCalledWith(noModelError('ModelProvider'))
  })

  it("should render it's children and log an error if the model fails to load", async () => {
    const promise = new Promise(resolve => resolve(undefined))

    customRender(<h1>Hello World</h1>, {
      model: {
        load: async () => await promise
      }
    })

    expect(screen.getByText('Hello World')).toBeTruthy()
    await waitFor(() => expect(errorSpy).toHaveBeenCalled())
    expect(errorSpy).toHaveBeenCalledWith(modelFailedLoad('ModelProvider'))
  })
})
