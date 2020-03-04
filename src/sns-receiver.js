import express from 'express'
const router = express.Router()
import config from './config'
const { Client } = require('@elastic/elasticsearch')

const esClient = new Client(config.elasticsearch)

router.post('/:index/:types?', function (req, res, next) {
  const index = req.params.index
  const currentDate = new Date()
  const day = ('0' + currentDate.getDate()).slice(-2)
  const month = ('0' + (currentDate.getMonth() + 1)).slice(-2)
  const year = currentDate.getFullYear()
  const dailyIndex = `${index}-${year}.${month}.${day}`
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
  esCreate(dailyIndex, body)
    .then((result) => {
      res.send(result)
    }).catch(e => {
      console.log(`Error from ES: ${e}`)
      next(e)
    })
})

function esCreate(index, body) {
  return esClient.index({
    index: index,
    body: body,
    id: body.MessageId
  })
}

export default router
