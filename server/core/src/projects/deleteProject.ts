import { DynamoDB } from 'aws-sdk'
import { Resource } from 'sst'

export async function deleteProject(projectId: string): Promise<boolean> {
    try {
        const dynamoDb = new DynamoDB.DocumentClient()
        
        const params = {
            // @ts-ignore
            TableName: Resource.projects.name ?? '',
            Key: {
                projectId
            }
        }
        
        await dynamoDb.delete(params).promise()
        
        return true
    } catch (err: any) {
        throw new Error('There was an error adding project: ' + err)
    }
}