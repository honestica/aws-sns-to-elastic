import express from 'express'
const router = express.Router()
import config from './config'
import elasticsearch from 'elasticsearch'

const esClient = new elasticsearch.Client(config.elasticsearch)

router.post('/:index/:types?', function (req, res, next) {
	let index = req.params.index
	let types = req.params.types
	if (!types) {
		types = 'default'
	}
	let body = req.body
	if (body.Message) {
		body.Message = JSON.parse(body.Message)
	}
	esCreate(index, types, body)
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