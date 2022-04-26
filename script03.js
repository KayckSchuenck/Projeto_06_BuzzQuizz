let quizz = {
    title: "",
    image: "",
    questions: [],
    levels: []
}
let numeroQuestions;
let numeroLevels;
let quantosQuizzes=0
let contadorValidacao;
function tela08() {
    document.querySelector(".tela3_container").innerHTML = `
    <div class="tela8">
    <form onsubmit="preencherQuizz();tela09();">
        Comece pelo começo
        <div class="informacoesTela8">
        <input type="text" minlength="20" maxlength="65" placeholder="Título do seu quizz" required></input>
        <input type="url" placeholder="URL da imagem do seu quizz" required>
        <input type="number" min="3" placeholder="Quantidade de perguntas do quizz" required></input>
        <input type="number" min="2" placeholder="Quantidade de níveis do quizz" required></input>
        </div>
        <button>
        Prosseguir pra criar perguntas
        </button>
    </form>
    </div> `
}

function preencherQuizz() {
    quizz.title = document.querySelector(".informacoesTela8 input:nth-child(1)").value
    quizz.image = document.querySelector(".informacoesTela8 input:nth-child(2)").value
    numeroQuestions = document.querySelector(".informacoesTela8 input:nth-child(3)").value
    numeroLevels = document.querySelector(".informacoesTela8 input:nth-child(4)").value
    console.log(quizz)
}

function tela09() {
    document.querySelector(".tela3_container").innerHTML += `
    <div class="tela9">
        Crie suas perguntas
    </div> `
    for (let i = 0; i < numeroQuestions; i++) {
        document.querySelector(".tela9").innerHTML += `
        <div class="perguntas">
            <div class="fechada" onclick="abrirPerguntaNivel(this)">
            Pergunta ${i + 1} <img src="midia/image/icone.svg">
            </div>
            <div class="aberta hidden">
                <div class="iniciodaPergunta">
                    <span>Pergunta${i + 1}</span>
                    <input type="text" minlength="20" placeholder="Texto da pergunta"></input>
                    <input type="color" placeholder="Cor de fundo da pergunta"></input>
                    <span>Resposta Correta</span>
                    <input type="text" class="resp" placeholder="Resposta correta"></input>
                    <input type="url" class="URL" placeholder="URL da imagem"></input>
                </div>
                <div class="respostasIncorretas">
                    <span>Resposta Incorreta</span>
                    <input type="text" name="resposta${i}" class="resp" placeholder="Resposta incorreta 1"></input>
                    <input type="url" name="resposta${i}" class="URL" placeholder="URL da imagem 1"></input>
                    <input type="text" name="resposta${i}" placeholder="Resposta incorreta 2"></input>
                    <input type="url" name="resposta${i}" class="URL2" placeholder="URL da imagem 2"></input>
                    <input type="text" name="resposta${i}" placeholder="Resposta incorreta 3"></input>
                    <input type="url" name="resposta${i}" class="URL2" placeholder="URL da imagem 3"></input>
                </div>
            </div>
        </div>`
    }
    document.querySelector(".tela9").innerHTML += `
    <button onclick="validarQuestions()">
    Prosseguir pra criar níveis
    </button>`
    document.querySelector(".tela8").classList.toggle("hidden")
}

function abrirPerguntaNivel(elemento) {
    elemento.classList.toggle("hidden")
    elemento.parentNode.lastElementChild.classList.toggle("hidden")
}

function validarQuestions(){
let elemento;
let invalido=false;
elemento=document.querySelectorAll(".iniciodaPergunta input:nth-child(2)")
for(let i=0;i<elemento.length;i++){
    if(elemento[i].value<20){
        invalido=true
    }
}
console.log(elemento)
console.log(invalido)
elemento=document.getElementsByClassName("resp")
for(let i=0;i<elemento.length;i++){
    if(elemento[i].value===""){
        invalido=true
    }
}
console.log(invalido)
elemento=document.getElementsByClassName("URL")
for(i=0;i<elemento.length;i++){
    if(isValidURL(elemento[i].value)===false){
        invalido=true
        }
        console.log(invalido)
}
elemento=document.getElementsByClassName("URL2")
for(i=0;i<elemento.length;i++){
    if(isValidURL(elemento[i].value)===false&&elemento[i].value!==""){
        invalido=true
        }
        console.log(invalido)
}
console.log(invalido)
confirmacaoQuestions(invalido)
}

function confirmacaoQuestions(validade){
    if(validade===false){
    preencherQuestions();tela10();
    } else{
        alert("Dados inválidos") 
    }
}

function preencherQuestions() {
    const elemento = document.querySelectorAll(".iniciodaPergunta input")
    let names = [];
    for (let i = 0; i < elemento.length; ++i) {
        names.push(elemento[i].value);
    }
    for (i = 0; i < numeroQuestions; i++) {
        quizz.questions[i] = {
            title: names[4 * i + 0],
            color: names[4 * i + 1],
            answers: [
                {
                    text: names[4 * i + 2],
                    image: names[4 * i + 3],
                    isCorrectAnswer: true
                }]
        }
    }
    preencherAnswers()
}

