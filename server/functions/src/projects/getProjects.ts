import { type APIGatewayProxyHandlerV2WithJWTAuthorizer, type APIGatewayProxyEventV2WithJWTAuthorizer, type APIGatewayProxyResultV2 } from 'aws-lambda'
import { getProjects } from '../../../core/src/projects/index'

function getCookie(event: APIGatewayProxyEventV2WithJWTAuthorizer, name: string): string | undefined {
  const cookies = event.cookies || []
  const cookie = cookies.find(c => c.startsWith(`${name}=`))
  return cookie?.split('=')[1]
}

export const handler: APIGatewayProxyHandlerV2WithJWTAuthorizer = async (event: APIGatewayProxyEventV2WithJWTAuthorizer): Promise<APIGatewayProxyResultV2> => {
  try {
    const refreshToken = getCookie(event, 'refresh_token')

    console.log("this is the refresh token", refreshToken)

    const result = await getProjects()
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ result })
    }
  } catch (err: any) {
    return {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message })
    }
  }
}