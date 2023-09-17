import middy from '@middy/core'
import type { FromSchema } from 'json-schema-to-ts'

interface Options {
  eventSchema?: Function | any
  contextSchema?: Function | any
  responseSchema?: Function | any
  defaultLanguage?: string
  languages?: object | any
}

declare function validator (options?: Options): middy.MiddlewareObj

export default validator
