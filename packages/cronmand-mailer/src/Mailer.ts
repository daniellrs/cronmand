import { CustomCommand, Param, Options } from '@cronmand/core'
import nodemailer from 'nodemailer'

export default class Mailer implements CustomCommand {
  name = 'mailer'

  exec(param: Param, mailerOptions: nodemailer.SendMailOptions, options: Options): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!options.mailer) {
        reject()
        throw new Error(
          'To send an email you must pass mailer with a MailerInstance in the options parameter.'
        )
      }

      const from = param('--from').join(' ') || mailerOptions.from
      const sender = param('--sender').join(' ') || mailerOptions.sender
      const to = param('--to').join(' ') || mailerOptions.to
      const cc = param('--cc').join(' ') || mailerOptions.cc
      const bcc = param('--bcc').join(' ') || mailerOptions.bcc
      const subject = param('--subject').join(' ') || mailerOptions.subject
      const text = param('-t', '--text').join(' ') || mailerOptions.text
      const html = param('-h', '--html').join(' ') || mailerOptions.html

      const mailOptions: nodemailer.SendMailOptions = {}
      if (from) mailOptions.from = from
      if (sender) mailOptions.sender = sender
      if (to) mailOptions.to = to
      if (cc) mailOptions.cc = cc
      if (bcc) mailOptions.bcc = bcc
      if (subject) mailOptions.subject = subject
      if (text) mailOptions.text = text
      if (html) mailOptions.html = html

      options.mailer.sendMail(mailOptions).then(resolve).catch(reject)
    })
  }
}
