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

//console.log(people);

// REDUCE

console.log(people.map(person => person.age = 62 ));
console.log(people.filter(person => person.name.includes('elaine')));
//json._embedded.episodes.filter(episode => episode.summary.includes(name));
//const valuesNum = cards.map(card => valueMap[card.value]); // get the mapped value when the value is JACK, QUEEN, KING or ACE


// uma forma de usar function expression
const sumOfAges = people.reduce(
    (accum, person) => accum + person.age, 0);

 // outra forma de usar function expression
const sumOfAges2 = people.reduce((accum, person) =>
    {return accum + person.age}, 0);

// First letter name
const companyName = people.reduce((accum, person) => 
    {return accum + person.name.charAt(0).toUpperCase()}, "");

// First letter name2
const companyName2 = people.reduce((accum, person) => 
 accum + person.name.charAt(0).toUpperCase(), "");

console.log(sumOfAges);  
console.log(sumOfAges2);
console.log(companyName); 
console.log(companyName2); 