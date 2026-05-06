import { Subscriber } from '@shared-types/index'
import { DynamoDB } from 'aws-sdk'
import { Resource } from 'sst'
import { v4 as uuid } from 'uuid'

export async function addSubscriber(email: string): Promise<Subscriber> {
    const normalised = email.trim().toLowerCase()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalised)) {
        throw new Error('Invalid email address')
    }

    try {
        const dynamoDb = new DynamoDB.DocumentClient()

        const subscriber: Subscriber = {
            email: normalised,
            subscribedAt: new Date().toISOString(),
            unsubscribeToken: uuid()
        }

        await dynamoDb.put({
            // @ts-ignore
            TableName: Resource.subscribers.name ?? '',
            Item: subscriber,
            ConditionExpression: 'attribute_not_exists(email)'
        }).promise()

        return subscriber
    } catch (err: any) {
        if (err.code === 'ConditionalCheckFailedException') {
            throw Object.assign(new Error('Already subscribed'), { statusCode: 409 })
        }
        throw new Error('There was an error subscribing: ' + err)
    }
}
