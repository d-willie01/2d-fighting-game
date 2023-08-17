
//getting 'canvas' tag from HTML document
const canvas = document.querySelector("canvas")

//setting the canvas context in the Document to
//read it as 2D
const c = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576

//fills the canvas with a rectangle, passes 
// 4 arguments (x position start, y position start, width, height)
c.fillRect(0,0,canvas.width,canvas.height)

//gravity constant to pull objects down if they are above
//canvas bottom
const gravity = 0.2

//class to create a character, many elements in here that define a 
//general 'character'
class Sprite 
{
    //position and velocity are passed into the class
    constructor({position, velocity})
    {
        //elements that can be manipulated independently from 'characters'
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.lastKey
    }
    //this methid draws the 'chracters' to be seen on the canvas
    draw() 
    {

        c.fillStyle= 'red'
        c.fillRect(this.position.x,this.position.y,50,150)
    }
    //this method is used to update the velocity or postion of the 
    //character on the canvas, and is where gravity comes into play
    update ()
    {
        this.draw()

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.velocity.y += gravity

        //loop created to check of character is above the canvas bottom,
        //if so it adds gravity back constantly until it hits bottom
        if (this.position.y + this.height + this.velocity.y >= canvas.height)
        {
            this.velocity.y = 0
        } else this.velocity.y += gravity
    }
}

//player character created calling the class, with intial postions,
//as well as intial velocities
const player = new Sprite({
    position: 
    {
        x: 0,
        y: 0
    },
    velocity:
    {
        x:0,
        y:0
    }

})

console.log(player)


//enemy created calling the above class, with it,s own intial postions,
//and velocities as well
const enemy = new Sprite({
    position: 
    {
        x: 400,
        y: 100
    },
    velocity:
    {
        x:0,
        y:0
    }

})

const keys = 
{
    a: 
    {
        pressed: false
    },
    d:
    {
        pressed: false
    },
    w:
    {
        pressed: false
    }
}

let lastKey


//function to animate and progress movement and frames on the canvas
//runs in a loop and is essentially the play button for the game
function animate() {
    
    
    //here is the loop ran animating the animate function, thus 
    //creating the loop
    window.requestAnimationFrame(animate);


    c.fillStyle = 'black'
    c.fillRect(0,0,canvas.width,canvas.height)
    player.update()
    enemy.update()
    player.velocity.x = 0
    if (keys.a.pressed && lastKey == 'a')
    {
        player.velocity.x = -1
    } else if (keys.d.pressed && lastKey == 'd') {
        player.velocity.x = 1
    }

}

animate()

//case statement with an event listener for specific keys pressed
//once pressed, keys generate velocities to move characters
window.addEventListener('keydown', (event) => {
    switch (event.key)
    {
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break
        case 'w':
            player.velocity.y = -10
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break
        case 'ArrowUp':
            enemy.velocity.y = -10
            break
    }
    console.log(event.key);
})

window.addEventListener('keyup', (event) => {
    switch (event.key)
    {
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 'w':
            keys.w.pressed = false
            break
        
    }
    console.log(event.key);
})