import { DynamoDB } from 'aws-sdk'
import { Resource } from 'sst'

export async function removeSubscriberByToken(token: string): Promise<boolean> {
    try {
        const dynamoDb = new DynamoDB.DocumentClient()

        const found = await dynamoDb.query({
            // @ts-ignore
            TableName: Resource.subscribers.name ?? '',
            IndexName: 'ByUnsubscribeToken',
            KeyConditionExpression: 'unsubscribeToken = :token',
            ExpressionAttributeValues: { ':token': token },
            Limit: 1
        }).promise()

        const item = found.Items?.[0]
        if (!item) return false

        await dynamoDb.delete({
            // @ts-ignore
            TableName: Resource.subscribers.name ?? '',
            Key: { email: item.email }
        }).promise()

        return true
    } catch (err: any) {
        throw new Error('There was an error unsubscribing: ' + err)
    }
}
