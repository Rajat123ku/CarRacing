class Game {
  constructor(){}
  
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
   
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = database.ref("playerCount").once("value")
      console.log(playerCountRef);
      if(playerCountRef !== undefined){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
  }
  play(){
    form.hide();
    textSize(30);
    text("Game Start",120,100)
    if(allPlayers !== undefined){
      var displayPosition = 130;

      for(var i in allPlayers){
        if(i === "player" + player.index){
          fill("red");
        }
        else{
          fill("black")
        }
        displayPosition = displayPosition + 20;
        textSize(15);
        text(i.name + ":"+ i.distance,displayPosition)
      } 
    }
        if(keyDown(UP_ARROW) && player.index !== null){
          player.distance = player.distance + 50;
          player.update();
        }
  }
}
