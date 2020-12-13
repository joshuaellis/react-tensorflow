/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

export class GraphModel {
  executeReturn: any
  constructor (executeReturn: any) {
    this.executeReturn = executeReturn
  }

  predict = (v: any) => v
  executeAsync = (v: any) => this.executeReturn
  outputs = [{ name: 'output_layer' }]
  dispose = jest.fn()
}