function preencherAnswers() {
    for (i = 0; i < numeroQuestions; i++) {
        let names = [];
        const elemento = document.getElementsByName(`resposta${i}`)
        for (let j = 0; j < elemento.length; j++) {
            if (elemento[j].value !== "") {
                names.push(elemento[j].value);
            }
        }
        let numeroPerguntasIncorretas = (names.length / 2)
        for (k = 0; k < numeroPerguntasIncorretas; k++) {
            quizz.questions[i].answers.push({
                text: names[k * 2 + 0],
                image: names[k * 2 + 1],
                isCorrectAnswer: false
            })
        }
    }
}

function tela10() {
    document.querySelector(".tela9").classList.toggle("hidden")
    document.querySelector(".tela3_container").innerHTML += `
    <div class="tela10">
        Agora, decida os níveis
    </div> `
    for (let i = 0; i < numeroLevels; i++) {
    document.querySelector(".tela10").innerHTML +=`
    <div class="niveis">
        <div class="fechada" onclick="abrirPerguntaNivel(this)">
        Nível ${i + 1} <img src="midia/image/icone.svg">
        </div>
        <div class="aberta hidden">
            <div class="nivel">
                <span>Nível ${i + 1}</span>
                <input type="text" name="titulo" placeholder="Titulo do nível"></input>
                <input type="number" name="acertoMinimo" placeholder="% de acerto mínimo"></input>
                <input type="url" name="urlNivel" placeholder="URL da imagem do nível"></input>
                <input type="text" name="descricao" placeholder="Descrição do nível"></input>
            </div>
        </div>
    </div>`
    }
    document.querySelector(".tela10").innerHTML += `
    <button onclick="validarNiveis()">
    Finalizar Quizz
    </button>`
}
function validarNiveis(){
    let invalido=false;
    let auxiliar=0;
    let elemento=document.getElementsByName("acertoMinimo")
    for(let i=0;i<elemento.length;i++){
        console.log(elemento[i].value)
        if(elemento[i].value==0){
        auxiliar++
        }
    }
    for(let i=0;i<elemento.length;i++){
        if(elemento[i].value<0||elemento[i].value>100){
            invalido=true
        }
    }

    elemento=document.getElementsByName("titulo")
    for(let i=0;i<elemento.length;i++){
        if(elemento[i].value.length<10){
            invalido=true
        }
    }
    elemento=document.getElementsByName("descricao")
    for(let i=0;i<elemento.length;i++){
        if(elemento[i].value.length<30){
            invalido=true
        }
    }
    elemento=document.getElementsByName("urlNivel")
        for(let i=0;i<elemento.length;i++){
            if(isValidURL(elemento[i].value)===false){
                invalido=true
            }
        }

    confirmacao(invalido,auxiliar)
}

function confirmacao(validade,auxiliar){
    if (validade===false&&auxiliar>0){
        adicionaLoading(".tela10")
        preencherLevels()
    } else{
        alert("Dados inválidos") 
    }
}

function preencherLevels(){
    let names=[];
    const elemento = document.querySelectorAll(".niveis input")
    for (let i = 0; i < elemento.length; i++) {
            names.push(elemento[i].value);
    }
    for (i = 0; i < (numeroLevels); i++) { 
    quizz.levels[i]=(
            {
            title:names[4*i+0],
            image:names[4*i+2],
            text:names[4*i+3],
            minValue:Number(names[4*i+1])
            })
    }
    enviarQuizz()
}

function enviarQuizz(){
    const promise=axios.post("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes",quizz)
    promise.then(tela11)
    promise.then(armazenarQuizz)
    promise.catch(erroCriacao)
}

function tela11(){
    document.querySelector(".tela3_container").innerHTML += `
    <div class="tela11">
        Seu quizz está pronto!
        <img class="degrade" src="${quizz.image}"/>
        <span>${quizz.title}</span>
        <button onclick="tela02();">
         Acessar Quizz
        </button>
        <button onclick="voltarHome("tela11")">
         Voltar pra home
        </button>
    </div>`
    removeLoading(`.tela11`)
}

function armazenarQuizz(resposta){
    quantosQuizzes++
    let meuQuizzSerializado=JSON.stringify(resposta.data)
    localStorage.setItem(`meuQuizzArmazenado${quantosQuizzes}`,meuQuizzSerializado)
    console.log(meuQuizzSerializado)
}

function getIdsLocal(){
    let listaIds=[];
    for(i=0;i<quantosQuizzes;i++){
    let meusQuizzes=localStorage.getItem(`meuQuizzArmazenado${i+1}`)
    meusQuizzes=JSON.parse(meusQuizzes)
    listaIds[i]=meusQuizzes.id
    }
    return listaIds
}

function apagarQuizz(resposta){
    axios.delete(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${resposta.id}`, {resposta}, {
        headers: { 'Secret-Key':`${resposta.data.key}`}
      }
    )
}

function erroCriacao(error){
alert(`Não foi possível criaz o quizz, erro ${error.response.status}, tente de novo`)
voltarHome("tela10")
document.querySelector(".tela3_container").classList.add("hidden")
}   

function isValidURL(string) {
    var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
  }