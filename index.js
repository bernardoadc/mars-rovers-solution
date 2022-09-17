// entry point
if (!process.argv[2]) console.warn('Nothing to do - no instructions passed') && process.exit(0)
const input = process.argv[2].split('\\n') // get CLI argument as array of lines

// plateau.js
class Plateau {
  constructor (maxX, maxY) {
    this.minX = 0
    this.minY = 0
    this.maxX = maxX
    this.maxY = maxY
  }
}

// rover.js
class Rover {
  static HEADINGS = ['N', 'E', 'S', 'W']
  static ROTATE = { L: -1, R: 1 }
  static ROTATIONS = ['L', 'R']
  static INSTRUCTIONS = ['M'].concat(...Rover.ROTATIONS)
  static NAVIGATIONS = {
    N: { x: 0, y: 1 },
    E: { x: 1, y: 0 },
    S: { x: 0, y: -1 },
    W: { x: -1, y: 0 }
  }

  constructor (x, y, heading) {
    this.x = x
    this.y = y
    this.heading = Rover.HEADINGS.indexOf(heading) // heading as array index
  }

  rotate (rotation) {
    this.heading = this.heading + Rover.ROTATE[rotation] // shifts within HEADINGS array
    if (this.heading > (Rover.HEADINGS.length - 1)) this.heading -= Rover.HEADINGS.length // return to HEADINGS start when passed from end
    if (this.heading < 0) this.heading += Rover.HEADINGS.length // return to HEADINGS end when passed from start
  }

  navigate () {
    const heading = Rover.HEADINGS[this.heading] // get heading as cardinal point (letter)
    this.x += Rover.NAVIGATIONS[heading].x
    this.y += Rover.NAVIGATIONS[heading].y
  }

  executeInstructions (instructions) {
    const unknownInstructions = instructions.filter(instruction => !Rover.INSTRUCTIONS.includes(instruction))
    if (unknownInstructions.length) throw new Error(`Instruction ${unknownInstructions[0]} isn't known`) // display first unknown instruction only

    for (const instruction of instructions) {
      if (Rover.ROTATIONS.includes(instruction)) this.rotate(instruction)
      else this.navigate()
    }
  }

  get curPos () {
    return `${this.x} ${this.y} ${Rover.HEADINGS[this.heading]}`
  }
}

// cli.js
if (input.length < 3 || input.length % 2 !== 1) { // test minimum input needed: plateau definition line + 2 lines of rover instructions
  console.error('Invalid input format')
  process.exit(1)
}

const [ plateauDef ] = input.splice(0, 1) // get first line of input, removing from input array
const [ maxX, maxY ] = plateauDef.split(' ')
const plateau = new Plateau(parseInt(maxX), parseInt(maxY)) // eslint-disable-line no-unused-vars

while (input.length) { // processes as many rovers were passed
  const [ roverPosition, roverInstructions ] = input.splice(0, 2) // get next 2 lines from input -> pertains to same rover
  const [ startX, startY, startHeading ] = roverPosition.split(' ')

  const rover = new Rover(parseInt(startX), parseInt(startY), startHeading)
  rover.executeInstructions(roverInstructions.split('')) // pass array of instructions
  console.log(rover.curPos) // outputs rover final position and heading
}
