// const http = require('http');

// const port=3000;
// const server = http.createServer((req, res) =>{
//     if(req.url == '/home'){
//         res.writeHead(200, {'Content-Type': "text/html"})
//         res.end('<h1> Home Page </h1>')
//     }

//     if(req.url == '/users'){
//         const users = [
//             {
//                 name: 'John Dee',
//                 email: 'John@Dee.com'
//             },
//             {
//                 name: 'aleister Crowley',
//                 email: 'helloMrCrowley@email.com'
//             }
//         ];

//         res.writeHead(200, {"Content-Type": "application/json"});
//         res.end(JSON.stringify(users));
//     }
// })


// server.listen(port, () => console.log(`Rodando na porta ${port}!`))