#! /usr/bin/env node
import cli from './cli.js'

const input = process.argv[2] ? process.argv[2].split('\\n') : [] // get CLI argument as array of lines

cli(input)
