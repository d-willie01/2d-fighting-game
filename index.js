
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


//player character created calling the class, with intial postions,
//as well as intial velocities

const background = new Sprite ({
    position:
    {
        x:0,
        y:0
    },
    imageSrc: './assets/background.jpg'
})

const shop = new Sprite ({
    position:
    {
        x:650,
        y:256
    },
    imageSrc: './assets/shop_anim.png',
    scale: 2.5,
    framesMax: 6
})


const player = new Fighter({
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
    },
    imageSrc: './assets/samStanceFinal.png',
    framesMax: 5,
    offset: {
        x: 0,
        y:187
    }

})

console.log(player)


//enemy created calling the above class, with it,s own intial postions,
//and velocities as well
const enemy = new Fighter({
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
    },
    imageSrc: './assets/dariusStance.png',
    framesMax: 5,
    offset: {
        x: -450,
        y:140
    }
    //scale: .75

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




decreaseTimer()


//function to animate and progress movement and frames on the canvas
//runs in a loop and is essentially the play button for the game
function animate() {
    
    
    //here is the loop ran animating the animate function, thus 
    //creating the loop
    window.requestAnimationFrame(animate);


    c.fillStyle = 'black'
    c.fillRect(0,0,canvas.width,canvas.height)
    background.update();
    shop.update();
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
        enemy.health -= 10
        document.querySelector('#enemyHealth').style.width = enemy.health + '%'
        player.isAttacking = false;
    }

    //collision register for enemy
    if(
        //function call for collison passing in the two rectangle 
        //params
        rectangleCollision({
            rectangle1: player,
            rectangle2: enemy
        })
        
        && enemy.isAttacking === true)
    {
        
        
        player.health -= 10
        document.querySelector('#playerHealth').style.width = player.health + '%'
        console.log(' Enemy dead')
        enemy.isAttacking = false;

    }

    //end game based on health
    if (enemy.health <= 0 || player.health <= 0)
    {
        determineWinner({player, enemy, timerId})
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
            //calling method from class to check to see for points
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
            //calling method from class to check to see for points
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