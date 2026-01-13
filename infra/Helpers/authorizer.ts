import { client } from '../../server/core/src/auth/client'
import { subjects } from '../../server/core/src/auth/subjects'

const parseCookies = (cookieHeader: string | undefined): Record<string, string> => {
  if (!cookieHeader) return {}
  
  return cookieHeader.split(';').reduce((cookies, cookie) => {
    const [name, ...rest] = cookie.trim().split('=')
    if (name && rest.length > 0) {
      cookies[name] = rest.join('=')
    }
    return cookies
  }, {} as Record<string, string>)
}

export const handler = async (event: any) => {
  const cookieHeader = event.headers?.cookie || 
                       event.headers?.Cookie ||
                       event.headers?.COOKIE
  
  if (!cookieHeader) {
    console.error('No cookie header provided')
    throw new Error('Unauthorized')
  }
  
  const cookies = parseCookies(cookieHeader)
  const token = cookies['access_token'] || cookies['accessToken']
  
  if (!token) {
    console.error('No access token found in cookies')
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