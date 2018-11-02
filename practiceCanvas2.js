
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

                setX(newX) {x = newX},
                setY(newY) {y = newY}
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

    genCircles = (num) =>
    {
        let circles = [];
        let x; let y;

        for (let i = 0; i < num; i++)
        {
            x = Math.random() * 600;
            y = Math.random() * 600;
            circles.push(shapes.Circle(x,y, 50));
        }

        return circles;
    }
    let circ = genCircles(50);


    let moveX = 1.5; let moveY = 1.5;

    const animate = () =>
    {
        return setInterval(draw, 10);
    }

    const draw = () =>
    {
        clear();

                // animated
        // let newCircle = shapes.Circle(startX,startY, 50);
        // newCircle.draw();

        

       
        // Creating newX and newY, which are coordinate values based on the last draw() iteration, plus some sort of movement value, which keeps changing.
        circ[2].draw();

        let currentX = circ[2].getX();
        let currentY = circ[2].getY();

        let newX = currentX + moveX;
        let newY = currentY + moveY;
        
        circ[2].setX(newX);
        circ[2].setY(newY);


        if (circ[2].getX() + 50 > canvas.width || circ[2].getX() - 50 < 0)
        {
            moveX = -moveX;
        }
        if (circ[2].getY() + 50 > canvas.height || circ[2].getY() - 50 < 0)
        {
            moveY = -moveY;
        }


            
        for (let i = 0; i < circ.length; i++)
        {
            //circ[i].draw();

        }

        
        
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