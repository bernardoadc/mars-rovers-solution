import chalk from 'chalk'
import Joi from 'joi'
import assert from './helpers/joi-assert-custom.helper.js'

export default class Rover {
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

  constructor (x, y, heading, plateau) {
    const errors =
      assert(x, Joi.number().integer().required().label('X coordinate')) +
      assert(y, Joi.number().integer().required().label('Y coordinate')) +
      assert(heading, Joi.valid(...Rover.HEADINGS).required().label('Cardinal point')) +
      assert(plateau, Joi.object().required().label('Plateau definition'))
    if (errors) console.error(`${chalk.red('Error defining new rover!')}\n${chalk.yellow(errors)}`) || process.exit(1)

    this.x = parseInt(x)
    this.y = parseInt(y)
    this.heading = Rover.HEADINGS.indexOf(heading) // heading as array index

    this.plateau = plateau
  }

  rotate (rotation) {
    this.heading = this.heading + Rover.ROTATE[rotation] // shifts within HEADINGS array
    if (this.heading > (Rover.HEADINGS.length - 1)) this.heading -= Rover.HEADINGS.length // return to HEADINGS start when passed from end
    if (this.heading < 0) this.heading += Rover.HEADINGS.length // return to HEADINGS end when passed from start
  }

  checkPlateauBoundaries () {
    if (
      this.x < this.plateau.minX ||
      this.x > this.plateau.maxX ||
      this.y < this.plateau.minY ||
      this.y > this.plateau.maxY
    ) {
      console.error(`${chalk.red('Error! Rover has passed plateau\'s boundaries')}`)
      process.exit(1)
    }
  }

  navigate () {
    const heading = Rover.HEADINGS[this.heading] // get heading as cardinal point (letter)
    this.x += Rover.NAVIGATIONS[heading].x
    this.y += Rover.NAVIGATIONS[heading].y

    this.checkPlateauBoundaries()
  }

  executeInstructions (instructions) {
    const errors = assert(instructions, Joi.array().min(1).items(Joi.valid(...Rover.INSTRUCTIONS).label('Instructions')).label('Instructions'), 'isn\'t known.')
    if (errors) console.error(`${chalk.red('Error defining instructions!')}\n${chalk.yellow(errors)}`) || process.exit(1)

    for (const instruction of instructions) {
      if (Rover.ROTATIONS.includes(instruction)) this.rotate(instruction)
      else this.navigate()
    }
  }

  get currentPosition () {
    return `${this.x} ${this.y} ${Rover.HEADINGS[this.heading]}`
  }
}
