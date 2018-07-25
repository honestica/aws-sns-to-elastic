import express from 'express'
const router = express.Router()
import config from './config'
import elasticsearch from 'elasticsearch'

const esClient = new elasticsearch.Client(config.elasticsearch)

router.post('/:index/:types?', function (req, res, next) {
	let index = req.params.index
	let currentDate = new Date()
	let dailyIndex = index + '-' + currentDate.getFullYear() + '.' + (currentDate.getMonth() + 1) + '.' + currentDate.getDate()
	let environment = req.params.types
	console.log(`running /${index}/${environment}`)
//	Override types for ES 6.3 where an index can only handle a single type value
//	Leaving the ability to specify a type in the route in order to allow for mapping it in the future into another field.
//	if (!types) {
//		types = 'default'
//	}
	let types = 'default'
	let body = req.body
	if (body.Message) {
		let raw = body.Message
		try {
			body.Message = JSON.parse(raw)
		} catch(e) {
			body.Message = {}
			body.rawMessage = raw
		}
	}
	// console.log("pushing to elastic", body)
	esCreate(dailyIndex, types, body)
		.then((result) => {
			res.send(result)
		}).catch(e => {
			console.log("Error = ", e)
			next(e)
		})
})

function esCreate(index, types, body) {
	return esClient.index({
			index: index,
			type: types,
			body: body
		})
}

export default router
