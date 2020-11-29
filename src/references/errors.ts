export const noModelError = (componentName: string): string =>
  `No model available in ${componentName}`

export const modelFailedLoad = (componentName: string): string =>
  `Model failed to load in ${componentName}`

export const noProviderAvailable = (componentName: string): string =>
  `No ModelProvider found for ${componentName}`
