const http = require('http');

const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('X-Powered-By', 'NodeJS');
    // response.statusCode = 200;

    const { method, url } = request;

    // if(method === 'GET') {
    //    response.end('<h1>Hello!</h1>');
    // }
    
    if(url === '/') {
        if(method === 'GET') {
            response.statusCode = 200;
            response.end(JSON.stringify({
                message: 'Ini adalah homepage',
            }));
            // response.end('<h1>Ini adalah homepage</h1>');
            // respon jika client menggunakan metode GET
        } else {
            response.statusCode = 400;
            response.end(JSON.stringify({
                message: `Halaman tidak dapat diakses dengan ${method} request`,
            }));
            // response.end(`<h1>Halaman tidak dapat diakses dengan ${method} request</h1>`);
            // respon jika client tidak menggunakan metode GET
        }
        // TODO 2: logika respons bila url bernilai '/'
    } else if(url === '/about') {
        if(method === 'GET') {
            response.statusCode = 200;
            response.end(JSON.stringify({
                message: 'Halo! Ini adalah halaman about',
            }));
            // response.end('<h1>Halo! Ini adalah halaman about</h1>')
            // respons bila client menggunakan GET
        } else if(method === 'POST') {
            let body = [];
        request.on('data', (chunk) => {
        body.push(chunk);
        });

        request.on('end', () => {
        body = Buffer.concat(body).toString();
        const {name} = JSON.parse(body);
        response.statusCode = 200;
        response.end(JSON.stringify({
            message: `Halo, ${name}! Ini adalah halaman about`,
        }));
        // response.end(`<h1>Halo, ${name}! Ini adalah halaman about</h1>`);
        });
            // respons bila client menggunakan POST

    } else {
        response.statusCode = 400;
        response.end(JSON.stringify({
            message: `Halaman tidak dapat diakses menggunakan ${method}, request`
        }));
        // TODO 1: logika respons bila url bukan '/' atau '/about'
        // response.end(`<h1>Halaman tidak dapat diakses menggunakan ${method} request</h1>`);
        }
    
    } else {
        response.statusCode = 404;
    // response.end('<h1>Halaman tidak ditemukan!</h1>');
        response.end(JSON.stringify({
            message: 'Halaman tidak ditemukan!',
    }));
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