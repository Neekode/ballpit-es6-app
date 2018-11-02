// Canvas Drawing:

// Notes- Maybe I should draw the whole thing out manually before trying to
// automate the process.

// - Wrote a closure all by myself!!!
// Break things into smaller pieces.

// Attempting to write drawCircle function as a closure. Purpose is to
// encapsulte the context variable within the function's  
// execution context at runtime.

// function returns a function object which has available
// the context initially put in at initialization, without having the write it in everytime.

// For my closure, i can return an object which contains multiple
// functions and properties, which can be accessed later


const createDrawer = function(canvas,context)
{
    return{
        resizeCanvas: function()
        {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        },

        drawPoint: function(x,y)
        {
            if (typeof x === "number" && typeof y === "number")
            {
                context.beginPath();
                context.arc(x,y,2,0, 2* Math.PI);
                context.fill();
                context.stroke();
            }   else throw console.error("Arguments Not Numbers!");
        },


        drawCircle: function(x,y,r)
        {
            if (typeof x === "number" && typeof y === "number")
            {
                context.beginPath();
                context.arc((x*100),(y*100), r, 0, 2 * Math.PI);
                context.stroke();
            } else throw console.error("Arguments Not Numbers!");
        },


        drawCircleLine: function(x,y,r, circleCount, direction, animated)
        {
            
            let count = 0;
            while (count < circleCount)
            {
                this.drawCircle(x,y,r);
                this.drawPoint(x*100,y*100);
                switch (direction)
                {
                    case 'right':
                    {
                        x++;
                        break;
                    }
                    case 'left':
                    {
                        x--;
                        break;
                    }
                    case 'down':
                    {
                        y++;
                        break;
                    }
                    case 'up':
                    {
                        y--;
                        break;
                    }
                }
                count++;
            }
        }
    }
}

// Draw Script
const init = function(artist)
{
    // On initialize resize canvas to current window
    
    artist.resizeCanvas();

    // Drawing
    artist.drawCircleLine(0,0,300,10,'right');
    artist.drawCircleLine(0,10,300,10,'right');
    
    artist.drawCircleLine(0,5,100,14,'right');
    artist.drawCircleLine(5,0,100,14,'down');
}


// Variable Declaration and Canvas Initialization
const c = document.getElementById('myCanvas');
const ctx = c.getContext('2d');
const theArtist = createDrawer(c,ctx);
init(theArtist);










// Arrow Function Practice

// const sum = function(n1,n2)
// {
//     if (typeof n1 == "number" && typeof n2 == "number")
//     {
//         return n1 + n2;
//     }    
//     return "Invalid Arguments";
// }

// const sum2 = (n1,n2) => 
// {
//     if (typeof n1 == "number" && typeof n2 == "number")
//     {
//         return n1 + n2;
//     }    
//     return "Invalid Arguments";
// }

// console.log(sum(3,3));
// console.log(sum2(4,4));
