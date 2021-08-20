import redis from "redis";
import url from "url";

//production
//var redisURL = url.parse(process.env.REDIS_URL);
//const redisClient = redis.createClient(redisURL.port, redisURL.hostname);

const redisClient = redis.createClient(
  process.env.REDIS_PORT,
  process.env.REDIS_HOST
);

//production
//redisClient.auth(redisURL.auth.split(":")[1]);

redisClient.on("connect", () => {
  console.log("redis client connected");
});

redisClient.on("error", (err) => {
  console.log("Error " + err);
});

export default redisClient;
