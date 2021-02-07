import fs from 'fs'
import path from 'path'
import readline from 'readline'
import mime from 'mime-types'
import { google } from 'googleapis'
import { Command } from '../../CustomCommand.interface'
import { Param } from '../../CustomCommand.type'
import { DriveOptions } from './Drive.interface'

export default class Drive implements Command {
  name = 'drive'

  exec(param: Param, options: DriveOptions): Promise<void> {
    return new Promise((resolve, reject) => {
      const scope = param('-s', '--scope').length
        ? param('-s', '--scope')
        : options.scope || ['https://www.googleapis.com/auth/drive']
      const tokenPath = param('--token-path')[0] || options.tokenPath || 'token.json'
      const credentialsPath =
        param('--credentials-path')[0] || options.credentialsPath || 'credentials.json'
      const file = param('-f', '--file') || options.file

      fs.readFile(credentialsPath, (err, content) => {
        if (err) {
          reject(err)
          throw err
        }

        Drive.authorize(
          tokenPath,
          scope,
          JSON.parse(content.toString()),
          async (oAuth2Client, err) => {
            if (err) {
              reject(err)
              throw err
            }

            const drive = google.drive({ version: 'v3', auth: oAuth2Client })

            try {
              for (const f of file) {
                await Drive.uploadFile(f, drive)
              }
              resolve()
            } catch (error) {
              reject(error)
            }
          }
        )
      })
    })
  }

  static uploadFile(file: string, drive: any): Promise<void> {
    return new Promise((resolve, reject) => {
      drive.files.create(
        {
          resource: {
            name: path.basename(file),
          },
          media: {
            mimeType: mime.lookup(file) || undefined,
            body: fs.createReadStream(file),
          },
        },
        (err: any) => {
          if (err) {
            reject(err)
            throw err
          }
          resolve()
        }
      )
    })
  }

  static authorize(
    tokenPath: string,
    scope: string[],
    credentials: any,
    callback: (oAuth2Client: any, err?: any) => void
  ) {
    const { client_secret, client_id, redirect_uris } = credentials.installed
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0])

    fs.readFile(tokenPath, (err, token) => {
      if (err) return this.getAccessToken(tokenPath, scope, oAuth2Client, callback)
      oAuth2Client.setCredentials(JSON.parse(token.toString()))
      callback(oAuth2Client)
    })
  }

  static getAccessToken(
    tokenPath: string,
    scope: string[],
    oAuth2Client: any,
    callback: (oAuth2Client: any, err?: any) => void
  ) {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope,
    })

    console.log('Authorize this app by visiting this url:', authUrl)

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })

    rl.question('Enter the code from that page here: ', code => {
      rl.close()
      oAuth2Client.getToken(code, (err: any, token: any) => {
        if (err) return callback(undefined, err)

        oAuth2Client.setCredentials(token)

        fs.writeFile(tokenPath, JSON.stringify(token), err => {
          if (err) return callback(undefined, err)
        })

        callback(oAuth2Client)
      })
    })
  }
}
