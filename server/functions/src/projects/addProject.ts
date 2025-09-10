import { type APIGatewayProxyHandlerV2WithJWTAuthorizer, type APIGatewayProxyEventV2WithJWTAuthorizer, type APIGatewayProxyResultV2 } from 'aws-lambda'
import { addProject } from '../../../core/src/projects/index'

export const handler: APIGatewayProxyHandlerV2WithJWTAuthorizer = async (event: APIGatewayProxyEventV2WithJWTAuthorizer): Promise<APIGatewayProxyResultV2> => {
  try {
    const data = JSON.parse(event.body as string)
    const result = await addProject(data.project)
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ result })
    }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return {
      statusCode: err.statusCode,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message })
    }
  }
}
