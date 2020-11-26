
const cardContainer = document.getElementById('cardContainer')
const footer = document.getElementById('footer')
const timer = document.getElementById('timer')

const card = document.getElementsByClassName('card')

function getInputValue(){
  var inputVal = document.getElementById("myInput").value;
  if(inputVal+1!=inputVal+2-1){
    alert(`${inputVal} is not a number`);
  }
  else{
    alert(`${inputVal} card pairs generated`);
    footer.style.display='none'
    generateCards(inputVal*1)
    timer.innerHTML=`TIMER: ${inputVal*inputVal+5}`
  }
}

let timerStarted=false

let cardsArr=[]

let biggestNum=1

function generateCards(inputVal){
  console.log(inputVal);

  for(let i=0; i<inputVal; i++){
    cardsArr.push(biggestNum)
    cardsArr.push(biggestNum)
    biggestNum++
  }
  console.log(cardsArr);
  shuffleArray(cardsArr)
  console.log(cardsArr);


  for(let i=0; i<inputVal*2; i++){
    cardContainer.innerHTML+=`<div class="card" onclick="flip(${i});"></div>`
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}

let cardPressed=false
let cardPressedNum=false
let whichCard2=false

function flip(whichCard) {
  if(!timerStarted){
    startTimer(cardsArr.length/2)
    timerStarted=true
  }
  whichCard2=whichCard
  if(!cardPressed){
    cardPressed=cardsArr[whichCard]
    cardPressedNum=whichCard
    console.log(cardPressedNum);
    card[whichCard].innerHTML=`${cardsArr[whichCard]}`
  }
  else{
    card[whichCard].innerHTML=`${cardsArr[whichCard]}`
    if(cardPressed===cardsArr[whichCard]){
      console.log('true');
      card[cardPressedNum].classList.add("noClick");
      card[whichCard2].classList.add("noClick");
      card[cardPressedNum].onclick=null
      card[whichCard2].onclick=null
    }
    else{
      console.log('false');
      curtain.style.display='block'
      setTimeout(flipDown, 2000)
    }
    cardPressed=false
  }
}

function flipDown(){
  curtain.style.display='none'
  card[cardPressedNum].innerHTML=''
  card[whichCard2].innerHTML=''
  cardPressedNum=false
}

let time=0

function startTimer(inputVal){
  time=inputVal*inputVal+5
  timer.innerHTML=`TIMER: ${time}`
  count()
}


function count(){
  setInterval(subtractASecond, 1000)
}

function subtractASecond(){
  if(time){
    console.log(time);
    time--
    timer.innerHTML=`TIMER: ${time}`
  }
  else{
    timer.innerHTML=`OUT OF TIME !!!`
    timer.style.fontSize='100px'
    curtain.style.display='block'
  }
}


