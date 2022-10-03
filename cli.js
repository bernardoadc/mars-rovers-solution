import chalk from 'chalk'
import Plateau from './src/plateau.js'
import Rover from './src/rover.js'

function validate (input) {
  if (!input.length) {
    console.info(chalk.blueBright('Nothing to do - no instructions passed'))
    process.exit(0)
  }

  // test minimum input needed: plateau definition line + 2 lines of rover instructions
  if (input.length < 3 || input.length % 2 !== 1) throw new Error('Invalid input format')
}

function definePlateau (plateauDef) {
  const params = plateauDef.split(' ')

  if (params.length > 2) throw new Error('Too many args for plateau definition')
  const [ maxX, maxY ] = params

  return new Plateau(maxX, maxY)
}

function defineRover (roverPosition, roverInstructions, plateau) {
  const params = roverPosition.split(' ')

  if (params.length > 3) throw new Error('Too many args for rover definition')
  const [ startX, startY, startHeading ] = params

  return new Rover(startX, startY, startHeading, plateau)
}

export default function init (input) {
  try {
    validate(input)

    const [ plateauDef ] = input.splice(0, 1) // get first line of input, removing from input array
    const plateau = definePlateau(plateauDef)

    while (input.length) { // processes as many rovers were passed
      const [ roverPosition, roverInstructions ] = input.splice(0, 2) // get next 2 lines from input -> pertains to same rover

      const rover = defineRover(roverPosition, roverInstructions, plateau)
      rover.executeInstructions(roverInstructions.split('')) // pass array of instructions
      console.info(rover.currentPosition) // outputs rover final position and heading
    }
  } catch (e) {
    console.error(chalk.red(e.message))
    process.exit(1)
  }
}
