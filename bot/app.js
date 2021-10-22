const { App } = require('@slack/bolt');
const dotenv = require('dotenv');

const result = dotenv.config();
if (result.error) {
    console.error('Dotenv error: ' + result.error);
}

const authorizer = async ({ teamId }) => {
    for (const team of installations) {
        if (team.teamId === teamId) {
            return {
                botToken: team.botToken,
                botId: team.botId,
                botUserId: team.botUserId,
            };
        }
    }

    console.error('Auth error: no matching authorization');
}

const app = new App({
    authorize: authorizer,
    appToken: process.env.APP_TOKEN,
    signingSecret: process.env.SIGNING_SECRET,
    socketMode: process.env.SOCKET_MODE,
});




(async () => {
    await app.start(process.env.PORT || 3000);

    console.log('Bolt app running!');
})();