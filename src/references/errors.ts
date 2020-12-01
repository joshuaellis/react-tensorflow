export const noModelError = (componentName: string): string =>
  `No model available in ${componentName}`

export const modelFailedLoad = (componentName: string): string =>
  `Model failed to load in ${componentName}`

export const noProviderAvailable = (componentName: string): string =>
  `No ModelProvider found for ${componentName}`

export const modelUrlError = (): string =>
  'Failed to pass a url using a valid scheme - https://www.tensorflow.org/js/guide/save_load#loading_a_tfmodel'

export const webcamGetFailed = (componentName: string): string =>
  `Failed to pass webcam element to ${componentName}`

export const noWebcamAvailable = (componentName: string): string =>
  `No camera available in ${componentName}`
