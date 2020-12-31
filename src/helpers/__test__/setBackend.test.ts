import setBackend from '../setBackend'

describe('setBackend', () => {
  it('should return a function to reset the backend when called', () => {
    const reset = setBackend('cpu')
    expect(typeof reset).toBe('function')
  })

  it('should return nothing when the reset function is called', () => {
    const reset = setBackend('cpu')
    expect(reset()).toBeUndefined()
  })
})
