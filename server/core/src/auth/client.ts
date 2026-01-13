import { createClient } from '@openauthjs/openauth/client'

const AUTH_URL = 'https://auth.alistairmikeross.com'
const CLIENT_ID = 'alistairmikeross-web'

const client = createClient({
  clientID: CLIENT_ID,
  issuer: AUTH_URL
})


export { client }