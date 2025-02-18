const add = require("./app.js");
const fs = require("fs")
console.log("hello");
console.log(add);
console.log("file handling");
console.log("before function")
//non-blocking 
// fs.readFile('test.txt','utf-8',(error,data)=>{
//   console.log(data);
//});
const demo = fs.readFileSync('test.txt','utf-8')
console.log(demo);
console.log("i understood")
console.log("after fundtion");