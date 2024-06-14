import express from 'express';
import { envs } from './config/envs';
import { GithubController } from './presentation/github/controller';
import { GithubSha256Middleware } from './presentation/middleware/github-sha256.middleware';




(()=>{
   main();
})();

function main(){

    const app = express();

    app.use(GithubSha256Middleware.verifySignature)

    const controller =  new GithubController(); 

    //* application/json will deliver the JSON payload directly as the body of the POST request.
    //* application/x-www-form-urlencoded will send the JSON payload as a form parameter called payload.
    //? Para este ejercicio se uso application/json ya q es mas facil de implementar y 
    //? lo permite el webhooks de github
    app.use(express.json()); //Serializar el bosy en formato json mi application/json de github

    app.post('/api/github', controller.webhookHandler);

    app.listen(envs.PORT, ()=>{
        console.log(`Server is running on port ${envs.PORT}`); 
    });
}