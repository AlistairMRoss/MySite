import { Blog, Subscriber } from '@shared-types/index'
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'

const ses = new SESClient({})

const escapeHtml = (s: string): string =>
    s.replace(/[&<>"']/g, (c) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[c]!))

export async function sendBlogNotification(
    blog: Blog,
    subscribers: Subscriber[]
): Promise<void> {
    const sender = process.env.EMAIL_SENDER
    const webOrigin = process.env.WEB_ORIGIN
    if (!sender || !webOrigin) {
        console.error('EMAIL_SENDER or WEB_ORIGIN missing — skipping notifications')
        return
    }

    const postUrl = `${webOrigin}/blog/${blog.blogId}`
    const safeTitle = escapeHtml(blog.title)

    await Promise.allSettled(
        subscribers.map(async (sub) => {
            const unsubUrl = `${webOrigin}/unsubscribe?token=${sub.unsubscribeToken}`
            const html = `
                <div style="font-family: -apple-system, system-ui, sans-serif; max-width: 540px; margin: 0 auto; padding: 24px; color: #18181b;">
                    <h1 style="font-size: 22px; margin: 0 0 12px;">New post: ${safeTitle}</h1>
                    <p style="color: #52525b; margin: 0 0 24px;">A new post is up on alistairmikeross.com.</p>
                    <p style="margin: 0 0 32px;">
                        <a href="${postUrl}" style="display: inline-block; padding: 10px 18px; background: #4f46e5; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 500;">Read the post</a>
                    </p>
                    <p style="font-size: 12px; color: #a1a1aa; margin: 32px 0 0;">
                        You're receiving this because you subscribed at alistairmikeross.com.
                        <a href="${unsubUrl}" style="color: #a1a1aa;">Unsubscribe</a>.
                    </p>
                </div>
            `
            const text = `New post: ${blog.title}\n\nRead it here: ${postUrl}\n\nUnsubscribe: ${unsubUrl}`

            try {
                await ses.send(new SendEmailCommand({
                    Source: sender,
                    Destination: { ToAddresses: [sub.email] },
                    Message: {
                        Subject: { Data: `New post: ${blog.title}` },
                        Body: {
                            Html: { Data: html },
                            Text: { Data: text }
                        }
                    }
                }))
            } catch (err) {
                console.error(`Failed to send to ${sub.email}:`, err)
            }
        })
    )
}
