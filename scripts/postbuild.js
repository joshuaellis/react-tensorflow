/* eslint-disable @typescript-eslint/no-var-requires */
const rimraf = require('rimraf')

rimraf('dist/__test__/**', {}, () => console.log('done global __test__'))
rimraf('dist/__mocks__/**', {}, () => console.log('done global __mocks__'))
rimraf('dist/**/__test__/**', {}, () => console.log('done in src __test__'))
