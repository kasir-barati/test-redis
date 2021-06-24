// @ts-check
const redis = require('redis');

let messageCount = 0;
/**@type {import('redis').ClientOpts} */
const redisConfig = {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    // password: process.env.REDIS_PASSWORD,
};
const publisher = redis.createClient(redisConfig);
const subscriber = redis.createClient(redisConfig);

subscriber.on('connect', function () {
    console.log('Connected');
});
publisher.on('connect', function () {
    console.log('Connected');
});
subscriber.on('error', console.error);
publisher.on('error', console.error);

setTimeout(function () {
    publisher.publish(
        'ticketing-needs-info',
        'lead, contractor or admin id',
    );
}, 10000);

subscriber.on('message', function (channel, message) {
    messageCount += 1;

    console.log(
        "Subscriber received message in channel '" +
            channel +
            "': " +
            message,
    );

    if (messageCount === 2) {
        subscriber.unsubscribe();
        subscriber.publish('ticketing-unsubscribed', 'bye');
        subscriber.quit();
    }
});

subscriber.subscribe('user-info');

module.exports = { subscriber, publisher };
