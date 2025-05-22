/*
Author: Elaine Candido da Silva
Date: 1/18/2024
Description: Write a program that get a string and do the follow:
    1. If the first and the last letter are the same, 
       write the string in the reverse order;
    2. If the first and the last letter NOT are the same, 
        remove the first and the last letters
*/

// Variables declaration
const people = [{name:"elisa", age:22}, 
{name:"emanuell", age:22}, 
{name:"felipe", age:34}, 
{name:"eloisa", age:58},
{name:"elaine", age:62}];  

console.log(people);

const names = people.map(person => person.name);
const ages = people.map(person => person.age);
console.log(names);
console.log(ages);

const code = ". Going elsewhere today. Rewind extra across day yellow. Feast on rope. There here every. Today everywhere change here. Change here everywhere change key. ";
//code.split(".").filter(sentence => sentence).map(sentence => sentence.split(" ")).filter(word => word);
const msg = code.split(".")
    .filter(sentence => sentence)
    .map(sentence => sentence.split(" ")
    .filter(word => word)
    .reduce((accum, element) => {return accum + element.charAt(0).toLowerCase();}, ""))
    .reduce((accum, element) => {return accum + element + " " }, "");

console.log(msg);
    