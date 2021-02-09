import Mailer from './mailer/Mailer'
import Schedule from './schedule/Schedule'
import * as env from './env'

const mailer = new Mailer({
  transport: {
    service: 'gmail',
    auth: {
      user: env.mailer.from,
      pass: env.mailer.password,
    },
  },
  defaultMailOptions: {
    from: env.mailer.from,
    to: env.mailer.to,
  },
})

new Schedule(
  '* * * * *',
  [
    'scm archiver -d ./dist:dist',
    'scm drive -f output.zip -d backup',
    'del output.zip',
    'echo backup done!',
  ],
  {
    mailer,
    sendMailOnFinish: true,
  }
)
