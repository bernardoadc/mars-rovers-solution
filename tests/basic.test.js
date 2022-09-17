import test from 'ava'
import { run, multilineInput, adjustOutput } from './utils.js'

test('simplest test', async function (t) {
  const input = '1 1\\n0 0 N\\nMRL'
  const expectedOutput = adjustOutput('0 1 N')

  const output = await run(input)
  t.is(output, expectedOutput)
})

test('provided example', async function (t) {
  const input = multilineInput(`10 10
1 2 N
LMLMLMLMM
3 3 E
MRRMMRMRRM`)
  const expectedOutput = adjustOutput('1 3 N\n2 3 S')

  const output = await run(input)
  t.is(output, expectedOutput)
})
