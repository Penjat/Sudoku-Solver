var curVal = 2;
var curButton;


function createTable() {
  var result = "<table>";


  var j=0;
  for(var x=0;x<3;x++){
    result += "<tr>";
    for(var y=0;y<3;y++){

      result += "<td>"+createMod(j,x*3,y*3)+"</td>";
      j++;
    }
    result += "</tr>";
  }

  result += "</table>";
  return result;
}
function createMod(num,posX,posY){
  var result = "<table" + " id=\"mod" + num + "\">";


  var i =0;
  for(var x=0;x<3;x++){
    result += "<tr>";
    for(var y=0;y<3;y++){
      i++;
      var idY = posX+x;
      var idX = posY+y;
      var cellName = "id=\"cell:"+idX+":"+idY+"\" ";
      result += "<td class=\"cell\" "+cellName +"onclick=\"cellPressed(this)\">" +" " + "</td>";
    }
    result += "</tr>";
  }

  result += "</table>";
  return result;
}

function makeTable(){


  stopSolve();
  document.getElementById("outputData").innerHTML = "<h3>enter a sudoku</h3>";
  document.getElementById("tableCon").innerHTML = createTable();
}
function cellPressed(cell){
  cell.innerHTML = curVal;
}

function setCurValue(i,but){
  if(curButton){
    curButton.style.background='#f2f2f2';
  }
  curButton = but;
  curButton.style.background='#4d94ff';

  if(i == 0){
    curVal = " ";
    return;
  }
  curVal = i;

}

function returnTable(pArray) {
  //
  var result = "<table>";


  var j=0;
  for(var x=0;x<3;x++){
    result += "<tr>";
    for(var y=0;y<3;y++){

      result += "<td>"+returnMod(j,pArray,x*3,y*3)+"</td>";
      j++;
    }
    result += "</tr>";
  }

  result += "</table>";
  return result;
}
function returnMod(num,pArray,offsetX,offsetY){
  var result = "<table" + " id=\"mod" + num + "\">";


  var i =0;
  for(var x=0;x<3;x++){
    result += "<tr>";
    for(var y=0;y<3;y++){
      i++;
      var cell = pArray[offsetY + y][offsetX + x];
      if(cell.isReal){
        result += "<td class=\"cell\" onclick=\"cellPressed(this)\"><strong>" +cell.curNum + "</strong></td>";
      }else{
        result += "<td class=\"cell\" onclick=\"cellPressed(this)\">" +cell.curNum + "</td>";
      }

    }
    result += "</tr>";
  }

  result += "</table>";
  return result;
}
function notSolvable(){
  document.getElementById("outputData").innerHTML = "<h3>puzzle not solvable</h3>";
}
function puzzleSolved(puzzleArray){
  console.log("Puzzle Solved!!!");
  console.log(puzzleArray);
  document.getElementById("tableCon").innerHTML = returnTable(puzzleArray);
  document.getElementById("outputData").innerHTML = "<h3>Puzzle Solved</h3>";
}
function puzzleSolving(){

  document.getElementById("outputData").innerHTML = "<h3>Solving...</h3>";
}
