import * as React from 'react'
import { noProviderAvailable } from 'references/errors'

import { ModelInterface } from 'types/index'

import ModelCtx from './ModelContext'

interface WithModelProps {
  model: ModelInterface
}

const withModel = <T extends WithModelProps = WithModelProps>(
  Component: React.ComponentType<T>
): ((props: Omit<T, keyof WithModelProps>) => JSX.Element) => {
  const ComponentWithModel = (
    props: Omit<T, keyof WithModelProps>
  ): JSX.Element => (
    <ModelCtx.Consumer>
      {ctx => {
        const doesContextExist = Boolean(ctx)
        if (!doesContextExist) {
          throw new Error(noProviderAvailable('withModel'))
        }
        return <Component {...(props as T)} model={ctx?.model} />
      }}
    </ModelCtx.Consumer>
  )

  ComponentWithModel.displayName = `withModel(${Component.displayName ??
    Component.name ??
    'Component'})`

  return ComponentWithModel
}

export default withModel
