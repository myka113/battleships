
const grid = document.getElementById('grid')
const chunk = document.getElementsByClassName('chunk')

let chunks=[]

for(let y=0; y<=9; y++){
  chunks.push([])
  for(let x=0; x<=9; x++){
    chunks[y].push(x)
    grid.innerHTML+=`<div class="chunk" onclick="shoot(${y},${x});"></div>`
  }
}

console.log(chunks);

let ship=[]

generateShip(4)

generateShip(3)
generateShip(3)

generateShip(2)
generateShip(2)
generateShip(2)

generateShip(1)
generateShip(1)
generateShip(1)
generateShip(1)


let checkCount=0

while(touchCheck()){
  ship=[]

  generateShip(4)
  
  generateShip(3)
  generateShip(3)
  
  generateShip(2)
  generateShip(2)
  generateShip(2)
  
  generateShip(1)
  generateShip(1)
  generateShip(1)
  generateShip(1)

  checkCount++
}

console.log(`-----loop count-----`);
console.log(checkCount);

function touchCheck(){
  let trigger=false
  for(let i=0; i<ship.length; i++){
    for(let j=0; j<ship[i].length; j++){
      
      for(let i2=0; i2<ship.length; i2++){
        for(let j2=0; j2<ship[i2].length; j2++){
          if(ship[i2]!==ship[i]){
            if((ship[i2][j2][0]===ship[i][j][0]&&ship[i2][j2][1]===ship[i][j][1])||isItTouching(i, j, i2, j2)){
              trigger=true
            }
          }
          
        }
      }
      
    }
  }


  if(trigger){
    return true
  }
  else{
    return false
  }
}


function isItTouching(i, j, i2, j2){
  if(ship[i2][j2][0]+1===ship[i][j][0]&&ship[i2][j2][1]===ship[i][j][1]){
    return true
  }
  if(ship[i2][j2][0]===ship[i][j][0]&&ship[i2][j2][1]+1===ship[i][j][1]){
    return true
  }
  
  if(ship[i2][j2][0]+1===ship[i][j][0]&&ship[i2][j2][1]+1===ship[i][j][1]){
    return true
  }
  if(ship[i2][j2][0]-1===ship[i][j][0]&&ship[i2][j2][1]-1===ship[i][j][1]){
    return true
  }

  if(ship[i2][j2][0]-1===ship[i][j][0]&&ship[i2][j2][1]+1===ship[i][j][1]){
    return true
  }
  if(ship[i2][j2][0]-1===ship[i][j][0]&&ship[i2][j2][1]+1===ship[i][j][1]){
    return true
  }
  
}





console.log('--------------------');
console.log(ship);

function generateShip(num){
  let shipCordinates=[]
  let xory=0
  if(Math.floor(Math.random() * 2)){
    xory='x'
  }else{
    xory='y'
  }
  let origin=[]
  let originy
  let originx
  if(xory==='y'){
    originy=Math.floor(Math.random() * (11-num))
  }
  else{
    originy=Math.floor(Math.random() * 10)
  }
  if(xory==='x'){
    originx=Math.floor(Math.random() * (11-num))
  }
  else{
    originx=Math.floor(Math.random() * 10)
  }

  


  origin.push(originy)
  origin.push(originx)

  shipCordinates.push(origin)
  if(num!==1){
    let neighbours=[]
    let county=originy
    let countx=originx
    for(let i=1; i<num; i++){

      if(xory==='y'){
        if(county<9){
          county++
          neighbours.push([county, originx])
        }
      }

      if(xory==='x'){
        if(countx<9){
          countx++
          neighbours.push([originy, countx])
        }
      }

      
    }

    for(let i=0; i<neighbours.length; i++){
      shipCordinates.push(neighbours[i])
    }
  }


  ship.push(shipCordinates)
}

let shipParts=20
let shots=0


const shotsFired = document.getElementById('shotsFired')
const curtain = document.getElementById('curtain')
const winScren = document.getElementById('winScren')

function shoot(y,x){
  let whichChunk=(y*10)+x
  let trigger=false
  for(let i=0; i<ship.length; i++){
    for(let j=0; j<ship[i].length; j++){

      if(y===ship[i][j][0]&&x===ship[i][j][1]){
        trigger=true
      }

    }
  }
  if(trigger){
    chunk[whichChunk].classList.add("red");
    shipParts--
  }else{
    chunk[whichChunk].classList.add("blue");
    shots++
    shotsFired.innerHTML=`shots missed: ${shots}`
  }
  chunk[whichChunk].onclick=null
  if(shipParts===0){
    curtain.style.display="block"
    winScren.innerHTML=`YOU WIN !!! (shots missed: ${shots})`
  }
}
