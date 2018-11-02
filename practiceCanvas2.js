
// Different Shape Classes
const shapesModule = (ctx) =>
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
                        ctx.arc(x,y,2,0, 2* Math.PI);
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

        Circle: (newX,newY,newR) => 
        {
            let x = newX;
            let y = newY;
            let r = newR;

            let moveX = 1;
            let moveY = 1;


            return {
                draw()
                {
                    if (typeof x === "number" && typeof y === "number")
                    {
                        ctx.beginPath();
                        ctx.arc(x,y,r, 0, 2 * Math.PI);
                        ctx.stroke();
                    } else throw console.error("Arguments Not Numbers!");

                },

                getX() {return x},
                getY() {return y},
                getR() {return r},

                getMoveX() {return moveX},
                getMoveY() {return moveY},

                setX(newX) {x = newX},
                setY(newY) {y = newY},
                setR(newR) {r = newR},
                
            }
        }
    }
}
        // Resizes canvas to current window viewport
        const resizeCanvas = (canvas) => 
        {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        // Clear Canvas
        const clear = () =>
        {
            const canvas = document.getElementById('myCanvas');
            const context = canvas.getContext('2d');
            context.clearRect(0,0,canvas.width,canvas.height);
        }

        // Circle Generator, takes number of Circle objects to return, shapes modules, and current canvas as arguments
        const genCircles = (num,shapesArg,canvasArg) =>
        {
            let circles = [];
            let x; let y;

            for (let i = 0; i < num; i++)
            {
                x = Math.random() * canvasArg.width;
                y = Math.random() * canvasArg.height;
                r = 5 + (Math.random() * 75);
                circles.push(shapesArg.Circle(x,y, r));
            }

            return circles;
        }

        // Circle Draw Loop, loops through argued array and draws each 
        const circleDrawLoop = (circArg,canvasArg) =>
        {
            // Each loop, every single circle uses the same moveX and moveY, 
            // how do i define movement for each individual circle?
            // Define it in it's closure?

            let moveX = 1; let moveY = 1;
            
            for (let i = 0; i < circArg.length; i++)
            {
                circArg[i].draw();

                // Finding and defining current poisitioning
                let currentX = circArg[i].getX();
                let currentY = circArg[i].getY();
                let currentR = circArg[i].getR();

                // Creating newX and newY, which are coordinate values based on the last draw() iteration, plus some sort of movement value, which keeps changing.
                let newX = currentX + moveX;
                let newY = currentY + moveY;
                // Setting new poisioning for current circle
                circArg[i].setX(newX);
                circArg[i].setY(newY);

                // Checks to see if the x positioning is to the maximum size of the canvas, in both the positive and negative directions
                if (newX + currentR > canvasArg.width || newX - currentR < 0)
                {
                    moveX = -moveX;
                }
                // Checks Y
                if (newY + currentR > canvasArg.height || currentR - 49 < 0)
                {
                    moveY = -moveY;
                }
            }
        }


// Initialization Script
const init = () =>
{
    // Init of Canvas
    const canvas = document.getElementById('myCanvas');
    const context = canvas.getContext('2d');

    // Resize to Window Viewport on pageload
    resizeCanvas(canvas);

    // Clear Button Event Handler for button element in HTML
    document.getElementById('clearButton').onclick = (event) =>  { clear(); };

    // Placing Context into my shapes modules to encapsulate it for usage with theShapes object instance
    shapes = shapesModule(context);


        // Animation Time!!!
    // Generates Our Circles
    let circles = genCircles(50,shapes,canvas);

    // Animate function sets recursive draw() calls
    const animate = () =>
    {
        return setInterval(draw, 10);
    }
    
    // Draws scene once, calls CircleDrawLoop where implementation of bouncing circles is defined
    const draw = () =>
    {
        clear();
        circleDrawLoop(circles, canvas);
    }

    animate();
}
init();







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