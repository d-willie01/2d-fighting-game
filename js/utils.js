//General function defining the requirements of a hit on an enemy.
//can now call this function as a check for hitting an enemy 
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

function determineWinner({player, enemy, timerId}) {


        clearTimeout(timerId);
        document.querySelector('#displayText').style.display = 'flex'
        if (player.health === enemy.health)
        {
        console.log('tie')
        document.querySelector('#displayText').innerHTML = 'Tie';
        
        
    } else if (player.health > enemy.health)
    {
        document.querySelector('#displayText').innerHTML = 'Player 1 Wins Boi!';
        
    }
    else if (enemy.health > player.health)
    {
        document.querySelector('#displayText').innerHTML = 'Player 2 Wins Brohhhh!';
        
    }
    




}

//timer in the game canvas counting down then checking health for the
//winner
let timer = 60
let timerId
function decreaseTimer () {
    
    if(timer >= 0)
    {
        timerId= setTimeout(decreaseTimer, 1000)
        document.querySelector('#timer').innerHTML = timer
        timer --
        
    }
    if (timer === 0) {
        document.querySelector('#displayText').style.display = 'flex'
        determineWinner({player, enemy, timerId})
    
}
    
}