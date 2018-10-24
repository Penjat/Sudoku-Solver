  var puzzleArray;


function solve(){
  //var document.getElementById("mod1").style.color = "red";
  //console.log(document.getElementById("mod1"));

  puzzleArray = new Array();
    for(var x=0;x<9;x++){
      puzzleArray[x] = new Array();
      for(var y=0;y<9;y++){
        puzzleArray[x][y] = 0;
      }
    }
    fillArray();
    if(!checkSolvable()){
      //if not solveable
      notSolvable();
      return;
    }

    var numLoops = 0;
    var solving = true;
    var pos = {x:0,y:0};
    var isGoingBack = false;
    //-------------------------------------------
    console.log("Solving...");
    

    while(solving){
      numLoops++;
      var curCell = puzzleArray[pos.x][pos.y];

      //if it is a real value
      if(curCell.isReal){
        //if it is going back
        if(isGoingBack){
          //keep going back
          pos = goBack(pos);
          //check if back at begining
          if(checkBeg(pos)){
            solving = false;
            puzzleSolved(puzzleArray);
          }
          //if it is going forward
        }else{
          //keep going forward
          pos = addPos(pos);
          //check if we are at the end
          solving = checkEnd(pos);
        }
        //if it is not a real value
      }else{
        //check the posibilities
        curCell.curNum = checkPosNums(pos,curCell.curNum);
        //if no posibilities were found
        if(curCell.curNum == 0){
          //Go back
          pos = goBack(pos);
          isGoingBack = true;
          //check if we are at the begining
          if(checkBeg(pos)){
            solving = false;
            puzzleSolved(puzzleArray);
          }

        }else{

          //adds the position, returns false when we reach the end
          isGoingBack = false;
          pos = addPos(pos);
          solving = checkEnd(pos);
        }
      }


      //-------------------------------------------
    }
    console.log("number of loops = " + numLoops);

  return;

}

function goBack(pos){
  pos.x--;
  if(pos.x <0){
    pos.x = 8;
    pos.y--;
  }
  return pos;
}
function checkBeg(pos){
  //checks if solving has failed, are we back at the begining
  if(pos.y<0){
    return true;
  }
  return false;
}
function addPos(pos){
  //moves the pos forward, is called when a number is sucsessfully found
  pos.x++;
  if(pos.x >= 9){
    pos.x = 0;
    pos.y++;
  }
  return pos;

}
function checkEnd(pos){
  if(pos.y == 9){
    puzzleSolved(puzzleArray);
    return false;
  }
  return true;

}
function checkPosNums(pos,num){
  //returns the lowest posible number that the cell could be
  //returns 0 if no possible number
  for(var i=num+1;i<10;i++){
    if(checkRow(i, pos.x ,pos.y) || checkCol(i, pos.x ,pos.y)|| checkMod(i, pos.x ,pos.y)){
      //keep looping
      console.log(" " + i + " doesn't work");
    }else{
      //found a posible number
      console.log(" " + i + " will work");
      return i;
    }
  }
  //no posible numbers found
  return 0;
}


function getMod(name,offsetX,offsetY){
  var oTable = document.getElementById(name);
  var rowLength = oTable.rows.length;
  for (i = 0; i < rowLength; i++){
    var oCells = oTable.rows.item(i).cells;

    var cellLength = oCells.length;

    for(var j = 0; j < cellLength; j++){

      var cellVal = oCells.item(j).innerHTML;
      if(cellVal == " "){
        var c = {isReal:false,curNum:0};
        puzzleArray[j+offsetY][i+offsetX] = c;

      }else{
        var c = {isReal:true,curNum:parseInt(cellVal)};
        puzzleArray[j+offsetY][i+offsetX] = c;
      }
    }
  }
}
function fillArray(){
  var x=0;
  var y=0;
  for(var i=0;i<9;i++){
    var name = "mod"+i;
    getMod(name,x*3,y*3);
    y++;
    if(y>2){
      y=0;
      x++;
    }
  }





}

//--------------------------Solving-------------------------
function checkSolvable(){

  for(var x=0;x<9;x++){
    for(var y=0;y<9;y++){
      var val = puzzleArray[x][y].curNum;
      if(val != 0){

        if(checkRow(val, x ,y) || checkCol(val,x ,y)|| checkMod(val,x ,y)){
          console.log("puzzle not solvable");
          return false;
        }
      }
    }
    return true;
  }

  console.log("puzzle looks ok");



}
function checkRow(val,posX,posY){
  //returns true if there is a conflict

  //var val = puzzleArray[posX][posY].curNum;


  for(var x=0;x<9;x++){
    if(x==posX){
      //don't do anything, is the cell we are looking at
    }else{
      var val2 = puzzleArray[x][posY].curNum;
      //console.log(val + " "+val2);
      if( val2 != 0 && val == val2){
        //there is a conflict

        return true;
      }
    }
  }
  return false;
}
function checkCol(val,posX,posY){
  //returns true if there is a conflict

  //var val = puzzleArray[posX][posY].curNum;


  for(var y=0;y<9;y++){
    if(y==posY){
      //don't do anything, is the cell we are looking at
    }else{
      var val2 = puzzleArray[posX][y].curNum;
      //console.log(val + " "+val2);
      if( val2 != 0 && val == val2){
        //there is a conflict
        return true;
      }
    }
  }
  return false;
}
function findOffset(pos){
  //determins which of the 9 smaller grids this is a part of
  //works the same for x or y

  if(pos<3){
    return 0;
  }
  if(pos<6){
    return 3;
  }
  return 6;
}
function checkMod(val,posX,posY){
  //checks the smaller grid for contradctions
  var offsetX = findOffset(posX);
  var offsetY = findOffset(posY);
  //var val = puzzleArray[posX][posY].curNum;

  for(var x=offsetX;x<offsetX+3;x++){
    for(var y=offsetY;y<offsetY+3;y++){
      if(posX == x && posY == y){
        //do nothing, this is the cell we are looking at
      }else{
        var val2 = puzzleArray[x][y].curNum;
        //console.log(val + " "+val2);
        if(val2 != 0 && val == val2){
          return true;
        }
      }
    }
  }
  return false;

}
