import redis from "redis";
import url from "url";

var redisURL = url.parse(process.env.REDIS_URL);

const redisClient = redis.createClient(redisURL.port, redisURL.hostname);

redisClient.on("connect", () => {
  console.log("redis client connected");
});

redisClient.on("error", (err) => {
  console.log("Error " + err);
});

export default redisClient;
