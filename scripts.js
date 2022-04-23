let quizz = {
    title: "",
    image: "",
    questions: [],
    levels: []
}
let numeroQuestions;
let numeroLevels;



// para Tela 01 - "Voltar no Home"
function voltarHome(classe) {
    document.querySelector(`.${classe}`).classList.toggle("hidden")
    document.querySelector(".tela1_container").classList.toggle("hidden")
    document.querySelector(".tela1_container").scrollIntoView(true)
}
// Tela 01 para Quizz selecionado - após clicar no quizz
function quizEscolhidoVaiPara02() {
    document.querySelector(".tela1_container").classList.toggle("hidden")
    document.querySelector(".tela2_container").classList.toggle("hidden")
    document.querySelector(".tela2_container").scrollIntoView(true)
}
// Tela 01 para Tela 03 - para criar quizz
function irCriacaoQuizz() {
    document.querySelector(".tela1_container").classList.toggle("hidden")
    document.querySelector(".tela3_container").classList.toggle("hidden")
    document.querySelector(".tela3_container").scrollIntoView(true)
}

const ZERO = 0;

let ver="";
let ver1;
let ver2;
let ver3;

// Pegando Quizzes
function obterQuizz() {
    const promiseObterQuizz = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    promiseObterQuizz.then(exibindoTodosQuizz)
}
// Sucesso
function exibindoTodosQuizz(arrayDeObjetos) {
    arrayDeObjetos.data.forEach(exibindoTodosQuizz_PegandoDados)
}
// Falha


// Pegando dados de cada quiz para exibir no painel
function exibindoTodosQuizz_PegandoDados(objetoComValores) {
    document.querySelector(".todosQuizzes").innerHTML += `
        <li class="todosQuizzes_quizes">
            <img src=${objetoComValores["image"]}>
            <div class="degrade">
                <h3 class="chamadaQuizz">${objetoComValores["title"]}</h3>
            </div >
        </li>`
}



tela08()
function tela08() {
    document.querySelector(".tela3_container").innerHTML = `
    <div class="tela8">
        Comece pelo começo
        <div class="informacoesTela8">
        <input type="text" minlength="20" maxlength="65" placeholder="Título do seu quizz" required></input>
        <input type="url" placeholder="URL da imagem do seu quizz" required></input>
        <input type="number" min="3" placeholder="Quantidade de perguntas do quizz" required></input>
        <input type="number" min="2" placeholder="Quantidade de níveis do quizz" required></input>
        </div>
        <button onclick="validarTela8()">
        Prosseguir pra criar perguntas
        </button>
    </div> `
}

function validarTela8(){
    if(document.querySelector(".informacoesTela8 input:nth-child(1)").value.length>65||document.querySelector(".informacoesTela8 input:nth-child(1)").value.length<20||document.querySelector(".informacoesTela8 input:nth-child(3)").value<3||document.querySelector(".informacoesTela8 input:nth-child(4)").value<2){
        alert("Campos preenchidos incorretamente")
    } else {
        preencherQuizz()
        tela09()
    }
}

function preencherQuizz() {
    quizz.title = document.querySelector(".informacoesTela8 input:nth-child(1)").value
    quizz.image = document.querySelector(".informacoesTela8 input:nth-child(2)").value
    numeroQuestions = document.querySelector(".informacoesTela8 input:nth-child(3)").value
    numeroLevels = document.querySelector(".informacoesTela8 input:nth-child(4)").value
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
                <div class="iniciodaPergunta">
                    <span>Pergunta${i + 1}</span>
                    <input type="text" minlength="20" placeholder="Texto da pergunta" required></input>
                    <input type="color" placeholder="Cor de fundo da pergunta"></input>
                    <span>Resposta Correta</span>
                    <input type="text" placeholder="Resposta correta" required></input>
                    <input type="url" placeholder="URL da imagem" required></input>
                </div>
                <div class="respostasIncorretas">
                    <span>Resposta Incorreta</span>
                    <input type="text" name="resposta${i}" placeholder="Resposta incorreta 1" required></input>
                    <input type="url" name="resposta${i}" placeholder="URL da imagem 1" required></input>
                    <input type="text" name="resposta${i}" placeholder="Resposta incorreta 2"></input>
                    <input type="url" name="resposta${i}" placeholder="URL da imagem 2"></input>
                    <input type="text" name="resposta${i}" placeholder="Resposta incorreta 3"></input>
                    <input type="url" name="resposta${i}" placeholder="URL da imagem 3"></input>
                </div>
            </div>
        </div>`
    }
    document.querySelector(".tela9").innerHTML += `
    <button onclick="preencherQuestions();tela10()">
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
            <div class="nivel">
                <span>Nível ${i + 1}</span>
                <input type="text" minlength="10" placeholder="Titulo do nível" required></input>
                <input type="number" placeholder="% de acerto mínimo" required></input>
                <input type="url" placeholder="URL da imagem do nível" required></input>
                <input type="text" minlength="30" placeholder="Descrição do nível" required></input>
            </div>
        </div>
    </div>`
    }
    document.querySelector(".tela10").innerHTML += `
    <button onclick="preencherLevels();tela11();">
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
    console.log(quizz)
}

function tela11(){
    quantosQuizzes++
    const promise=axios.post("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes",quizz)
    document.querySelector(".tela10").classList.toggle("hidden")
    document.querySelector(".tela3_container").innerHTML += `
    <div class="tela11">
        Seu quizz está pronto!
        <img class="degrade" src="${quizz.image}"/>
        <div class="tituloQuizz">${quizz.title}</div>
        <button onclick="tela02();">
         Acessar Quizz
        </button>
        <button onclick="tela01();">
         Voltar pra home
        </button>
    </div>`
    promise.then(armazenarQuizz)
    promise.catch(alert("aaa"))
}

function armazenarQuizz(resposta){
    console.log(resposta)
    let meuQuizzSerializado=JSON.stringify(resposta.data)
    localStorage.setItem(`meuQuizzArmazenado${quantosQuizzes}`,meuQuizzSerializado)
    console.log(meuQuizzSerializado)
}

function getQuizzLocal(){
    let meusQuizzes=localStorage.getItem(`meuQuizzArmazenado${quantosQuizzes}`)
    const meuQuizz=JSON.parse(meusQuizzes)
    return meuQuizz;
}

/*function apagarQuizz(resposta){
    axios.delete("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/ID_DO_QUIZZ", resposta, {
        headers: { 'Secret-Key':`${resposta.key}`}
      }
    )
}
*/