import { envs } from "../../config";



export class DiscordService {

    private readonly discordWebhookUrl = envs.DISCORD_WEBHOOK_URL;

    constructor() {}

    async notify(message: string)  {

        const body = {
            content: message,
            //* Para enviar images a DISCORD
            // embeds: [
            //     {
            //         image: { url:'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExem00bXRha3YwN2UwNjBsdWhhYWo2bnh6aHBrZXpyemM5OGtwMmw1dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/du3J3cXyzhj75IOgvA/giphy.webp' }
            //     }
            // ]
        }

        const resp =  await fetch( this.discordWebhookUrl, {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(body),
        });

        if(!resp.ok) {
            console.log('error sendiung message to discord');
            return false;
        }

        return true;



    }



}