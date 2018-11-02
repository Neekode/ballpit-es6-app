/*
Neeko Blomgren
November 2nd, 2018
The Ballpit - Canvas Animation Ballpit Simualor


    This program is built keeping best practices in mind:
    - Highly Minimized global variables. 
    - Encapsulated functionality.
    - ES6 Syntax and prioritizing block scope.
    - Using closures and getters and setters to maximize privacy and minimize naming collisions

    Variable Naming Conventions:
        Inside of the initialization function, theContext and theCanvas are designations 
    representing their being initialized within that scope. In other methods such as shapesModule(),
    clear(), and resizeCanvas(), c and ctx are designations representing them being passed arguments within
    those respective scopes.  

    
    Note from author:
        All code is 100% written by me, no copy and pasting from online solutions, 
        and no tutorials directly followed. Referenced documentation for certain features
        such as canvas and websites like stackoverflow for questions about syntax and reasoning thru problems.


    Notes:
        - The interval object is very important here. Keep track of where it goes, when it setIntervals()s, and when 
        it clearInterval()s. The same interval instance can be passed from function to function.
*/


const onPageLoad = () =>
{
    // Declaration of interval object
    let interval;

     // Receives HTML elements into script
    // const amtInput = document.getElementById('amtInput');       // why don't i need these lines?
    // const radInput = document.getElementById('radInput');
    // const spdInput = document.getElementById('spdInput');

    // Binding event handler to Render Button
    document.getElementById('renderer').onclick = (e) =>  { interval = renderer(interval); };

    // Binding event handler to Randomize Button
    document.getElementById('randomer').onclick = (e) =>  { interval = randomer(interval) };

    // Initial Default Page Load
    interval = init();
}

    // Render function which takes the interval object as an argument. This allows for the same interval being passed around,
    // being able to be set and cleared whenever a new initialization is set.
    const renderer = (int) => 
    {
        // Clears previous 
        clearInterval(int);
        
        // Gathers values from elements
        let newAmt = amtInput.value;
        let newRad = radInput.value;            // Note: how is this render function able to access variables from onPageLoad? does it have something to do with the event handler?
                                            // im confused. does the input html element automatically make itself available
                                            // in my script scope just by being instantiated?
        let newSpd = spdInput.value;


        // Passes new values into initialization script
        int = init(newAmt,newRad,newSpd);
        return int;
    }
    

    // Same as above, but with randomization
    const randomer = (int) =>
    {
        // Clears previous 
        clearInterval(int);

        // Randomizes amount and radius coefficient
        let newAmt = Math.random() * 500;
        let newRad = Math.random() * 100;
        let newSpd = Math.random() * 3;

        // Putting (rounded) new values into the HTML element for display.
        amtInput.value = Math.floor(newAmt);
        radInput.value = Math.floor(newRad);
        spdInput.value = newSpd;

        int = init(newAmt,newRad,newSpd);
        return int;
    }

// Initialization Script
const init = (amt,rad,spd) =>
{
    // Declaration for 
    let amtCirc = amt;
    let radCo = rad;
    let movSpd = spd;

    // Default. If the two variables are found to be undefined (as with the initial page load), their default values are set to 100 and 50
    if (!amtCirc && !radCo && !movSpd)
    {
        amtCirc = 100; radCo = 50; movSpd = 1;
    }

    // Init of Canvas
    const theCanvas = document.getElementById('myCanvas');
    const theContext = theCanvas.getContext('2d');

    // Resize to Window Viewport on pageload
    resizeCanvas(theCanvas);

    
    // Placing Context and Canvas into my shapes modules to encapsulate it for usage with theShapes object instance
    shapes = shapesModule(theContext,theCanvas);


        // Animation Time!!!
    // Generates Our Circles
    let circles = genCircles(amtCirc,radCo,movSpd,shapes,theCanvas);

    // Animate function sets recursive draw() calls
    const animate = () =>
    {
        return setInterval(draw, 10);
    }
    
    // Draws scene once, calls CircleDrawLoop where implementation of bouncing circles is defined
    const draw = () =>
    {
        clear(theContext,theCanvas);
        circleDrawLoop(circles, theCanvas);
    }

    // Returns interval object to scope which called it.
    return animate();
}

    // Resizes canvas to current window viewport
    const resizeCanvas = (c) => 
    {
        c.width = window.innerWidth;
        c.height = window.innerHeight;
    }
    // Clear Canvas
    const clear = (ctx,c) =>
    {
        ctx.clearRect(0,0,c.width,c.height);
    }



