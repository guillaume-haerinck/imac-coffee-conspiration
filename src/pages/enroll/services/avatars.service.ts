import { Avatar } from "./avatar";

export class AvatarsService {
    async getAvatar(): Promise<Avatar> {
        return new Promise((resolve, reject) => {
            fetch("https://randomuser.me/api/")
                .then((response) => {
                    return response.json();
                })
                .then((json: any) => {
                    resolve(json.results[0]);
                })
                .catch(error => {
                    reject(error);
                })
        });
    }

}