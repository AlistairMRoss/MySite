import { Project } from '@shared-types/index'
import { DynamoDB } from 'aws-sdk'
import { Resource } from 'sst'

export async function getProjects(): Promise<Project[]> {
    try {
        const dynamoDb = new DynamoDB.DocumentClient()
        const params = {
            // @ts-ignore
            TableName: Resource.projects.name ?? '',
        }
        const result = await dynamoDb.scan(params).promise()

        return result.Items as Project[]
    } catch (err: any) {
        throw new Error('There was an error getting projects: ' + err)
    }
}