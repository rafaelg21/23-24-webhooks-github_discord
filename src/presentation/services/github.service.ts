import { GitHubIssuePayload, GitHubStartPayload } from "../../interfaces";


export class GitHubService {

    constructor() {}

    onStart ( payload: GitHubStartPayload): string {
      
        const { action, sender, repository, starred_at } =  payload;
        //console.log(payload);

        return  `User ${sender.login} ${action} start on ${repository.full_name} `
        
    }

    onIssue ( payload: GitHubIssuePayload):string {
      
        const { action, issue } =  payload;
        
        if(action === 'opened'){
            const message = `An issue was opened with this title ${issue.title}`;
            return message; 
        }

        if(action === 'closed'){
            const message = `An issue was closed with this title ${issue.user.login}`;
            return message; 
        }

        if(action === 'reopened'){
            const message = `An issue was reopened with this title ${issue.user.login}`;
            return message; 
        }

        return  `Unhandled action  for the issue event ${action}`;
        
    }

}