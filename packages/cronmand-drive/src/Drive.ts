import fs from 'fs'
import path from 'path'
import readline from 'readline'
import mime from 'mime-types'
import { google } from 'googleapis'
import { CustomCommand } from '../CommandManager.interface'
import { Param } from '../CommandManager.type'
import { DriveOptions } from './Drive.interface'

export default class Drive implements CustomCommand {
  name = 'drive'

  exec(param: Param, options: DriveOptions): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const scope = param('-s', '--scope').length
        ? param('-s', '--scope')
        : options.scope || ['https://www.googleapis.com/auth/drive']
      const tokenPath = param('--token-path')[0] || options.tokenPath || 'token.json'
      const credentialsPath =
        param('--credentials-path')[0] || options.credentialsPath || 'credentials.json'
      const file = param('-f', '--file') || options.file
      const directory = param('-d', '--directory')[0] || options.directory

      try {
        const oAuth2Client = await Drive.authorize(credentialsPath, tokenPath, scope)
        const drive = google.drive({ version: 'v3', auth: oAuth2Client })

        const folderId = await Drive.createFolderIfNotExists(directory, drive)

        for (const f of file) {
          await Drive.uploadFile(f, folderId, drive)
        }

        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }

  static uploadFile(file: string, folderId: string | undefined, drive: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const [filePath, fileMimeType] = file.split(':')

      drive.files.create(
        {
          resource: {
            name: path.basename(filePath),
            parents: folderId ? [folderId] : undefined,
          },
          media: {
            mimeType: fileMimeType || mime.lookup(filePath) || undefined,
            body: fs.createReadStream(filePath),
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

  static async createFolderIfNotExists(name: string, drive: any): Promise<string | undefined> {
    if (!name) return
    let folderId = await this.findFolder(name, drive)
    if (!folderId) folderId = await this.createFolder(name, drive)
    return folderId
  }

  static findFolder(name: string, drive: any): Promise<string> {
    return new Promise((resolve, reject) => {
      drive.files.list(
        {
          q: `name = '${name}' and mimeType = 'application/vnd.google-apps.folder'`,
          spaces: 'drive',
        },
        (err: any, res: any) => {
          if (err) {
            reject(err)
            throw err
          }

          resolve(res.data.files?.[0]?.id)
        }
      )
    })
  }

  static createFolder(name: string, drive: any): Promise<string> {
    return new Promise((resolve, reject) => {
      drive.files.create(
        {
          resource: {
            name,
            mimeType: 'application/vnd.google-apps.folder',
          },
        },
        (err: any, file: any) => {
          if (err) {
            reject(err)
            throw err
          }

          resolve(file.data.id)
        }
      )
    })
  }

  static authorize(credentialsPath: string, tokenPath: string, scope: string[]): Promise<any> {
    return new Promise((resolve, reject) => {
      fs.readFile(credentialsPath, (err, content: any) => {
        if (err) {
          reject(err)
          throw err
        }

        const credentials = JSON.parse(content.toString())
        const { client_secret, client_id, redirect_uris } = credentials.installed
        const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0])

        fs.readFile(tokenPath, async (err, token) => {
          if (err) return resolve(await this.getAccessToken(tokenPath, scope, oAuth2Client))
          oAuth2Client.setCredentials(JSON.parse(token.toString()))
          resolve(oAuth2Client)
        })
      })
    })
  }

  static getAccessToken(tokenPath: string, scope: string[], oAuth2Client: any): Promise<any> {
    return new Promise((resolve, reject) => {
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
          if (err) {
            reject(err)
            throw err
          }

          oAuth2Client.setCredentials(token)

          fs.writeFile(tokenPath, JSON.stringify(token), err => {
            if (err) {
              reject(err)
              throw err
            }
          })

          resolve(oAuth2Client)
        })
      })
    })
  }
}
