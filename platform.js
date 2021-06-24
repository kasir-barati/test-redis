// @ts-check
const redis = require('redis');

/**@type {import('redis').ClientOpts} */
const redisConfig = {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    // password: process.env.REDIS_PASSWORD,
};
const subscriber = redis.createClient(redisConfig);
const publisher = redis.createClient(redisConfig);

subscriber.on('connect', function () {
    console.log('Connected');
});
publisher.on('connect', function () {
    console.log('Connected');
});
subscriber.on('error', console.error);
publisher.on('error', console.error);

subscriber.on('message', function (channel, message) {
    publisher.publish(
        'user-info',
        JSON.stringify({
            username: `user name ${message}`,
        }),
    );
    console.log(
        "Publisher received message in channel '" +
            channel +
            "': " +
            message,
    );
});

subscriber.subscribe('ticketing-needs-info');

module.exports = { subscriber, publisher };
