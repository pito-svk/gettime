const redis = require('redis')

Promise.promisifyAll(redis.RedisClient.prototype)
Promise.promisifyAll(redis.Multi.prototype)

exports.redisClient = () => {
  const redisClient = redis.createClient(process.env.REDIS_URI)
  return redisClient
}
