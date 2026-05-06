import { type APIGatewayProxyHandlerV2, type APIGatewayProxyResultV2 } from 'aws-lambda'
import { addSubscriber } from '../../../core/src/subscribers'

export const handler: APIGatewayProxyHandlerV2 = async (event): Promise<APIGatewayProxyResultV2> => {
    try {
        if (!event.body) {
            return {
                statusCode: 400,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ error: 'Missing request body' })
            }
        }

        const { email } = JSON.parse(event.body)
        if (!email || typeof email !== 'string') {
            return {
                statusCode: 400,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ error: 'Email is required' })
            }
        }

        await addSubscriber(email)

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ result: { ok: true } })
        }
    } catch (err: any) {
        return {
            statusCode: err.statusCode || 400,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: err.message })
        }
    }
}
