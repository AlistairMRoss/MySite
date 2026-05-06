import { type APIGatewayProxyHandlerV2, type APIGatewayProxyResultV2 } from 'aws-lambda'
import { getBlogs } from '../../../core/src/blog'

export const handler: APIGatewayProxyHandlerV2 = async (): Promise<APIGatewayProxyResultV2> => {
    try {
        const blogs = await getBlogs()
        // Strip content from list view to keep payload small
        const summaries = blogs.map(({ content, ...rest }) => ({
            ...rest,
            preview: content.slice(0, 240)
        }))
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ result: summaries })
        }
    } catch (err: any) {
        return {
            statusCode: err.statusCode || 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: err.message })
        }
    }
}
