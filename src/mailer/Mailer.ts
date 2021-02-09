import * as nodemailer from 'nodemailer'
import { MailerConstructor } from './Mailer.interface'

export default class Mailer {
  private transporter: nodemailer.Transporter
  private defaultMailOptions: nodemailer.SendMailOptions | undefined

  constructor({ transport, defaults, defaultMailOptions }: MailerConstructor) {
    this.transporter = nodemailer.createTransport(transport, defaults)
    this.defaultMailOptions = defaultMailOptions
  }

  sendMail(mailOptions?: nodemailer.SendMailOptions): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!mailOptions && !this.defaultMailOptions) {
        reject()
        throw new Error('You should provide mailOptions or defaultMailOptions to send and e-mail')
      }

      mailOptions = { ...this.defaultMailOptions, ...mailOptions }
      this.transporter.sendMail(mailOptions, function (error, info) {
        if (error) reject(error)
        else resolve(info)
      })
    })
  }
}
