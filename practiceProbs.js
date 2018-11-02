// Neeko Blomgren
// August 12th, 2017
// Coding Practice

// So I've realized that I'm decent at theory in code, but am actually shit in practice. Time to start practicing.
// To do this, I'm going to go through the JavaScript basic exercises on w3resource.com, ONE, BY, ONE

/* NUMBER 1 - program to display current day and time with format 1
	 notes: -DONT FORGET THE NEW KEYWORD MY GOD
			-the script will run in the order of where it is in the HTML document; when the script at the top,
			the script runs first and THEN the innerHTML is printed. because of this, to interact with innerHTML
			the script must be place AFTER the html which is being overwritten.
	 */

function dateFormat1()
{
	var theDate = new Date();			// created new object of Date with many different properties which are accessed using getters
	
	var theTime = theDate.toTimeString();		// getting time

	var theDayName = theDate.getUTCDay();		// getting the day
	switch (theDayName) {
		case 0 : theDayName = "Sunday";
		case 1 : theDayName = "Monday";
		case 2 : theDayName = "Tuesday";
		case 3 : theDayName = "Wednesday";
		case 4 : theDayName = "Thursday";
		case 5 : theDayName = "Friday";
		case 6 : theDayName = "Saturday";
	}

	var dayTime = "Today is: " + theDayName + "\n Current Time Is: " + theTime;
	return dayTime;
}
//document.getElementById("practice").innerHTML = dateFormat1();


/* NUMBER 2 - JavaScript program which literally prints the contents of the current window
	notes: - woah they meant l i t e r a l l y print the page. I guess there is a window method for 
	opening up the print dialog box.
*/

function printThis()
{
	window.print();
}
//printThis();

/* NUMBER3 - program which gets the current date in format 2
	notes: -similar to number 1 except with mm/dd/yyyy format 
			- got through that fast cool!*/

function dateFormat2()
{
	var theDate = new Date();
	return theDate.getMonth() + "/" + theDate.getDate() + "/" + theDate.getUTCFullYear();
}
//alert(dateFormat2());

/* NUMBER 4 - program which finds the area of a triangle where lengths of its sides are 5, 6, and 7
	notes: -dont need to accept a argument or anything... just translate the mathematics into code.
			-to calculate the area of a triangle, given 3 sides.. heron's formula. 
	*/
function calculateArea()
{
	var a = 5;
	var b = 6;			// the three sides
	var c = 7;

	var p = (a + b + c) / 2;			// p is 9 here.

	var areaS = Math.sqrt( p * (p-a) *(p-b) * (p-c) );		// should equal about 14.7

	return areaS;
}

//alert(calculateArea());

/* NUMBER 5 **INCOMPLETE** - program which rotates the string "codemonkeying" around by placing the end char on the front. 
			end product should look like a banner animation.
		- going to be creating a script which continuously alters the innerHTML of an element. 
		
		-DISCLAIMER: did not fully understand the usage of the String object and .data properties as well as
		managing the array of characters within it. though, i did receive a slightly better understanding of how
		anonymous functions work and what they are. I SHOULD COME BACK TO THIS QUESTION.
		*/
function rotateString(elementID)
{
	var theElement = document.getElementById(elementID);
	var textNode = theElement.childNodes[0];		// can reference the child nodes in regards to the current element. in this case the child nodes is the string data.
	var theText = textNode.data;

	setInterval(function()	{
	
	theText = theText[theText.length - 1] + theText.substring(0, theText.length - 1);
	textNode.data = theText;
	} , 100);
}
		
/* NUMBER 6 - program which calculates whether a given year is a leap year in the Gregorian calendar.
			- use user input from a prompt window
			- determining leap years: any year that can be evenly divided by 4
				EXCEPT if it can be evenly divided by 400
*/

function isLeapYear()
{
	var tbdLeap = window.prompt("Which year would you like to determine is a Leap Year?");
	var isLeap;

	if (tbdLeap % 4 == 0)
	{

		isLeap = true;
	}	else {
		isLeap = false;
	}

	if (tbdLeap % 100 == 0)
	{
		isLeap = false;					// this could be cleaner.
			
	}

	window.alert("Leap Year?" + isLeap)
}
//isLeapYear();

/*	NUMBER 8 (number 7 is stupid) - program where user must guess between 1 and 10, if guessed correctly 
	displays "Good Work!", if not, then displays "Not Matched."
	
*/

function guessingGame()
{
	var randomInt = Math.floor(Math.random() * 10); 		// .floor() rounds the number down, random generates random decimal number. 

	if (window.prompt("Number 1-10 Generated. Guess which it is:" ) == randomInt)
	{
		window.alert("Good Work!");

	}	else 
	{
		window.alert("Not Matched.")
	}
}
//guessingGame();

/* NUMBER 9 - program which determines the days until next Christmas
			- remember to always use the least amount of variables possible!
*/

function daysTilNextChristmas()
{
	var xmas = new Date(Date.parse("December 25, 2017"));			// Date parse always returns the number of milliseconds from that day until jan 1, 1970 (creation of javascript?)
	var today = new Date();

	var singleDayAsMS = 1000*60*60*24;				// find out how much a single day is in milliseconds
	var daysLeft = ( xmas.getTime() - today.getTime() )/ singleDayAsMS;
	daysLeft = Math.ceil(daysLeft);

	alert("Days Until next xmas from today (" + today.toString() + "): " + daysLeft);
	
}
//daysTilNextChristmas();

