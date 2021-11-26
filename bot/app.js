import fetch from 'node-fetch';
import bolt from '@slack/bolt';
import dotenv from 'dotenv';
const { App } = bolt;

const result = dotenv.config();
if (result.error) {
    console.error('Dotenv error: ' + result.error);
}

let installations = await fetchBackend('/api/bot/workspaces');
setInterval(async function() {
    installations = await fetchBackend('/api/bot/workspaces');
}, process.env.FETCH_INTERVAL);

let rules = await fetchBackend('/api/bot/rules');
setInterval(async function() {
    rules = await fetchBackend('/api/bot/rules');
}, process.env.FETCH_INTERVAL);

const authorizer = async ({ teamId }) => {
    for (const team of installations) {
        if (team.team_id === teamId) {
            return {
                botToken: team.access_token,
                botId: team.bot_id,
                botUserId: team.bot_user_id
            };
        }
    }

    console.error('Auth error: no matching authorization');
};

const app = new App({
    authorize: authorizer,
    appToken: process.env.APP_TOKEN,
    signingSecret: process.env.SIGNING_SECRET,
    socketMode: process.env.SOCKET_MODE
});

app.event(/.*/, async ({ event, client }) => {
    if (typeof (rules) !== 'object' || rules === null) {
        console.error('Rule error: type of rules is ' + typeof (rules));
        return false;
    }

    let teamId;
    let selfId;

    for (const installation of installations) {
        if (event.team == installation.team_id) {
            teamId = installation.workspace_id;
            selfId = installation.bot_user_id;
        }
    }

    if (event.user_id != selfId) {
        for (const rule of rules) {
            if (rule.workspace_id == teamId) {

                if (rule.listen.type == 'message') {
                    if (rule.listen.content == event.text && !event.subtype) {
                        sendMessage(event,
                            client,
                            rule.response.content,
                            rule.response.notification_text);
                    }
                }

                else if (rule.listen.type == 'event') {
                    if (rule.listen.content == event.type) {
                        sendMessage(event,
                            client,
                            rule.response.content,
                            rule.response.notification_text);
                    }
                }
            }
        }
    }
});

app.action(/.*/, async ({ action, ack, say }) => {
    await ack();

    console.log(action);

    if (typeof (rules) !== 'object' || rules === null) {
        console.error('Rule error: type of rules is ' + typeof (rules));
        return false;
    }

    for (const rule of rules) {
        if (rule.listen.content == action.action_id) {
            await say({
                blocks: [
                    JSON.parse(rule.response.content)
                ],
                text: rule.response.notification_text
            });
        }
    }
});


(async () => {
    await app.start(process.env.PORT || 3000);

    console.log('Bolt app running!');
})();


async function fetchBackend(path) {
    const response = await fetch(process.env.BACKEND_URL + path, {
        headers: {
            'api-key': process.env.BACKEND_API_KEY,
            accept: 'application/json'
        }
    });

    return await response.json();
}

async function sendMessage(event, client, content, notificationText) {
    await client.chat.postMessage({
        channel: event.channel,
        blocks: [
            JSON.parse(content)
        ],
        text: notificationText
    });
}
