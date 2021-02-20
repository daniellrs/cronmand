import { Options } from '../schedule/Schedule.interface'
import { CustomCommand, CustomCommands } from './CommandManager.interface'

export default class CommandManager {
  static CUSTOM_COMMAND_NAME = 'scm'
  private static commands: CustomCommands = {}

  static add(command: CustomCommand) {
    if (this.commands[command.name])
      throw new Error(`Custom command with name "${command.name}" already exists.`)

    this.commands[command.name] = command.exec
  }

  static async exec(command: string, options: Options) {
    const splitted = command.split(' ')
    const commandName = splitted[0]
    const args = splitted.slice(1)

    if (!this.commands[commandName])
      throw new Error(`Custom command with name "${commandName}" doesn't exist.`)

    await this.commands[commandName](this.params(args), options.commands?.[commandName] || {})
  }

  static params(args: string[]) {
    return (...params: string[]) => {
      if (!params.length) return args

      const paramsArgs: string[] = []
      let including = false

      for (const arg of args) {
        const isParam = arg[0] === '-'

        if (isParam) {
          if (params.includes(arg)) including = true
          else including = false
        } else if (including) paramsArgs.push(arg)
      }

      return paramsArgs
    }
  }
}
