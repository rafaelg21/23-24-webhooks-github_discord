import { Webhooks } from "@octokit/webhooks";
import { envs } from "../../config";
import { NextFunction, Request, Response } from "express";

const webhooks = new Webhooks({
  secret: envs.SECRET_TOKEN
});

export class GithubSha256Middleware {


    static verifySignature = async( req: Request, res: Response, next: NextFunction ) => {
        
      const xHubSignature = req.header("x-hub-signature-256") ?? '';  
      const signature = xHubSignature;
        
        console.log(signature);

        const body = await req.text(); 
        
      
        if (!(await webhooks.verify(body, signature))) {
            res.status(401).send("Unauthorized");
            return;
         }
  
      next();
    }
  
  
  }