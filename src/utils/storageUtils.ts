const PSS_APP_ACCOUNT:string = 'PSS-APP-ACCOUNT';
const PSS_APP_TOKEN:string = 'PSS-APP-TOKEN';

export class StorageUtils {

    static getItem(itemName:string):any {
        return JSON.parse(localStorage.getItem(itemName));
    }
    static hasToken():boolean {
        return !!this.getItem(PSS_APP_TOKEN);
}
    static getToken():string {
        if(this.hasToken()) {
            return this.getItem(PSS_APP_TOKEN);
        }
    }
    static setToken(token:string):void {
        localStorage.setItem(PSS_APP_TOKEN,JSON.stringify(token));
    }
    static removeToken():void {
        localStorage.removeItem(PSS_APP_TOKEN);
    }
    static hasAccount():boolean {
        return !!this.getItem(PSS_APP_ACCOUNT);
    }
    static getAccount():any {
        if(this.hasAccount()) {
            return this.getItem(PSS_APP_ACCOUNT);
        }
    }
    static setAccount(account:any):void {
        localStorage.setItem(PSS_APP_ACCOUNT,JSON.stringify(account));
    }
    static removeAccount():void {
        localStorage.removeItem(PSS_APP_ACCOUNT);
    }
}