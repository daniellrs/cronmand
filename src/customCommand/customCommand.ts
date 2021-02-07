import { Command, Commands } from './customCommand.interface'

export default class CustomCommand {
  static CUSTOM_COMMAND_NAME = 'scm'
  private static commands: Commands = {}

  static add(command: Command) {
    if (this.commands[command.name])
      throw new Error(`Custom command with name "${command.name}" already exists.`)

    this.commands[command.name] = command.exec
  }

  static async exec(command: string) {
    const splitted = command.split(' ')
    const commandName = splitted[0]
    const args = splitted.slice(1)

    if (!this.commands[commandName])
      throw new Error(`Custom command with name "${commandName}" doesn't exist.`)

    await this.commands[commandName](args)
  }
}
