# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 1.0.0 - 2020-11-XX

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
