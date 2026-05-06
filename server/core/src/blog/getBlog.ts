import { Blog } from '@shared-types/index'
import { DynamoDB } from 'aws-sdk'
import { Resource } from 'sst'

export async function getBlog(blogId: string): Promise<Blog | null> {
    try {
        const dynamoDb = new DynamoDB.DocumentClient()
        const result = await dynamoDb.get({
            // @ts-ignore
            TableName: Resource.blogs.name ?? '',
            Key: { blogId }
        }).promise()

        return (result.Item as Blog) ?? null
    } catch (err: any) {
        throw new Error('There was an error fetching blog: ' + err)
    }
}
