import chalk from 'chalk'
import Joi from 'joi'
import { assert, multiAssert, validate, config } from 'joi-error-msg'

config({ titleColor: chalk.red, color: chalk.yellow })

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
    try {
      multiAssert('Error defining new rover!',
        validate(x, Joi.number().integer().required().label('X coordinate')),
        validate(y, Joi.number().integer().required().label('Y coordinate')),
        validate(heading, Joi.valid(...Rover.HEADINGS).required().label('Cardinal point')),

        validate(plateau, Joi.object().required().label('Plateau definition')),
        validate(x, Joi.number().min(plateau.minX).max(plateau.maxX).label('X coordinate'), 'would pass plateau\'s boundaries - '),
        validate(y, Joi.number().min(plateau.minY).max(plateau.maxY).label('Y coordinate'), 'would pass plateau\'s boundaries - ')
      )

      this.x = parseInt(x)
      this.y = parseInt(y)
      this.heading = Rover.HEADINGS.indexOf(heading) // heading as array index

      this.plateau = plateau
    } catch (e) {
      console.error(e.message)
      process.exit(1)
    }
  }

  rotate (rotation) {
    this.heading = this.heading + Rover.ROTATE[rotation] // shifts within HEADINGS array
    if (this.heading > (Rover.HEADINGS.length - 1)) this.heading -= Rover.HEADINGS.length // return to HEADINGS start when passed from end
    if (this.heading < 0) this.heading += Rover.HEADINGS.length // return to HEADINGS end when passed from start
  }

  canNavigate (navX, navY) {
    if (
      (this.x + navX) < this.plateau.minX ||
      (this.x + navX) > this.plateau.maxX ||
      (this.y + navY) < this.plateau.minY ||
      (this.y + navY) > this.plateau.maxY
    ) throw new Error('Error! Rover would pass plateau\'s boundaries')
  }

  navigate () {
    const heading = Rover.HEADINGS[this.heading] // get heading as cardinal point (letter)
    const navX = Rover.NAVIGATIONS[heading].x
    const navY = Rover.NAVIGATIONS[heading].y

    try {
      this.canNavigate(navX, navY)

      this.x += navX
      this.y += navY
    } catch (e) {
      console.error(`${chalk.red(e.message)}`)
      process.exit(1)
    }
  }

  executeInstructions (instructions) {
    try {
      assert(instructions, Joi.array().min(1).items(
        Joi.valid(...Rover.INSTRUCTIONS).label('Instructions')
      ).label('Instructions'), 'isn\'t known.', 'Error defining instructions!')

      for (const instruction of instructions) {
        if (Rover.ROTATIONS.includes(instruction)) this.rotate(instruction)
        else this.navigate()
      }
    } catch (e) {
      console.error(e.message)
      process.exit(1)
    }
  }

  get currentPosition () {
    return `${this.x} ${this.y} ${Rover.HEADINGS[this.heading]}`
  }
}
