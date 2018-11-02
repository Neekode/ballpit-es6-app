
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

        Circle: (newX,newY,newR) => 
        {
            let x = newX;
            let y = newY;
            let r = newR;

            let moveX; let moveY;

                // Randomizes initial movement direction
            let posOrNeg = Math.random() < 0.5 ? -1 : 1;

            if(posOrNeg > 0)
            {
                moveX = 1;
                moveY = 1;
            }   
            else 
            {
                moveX = -1;
                moveY = -1;
            }



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

                setMoveX(newMoveX) {moveX = newMoveX},
                setMoveY(newMoveY) {moveY = newMoveY},
                
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
        const genCircles = (num,shapes,canvas) =>
        {
            let circles = [];
            let x; let y; 

            for (let i = 0; i < num; i++)
            {
                r = 1 + (Math.random() * 50);

                x = r + (Math.random() * (canvas.width - (2*r)));
                y = r + (Math.random() * (canvas.height - (2*r)));
                circles.push(shapes.Circle(x,y, r));
            }

            return circles;
        }

        // Circle Draw Loop, loops through argued array and draws each 
        const circleDrawLoop = (circles,canvas) =>
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
                if (newX + r > canvas.width || newX - r < 0)
                {
                    current.setMoveX(current.getMoveX() * -1);
                }
                // Checks Y
                if (newY + r > canvas.height || newY - r < 0)
                {
                    current.setMoveY(current.getMoveY() * -1);
                }
            }
        }



pageLoad = () =>
{
    // Clear Button Event Handler for button element in HTML
    document.getElementById('randomButton').onclick = (event) =>  { clear(); };

    init();
}

// Initialization Script
const init = () =>
{
    // Init of Canvas
    const theCanvas = document.getElementById('myCanvas');
    const theContext = theCanvas.getContext('2d');

    // Resize to Window Viewport on pageload
    resizeCanvas(theCanvas);

    
    // Placing Context into my shapes modules to encapsulate it for usage with theShapes object instance
    shapes = shapesModule(theContext,theCanvas);


        // Animation Time!!!
    // Generates Our Circles
    let circles = genCircles(100 ,shapes,theCanvas);

    // Animate function sets recursive draw() calls
    const animate = () =>
    {
        return setInterval(draw, 10);
    }
    
    // Draws scene once, calls CircleDrawLoop where implementation of bouncing circles is defined
    const draw = () =>
    {
        clear();
        circleDrawLoop(circles, theCanvas);
    }

    animate();
}

pageLoad();





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