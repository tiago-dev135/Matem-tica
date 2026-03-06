let lives=5
let score=0
let level=1

let timer=10
let timerInterval

let progress=0
let progressMax=5

const area=document.getElementById("area")
const timerDisplay=document.getElementById("timer")
const livesDisplay=document.getElementById("lives")
const scoreDisplay=document.getElementById("score")
const levelDisplay=document.getElementById("level")
const progressBar=document.getElementById("progress")

const bgMusic=document.getElementById("bgMusic")
const correctSound=document.getElementById("correctSound")
const wrongSound=document.getElementById("wrongSound")

document.getElementById("startBtn").onclick=startGame

function startGame(){

document.getElementById("startScreen").style.display="none"

bgMusic.play()

spawnQuestion()

}

function spawnQuestion(){

area.innerHTML=""

let q=generateQuestion()

let box=document.createElement("div")
box.className="box"

box.innerHTML=`
<label>${q.question}</label><br><br>
<input id="answer">
<button onclick="checkAnswer(${q.answer})">OK</button>
`

area.appendChild(box)

document.getElementById("answer").focus()

startTimer()

}

function startTimer(){

timer=10
timerDisplay.innerText=timer

clearInterval(timerInterval)

timerInterval=setInterval(()=>{

timer--

timerDisplay.innerText=timer

if(timer<=0){

clearInterval(timerInterval)

loseLife()

}

},1000)

}

function checkAnswer(correct){

let user=parseFloat(document.getElementById("answer").value)

clearInterval(timerInterval)

if(user===correct){

correctSound.play()

score+=10
scoreDisplay.innerText=score

progress++

updateProgress()

spawnQuestion()

}else{

wrongSound.play()

loseLife()

}

}

function loseLife(){

lives--

livesDisplay.innerText=lives

if(lives<=0){

Swal.fire("Game Over","Pontuação: "+score,"error")

location.reload()

}

spawnQuestion()

}

function updateProgress(){

let percent=(progress/progressMax)*100

progressBar.style.width=percent+"%"

if(progress>=progressMax){

nextLevel()

}

}

function nextLevel(){

level++

progress=0

levelDisplay.innerText=level

Swal.fire({
title:"Parabéns!",
text:"Você passou para o nível "+level,
icon:"success"
})

spawnQuestion()

}

function generateQuestion(){

if(level===1){

let a=Math.floor(Math.random()*10)
let b=Math.floor(Math.random()*10)

let ops=["+","-","*"]

let op=ops[Math.floor(Math.random()*ops.length)]

let question=`${a} ${op} ${b}`

let answer=eval(question)

return{question,answer}

}

if(level===2){

let a=Math.floor(Math.random()*10)
let b=Math.floor(Math.random()*10)

let question=`João tinha ${a} maçãs e ganhou mais ${b}. Quantas ele tem?`

let answer=a+b

return{question,answer}

}

if(level===3){

let a=Math.floor(Math.random()*10)
let b=Math.floor(Math.random()*10)
let c=Math.floor(Math.random()*10)

let question=`${a} + ${b} * ${c}`

let answer=a + b * c

return{question,answer}

}

if(level===4){

let a=Math.floor(Math.random()*10)
let b=Math.floor(Math.random()*10)
let c=Math.floor(Math.random()*10)

let question=`(${a} + ${b}) * ${c}`

let answer=(a+b)*c

return{question,answer}

}

if(level>=5){

let a=Math.floor(Math.random()*5)
let b=Math.floor(Math.random()*3)+2

let question=`${a}^${b}`

let answer=Math.pow(a,b)

return{question,answer}

}

}