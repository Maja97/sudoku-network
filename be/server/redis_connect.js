import redis from "redis";
import { URL } from "url";

const fullUrl = new URL(process.env.REDIS_URL);
const redisURL = fullUrl.pathname.substr(1);
//var redisURL = url.parse(process.env.REDIS_URL);
const redisClient = redis.createClient(redisURL.port, redisURL.hostname);
redisClient.auth(redisURL.auth.split(":")[1]);

redisClient.on("connect", () => {
  console.log("redis client connected");
});

redisClient.on("error", (err) => {
  console.log("Error " + err);
});

export default redisClient;
