import { DynamoDB } from 'aws-sdk'
import { Resource } from 'sst'

export async function deleteBlog(blogId: string): Promise<void> {
    try {
        const dynamoDb = new DynamoDB.DocumentClient()
        await dynamoDb.delete({
            // @ts-ignore
            TableName: Resource.blogs.name ?? '',
            Key: { blogId }
        }).promise()
    } catch (err: any) {
        throw new Error('There was an error deleting blog: ' + err)
    }
}
