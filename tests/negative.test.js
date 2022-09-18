import test from 'ava'
import { run, adjustOutput } from './utils.js'

test('empty instructions', async function (t) {
  const expectedOutput = adjustOutput('Nothing to do - no instructions passed')

  let output = await run(null, 'node index.js')
  t.is(output, expectedOutput)

  output = await run('')
  t.is(output, expectedOutput)
})

test('random instructions', async function (t) {
  const input = 'vznpç!anpçfr!e'

  await t.throwsAsync(run(input))
})

test('no rover instructions', async function (t) {
  const input = '1 1'

  await t.throwsAsync(run(input))
})

test('no plateau instructions', async function (t) {
  const input = '0 0 N\\nMRL'

  await t.throwsAsync(run(input))
})

test('unknown instructions', async function (t) {
  const input = '1 1\\n0 0 N\\nXYZ'

  await t.throwsAsync(run(input))
})

test('missing values', async function (t) {
  let input = '1\\n0 0 N\\nMRL'
  await t.throwsAsync(run(input))

  input = '1 1\\n0 N\\nMRL'
  await t.throwsAsync(run(input))

  input = '1 1\\n0 0\\nMRL'
  await t.throwsAsync(run(input))

  input = '1 1\\n0 0 N\\n'
  await t.throwsAsync(run(input))
})

test('wrong types', async function (t) {
  let input = '1 x\\n0 0 N\\nMRL'
  await t.throwsAsync(run(input))

  input = '1 1\\nx y N\\nMRL'
  await t.throwsAsync(run(input))

  input = '1 1\\n0 0 2\\nMRL'
  await t.throwsAsync(run(input))

  input = '1 1\\n0 0 N\\nMRL3'
  await t.throwsAsync(run(input))
})

test('has passed plateau\'s boundaries', async function (t) {
  const input = '1 1\\n0 0 N\\nMMM'
  const expectedOutput = 'Error! Rover has passed plateau\'s boundaries'

  try {
    await run(input)
  } catch (e) {
    const output = e.message.split('\n').splice(-2, 1).pop() // last outputed (written) line
    t.is(output, expectedOutput)
  }
  await t.throwsAsync(run(input))
})
