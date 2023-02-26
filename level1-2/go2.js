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



http = parseTcpStringAsHttpRequest(contents);
console.log(JSON.stringify(http, undefined, 2));
