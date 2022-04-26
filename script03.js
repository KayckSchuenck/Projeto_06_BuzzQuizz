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
        <input type="text" minlength="20" maxlength="65" placeholder="Título do seu quizz"></input>
        <input type="url" placeholder="URL da imagem do seu quizz">
        <input type="number" min="3" placeholder="Quantidade de perguntas do quizz"></input>
        <input type="number" min="2" placeholder="Quantidade de níveis do quizz"></input>
        </div>
        <button type="Submit">
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
    document.querySelector(".tela8").classList.toggle("hidden")
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
            <form onsubmit="handleSubmit();preencherQuestions();tela10();">
                <div class="iniciodaPergunta">
                    <span>Pergunta${i + 1}</span>
                    <input type="text" minlength="20" placeholder="Texto da pergunta"></input>
                    <input type="color" placeholder="Cor de fundo da pergunta"></input>
                    <span>Resposta Correta</span>
                    <input type="text" placeholder="Resposta correta"></input>
                    <input type="url" placeholder="URL da imagem"></input>
                </div>
                <div class="respostasIncorretas">
                    <span>Resposta Incorreta</span>
                    <input type="text" name="resposta${i}" placeholder="Resposta incorreta 1"></input>
                    <input type="url" name="resposta${i}" placeholder="URL da imagem 1"></input>
                    <input type="text" name="resposta${i}" placeholder="Resposta incorreta 2"></input>
                    <input type="url" name="resposta${i}" placeholder="URL da imagem 2"></input>
                    <input type="text" name="resposta${i}" placeholder="Resposta incorreta 3"></input>
                    <input type="url" name="resposta${i}" placeholder="URL da imagem 3"></input>
                </div>
            </div>
        </div>`
    }
    document.querySelector(".tela9").innerHTML += `
    <button onclick="preencherQuestions();tela10();">
    Prosseguir pra criar níveis
    </button>`
    
}

function abrirPerguntaNivel(elemento) {
    elemento.classList.toggle("hidden")
    elemento.parentNode.lastElementChild.classList.toggle("hidden")
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

let nomeTela=".tela10";

function tela10() {
    document.querySelector(".tela9").classList.toggle("hidden")
    document.querySelector(".tela3_container").innerHTML += `
    <div class="tela10">
        Agora, decida os níveis
    </div> `
    for (let i = 0; i < numeroQuestions; i++) {
        
    document.querySelector(".tela10").innerHTML +=`
    <div class="niveis">
        <div class="fechada" onclick="abrirPerguntaNivel(this)">
        Nível ${i + 1} <img src="midia/image/icone.svg">
        </div>
        <div class="aberta hidden">
        <form onsubmit="preencherLevels();adicionaLoading(nomeTela);">
            <div class="nivel">
                <span>Nível ${i + 1}</span>
                <input type="text" minlength="10" placeholder="Titulo do nível"></input>
                <input type="number" placeholder="% de acerto mínimo"></input>
                <input type="url" placeholder="URL da imagem do nível"></input>
                <input type="text" minlength="30" placeholder="Descrição do nível"></input>
            </div>
        </form>
        </div>
    </div>`
    }
    document.querySelector(".tela10").innerHTML += `
    <button type="submit">
    Finalizar Quizz
    </button>`
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
    nomeTela=".tela11"
    document.querySelector(".tela3_container").innerHTML += `
    <div class="tela11">
        Seu quizz está pronto!
        <img class="degrade" src="${quizz.image}"/>
        <span>${quizz.title}</span>
        <button onclick="tela02();">
         Acessar Quizz
        </button>
        <button onclick="voltarHome(tela11)">
         Voltar pra home
        </button>
    </div>`
    removeLoading(nomeTela)
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
nomeTela="tela10";
alert(`Não foi possível criaz o quizz, erro ${error.response.status}, tente de novo`)
voltarHome(nomeTela)
removeLoading(".tela3")
}   