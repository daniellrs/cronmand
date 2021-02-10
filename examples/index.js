const SCM = require('../dist')
const env = require('./env')

console.log(SCM)

const mailer = new SCM.Mailer({
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

new SCM.Schedule(
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
