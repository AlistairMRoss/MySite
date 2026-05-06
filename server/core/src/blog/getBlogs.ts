import { Blog } from '@shared-types/index'
import { DynamoDB } from 'aws-sdk'
import { Resource } from 'sst'

export async function getBlogs(): Promise<Blog[]> {
    try {
        const dynamoDb = new DynamoDB.DocumentClient()
        const result = await dynamoDb.scan({
            // @ts-ignore
            TableName: Resource.blogs.name ?? ''
        }).promise()

        const items = (result.Items ?? []) as Blog[]
        return items.sort((a, b) =>
            (b.createdAt ?? '').localeCompare(a.createdAt ?? '')
        )
    } catch (err: any) {
        throw new Error('There was an error fetching blogs: ' + err)
    }
}
