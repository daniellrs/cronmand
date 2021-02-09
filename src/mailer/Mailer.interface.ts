import SMTPTransport from 'nodemailer/lib/smtp-transport'
import * as nodemailer from 'nodemailer'

export interface MailerConstructor {
  transport: string | SMTPTransport | SMTPTransport.Options | undefined
  defaults?: SMTPTransport.Options | undefined
  defaultMailOptions?: nodemailer.SendMailOptions
}
