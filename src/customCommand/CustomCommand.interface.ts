import { ExecFunction } from './CustomCommand.type'

export interface Command {
  name: string
  exec: ExecFunction
}

export interface Commands {
  [name: string]: ExecFunction
}
