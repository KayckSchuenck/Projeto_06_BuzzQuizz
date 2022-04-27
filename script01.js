const LINK_API = "https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes"
const SEGUNDO_1 = 1000 // 1000 ms == 1 segundo
const SEGUNDO_5 = SEGUNDO_1 * 5
const SEGUNDO_2 = SEGUNDO_1 * 2

const ZERO = 0;
let quantosQuizzes = localStorage.length;

let QuantidadeTotalDeQuizz;

let ver;
let ver1;
let ver2;


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
    document.querySelector(`${tela}`).classList.remove("hidden");
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
    QuantidadeTotalDeQuizz = arrayDeObjetos.data.length
    document.querySelector(".loading_container").classList.add("hidden")
    document.querySelector(".tela1_container").classList.remove("hidden")

}
// Falha
function falhouExibirQuizz(erro) {
    console.log(`Falhou nisso aqui ${erro.status}`)
    setTimeout(reiniciaPag, SEGUNDO_5)
}

let meusQuizzesAdicionado = 0;

// Pegando dados de cada quiz para exibir no painel
function exibindoTodosQuizz_PegandoDados(objetoComValores) {
    listaComIds = getIdsLocal()
    if (listaComIds.includes(objetoComValores["id"])) {
        document.querySelector(".criarQuizz").classList.add("hidden");
        document.querySelector(".seusQuizzes").classList.remove("hidden");

        document.querySelector(".seusQuizzes_Quizzes").innerHTML += `
        <li class="todosQuizzes_quizes" onclick="entrandoQuizz(this)">
            <img src=${objetoComValores["image"]}>
            <div class="degrade">
                <h3 class="chamadaQuizz">${objetoComValores["title"]}</h3>
            </div >
            <p class="id">${objetoComValores['id']}</p>
        </li>`

        meusQuizzesAdicionado++
    } else {
        document.querySelector(".todosQuizzes").innerHTML += `
        <li class="todosQuizzes_quizes" onclick="entrandoQuizz(this)">
            <img src=${objetoComValores["image"]}>
            <div class="degrade">
                <h3 class="chamadaQuizz">${objetoComValores["title"]}</h3>
            </div >
            <p class="id">${objetoComValores['id']}</p>
        </li>`
    }
    if (meusQuizzesAdicionado === localStorage.length) {
        if (document.querySelector(".seusQuizzes_Quizzes").children.length > 3) {
            document.querySelector(".seusQuizzes").innerHTML += `
                <ion-icon name="chevron-forward-sharp" onclick="rolaPraDireita()"></ion-icon>
                <ion-icon class="volta" name="chevron-back-sharp" onclick="rolaPraEsquerda()"></ion-icon>`
        }
        meusQuizzesAdicionado++
    }

}

// Pegando do LocalStorage
function getIdsLocal() {
    let listaIds = [];
    for (i = 0; i < localStorage.length; i++) {
        let meusQuizzes = localStorage.getItem(`meuQuizzArmazenado${i + 1}`)
        meusQuizzes = JSON.parse(meusQuizzes)
        listaIds.push(meusQuizzes.id)
    }
    return listaIds
}

let posicao = 2;
// Rolar os seus quizzes para direita
function rolaPraDireita() {
    if (posicao === 0) {
        posicao = 2
    }
    if (posicao < localStorage.length-1) {
        posicao++
        console.log(posicao)
        document.querySelector(".seusQuizzes_Quizzes").children[posicao].scrollIntoView({block: "end", behavior: "smooth"})
    }
}
// Rolar os seus quizzes para esquerda
function rolaPraEsquerda() {
    if (posicao > 0 && posicao <= localStorage.length-1) {
        if (posicao === localStorage.length-1) {
            posicao = localStorage.length-1 - 2
        }
        posicao--
        console.log(posicao)
        document.querySelector(".seusQuizzes_Quizzes").children[posicao].scrollIntoView({block: "end", behavior: "smooth"})
    }
}