import { Subscriber } from '@shared-types/index'
import { DynamoDB } from 'aws-sdk'
import { Resource } from 'sst'

export async function getAllSubscribers(): Promise<Subscriber[]> {
    try {
        const dynamoDb = new DynamoDB.DocumentClient()
        const result = await dynamoDb.scan({
            // @ts-ignore
            TableName: Resource.subscribers.name ?? ''
        }).promise()

        return (result.Items ?? []) as Subscriber[]
    } catch (err: any) {
        throw new Error('There was an error fetching subscribers: ' + err)
    }
}
