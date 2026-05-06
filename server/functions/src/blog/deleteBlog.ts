import { type APIGatewayProxyHandlerV2WithJWTAuthorizer, type APIGatewayProxyEventV2WithJWTAuthorizer, type APIGatewayProxyResultV2 } from 'aws-lambda'
import { deleteBlog } from '../../../core/src/blog'

export const handler: APIGatewayProxyHandlerV2WithJWTAuthorizer = async (event: APIGatewayProxyEventV2WithJWTAuthorizer): Promise<APIGatewayProxyResultV2> => {
    try {
        const blogId = event.pathParameters?.blogId
        if (!blogId) {
            return {
                statusCode: 400,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ error: 'Missing blogId' })
            }
        }

        await deleteBlog(blogId)

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ result: { ok: true } })
        }
    } catch (err: any) {
        return {
            statusCode: err.statusCode || 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: err.message })
        }
    }
}
