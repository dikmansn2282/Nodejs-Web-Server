const http = require('http');

const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'text/html');
    response.statusCode = 200;

    const { method, url } = request;

    // if(method === 'GET') {
    //    response.end('<h1>Hello!</h1>');
    // }
    
    if(url === '/') {
        if(method === 'GET') {
            response.end('<h1>Ini adalah homepage</h1>');
            //respon jika client menggunakan metode GET
        } else {
            response.end(`<h1>Halaman tidak dapat diakses dengan ${method} request</h1>`);
            //respon jika client tidak menggunakan metode GET
        }
        // TODO 2: logika respons bila url bernilai '/'
    } else if(url === '/about') {
        if(method === 'GET') {
            response.end('<h1>Halo! Ini adalah halaman about</h1>')
            // respons bila client menggunakan GET
        } else if(method === 'POST') {
            let body = [];
        request.on('data', (chunk) => {
        body.push(chunk);
        });
        
        request.on('end', () => {
        body = Buffer.concat(body).toString();
        const {name} = JSON.parse(body);
        response.end(`<h1>Halo, ${name}! Ini adalah halaman about</h1>`);
        });
            // respons bila client menggunakan POST

    } else {
        // TODO 1: logika respons bila url bukan '/' atau '/about'
        response.end(`<h1>Halaman tidak dapat diakses menggunakan ${method} request</h1>`);
        }
    }

    // if(method === 'POST') {
    //    let body = [];
    //    request.on('data', (chunk) => {
    //        body.push(chunk);
    //    });
    //    request.on('end', () => {
    //       body = Buffer.concat(body).toString();
    //        const { name } = JSON.parse(body);
    //        response.end(`<h1>Hai, ${name}!</h1>`);
    //    });
    // }
};
const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';

server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
});