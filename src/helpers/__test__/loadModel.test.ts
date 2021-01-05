import loadModel from '../loadModel'

import { modelUrlError } from 'references/errors'

describe('loadModel', () => {
  const errorSpy = jest.spyOn(console, 'error')

  it('should throw an error if no url is passed', async () => {
    // @ts-expect-error testing it throws an error when not used with TS
    await loadModel()

    expect(errorSpy).toHaveBeenCalledWith(modelUrlError())
  })
})
