import { createSubjects } from '@openauthjs/openauth/subject'
import { object, string } from 'valibot'


const subjects = createSubjects({
  user: object({
    email: string()
  })
})

export { subjects }
