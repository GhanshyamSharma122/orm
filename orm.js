import pool from "./config/db.js";
import dotenv from "dotenv"
import { OpenAI } from "openai";
dotenv.config()
import createTables from "./data/createTables.js";
createTables()

const client = new OpenAI({
    apiKey: process.env.AZURE_OPENAI_API_KEY,
    baseURL: `${process.env.AZURE_OPENAI_ENDPOINT}openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT_NAME}`,
    defaultQuery: { "api-version": process.env.AZURE_OPENAI_API_VERSION },
    defaultHeaders: {
        "api-key": process.env.AZURE_OPENAI_API_KEY,
    }
});

async function naturalLangToSql(schema,prompt) {
    try {
        const response = await client.chat.completions.create({
            model: process.env.AZURE_OPENAI_DEPLOYMENT_NAME,
            messages: [
                {
                    role:'system',
                    content:'you are an expert sql query writer and you will be provided with the schema of the table and the request of the user for the sql query your job is to provide only the sql query that needs to be executed not other than this'
                },
                {
                    role: "system",
                    content: `sql create table schema:${schema}`
                },{
                    role:'user',
                    content:`i want to know the ${prompt} give sql query for this`
                }
            ],
        });

        return response.choices[0].message.content.replace('```sql','').replace('```','');
    } catch (error) {
        console.error("Error calling Azure OpenAI:", error.message);
        if (error.response) {
            console.error("Response status:", error.response.status);
            console.error("Response data:", error.response.data);
        }
    }
}

import fs from "fs"
const schema= fs.readFileSync('./data/schemas.sql').toString()
async function executeQuery(userquery){
    const query=await naturalLangToSql(schema,userquery);
    const result=(await pool.query(query)).rows
    if(typeof(result)=="object" && result.length===0){
        return 'your query executed sucessfully'
    }
    else{
        return result
    }
}
export default executeQuery;
