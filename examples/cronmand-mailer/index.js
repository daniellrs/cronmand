const dotenv = require('dotenv')
const cronmand = require('../../packages/cronmand/dist')
const mailer = require('../../packages/cronmand-mailer/dist')
const { Schedule, CommandManager } = cronmand
const { Mailer, MailerInstance } = mailer

dotenv.config()

CommandManager.add(new Mailer())

const mailerInstance = new MailerInstance({
  transport: {
    service: 'gmail',
    auth: {
      user: process.env.MAILER_FROM,
      pass: process.env.MAILER_PASS,
    },
  },
  defaultMailOptions: {
    from: process.env.MAILER_FROM,
    to: process.env.MAILER_TO,
  },
})

new Schedule('* * * * *', ['cm mailer -t Hello Mailer!'], {
  mailer: mailerInstance,
})
