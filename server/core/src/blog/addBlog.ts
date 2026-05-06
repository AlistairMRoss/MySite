import { Blog } from '@shared-types/index'
import { DynamoDB } from 'aws-sdk'
import { Resource } from 'sst'
import { v4 as uuid } from 'uuid'

export async function addBlog(blog: Blog): Promise<Blog> {
    try {
        const dynamoDb = new DynamoDB.DocumentClient()

        const blogWithMeta: Blog = {
            ...blog,
            blogId: uuid(),
            createdAt: new Date().toISOString()
        }

        await dynamoDb.put({
            // @ts-ignore
            TableName: Resource.blogs.name ?? '',
            Item: blogWithMeta
        }).promise()

        return blogWithMeta
    } catch (err: any) {
        throw new Error('There was an error adding blog: ' + err)
    }
}
