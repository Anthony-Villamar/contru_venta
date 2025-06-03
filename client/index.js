import express from "express";
import path from "path";
import {PuertoFrontend1} from "./config.js";


const app = express();
const __dirname = path.resolve();
app.use(express.json());


app.use(express.static(path.join(__dirname, "public")));


app.get("/",(request, response) => {
    response.sendFile(path.join(__dirname,"public","index.html"));
});

app.get("/login",(request, response) => {
    response.sendFile(path.join(__dirname,"public","login.html"));
});

app.get("/register", (request, response) => {
    response.sendFile(path.join(__dirname, "public", "register.html"));
});

app.get("/venta.html", (request, response) => {
    response.sendFile(path.join(__dirname, "public", "venta.html"));
});

app.get("/admin.html", (request, response) => {
    response.sendFile(path.join(__dirname, "public", "admin.html"));
});

app.get("/mis-compras.html", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "mis-compras.html"));
});


app.listen(PuertoFrontend1, () => {
    console.log(__dirname)  
    console.log("Server is running on http://localhost:"+ PuertoFrontend1);
});
