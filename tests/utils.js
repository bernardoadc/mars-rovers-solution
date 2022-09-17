import { exec } from 'child_process'

export async function run (input) {
  return new Promise(function (resolve, reject) {
    exec(`node index.js "${input}"`, function (error, stdout, stderr) {
      if (error) reject(error)
      if (stderr) reject(stderr)
      if (stdout) resolve(stdout)
    })
  })
}

// Helps using multiline strings in js and converting it to run CLI
export function multilineInput (input) {
  return input.replaceAll('\n', '\\n')
}

// A little detail that you cannot forget
export function adjustOutput (output) {
  return output + '\n'
}

export default run
