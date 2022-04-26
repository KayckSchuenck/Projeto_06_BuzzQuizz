const LINK_API = "https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes"
const SEGUNDO_1 = 1000 // 1000 ms == 1 segundo
const SEGUNDO_5 = SEGUNDO_1*5
const SEGUNDO_2 = SEGUNDO_1*2

const ZERO = 0;

let ver="";
let ver1;
let ver2;
let ver3;


// Reiniciar a página
function reiniciaPag() {
    window.location.reload()
}

// Embaralhar
function comparador() {
    return Math.random() - 0.5;
}



// Adicionar tela de loading. Só adicionar "telaX_container" como variável que funcionar
function adicionaLoading(tela) {
    document.querySelector(`${tela}`).classList.add("hidden");
    document.querySelector(".loading_container").classList.remove("hidden");
}
// Remove tela de loading.
function removeLoading(tela) {
    document.querySelector(`${tela}`).classList.toggle("hidden");
    document.querySelector(".loading_container").classList.add("hidden");
}


// para Tela 01 - "Voltar no Home"
function voltarHome(classe) {
    document.querySelector(`.${classe}`).classList.toggle("hidden")
    document.querySelector(`.${classe}`).innerHTML = ""
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
    tela08()
    document.querySelector(".tela1_container").classList.toggle("hidden")
    document.querySelector(".tela3_container").classList.toggle("hidden")
    document.querySelector(".tela3_container").scrollIntoView(true)
}

// Pegando Quizzes
function obterQuizz() {
    const promiseObterQuizz = axios.get(LINK_API);
    promiseObterQuizz.then(exibindoTodosQuizz)
    promiseObterQuizz.catch(falhouExibirQuizz)
}
// Sucesso
function exibindoTodosQuizz(arrayDeObjetos) {
    arrayDeObjetos.data.forEach(exibindoTodosQuizz_PegandoDados)
    document.querySelector(".loading_container").classList.add("hidden")
    document.querySelector(".tela1_container").classList.remove("hidden")

}
// Falha
function falhouExibirQuizz(erro) {
    console.log(`Falhou nisso aqui ${erro.status}`)
    setTimeout(reiniciaPag, SEGUNDO_5)
}


// Pegando dados de cada quiz para exibir no painel
function exibindoTodosQuizz_PegandoDados(objetoComValores) {
    document.querySelector(".todosQuizzes").innerHTML += `
        <li class="todosQuizzes_quizes" onclick="entrandoQuizz(this)">
            <img src=${objetoComValores["image"]}>
            <div class="degrade">
                <h3 class="chamadaQuizz">${objetoComValores["title"]}</h3>
            </div >
            <p class="id">${objetoComValores['id']}</p>
        </li>`
}

