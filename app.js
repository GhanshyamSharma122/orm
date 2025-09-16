import prompt from "prompt-sync";
const input = prompt();
import executeQuery from "./orm.js";
while(true){
    console.log('type your query or type exit to terminate the current session')
    const userquery=input('>>')
    if (userquery=="exit"){
        process.exit(0)
    }
    const output=await executeQuery(userquery)
    console.log(output)
}