import { ExchangeSuccess } from "@openauthjs/openauth/client"
import { client } from "../../../core/src/auth/client"
import { APIGatewayProxyHandlerV2 } from "aws-lambda"

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  try {
    const code = event.queryStringParameters?.code

    console.log('recieved this code:', code)

    if (!code) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing authorization code' })
      }
    }

    const result = await client.exchange(code, 'https://api.live.alistairmikeross.com/auth/callback')

    console.log(result)
    
    if (result.err) {
      return { statusCode: 401, body: "Invalid Code" };
    }

    const accessCookie =
      `access=${result.tokens.access}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${60 * 15}`

    const refreshCookie =
      `refresh=${result.tokens.refresh}; HttpOnly; Secure; SameSitecd =Lax; Path=/; Max-Age=${60 * 60 * 24 * 30}`

    return {
      statusCode: 302,
      headers: {
        Location: '/',
      },
      cookies: [accessCookie, refreshCookie],
      body: ''
    }
  } catch (err) {
    console.error(err)
    return {
      statusCode: 500,
      body: 'Authentication failed'
    }
  }
}