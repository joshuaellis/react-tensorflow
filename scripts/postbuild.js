const rimraf = require('rimraf')

rimraf('dist/__test__/**', {}, () => console.log('done global __test__'))
rimraf('dist/**/__test__/**', {}, () => console.log('done in src __test__'))
