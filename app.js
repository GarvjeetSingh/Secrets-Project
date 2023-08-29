//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
var isUserAuthorized = false;

function passwordCheck(req,res,next) {
    const password = req.body["password"];
    if (password === "ILoveProgramming"){
        isUserAuthorized= true;
    }
    
    next();
    
};

app.use(passwordCheck);

app.get("/", (req,res) =>{
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req,res) =>{
    if(isUserAuthorized){
        res.sendFile(__dirname + "/public/secret.html")
    }
    else{
        res.sendFile(__dirname + "/public/index.html")
    }
});

app.listen("3000", (req,res) =>{
    console.log("Server started on port 3000");
});
