"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const param = "https://api.ipify.org?format=json";
/*
1. Use node-fetch to make an await fetch("https://api.ipify.org?format=json") request,
get the response, and display your ip
*/
fetch(param)
    .then(r => r.json())
    .then(r => console.log(r.ip))
    .catch(err => console.log(err));
/*
2. Write a function based on p.1., which actually returns your ip.
*/
function getId() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield fetch(param)
            .then(r => r.json())
            .then(r => r.ip)
            .catch(err => console.log(err));
    });
}
getId().then(id => console.log(id));
/*
 3. Write a function that returns three names by making three requests in parallel
 to https://random-data-api.com/api/name/random_name*/
const paramName = "https://random-data-api.com/api/name/random_name";
//3.1. use async/await + Promise.all
function resPonse() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield fetch(paramName)
            .then(r => r.json())
            .then(r => r.name)
            .catch(err => console.log(err));
    });
}
function getName() {
    return Promise.all([resPonse(), resPonse(), resPonse()]);
}
getName().then(names => console.log(`Promise.all result ${names}`));
//3.2 use async/await but without Promise.all
function getName1() {
    return __awaiter(this, void 0, void 0, function* () {
        let names = [];
        for (let i = 0; i < 3; i++)
            names.push(yield resPonse());
        return names;
    });
}
getName1().then(names => console.log(`without Promise.all result ${names}`));
//3.3 use pure promises, no async/await, no Promise.all 
function getName2() {
    let names = [];
    return new Promise((resolve, reject) => {
        resolve(names);
        fetch(paramName)
            .then(r => r.json())
            .then(r => names.push(r.name))
            .then(() => fetch(paramName)
            .then(r => r.json())
            .then(r => names.push(r.name))
            .then(() => fetch(paramName)
            .then(r => r.json())
            .then(r => {
            names.push(r.name);
        })))
            .then(() => console.log(`without everythings result ${names}`));
        return names;
    });
}
getName2();
// 4. a function that should get a woman user for the minimum number of requests
const url = "https://random-data-api.com/api/users/random_user";
//4.1
function findWoman() {
    return new Promise((resolve) => resolve(fetch(url)
        .then(res => res.json())
        .then(res => {
        if (res.gender === "Female") {
            return {
                name: res.first_name,
                gender: res.gender
            };
        }
        else {
            console.log(`woman's gender 4.1 ${res.gender}`);
            return findWoman();
        }
    })));
}
findWoman().then(user => console.log(`THe woman's name 4.1 is ${user.name} Her gender is ${user.gender}`));
//4.2
function findWoman1() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield fetch(url)
            .then(res => res.json())
            .then(res => {
            if (res.gender === "Female") {
                return {
                    name: res.first_name,
                    gender: res.gender
                };
            }
            else {
                console.log(`woman's gender 4.2 ${res.gender}`);
                return findWoman1();
            }
        });
    });
}
findWoman1().then(user => console.log(`THe woman's name 4.2 is ${user.name} Her gender is ${user.gender}`));
/*
5. There is a function #1 that accepts a callback that will be called with the parameter == your current ip.
Create an escapeable function #2 that uses function #1
*/
function func1(callback) {
    return __awaiter(this, void 0, void 0, function* () {
        let text = yield fetch(param).then(res => res.json()).then(res => res.ip);
        callback(text);
    });
}
function func2() {
    return __awaiter(this, void 0, void 0, function* () {
        func1(ip => console.log("func2 assignment 5 " + ip));
    });
}
func2();
/*
6.There is a function #1 that can be evaded, which will return the string == your current ip.
Create function #2, which should use function #1 to get your current ip,
and which takes one parameter as input - a callback function that will be called when the ip is received,
with the first parameter equal to this ip.
*/
function func12(param) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield fetch(param).then(res => res.json()).then(res => res.ip);
    });
}
function func22(callback) {
    return __awaiter(this, void 0, void 0, function* () {
        callback(yield func12(param));
    });
}
func22(res => console.log("func22 assignment 6 " + res));
