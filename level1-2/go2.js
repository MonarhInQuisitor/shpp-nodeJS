// этот файл надо будет дописать...

// не обращайте на эту функцию внимания 
// она нужна для того чтобы правильно читать входные данные
function readHttpLikeInput() {
    var fs = require("fs");
    var res = "";
    var buffer = Buffer.alloc ? Buffer.alloc(1) : new Buffer(1);
    let was10 = 0;
    for (; ;) {
        try { fs.readSync(0 /*stdin fd*/, buffer, 0, 1); } catch (e) { break; /* windows */ }
        if (buffer[0] === 10 || buffer[0] === 13) {
            if (was10 > 10)
                break;
            was10++;
        } else
            was10 = 0;
        res += new String(buffer);
    }

    return res;
}

let contents = readHttpLikeInput();

// вот эту функцию собственно надо написать
function parseTcpStringAsHttpRequest(string) {
    return {
        method: string.match(/^\w+/).shift().trim(),
        uri: string.match(/\/[^\s]+/).shift().trim(),
        headers: string.match(/[\w-]+: .+/g) ? string.match(/[\w-]+: .+/g).reduce((target, item) => {
            target[item.match(/^[\w-]+/)] = item.match(/[\w-.S/*, ]+$/).shift().trim()
            return target;
        }, {}) : null,
        body: string.match(/.+&.+$/gm) ? string.match(/.+&.+$/gm).shift() : null,
    };
}

function outputHttpResponse(statusCode, statusMessage, headers, body) {
    const line = `HTTP/1.1 ${statusCode} ${statusMessage}
${Object.keys(headers).reduce((target, item) =>
        target += `${item} : ${headers[item]}\n`
        , "")}

${body}`;

    console.log(line);
}
//1.2.3
//function processHttpRequest(method, uri, headers, body) { 
//       let statusCode ,statusMessage;
//    if (method === "GET" && /^\/sum\?nums=(\d,)*/.test(uri)) {
//        statusCode = 200;
//        statusMessage="OK";
//        body = uri.match(/\d/g).reduce((target, item) =>
//      +target + (+item));
//    } else if(!/^\/sum.*/.test(uri)){ 
//        statusCode = 405;
//        statusMessage="Not Found";
//        body= "Not Found";
//    } else if(method!=="GET" || !/^\/sum\/num*/.test(uri)){
//        statusCode = 400;
//        statusMessage="Bad Request";
//       body= "Bad Request";
//    }
//    headers = {
//        "Date": new Date(),
//        "Server": "Apache/2.2.14 (Win32)",
//        Connection: "Closed",
//        "Content-Type": "text/html; charset=utf-8",
//        "Content-Length": body.toString().length,
//    };
//    outputHttpResponse(statusCode, statusMessage, headers, body);
//}

//1.2.4
function processHttpRequest($method, $uri, $headers, $body) {

    let statusCode, statusMessage, user = {}, body, text;

    [user.login, user.password] = $body.split("&").map((line) => {
        return line.match(/(?<==).*/).shift();
    });

    const regex = new RegExp(`${user.login}:${user.password}`);

    try {
        text = require("fs").readFileSync("passwords.txt").toString().split("\r\n");
        statusCode = 200;
        statusMessage = "OK";
    } catch (error) {
        console.log(error.message);
        statusCode = 500;
        statusMessage = "Internal Server Error";
    }

    if ($uri !== "/api/checkLoginAndPassword") {
        statusCode = 404;
        statusMessage = "Not Found";
    } else if ($headers["Content-Type"] !== "application/x-www-form-urlencoded") {
        statusCode = 400;
        statusMessage = "Bad Request";
    } else if (!regex.test(text)) {
        statusCode = 400;
        statusMessage = "Not Found the User";
    }
    body = regex.test(text) ? `<h1 style="color:green">FOUND</h1>` : "Not Found the User"


    let headers = {
        Server: "Apache/2.2.14 (Win32)",
        "Content-Length": body.length,
        Connection: "Closed",
        "Content-Type": "text/html; charset=utf-8",
    };

    outputHttpResponse(statusCode, statusMessage, headers, body);
}

http = parseTcpStringAsHttpRequest(contents);
//console.log(JSON.stringify(http, undefined, 2));
processHttpRequest(http.method, http.uri, http.headers, http.body);