import fetch from 'node-fetch';
import bolt from '@slack/bolt';
const { App } = bolt;
import dotenv from 'dotenv';

const result = dotenv.config();
if (result.error) {
    console.error('Dotenv error: ' + result.error);
}

let installations = await fetchBackend('/api/bot/workspaces');
let rules = await fetchBackend('/api/bot/rules');

const authorizer = async ({ teamId }) => {
    for (const team of installations) {
        if (team.team_id === teamId) {
            return {
                botToken: team.access_token,
                botId: team.bot_id,
                botUserId: team.bot_user_id,
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

app.message(/.*/, async ({ message, say }) => {
    let team_id;

    for (const installation of installations) {
        if (message.team == installation.team_id) {
            team_id = installation.workspace_id;
        }
    }

    for (const rule of rules) {
        if (rule.workspace_id == team_id && rule.listen.type == "message") {
            if (message.text == rule.listen.content) {
                await say(rule.response.content);
            }
        }
    }
});

(async () => {
    await app.start(process.env.PORT || 3000);

    console.log('Bolt app running!');
})();

async function fetchBackend(path) {
    let response;
    await fetch( process.env.BACKEND_URL + path, {headers: {"api-key": process.env.BACKEND_API_KEY, "accept":"application/json"}})
        .then(response => response.json())
        .then(data => { response = data });
    return response;
}