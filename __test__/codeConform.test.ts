import { ESLint } from 'eslint'

test('code conforms', async () => {
  const eslint = new ESLint({ fix: true, cwd: process.cwd() })
  const lintRes = await eslint.lintFiles(['./**/*.{js,jsx,ts,tsx}'])

  const results = [...lintRes].filter(
    ({
      errorCount,
      warningCount
    }: {
      errorCount: number
      warningCount: number
    }) => errorCount + warningCount > 0
  )

  if (results.length > 0) {
    console.log(results)
  }

  expect(results).toEqual([])
})
