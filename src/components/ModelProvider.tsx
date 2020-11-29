/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as React from 'react'

import { ModelProviderProps, ModelProviderState } from 'types/index'

import loadModel from 'helpers/loadModel'

import { noModelError, modelFailedLoad } from 'references/errors'

import ModelCtx from './ModelContext'

export default class ModelProvider extends React.PureComponent<
  ModelProviderProps,
  ModelProviderState
> {
  state = {
    model: undefined
  }

  componentDidMount (): void {
    void this.loadContextModel()
  }

  componentDidUpdate (prevProps: ModelProviderProps): void {
    const { url: prevUrl, model: prevModel, layerModel: prevLayers } = prevProps
    const {
      url: currUrl,
      model: currModel,
      layerModel: currLayers
    } = this.props

    if (
      (currUrl && currUrl !== prevUrl) ??
      (currUrl && prevLayers !== currLayers) ??
      (currModel && currModel !== prevModel)
    ) {
      void this.loadContextModel()
    }
  }

  loadContextModel = async (): Promise<void> => {
    const { url, model, layerModel } = this.props

    try {
      if (url) {
        void this.loadUrlModel(url, layerModel)
      } else if (model) {
        void this.loadNpmModel(model)
      } else {
        throw new Error(noModelError('ModelProvider'))
      }
    } catch (err) {
      console.error(err.message)
    }
  }

  loadUrlModel = async (
    url: string,
    layers: boolean | undefined
  ): Promise<void> => {
    try {
      const loadedModel = await loadModel(url, { layers })
      if (loadedModel) {
        this.setState({ model: loadedModel })
      } else {
        throw new Error(modelFailedLoad('ModelProvider'))
      }
    } catch (err) {
      console.error(err.message)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  loadNpmModel = async (model: any): Promise<void> => {
    try {
      const loadedModel = await model.load()
      if (loadedModel) {
        this.setState({ model: loadedModel })
      } else {
        throw new Error(modelFailedLoad('ModelProvider'))
      }
    } catch (err) {
      console.error(err.message)
    }
  }

  render (): JSX.Element {
    const { children } = this.props
    const { model } = this.state

    return <ModelCtx.Provider value={model}>{children}</ModelCtx.Provider>
  }
}
