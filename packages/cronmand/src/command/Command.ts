import { exec } from 'child_process'
import CommandManager from '../commandManager/CommandManager'
import { Options } from '../schedule/Schedule.interface'

export default class Command {
  static exec(command: string, options: Options): Promise<void> {
    return new Promise((resolve, reject) => {
      if (command.indexOf(CommandManager.CUSTOM_COMMAND_NAME) === 0) {
        return CommandManager.exec(
          command.substring(CommandManager.CUSTOM_COMMAND_NAME.length).trim(),
          options
        )
          .then(resolve)
          .catch(reject)
      }

      exec(command, error => {
        if (error) {
          reject(error)
          throw error
        }
        resolve()
      })
    })
  }
}
