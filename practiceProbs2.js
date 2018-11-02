/* 	Neeko Blomgren
	September 20th, 2017
	Coding Practice 3: - JavaScript Basics and more Intermediate Skills
		
		Contains: Exercises from w3resouce.com
					-Basic Exercises
					-Functions Exercises
					-Object Exercises
					
					Hopes: Recursion, Validation with Regular Expressions, 
	*/

/* Basic Exercise #23 - Program which creates a new string from a given string, 
						switching the first and last characters.
			Pre:
			- There's probably a built-in method for this in String objects
			- Will be very easy
			Post:
			- Test, test, test. Like 3,4,5 times with different outliers and shit.
			- Was on the way to see if there was a built-in method, but I decided to 
			build the function with what i knew. charAt() and slice(). Slice is really cool.
*/


function backAPage()
{
	window.history.back();
}

var givenString = "squeekerz";
var givenString2 = "12345";
var givenString3 = "duckhead";

function stringSwitch(str)
{
	var char1 = str.charAt(0);
	var char2 = str.charAt(str.length - 1);

	return char2 + str.slice(1, str.length - 1) + char1;
}
		// tests
//console.log("Should be zqueekers: " + stringSwitch(givenString));
//console.log("Should be 52341: " + stringSwitch(givenString2));
//console.log("Should be duckhead: " + stringSwitch(givenString3));

		/* Starting non-Basic exercises! Will likely take more time, more research, and more frustration. Let's Begin!*/

/* Function Exercise #1: Function which reverses a number. Ex. Argument: 12345, Returns: 54321
			Pre:
			- Did something like this in my first Java course as a warm-up. Some nice tasty logic solving.
			- Going to be using a for loop. As well as the length variable in the string, charAt(), and uhhh.

			During:
			- Strings are immutable in JavaScript. Once created they cannot be altered, the remedy to this is to create a new string.
			- Good tip to start: turn the string into an array.

			Post:
			- Still have for loops in the bag, just have to keep working on my logic.
*/ 

var revNum1 = "12345";		// 54321
var revNum2 = "746831";		// 138647
var revNum3 = "1002"; 		// 2001

function reverseNum(n)
{
	var arr = n.split("");
	var reversed = arr[arr.length - 1];			// gets last array index into reversed string variable

	for (i = 1; i <= arr.length - 1; i++ )		// i starts at the second index of string bc first is filled up there ^
	{
		
		reversed = reversed + arr[arr.length - (i + 1)];
	}

	return reversed;
}
	
	// Tests
//console.log(reverseNum(revNum1));
//console.log(reverseNum(revNum2));	
//console.log(reverseNum(revNum3));

/* Object Practice #1 - Work with Objects and create Animal Hierarchy
		Pre: 
			- Must get more familiar with javascript object syntax, and how they work in general.
			- Lotsa Tests
		During:
			- All of the PROPERTIES, so not the values of those properties but just the properties themselves.
			- An Object is: A collection of properties with one prototype object. The prototype may be either an object or the null value.
			- All objects inherit from Object.prototype. 
			- When creating multiple instances of a class, create a constructor.
			- To access properties within an object you can use dot notation or bracket notation
			- ES6 introduced the class keyword, which is just another way to create prototype chains.
				it does not change object orientated functionality, it just creates a new syntax to use it.
				learn pre-ES6 first!
			-Still however, java is prototype-object-chain based.
			-Object is always going to be the top of the prototype chain, where a null value will always be the bottom.
			-remember to use the instanceof keyword

*/
			// creating class hierarchy with Animals

// I'm still shaky on the details but this function can create a link between parent and child objects.
// it utilizes the prototype keyword in such a way that it can set the hierarchy up. lets continue.

var inheritsFrom = function (child, parent) 				// universal function which creates link between objects and their prototypes
{
	child.prototype = Object.create(parent.prototype);			// this thing is AWESOME
};


var Animal = function(conName,conNumLimbs)		// creating a class with prototype chains, typically Capitalized
{
	this.name = conName,
	this.numLimbs = conNumLimbs,			// constructing properties
	this.alive = true;

		this.loseLimbs = function(num)
		{
			this.numLimbs = this.numLimbs - num;
			console.log(this.name + " has " + this.numLimbs + " limbs.")
		}
		this.die = function()
		{
			this.alive = false;
			console.log(this.name + " has died");
		}

		this.asString = function()
		{
			return "Name: " + this.name + " with number of Limbs: " + this.numLimbs + " and is it alive? :" + this.alive;
		}
	} 
