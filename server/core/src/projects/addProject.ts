import { Project } from '@shared-types/index'
import { DynamoDB } from 'aws-sdk'
import { Resource } from 'sst'
import { uuid } from 'uuidv4'

export async function addProject(project: Project): Promise<Project> {
    try {
        const projectId = uuid()
        const dynamoDb = new DynamoDB.DocumentClient()
        
        const projectWithId = {
            ...project,
            projectId
        }
        
        const params = {
            // @ts-ignore
            TableName: Resource.projects.name ?? '',
            Item: projectWithId
        }
        
        await dynamoDb.put(params).promise()
        
        return projectWithId
    } catch (err: any) {
        throw new Error('There was an error adding project: ' + err)
    }
}