import chalk from 'chalk'
import Joi from 'joi'
import { multiAssert, validate, config } from 'joi-error-msg'

config({ titleColor: chalk.red, color: chalk.yellow })

export default class Plateau {
  constructor (maxX, maxY) {
    try {
      multiAssert('Error defining plateau!',
        validate(maxX, Joi.number().integer().required().label('Right coordinate')),
        validate(maxY, Joi.number().integer().required().label('Upper coordinate'))
      )

      this.minX = 0
      this.minY = 0
      this.maxX = parseInt(maxX)
      this.maxY = parseInt(maxY)
    } catch (e) {
      console.error(e.message)
      process.exit(1)
    }
  }
}
