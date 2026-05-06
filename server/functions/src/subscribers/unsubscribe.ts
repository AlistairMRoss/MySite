import { type APIGatewayProxyHandlerV2, type APIGatewayProxyResultV2 } from 'aws-lambda'
import { removeSubscriberByToken } from '../../../core/src/subscribers'

export const handler: APIGatewayProxyHandlerV2 = async (event): Promise<APIGatewayProxyResultV2> => {
    try {
        const token = event.pathParameters?.token
        if (!token) {
            return {
                statusCode: 400,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ error: 'Missing token' })
            }
        }

        const removed = await removeSubscriberByToken(token)

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ result: { removed } })
        }
    } catch (err: any) {
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: err.message })
        }
    }
}
