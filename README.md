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
Build by Circle, more details [here](.circleci/config.yml).

# Helm Chart 
There is a helm chart to launch this on the k8s cluster : https://github.com/honestica/k8s/tree/master/dev/ops/charts/aws-sns-elastic

# Local development

```
docker-compose up
./scripts/test
```
