
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
const gravity = 0.5

//class to create a character, many elements in here that define a 
//general 'character'
class Sprite 
{
    //position and velocity are passed into the class
    constructor({position, velocity, color= 'red', offset})
    {
        //elements that can be manipulated independently from 'characters'
        this.position = position
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey
        this.attackBox =
        {
        position: 
            {
                x: this.position.x,
                y: this.position.y
            },
        offset: offset
       ,
        width: 100,
        height: 50,

        },
        
        this.color = color
        this.isAttaking
    }
    //this methid draws the 'chracters' to be seen on the canvas
    draw() 
    {

        c.fillStyle= this.color
        c.fillRect(this.position.x,this.position.y,this.width,150)

        //attack box
        if(this.isAttacking === true) 
        {
            c.fillStyle = 'green'
            c.fillRect(this.attackBox.position.x, 
            this.attackBox.position.y,
            this.attackBox.width, 
            this.attackBox.height)
        }
        
    }
    //this method is used to update the velocity or postion of the 
    //character on the canvas, and is where gravity comes into play
    update ()
    {
        this.draw()
        this.attackBox.position.x = this.position.x - this.attackBox.offset.x
        this.attackBox.position.y = this.position.y

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

    attack() {
        this.isAttacking = true
       
        setTimeout(()=>{

                this.isAttacking = false

        }, 100)
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
    },
    offset:
    {
        x: 0,
        y: 0
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
    },
    color: "blue",
    offset:
    {
        x: 50,
        y: 0
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
    },
    ArrowRight:
    {
        pressed: false
    },
    ArrowLeft:
    {
        pressed: false
    }
}

function rectangleCollision ({
    rectangle1,
    rectangle2

}) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x
        &&  rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width
        && rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y
        && rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
}


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
    enemy.velocity.x = 0

    //player movement
    if (keys.a.pressed && player.lastKey == 'a')
    {
        player.velocity.x = -5
    } else if (keys.d.pressed && player.lastKey == 'd') {
        player.velocity.x = 5
    }

    //enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastKey == 'ArrowLeft')
    {
        console.log('first')
        enemy.velocity.x = -5
    } else if (keys.ArrowRight.pressed && enemy.lastKey == 'ArrowRight') {
        enemy.velocity.x = 5
    }

    //collision register for player
    if(
        rectangleCollision({
            rectangle1: enemy,
            rectangle2: player
        })

        && player.isAttacking === true)
    {
        console.log('dead')
        player.isAttacking = false;
    }

    //collision register for enemy
    if(
        rectangleCollision({
            rectangle1: player,
            rectangle2: enemy
        })
        
        && enemy.isAttacking === true)
    {
        
        enemy.isAttacking = false;
        console.log(' Enemy dead')

    }


}

animate()

//case statement with an event listener for specific keys pressed
//once pressed, keys generate velocities to move characters
window.addEventListener('keydown', (event) => {
    switch (event.key)
    {
        //player
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            break
        case 'w':
            player.velocity.y = -20
            break
        case ' ':
            player.attack()
            break

        //enemy
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break
        case 'ArrowUp':
            enemy.velocity.y = -20
            break
        case 'ArrowDown':
            enemy.attack()
            break
    }
    console.log(event.key);
})

window.addEventListener('keyup', (event) => {
    switch (event.key)
    {
        //player
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        
       

        //enemy
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
        
        
    }
    console.log(event.key);
})