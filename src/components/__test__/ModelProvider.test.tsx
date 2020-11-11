import React from 'react'
import { render, screen } from '@testing-library/react'

import { ReactTensorFlow } from 'types/index'

import ModelProvider from '../ModelProvider'

const customRender = (
  ui: React.ReactNode,
  providerProps?: ReactTensorFlow.ModelProviderProps
) => render(<ModelProvider {...providerProps}>{ui}</ModelProvider>)

describe('ModelProvider', () => {
  it("should render it's children even if no url is provided", () => {
    customRender(<h1>Hello World</h1>)

    expect(screen.getByText('Hello World')).toBeTruthy()
  })
})