var japaneseMacaque = new Animal("monkey",4,true);			// have created a particular instance of Animal, what about 
//alert(japaneseMacaque.numLimbs);		
//japaneseMacaque.loseLimbs(3);
//alert(japaneseMacaque.numLimbs);
//alert(japaneseMacaque.asString());		tests
//japaneseMacaque.die()
//alert("Is the Macaque Alive? " + japaneseMacaque.alive);



var Leopard = function(conDangerous) // attach this object to the prototype chain of Animal
{ 
	this.isDangerous = conDangerous;
	__proto__: Animal;					// this is the way to create instance variables with a constructor
}
inheritsFrom(Leopard, Animal);	

	var SnowLeopard = function()
	{
		this.numSpots;
		__proto__: Leopard;
	}
	inheritsFrom(SnowLeopard, Leopard);

/*

var gerald = new Leopard(true);
console.log(gerald.isDangerous);				// usage of Leopard-only property
console.log(gerald.name);						// usage of name property able to be used across all animals
console.log(gerald.isAlive);
console.log(gerald instanceof Animal);

		// currently. have confirmed gerald and sue are both leopards and animals, though they dont seem
		// to be inheriting the methods which are inside animal. will pick this up later. possibly with some other animals.

var sue = new SnowLeopard("Sue", 4, true);			// other way around
sue.isDangeous = false;
sue.numSpots = 32;
console.log(sue.name);
console.log(sue.isDangerous);
console.log(sue.numSpots);


*/


/* Object Examples for usage within Object Exercises */
var neeko = 			// created a simple instance of a neeko, not tied to any hierarchy besides Object, lower case 
{
	numOfHairs: 458234,
	skinColor: "Gold Beach",
	first: "Neeko",  //ES6 has a new object literal notation which gets rid of a lot of unnecessary syntax. Below is the shortest form to create a single object
	last: "Blomgren",

	asString() 
	{
		return this.first + " " + this.last + " w/ # Hairs:" + this.numOfHairs;
	}
};

var myBed =
{
	color: "Royal Tan",
	numOfSheets: 4,
	isSoft: true,
	cleanSheets: false,

	cleanTheSheets()
	{
		if (this.cleanSheets == true)
		{
			console.log("Sheets are already clean, btw");
		}
		this.cleanSheets = true;
	}
}

/* Object Exercise  1 - Create String primitive from object's property names
			- the Object object has a great deal of very useful and fundamental methods and properties, remmeber to use!
			- join() is another fun array method which is very useful. joins and separates with a comma. 
*/

function objPropsToString(obj)
{
	var properties = Object.keys(obj);
	return properties.join();
}
//alert(objPropsToString(neeko));

/* Object Exercise 2 - program which can delete properties from objects  
			Pre:
			- create function which can accept two arguments: both the object and intended property to remove
			- use keys() in Object to find property names and compare with intended property to remove

			During:
			- 
			Post:
			- Felt good about it. My fundamentals are travelling along definitely.
			- Feels a little bit unfinished but oh well. Moving on.
*/

function removeProperty(obj, prop)
{
	var thePropertiesAsArray = Object.keys(obj);

	console.log(thePropertiesAsArray.join())

	for (i = 0; i < thePropertiesAsArray.length ; i++)
	{	
		if (thePropertiesAsArray[i] == prop)
		{
			thePropertiesAsArray[i] = null;
		}
	}
	var removed = thePropertiesAsArray;
	return removed;
}
//alert(removeProperty(myBed, "color"));

/* Object Exercise 3 - program which gets the length of a javascript object 
			Pre: 
			- What do you mean length? Glanced at the solution. Something about objsize. 
			During:
			- consulting stackoverflow, it suggests the most "robust" way to create a function which
			allows one to get the length of an object (number of properties), would be to add 
			a personally created function within the Object class.
			- just copied the stackoverflow solution but learned some things
			Post:
			- I can add methods to the big Object, but im not supposed to add methods to it's prototype.
			- theres a shorthand with for loops using the IN keyword, unsure exactly of how it's used here.
			- in ES6, i can use the "keys" property
				- would be size = Object.keys(myObj.length)
			- kind of fudged this one lol, moving on.
*/
Object.getSize = function(obj) 
{
	var size = 0;
	var key; 

	for (key in obj)
	{
		if (obj.hasOwnProperty(key)) 
			size++;
	}
	return size;
}
//alert(Object.getSize(myBed));

