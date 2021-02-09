import cron from 'node-cron'
import { Options } from './Schedule.interface'
import Command from '../command/Command'

export default class Schedule {
  constructor(cronExpression: string, commands: string[], options: Options = {}) {
    cron.schedule(cronExpression, async () => {
      const resume: any = {}

      try {
        for (const command of commands) {
          try {
            await Command.exec(command, options)
            resume[command] = 1
          } catch (error) {
            resume[command] = error
            throw error
          }
        }
      } finally {
        if (options.sendMailOnFinish) options.mailer?.sendMail({ text: JSON.stringify(resume) })
      }
    })
  }
}
