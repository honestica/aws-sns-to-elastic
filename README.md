# aws-sns-to-elastic
Simple endpoint that parse Amazon SNS data to elasticsearch

This module main purpose is to be a translator for Amazon SNS and Elasticsearch.
It simply provide a http endpoint for SNS to push to and connect your Elasticsearch server on the other end. It parse string data from SNS to JSON object and push to Elasticsearch.

Configuration (Via ENV)

| Env name           | Description                                  | Default value  |
|:-------------------|:---------------------------------------------|:---------------|
| PORT               | The port for the endpoint                    | 3000           |
| ELASTICSEARCH_HOST | The host and port for elasticsearch endpoint | localhost:9200 |

# Docker

this lib will be built to docker
