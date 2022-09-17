import Plateau from './src/plateau.js'
import Rover from './src/rover.js'

function validate (input) {
  if (!input.length) {
    console.info('Nothing to do - no instructions passed')
    process.exit(0)
  }
  if (input.length < 3 || input.length % 2 !== 1) { // test minimum input needed: plateau definition line + 2 lines of rover instructions
    console.error('Invalid input format')
    process.exit(1)
  }
}

export default function init (input) {
  validate(input)
  const [ plateauDef ] = input.splice(0, 1) // get first line of input, removing from input array
  const [ maxX, maxY ] = plateauDef.split(' ')
  const plateau = new Plateau(parseInt(maxX), parseInt(maxY)) // eslint-disable-line no-unused-vars

  while (input.length) { // processes as many rovers were passed
    const [ roverPosition, roverInstructions ] = input.splice(0, 2) // get next 2 lines from input -> pertains to same rover
    const [ startX, startY, startHeading ] = roverPosition.split(' ')

    const rover = new Rover(parseInt(startX), parseInt(startY), startHeading)
    rover.executeInstructions(roverInstructions.split('')) // pass array of instructions
    console.info(rover.currentPosition) // outputs rover final position and heading
  }
}
