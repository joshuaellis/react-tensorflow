import standardx from 'standardx'

test('src conforms to standard', () => {
  expect(
    standardx.lintFiles(
      ['src/*.js'],
      {
        cwd: '../',
        parser: 'babel-eslint'
      },
      () => console.log('code conforms')
    )
  ).toBeUndefined()
})
