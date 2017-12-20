const redis = require('redis')

Promise.promisifyAll(redis.RedisClient.prototype)
Promise.promisifyAll(redis.Multi.prototype)

exports.redisClient = () => {
  let redisClient = redis.createClient(process.env.REDIS_URI)

  const redisPassword = process.env.REDIS_PASSWORD

  if (redisPassword) {
    redisClient = redisClient.auth(redisPassword)
  }

  return redisClient
}
