import chalk from 'chalk'
import Joi from 'joi'
import assert from './helpers/joi-assert-custom.helper.js'

export default class Plateau {
  constructor (maxX, maxY) {
    const errors =
      assert(maxX, Joi.number().integer().required().label('Right coordinate')) +
      assert(maxY, Joi.number().integer().required().label('Upper coordinate'))
    if (errors) console.error(`${chalk.red('Error defining plateau!')}\n${chalk.yellow(errors)}`) || process.exit(1)

    this.minX = 0
    this.minY = 0
    this.maxX = parseInt(maxX)
    this.maxY = parseInt(maxY)
  }
}
