import Benchmark from 'benchmark'
import middy from '../../core/index.js'
import middleware from '../index.js'
import { transpileSchema } from '../transpile.js'

const suite = new Benchmark.Suite('@middy/validator')

const context = {
  getRemainingTimeInMillis: () => 30000
}
const setupHandler = () => {
  const baseHandler = () => {}
  return middy(baseHandler).use(
    middleware({
      eventSchema: transpileSchema({ type: 'object' }),
      responseSchema: transpileSchema({ type: 'object' })
    })
  )
}

const warmHandler = setupHandler()

suite
  .add('type check input & output', async (event = {}) => {
    try {
      await warmHandler(event, context)
    } catch (e) {}
  })
  .on('cycle', (event) => {
    console.log(suite.name, String(event.target))
  })
  .run({ async: true })
