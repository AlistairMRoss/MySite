import { client } from '../../server/core/src/auth/client'
import { subjects } from '../../server/core/src/auth/subjects'

export const handler = async (event: any) => {
  const authHeader: string | undefined =
    event.headers?.authorization || event.headers?.Authorization

  if (!authHeader || !authHeader.toLowerCase().startsWith('bearer ')) {
    console.error('Missing or malformed Authorization header')
    throw new Error('Unauthorized')
  }

  const token = authHeader.slice('bearer '.length).trim()

  if (!token) {
    console.error('No access token found in Authorization header')
    throw new Error('Unauthorized')
  }
  
  try {
    const verified = await client.verify(subjects, token)
    console.log('Verified User:', verified)
    
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
    
    return policy
  } catch (err: any) {
    console.error('Error validating token:', err.message)
    throw new Error('Unauthorized')
  }
}