// Different Shape Classes
const shapesModule = (ctx,c) =>
{
    return {
        Point: (newX,newY) =>
        {
            const x = newX;
            const y = newY;

            return {
                draw()
                {
                    if (typeof x === "number" && typeof y === "number")
                    {
                        ctx.beginPath();
                        ctx.arc(x,y,2,0, 2 * Math.PI);
                        ctx.fill();
                        ctx.stroke();
                    }
                }
            }
        },

        Line: (newX1,newY1,newX2,newY2) =>
        {
            const x1 = newX1;
            const y1 = newY1;
            const x2 = newX2;
            const y2 = newY2;

            return {
                draw()
                {
                    if (typeof x1 === "number" && typeof y1 === "number")
                    {
                        ctx.beginPath();
                        ctx.moveTo(x1,y1);
                        ctx.lineTo(x2,y2);
                        ctx.stroke();
                    } else throw console.error("Arguments Not Numbers!");
                }
            }
        },

        Circle: (newX,newY,newR,newMoveX,newMoveY) => 
        {
            let x = newX;
            let y = newY;
            let r = newR;

            // Movement Variables, stores a value of potential displacement on draw()
            let moveX = newMoveX; 
            let moveY = newMoveY;

                // Randomizes initial movement direction
            let posOrNeg = Math.random() < 0.5 ? -1 : 1;

            if(posOrNeg > 0)
            {
                moveX *= -1;
                moveY *= -1;
            }   
            
            if (posOrNeg < 0)
            {
                moveX *= 1;
                moveY *= 1;
            }
            
            return {
                draw()
                {
                    if (typeof x === "number" && typeof y === "number")
                    {
                        ctx.beginPath();
                        ctx.arc(x,y,r, 0, 2 * Math.PI);
                        ctx.stroke();
                    } 

                },

                getX() {return x},
                getY() {return y},
                getR() {return r},

                getMoveX() {return moveX},
                getMoveY() {return moveY},

                setX(newX) {x = newX},
                setY(newY) {y = newY},
                setR(newR) {r = newR},

                setMoveX(newMoveX) {moveX = newMoveX},
                setMoveY(newMoveY) {moveY = newMoveY},
                
            }
        }
    }
}
        // Circle Generator, takes number of Circle objects to return, shapes modules, and current canvas as arguments
        const genCircles = (num,rad,spd,shapes,c) =>
        {
            let circles = [];
            let x; let y; let r; let s;

            console.log(spd);
            
            for (let i = 0; i < num; i++)
            {
                r = 1 + (Math.random() * rad);
                x = r + (Math.random() * (c.width - (2*r)));
                y = r + (Math.random() * (c.height - (2*r)));
                s = spd;

                circles.push(shapes.Circle(x,y,r,s,s));
            }

            
            return circles;

        }

        // Circle Draw Loop, loops through argued array and draws each 
        const circleDrawLoop = (circles,c) =>
        {
            // Each loop, every single circle uses the same moveX and moveY, 
            // how do i define movement for each individual circle?
            // Define it in it's closure? Yes!
            
            for (let i = 0; i < circles.length; i++)
            {
                let current = circles[i];

                current.draw();

                // Finding and defining current poisitioning
                let x = current.getX();
                let y = current.getY();
                let r = current.getR();

                // Creating newX and newY, which are coordinate values based on the last draw() iteration, plus some sort of movement value, which keeps changing.
                let newX = x + current.getMoveX();
                let newY = y + current.getMoveY();

                // Setting new poisioning for current circle
                current.setX(newX);
                current.setY(newY);

                // Checks to see if the x positioning is to the maximum size of the canvas, in both the positive and negative directions
                if (newX + r > c.width || newX - r < 0)
                {
                    current.setMoveX(current.getMoveX() * -1);
                }
                // Checks Y
                if (newY + r > c.height || newY - r < 0)
                {
                    current.setMoveY(current.getMoveY() * -1);
                }
            }
        }

// The beginning of the program!!
onPageLoad();


























            // Outside of program scope, for showcase purposes

// Cool Drawing
const coolDrawing = (shapes) =>
{
     for (let i = 0; i < 15; i++)
     {
         var circle = shapes.Circle(i,0,200,true);
         let circle2 = shapes.Circle(0,i,200);
 
         let circle3 = shapes.Circle(i,9.85,200);
         let circle4 = shapes.Circle(10,i,200);
 
         circle.draw();
         circle2.draw();
         circle3.draw();
         circle4.draw();
     }

     const midCircle = shapes.Circle(5,5,200);
     const midLine = shapes.Line(0,500,1000,500);
     midCircle.draw();
     midLine.draw();
}

//coolDrawing(shapes);

// Shape Examples
const shapeExamples = (shapes) =>
{
    const newPoint = shapes.Point(50,50);
    const newLine = shapes.Line(25,25,50,50);
    const newCircle = shapes.Circle(1,1,50);

    newPoint.draw();
    newLine.draw();
    newCircle.draw();
}

//shapeExamples(shapes);    




// // Function which returns an artist object,
// // Artist object has inventory of different object...classes? it can draw and play around with
// // Maybe even having an artist object is convoluted? dont really need to be passing this much stuff around.
// // Gonna keep working with it though. See if i can get to the bottom of something. Maybe it can be used to draw more complex shapes?
// const createDrawer = (c,ctx) =>
// {
        

//     return {
//         getCanvas: () =>
//         {
//             return c;
//         },
//         getContext: () =>
//         {
//             return ctx;
//         }


//     }
// }



// // Artist Object which draws things for us.
// artist = createDrawer(canvas,context);