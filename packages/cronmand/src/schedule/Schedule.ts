import cron from 'node-cron'
import { Options } from './Schedule.interface'
import Command from '../command/Command'

export default class Schedule {
  constructor(cronExpression: string, commands: (string | Function)[], options: Options = {}) {
    cron.schedule(cronExpression, async () => {
      const resume: any = {}

      try {
        for (const command of commands) {
          const name = typeof command === 'function' ? 'function' : command

          try {
            let _command = command

            if (typeof command === 'function') {
              _command = await command(options)
            }

            if (typeof _command === 'string') await Command.exec(_command as string, options)

            resume[name] = 1
          } catch (error) {
            resume[name] = error
            throw error
          }
        }
      } finally {
        if (options.mailOnFinish) options.mailer?.sendMail({ text: JSON.stringify(resume) })
      }
    })
  }
}
