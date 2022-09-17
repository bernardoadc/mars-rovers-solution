import { exec } from 'child_process'

export async function run (input, cmd) {
  return new Promise(function (resolve, reject) {
    if (!cmd) cmd = `node index.js "${input}"`
    exec(cmd, function (error, stdout, stderr) { // don't use `npm start` since it will output aditional text
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
  return output.replace(/^Command failed: node index\.js.*/, '') + '\n'
}

export default run
