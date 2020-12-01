# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 2.0.0 - 2020-12-01

### Added

- useClassifer hook

### Fixed

- useDataRef was not updating when ref updated (#23)

### Changed

- ModelProvider is now a class component
- Error handling across the various functions
  - ModelProvider & useModel report errors in model loading
  - withModel & useModel report errors when no model is available
  - Errors are no in one file `references/errors.ts`
- Updated example application to use useClassify hook

### Removed

- `prism.css` inside example app

## 1.0.1 - 2020-11-26

### Fixed

- usePrediction didn't dispose of tensor on unmount

### Changed

- usePrediction does not accept a custom prediction function

## 1.0.0 - 2020-11-25

### Added

- CHANGELOG
- ISSUE_TEMPLATE
- PULL_REQUEST_TEMPLATE
- Example app
- useModel accepts npm installed model
- working eslint config

### Changed

- usePrediction returns Float32Array
- usePrediction uses `.predict` as default
- usePrediction can use `.execute` if a flag is present
- add `.dispose` functions to hooks.

### Fixed

- RTF #7 - memory leak in useWebcam
- RTF #6 - webcam instance not destroyed on unmount

### Removed

- `ReactTensorflow` namespace

## 0.2.0 - 2020-11-15

### Added

- useWebcam hook
- attachWebcam helper func
- image helper funcs
- usePrediction hook
- useDataRef hook

### Changed

- @tensorflow/tfjs mock to manage `tf.data.webcam.capture`
- `jest.config.js` coverage thresholds
- moved `ModelCtx` to it's own file
- created global type namespace `ReactTensorflow`

### Fixed

- post build scripts to remove `__test__` type files under `/src/`

### Removed

- `loadModel.test.ts` – was being tested in the hooks
- `@testing-library/user-event` – from package.json

## 0.1.0 - 2020-11-12

### Added

- Project setup
- useModel hook
- ModelProvider func
- withModel HOC
- loadModel helper func
