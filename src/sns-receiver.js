import express from 'express'
const router = express.Router()
import config from './config'
import elasticsearch from 'elasticsearch'

const esClient = new elasticsearch.Client(config.elasticsearch)

router.post('/:index/:types?', function (req, res, next) {
  const index = req.params.index
  const currentDate = new Date()
  const day = ('0' + currentDate.getDate()).slice(-2)
  const month = ('0' + (currentDate.getMonth() + 1)).slice(-2)
  const year = currentDate.getFullYear()
  const dailyIndex = `${index}-${year}.${month}.${day}`
  //  Override types for ES 6.3 where an index can only handle a single type value
  //  Leaving the ability to specify a type in the route in order to allow for mapping it in the future into another field.
  //  if (!types) {
  //    types = 'default'
  //  }
  const types = 'default'
  const body = req.body
  console.log(`Received message on /${index} from ARN ${body.TopicArn}`)
  if (body.Message) {
    const raw = body.Message
    try {
      body.Message = JSON.parse(raw)
    } catch(e) {
      console.log(`Failed parsing json: ${e}, falling back to raw`)
      body.Message = {}
      body.rawMessage = raw
    }
  }
  // console.log("pushing to elastic", body)
  esCreate(dailyIndex, types, body)
    .then((result) => {
      res.send(result)
    }).catch(e => {
      console.log(`Error from ES: ${e}`)
      next(e)
    })
})

function esCreate(index, types, body) {
  return esClient.index({
    index: index,
    type: types,
    body: body,
    id: body.MessageId
  })
}

export default router
