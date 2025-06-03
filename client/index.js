import express from "express";
import path from "path";


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


app.listen(3001, () => {
    console.log(__dirname)  
    console.log("Server is running on http://localhost:3001");
});
