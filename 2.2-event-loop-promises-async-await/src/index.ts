const param: string = "https://api.ipify.org?format=json"
/* 
1. Use node-fetch to make an await fetch("https://api.ipify.org?format=json") request, 
get the response, and display your ip
*/
fetch(param)
  .then(r => r.json())
  .then(r => console.log(r.ip))
  .catch(err => console.log(err))

/* 
2. Write a function based on p.1., which actually returns your ip.
*/
async function getId(): Promise<string> {
  return await fetch(param)
    .then(r => r.json())
    .then(r => r.ip)
    .catch(err => console.log(err))
}
getId().then(id => console.log(id))

/*
 3. Write a function that returns three names by making three requests in parallel
 to https://random-data-api.com/api/name/random_name*/
const paramName: string = "https://random-data-api.com/api/name/random_name";
//3.1. use async/await + Promise.all
async function resPonse(): Promise<string> {
  return await fetch(paramName)
    .then(r => r.json())
    .then(r => r.name)
    .catch(err => console.log(err))
}

function getName(): Promise<string[]> {
  return Promise.all([resPonse(), resPonse(), resPonse()])
}
getName().then(names => console.log(`Promise.all result ${names}`))

//3.2 use async/await but without Promise.all
async function getName1(): Promise<string[]> {
  let names: string[] = [];
  for (let i = 0; i < 3; i++)
    names.push(await resPonse());
  return names
}
getName1().then(names => console.log(`without Promise.all result ${names}`))
//3.3 use pure promises, no async/await, no Promise.all 
function getName2(): Promise<string[]> {
  let names: string[] = [];
  return new Promise((resolve, reject) => {
    resolve(names)
    fetch(paramName)
      .then(r => r.json())
      .then(r => names.push(r.name))
      .then(() => fetch(paramName)
        .then(r => r.json())
        .then(r => names.push(r.name))
        .then(() => fetch(paramName)
          .then(r => r.json())
          .then(r => {
            names.push(r.name)
          })
        ))
      .then(() => console.log(`without everythings result ${names}`))

    return names
  })

}
getName2()

// 4. a function that should get a woman user for the minimum number of requests

const url: string = "https://random-data-api.com/api/users/random_user";
//4.1

function findWoman(): Promise<any> {
  return new Promise((resolve) =>
    resolve(
      fetch(url)
        .then(res => res.json())
        .then(res => {
          if (res.gender === "Female") {
            return {
              name: res.first_name,
              gender: res.gender
            }
          }
          else {
            console.log(`woman's gender 4.1 ${res.gender}`)
            return findWoman()
          }
        })
    ))


}
findWoman().then(user => console.log(`THe woman's name 4.1 is ${user.name} Her gender is ${user.gender}`))

//4.2
async function findWoman1(): Promise<any> {

  return await fetch(url)
    .then(res => res.json())
    .then(res => {
      if (res.gender === "Female") {
        return {
          name: res.first_name,
          gender: res.gender
        }
      } else {
        console.log(`woman's gender 4.2 ${res.gender}`)
        return findWoman1()
      }
    })

}
findWoman1().then(user => console.log(`THe woman's name 4.2 is ${user.name} Her gender is ${user.gender}`))
/*
5. There is a function #1 that accepts a callback that will be called with the parameter == your current ip. 
Create an escapeable function #2 that uses function #1
*/

async function func1(callback : (ip : string) => void){
  let text = await fetch(param).then(res=>res.json()).then(res=>res.ip)
  callback(text)
}
async function func2(){
  func1(ip=>console.log("func2 assignment 5 "+ip))
}
func2()

/*
6.There is a function #1 that can be evaded, which will return the string == your current ip. 
Create function #2, which should use function #1 to get your current ip, 
and which takes one parameter as input - a callback function that will be called when the ip is received, 
with the first parameter equal to this ip.
*/

 async function func12(param: string) : Promise<string>{
   return await fetch(param).then(res=>res.json()).then(res=>res.ip)
}
async function func22(callback : (ip : string)=>void) : Promise<void> {
 callback(await func12(param))
}
func22(res=>console.log("func22 assignment 6 "+res))