/* Object Exercise 4 - write a program which displays the reading status of the books in the follow array of objects
			Pre:
			- the library Array object contains book objects. the objects themselves do not have names
			or possibly their names are their respective indexes within the array?
			- i believe to reference the The Road Ahead book object, i would have to write library[1].title
*/
var library = [ 
   {
       author: 'Bill Gates',
       title: 'The Road Ahead',
       readingStatus: true
   },
   {
       author: 'Steve Jobs',
       title: 'Walter Isaacson',
       readingStatus: true
   },
   {
       author: 'Suzanne Collins',
       title:  'Mockingjay: The Final Book of The Hunger Games', 
       readingStatus: false
   }];
for (i = 0; i < library.length; i++)
{
	//console.log(library[i].readingStatus)
}

/* Object Exercise 8 - program which creates a Clock
	Pre: 
	- Create Clock object with methods & properties like 
		hour/minute/second go by, am/pm property, time property, setTime, getTime
	During:
	- Can use functions using the class/constructor syntax of ES6, but still
	can't seem to figure out the class syntax of ES5. Still need to work on this, ill 
	get back to the animal class hierarchy above using classic prototypical inheritance
	syntax later. but wow does this seem to be easier.
	- how do i create this clock object to automatically increment the seconds?
	- always use the this keyword when referencing specific instances of objects
	- remember setInterval!!
	- TypeError in console is referencing the fact that the variable type
	which we are referencing is not the expected reference

	Post:
	- Bit off a little more than I could chew surprise surprise,
	can't seem to figure out how to get the clock to constantly change.
	- Oh well, learned some stuff on the way, will just have to scrap this and try again! heres the code:


class Clock
{
	constructor(conHour,conMin,conSec, conAmPm)
	{
		this.hour = conHour;
		this.min = conMin;
		this.sec = conSec;
		this.amPm = conAmPm;
		this.time = this.hour + ":" + this.min + ":" + this.sec + " " + this.amPm;
	}

	getTime()
	{
		return this.hour + ":" + this.min + ":" + this.sec + " " + this.amPm;
	}

	incrementTime()
	{
		window.setInterval(this.sec++, 1000) ;
		console.log("Power has been Turned On!");
		if (this.sec == 60)
		{
			this.sec = 0;
			this.min++;
		}
		if (this.min == 60)
		{
			this.min = 0;
			this.hour++;
		}
		if (this.hour == 12)
		{
			if (this.amPm == "AM")
			{
				this.amPm = "PM";
			} 
			else
			{
				this.amPM = "AM";
			}
		}

	}
}

var today = new Clock(05,04,27,"PM");
//alert(today.getTime())
//today.togglePower();

function createClock()
{
	var element = document.getElementById("clock-input");		// referencing the clock-input input html element
	var userInput = element.value;							// putting current value, which at this point should have been changed by the user into a variable as a string
	var inputArray = userInput.split(",");				// seperating the string, turning it into an array using Split and comma as seperator
	
	theClock = new Clock(inputArray[0],inputArray[1],inputArray[2],inputArray[3]);			// inputting each of the array's index values into the parameters of the Clock class, instantiating a new Clock object based on the user's input.

	var divNode = document.createElement("div");		// createElement Here, then create a textnode to have something to put inside it, then append the text node into the div node.
	var text = document.createTextNode(theClock.getTime());
	divNode.appendChild(text);

	var element = document.getElementById("practice");	// referencing larger parent element
	element.appendChild(divNode);				// adding newly created divNode to it

	theClock.incrementTime();
}
*/


/* Object Exercise 9 - functions which get user input and calculate area and perimeter.
			- creating html elements with javascript and understanding the DOM
			- using the Math object
*/

function calcArea()
{
	var radius = document.getElementById("getRadius").value;
	var area = Math.PI * (radius ^ 2)


	var divNode = document.createElement("areaDiv");		// creating the element in virtual space, currently within the DOM but has no specific placement within it 
	var text = document.createTextNode(area + "\n");			// creating a text node to be stored within that element
	divNode.appendChild(text);						// appending that text node within the just-created element

	var element = document.getElementById("practice"); 		// referencing the practice element in the DOM to have it usable in the script
	element.appendChild(divNode);			// appending the first divnode, containing the textnode of the calculated area into the parent node of practice.
}

function calcPeri()
{
	var radius = document.getElementById("getRadius").value;
	var area = Math.PI * (2 * (Math.PI) * radius)


	var divNode = document.createElement("periDiv");	
	var text = document.createTextNode(peri  + "\n");
	divNode.appendChild(text);

	var element = document.getElementById("practice");
	element.appendChild(divNode);
}



/* Object Exercise 14 - Retrieves all the values  of an objects properties */

	