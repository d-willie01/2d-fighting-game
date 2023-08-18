
class Sprite 
{
    constructor({position, imageSrc, scale = 1, framesMax = 1})
    {

        this.position = position
        this.width = 50
        this.height = 150
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5
    }
  
    draw() 
    {
            c.drawImage(

                this.image,
                this.framesCurrent * (this.image.width / this.framesMax),
                0,
                this.image.width/ this.framesMax,
                this.image.height,



                this.position.x,  
                this.position.y, 
                (this.image.width / this.framesMax) * this.scale, 
                this.image.height * this.scale)
    }

    update ()
    {

        this.draw()
        this.framesElapsed++

        if (this.framesElapsed % this.framesHold === 0) {
        if(this.framesCurrent < this.framesMax - 1)
        {
            this.framesCurrent++
        } else {
            this.framesCurrent = 0
        }
    }
        
    }

}

class Fighter 
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

        //attackbox general area to land hitpoints on enemy, offset
        //is passed in to specify side of attack
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
        
        //can specify color of sprite, passed in
        this.color = color

        //true or false boolean to indicate if attack is happening
        this.isAttaking

        //health of player
        this.health = 100
    }
    //this methid draws the 'characters' to be seen on the canvas
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

    //method created to indicate attack from a created character, 
    //only active for short amount of time using setTimeout function
    attack() {
        this.isAttacking = true
       
        setTimeout(()=>{

                this.isAttacking = false

        }, 100)
    }
}