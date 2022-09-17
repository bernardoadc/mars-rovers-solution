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

  get currentPosition () {
    return `${this.x} ${this.y} ${Rover.HEADINGS[this.heading]}`
  }
}
