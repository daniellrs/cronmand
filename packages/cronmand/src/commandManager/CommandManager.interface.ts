import { ExecFunction } from './CommandManager.type'

export interface CustomCommand {
  name: string
  exec: ExecFunction
}

export interface CustomCommands {
  [name: string]: ExecFunction
}
