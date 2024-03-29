import express from "express";
import path from 'path';
import http from "http";
import { Server } from "socket.io";

const __dirname = path.resolve();
const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + "/src/views");
app.use("/public", express.static(__dirname + "/src/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const httpServer = http.createServer(app);
const wsServer = new Server(httpServer);

wsServer.on('connection', (socket) => {
    
    socket.on('enter_room', (msg, done) => {
        console.log(msg)
        setTimeout(() => {
            done();
        }, 10000)
    });
})


function onSocketClose() {
    console.log('Disconnection from the Brower');
}

// const sockets = [];

// wss.on("connection", (socket) => {
//     sockets.push(socket);
//     socket["nickname"] = "ANON"
//     console.log('Connected to Brower');
//     socket.on("close", onSocketClose);
//     socket.on("message", (msg) =>  {
//         const message = JSON.parse(msg);
//         switch(message.type){
//             case "new_message": 
//                 sockets.forEach(aSocket => aSocket.send(`${socket.nickname}: ${message.payload}`));
//                 break;
//             case "nickname":
//                 socket["nickname"] = message.payload;
                
                
//         }
        
//     }); 
// });

httpServer.listen(3000, handleListen);



