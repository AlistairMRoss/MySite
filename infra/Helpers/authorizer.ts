import { createClient, VerifyResult } from '@openauthjs/openauth/client'
import { createSubjects } from '@openauthjs/openauth/subject'
import { object, string } from 'valibot'

const client = createClient({
  clientID: 'alistairmikeross-web',
  issuer: 'https://auth.alistairmikeross.com'
})

const subjects = createSubjects({
  user: object({ email: string() })
})

export const handler = async (event: any) => {
  console.log('Attempting to authorize')
  
  const token = event.headers?.authorization?.replace('Bearer ', '') || 
                event.authorizationToken?.replace('Bearer ', '')
  
  if (!token) {
    console.error('No token provided')
    throw new Error('Unauthorized') 
  }
  
  try {
    const verified = await client.verify(subjects, token)
    console.log('Verified:', verified)
    
    const policy = {
        // @ts-ignore
      principalId: verified.subject.properties.email || 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: event.methodArn || '*'
          }
        ]
      },
      context: {
        // @ts-ignore
        userId: verified.subject.properties.email || 'unknown',
        // @ts-ignore
        userType: verified.subject.type || 'user'
      }
    }
    
    console.log('Returning policy:', JSON.stringify(policy, null, 2))
    return policy
  } catch (err: any) {
    console.log('Error validating token:', err)
    throw new Error('Forbidden')
  }
}