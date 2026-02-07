const Redis = require("ioredis");
const redis = new Redis(
  process.env.REDIS_PORT || 6379,
  process.env.REDIS_HOST || "127.0.0.1"
);

export default redis;
