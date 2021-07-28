import redis from "redis";

const redisClient = redis.createClient(
  process.env.REDIS_PORT,
  process.env.REDIS_HOST
);

redisClient.on("connect", () => {
  console.log("redis client connected");
});

redisClient.on("error", (err) => {
  console.log("Error " + err);
});

export default redisClient;
