import { Project } from '@shared-types/index'
import { DynamoDB } from 'aws-sdk'
import { Resource } from 'sst'

export async function updateProject(project: Project): Promise<Project> {
    if (!project.projectId) {
        throw new Error('updateProject requires an existing projectId')
    }

    try {
        const dynamoDb = new DynamoDB.DocumentClient()

        const params = {
            // @ts-ignore
            TableName: Resource.projects.name ?? '',
            Item: project
        }

        await dynamoDb.put(params).promise()

        return project
    } catch (err: any) {
        throw new Error('There was an error updating project: ' + err)
    }
}