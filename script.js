/* ================================
VARIÁVEIS DO JOGO
================================ */

let vidas = 5
let pontos = 0
let nivel = 1
let progresso = 0
let metaNivel = 5
let intervalo = null
let tempo = 10
let respostaCorreta = 0
let modo = "normal"

/* esconder campo resposta no inicio */

document.getElementById("respostaContainer").style.display = "none"


/* ================================
INICIAR MODO
================================ */

function iniciarModo(m){

modo = m

Swal.fire({
title:"Modo selecionado",
text:"Modo "+m+" ativado!",
icon:"success",
timer:1200,
showConfirmButton:false
})

}


/* ================================
BOTÃO INICIAR GAME
================================ */

document.getElementById("startBtn").onclick = ()=>{

document.getElementById("startSound").play()

setTimeout(()=>{

document.getElementById("startScreen").style.display="none"

/* mostrar campo resposta apenas no mobile */

if(window.innerWidth <= 600){
document.getElementById("respostaContainer").style.display="flex"
}

/* música */

let music = document.getElementById("bgMusic")
music.volume = 0.3
music.play()

novaRodada()

},400)

}


/* ================================
GERAR PERGUNTA
================================ */

function gerarPergunta(){

let a = Math.floor(Math.random()*10)+1
let b = Math.floor(Math.random()*10)+1

let operador = ["+","-","*"][Math.floor(Math.random()*3)]

let pergunta = ""

if(operador=="+"){
respostaCorreta = a + b
pergunta = `${a} + ${b}`
}

if(operador=="-"){
respostaCorreta = a - b
pergunta = `${a} - ${b}`
}

if(operador=="*"){
respostaCorreta = a * b
pergunta = `${a} × ${b}`
}

return pergunta

}


/* ================================
NOVA RODADA
================================ */

function novaRodada(){

clearInterval(intervalo)

tempo = 10
document.getElementById("timer").innerText = tempo

let pergunta = gerarPergunta()

let area = document.getElementById("area")

area.innerHTML = ""

let box = document.createElement("div")
box.className = "boxPergunta"

box.innerHTML = `
<h2>${pergunta}</h2>
`

area.appendChild(box)

/* botões resposta desktop */

if(window.innerWidth > 600){

let respostas = gerarAlternativas()

let respostasDiv = document.createElement("div")
respostasDiv.className="respostas"

respostas.forEach(r=>{

let btn = document.createElement("button")
btn.className="respostaBtn"
btn.innerText = r

btn.onclick=()=>verificarResposta(r)

respostasDiv.appendChild(btn)

})

area.appendChild(respostasDiv)

}

/* timer */

intervalo = setInterval(()=>{

tempo--

document.getElementById("timer").innerText = tempo

if(tempo <= 0){

clearInterval(intervalo)

errar()

}

},1000)

}


/* ================================
GERAR ALTERNATIVAS
================================ */

function gerarAlternativas(){

let arr = [respostaCorreta]

while(arr.length < 4){

let fake = respostaCorreta + Math.floor(Math.random()*10)-5

if(!arr.includes(fake)){
arr.push(fake)
}

}

return arr.sort(()=>Math.random()-0.5)

}


/* ================================
CONFIRMAR RESPOSTA MOBILE
================================ */

document.getElementById("confirmarBtn").onclick = ()=>{

let valor = parseInt(document.getElementById("respostaInput").value)

verificarResposta(valor)

document.getElementById("respostaInput").value=""

}


/* ================================
VERIFICAR RESPOSTA
================================ */

function verificarResposta(valor){

clearInterval(intervalo)

if(valor == respostaCorreta){

acertar()

}else{

errar()

}

}


/* ================================
ACERTO
================================ */

function acertar(){

document.getElementById("correctSound").play()

pontos += 10
progresso++

document.getElementById("pontos").innerText = pontos

atualizarBarra()

if(progresso >= metaNivel){

nivel++
progresso = 0
metaNivel += 2

document.getElementById("nivel").innerText = nivel

Swal.fire({
title:"Subiu de nível!",
icon:"success",
timer:1200,
showConfirmButton:false
})

}

setTimeout(novaRodada,800)

}


/* ================================
ERRO
================================ */

function errar(){

document.getElementById("wrongSound").play()

vidas--

document.getElementById("vidas").innerText = vidas

if(vidas <= 0){

gameOver()

}else{

setTimeout(novaRodada,800)

}

}


/* ================================
BARRA DE PROGRESSO
================================ */

function atualizarBarra(){

let porcentagem = (progresso/metaNivel)*100

document.getElementById("progressBar").style.width = porcentagem+"%"

}


/* ================================
GAME OVER
================================ */

function gameOver(){

Swal.fire({
title:"Game Over",
text:"Pontuação: "+pontos,
icon:"error",
confirmButtonText:"Voltar ao menu"
}).then(()=>{

voltarMenu()

})

}


/* ================================
VOLTAR MENU
================================ */

function voltarMenu(){

clearInterval(intervalo)

/* parar música */

let music = document.getElementById("bgMusic")
music.pause()
music.currentTime = 0

/* esconder campo resposta */

document.getElementById("respostaContainer").style.display="none"

/* reset */

vidas = 5
pontos = 0
nivel = 1
progresso = 0
metaNivel = 5

document.getElementById("vidas").innerText = vidas
document.getElementById("pontos").innerText = pontos
document.getElementById("nivel").innerText = nivel
document.getElementById("progressBar").style.width = "0%"

/* limpar area */

let area = document.getElementById("area")
area.innerHTML=""

/* voltar tela inicial */

let start = document.getElementById("startScreen")
start.style.display="flex"

area.appendChild(start)

}