/* NUMBER 10 - program which takes user input from UI on webpage which calculates the multiplication of two inputted numbers.
	- create form which allows for Number 1 and Number 2 to be input into variables
	- write two functions here multiply and divide, which run when the buttons are clicked, which take the current
	value inside the two number input elements and solve them.
	-from there, this solution value is then placed inside the answer div element.
*/

function multiply(){
	var numerator = document.getElementById("first").value;
	var denominator = document.getElementById("second").value;

	document.getElementById("answer").innerHTML = numerator * denominator;
}

function divide(){
	var numerator = document.getElementById("first").value;
	var denominator = document.getElementById("second").value;

	document.getElementById("answer").innerHTML = numerator / denominator;

}

/* NUMBER 11 - program that converts to and from celcius and fahrenheit */ 

function toCelc()
{
	var f = document.getElementById("f2c").value;
	document.getElementById("answer").innerHTML =  (5*(f - 32) / 9);
}
function toFahr()
{
	var c = document.getElementById("f2c").value;
	document.getElementById("answer").innerHTML = (((c * 9) / 5) + 32);
}

/* NUMBER 12 - write a javascript program which gets the current webpage address 
	- the window object will probably be useful here.
	- ez pz. remember the window object. check out its different variables and functions.
	*/
function displayURL()
{
	alert(window.location.href);
} 
//displayURL();

/* NUMBER 13 - **INCOMPLETE** skipped due to not knowing wtf im supposed to do lol 
 a program which creates a variable by the user providing what the variable is called.
		- using inputs again, with their value
		- possibly parsing the string?
*/

/*function getUserInput()
{
	var userInputElement = document.getElementById("userInput");

}
	function changeColor()
	{
		var variableElement = document.getElementById("answer");
		if (variableElement.innerHTML !== "After I Change, Click me to Change Color!")
		{

		}
		
	}*/ 

/* NUMBER 14 - program which gets the extension of a particular filename
	-I believe this is just string manipulation, given the fact that I already have a particular 
	file in mind.
	-so here the solution ive found uses the string function split(), which takes as argument a seperator if you will
	which determines where the string is going to be split it. the split function then returns an array which
	every element which is seperated by whatever character youve specified. 
	-the solution then goes onto using the pop() method on the array because that returns the very last element on the array
	-in this case, this would automatically be the file extension because that would be the end of the array seperated by a period.
	-its important to note here that there are very powerful functions attached to eveyr array object, such as pop() being coupled with push().
	some other examples are shift() unshift(), which is like pop and push() but works on the first element instead of the last,
	toString() and join(), what have you. 

*/

var aFile = "butt.txt";
function getFileExtension(fileName)
{
	return fileName.split(".").pop()
}
//alert(getFileExtension(aFile));

/* NUMBER 15 - get the absolute difference between a given number and 13 */

var someNumber = 27;
var someNumber2 = 4;
function diff13(givenNum) 
{
	return Math.abs(givenNum - 13);
}
//console.log(diff13(someNumber));
//console.log(diff13(someNumber2));

/* NUMBER 16 - returns the sum of two given numbers, if they are the same value, triple it. */

var sumNum = 16;
var sumNum2 = 700;
var sumNum3 = 16;

function sumTrip(n, n2)
{
	var answer = n + n2;
	if (n === n2)
	{
		answer = answer * 3;
	}

	return answer;
}
//console.log(sumTrip(sumNum, sumNum2));
//console.log(sumTrip(sumNum, sumNum3));

/* NUMBER 17 INCOMPLETE- same thing as the last two numbers but combined, skipping */
/* NUMBER 18 - program which checks if two given numbers if one of the numbers if 50 or if their sum is 50 */

var sumNum4 = 9;
var sumNum5 = 27;
var sumNum6 = 23;
var sumNum7 = 50;

function check50(n, n2)
{
	var trueUnTrue;

	if (n + n2 == 50)
	{
		var trueUnTrue = true;
	}	else if ((n == 50) || (n2 == 50)) 
	{
		var trueUnTrue = true;
	}	else 
	{
		var trueUnTrue = false;
	}
	

	return trueUnTrue;
}

//console.log(check50(sumNum7, sumNum4));	// true
//console.log(check50(sumNum5, sumNum6)); // true
//console.log(check50(sumNum6, sumNum4)); // false

/* NUMBER 19 INCOMPLETE- program which determines whether or not a given integer is between 20 and 100, or 400
		- ez pz, skipping.
		*/

/* NUMBER 20 INCOMPLETE more boolean logic, moving onto string manipulation */

/* NUMBER 21 - creates new string with a given string adding "Neek" onto the front, but if it already has Neeko in 
front of it, do nothing and return the original string */

var givenString = " is cool";
var givenString2 = "Neek is cool";

function addingNeek(s)
{
	if (s.includes("Neek"))
	{
		return s;
	}	else  {
		return "Neek" + s;
	}
}

//console.log(addingNeek(givenString));
//console.log(addingNeek(givenString2));

/* NUMBER 22 - function which removes the given index from a string */

function removeChar()
{
	var stringBoxElement = document.getElementById("stringBox");
	var indexBoxElement = document.getElementById("indexBox");

	var newString = stringBoxElement.value;
	var index = indexBoxElement.value;
	newString = newString.slice(0,index - 1) + newString.slice(index);

	document.getElementById("answer").innerHTML = newString;
}

/* Fair amount of basic exercises complete! creating new javascript file. and new html file. */