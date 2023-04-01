"use strict";
// 1. 
function getFirstWord(a) {
    return a.split(/ +/)[0].length;
}
// 2. 
function getUserNamings(a) {
    return {
        fullname: a.name + " " + a.surname,
        initials: a.name[0] + "." + a.surname[0]
    };
}
// 3. 
// <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining>
function getAllProductNames(a) {
    var _a;
    return ((_a = a === null || a === void 0 ? void 0 : a.products) === null || _a === void 0 ? void 0 : _a.map(prod => prod === null || prod === void 0 ? void 0 : prod.name)) || [];
}
// 4.1
// easy way is using 'as' keyword
// hard way is ?...
function heyPerson(a) {
    return "hey! i'm " + a.name();
}
heyPerson({ name: () => "roma", cuteness: 100 });
heyPerson({ name: () => "vasya", coolness: 100 });
// 4.2
class Pet {
    constructor(name) {
        this.petName = name;
    }
    name() {
        return this.petName;
    }
}
class Dog extends Pet {
    constructor(name, age) {
        super(name);
        this.dogAge = age;
    }
}
class Cat extends Pet {
    constructor(name, speak) {
        super(name);
        this.catSpeak = speak;
    }
}
function heyAnimal(abstractPet) {
    return "hey! i'm " + abstractPet.name();
}
let a = new Cat("myavchik", true);
let b = new Dog("gavchik", 333);
heyAnimal(a);
heyAnimal(b);
function hey(a) {
    console.log("hey! i'm " + a.name()
        + (a.type === "cat" ? ("cuteness: " + a.cuteness) : ("coolness: " + a.coolness)));
}
hey({ name: () => "roma", type: "cat", cuteness: 100 });
hey({ name: () => "vasya", type: "dog", coolness: 100 });
