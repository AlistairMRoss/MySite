import { createClient } from '@openauthjs/openauth/client'
import { createSubjects } from '@openauthjs/openauth/subject'
import { object, string } from 'valibot'
const AUTH_URL = 'https://ld4zovqhjb5ygpgtnovmvdtav40fwrdb.lambda-url.us-east-1.on.aws'
const CLIENT_ID = 'alistairmikeross-web'

const client = createClient({
  clientID: CLIENT_ID,
  issuer: AUTH_URL
})

const subjects = createSubjects({
  user: object({
    email: string()
  })
})

export { client, subjects }
