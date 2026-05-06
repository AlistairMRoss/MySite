import { type APIGatewayProxyHandlerV2WithJWTAuthorizer, type APIGatewayProxyEventV2WithJWTAuthorizer, type APIGatewayProxyResultV2 } from 'aws-lambda'
import { addBlog } from '../../../core/src/blog'
import { getAllSubscribers } from '../../../core/src/subscribers'
import { sendBlogNotification } from '../../../core/src/email/sendBlogNotification'

export const handler: APIGatewayProxyHandlerV2WithJWTAuthorizer = async (event: APIGatewayProxyEventV2WithJWTAuthorizer): Promise<APIGatewayProxyResultV2> => {
    try {
        if (!event.body) {
            return {
                statusCode: 400,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ error: 'Missing request body' })
            }
        }

        const data = JSON.parse(event.body)
        if (!data.blog?.title?.trim() || !data.blog?.content?.trim()) {
            return {
                statusCode: 400,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ error: 'Title and content are required' })
            }
        }

        const blog = await addBlog(data.blog)

        // Fire-and-forget notification fan-out (errors logged inside)
        try {
            const subscribers = await getAllSubscribers()
            if (subscribers.length > 0) {
                await sendBlogNotification(blog, subscribers)
            }
        } catch (err) {
            console.error('Notification fan-out failed:', err)
        }

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ result: blog })
        }
    } catch (err: any) {
        return {
            statusCode: err.statusCode || 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: err.message })
        }
    }
}
