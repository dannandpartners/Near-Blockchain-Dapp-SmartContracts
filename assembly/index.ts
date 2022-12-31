import { context, storage } from "near-sdk-as";

 export class Greeting{

    getGreeting(accountid: string): string | null{
    
        return storage.get<string>(accountid,
            "Greetng not Available");
    }

    setGreeting(greeting:string): void {
        storage.set(context.sender, greeting);
    }
}