const tela2 = document.querySelector(".tela2_container");

let TOTAL_QUESTOES;
let TOTAL_RESP_DADAS = 0;
let TOTAL_ACERTOS = 0;

let questaoCompleta;
let niveis;

let quizzAtual;


// Entrando no quizz e exibindo perguntas
function entrandoQuizz(elemento, locAtual = ".tela1_container") {
    quizzAtual = elemento
    TOTAL_RESP_DADAS = 0;
    TOTAL_ACERTOS = 0;
    adicionaLoading(locAtual);
    const ID_DO_QUIZZ = elemento.querySelector(".id").innerHTML;
    const promiseEntrandoQuizz = axios.get(LINK_API + `/${ID_DO_QUIZZ}`);
    console.log(LINK_API + `/${ID_DO_QUIZZ}`)
    promiseEntrandoQuizz.then(exibindoQuestions);
    promiseEntrandoQuizz.catch(falhouExibirQuestions);
}
// Sucesso ao entrar no Quizz
function exibindoQuestions(arrayDeObjetos) {
    removeLoading(".tela2_container");
    adicionandoQuestions(arrayDeObjetos.data)
}
// Falha
function falhouExibirQuestions(erro) {
    console.log(`Falhou nisso aqui ${erro.status}`)
    setTimeout(reiniciaPag, SEDUNGO_5)
}

// Adicionando cada questão
function adicionandoQuestions(objetoComValores) {
    const questoes = objetoComValores["questions"];
    niveis = objetoComValores["levels"];
    TOTAL_QUESTOES = questoes.length;

    tela2.innerHTML = `
        <div class="bannerQuizz"></div>
        <div class="corpoQuizz_container">
            <div class="corpoQuizz"></div>
        </div>`

    // Adicionando imagem e título no banner
    tela2.querySelector(".bannerQuizz").innerHTML += `
        <img src="${objetoComValores["image"]}">
        <div class="telaPreta"></div>
        <h2>${objetoComValores["title"]}</h2>`

    // Laço para adiconar cada questão
    for (let i = 0; i < questoes.length; i++) {
        const respostas = questoes[i]["answers"];
        respostas.sort(comparador)

        let corTituloPergunta = corPergunta(questoes[i]["color"]);

        tela2.querySelector(".corpoQuizz").innerHTML += `
            <div class="questaoQuizz">
                <div class="perguntaQuizz" style="background-color:${questoes[i]["color"]}">
                    <h4 style="color:#${corTituloPergunta}">${questoes[i]["title"]}</h4>
                </div>
            </div>`

        // Adicionando as alternativas de resposta
        for (let j = 0; j < respostas.length; j++) {
            tela2.querySelectorAll(".questaoQuizz")[i].innerHTML += `
                <div class="opcao" onclick="repostaUsuario(this)">
                    <img src="${respostas[j]["image"]}">
                    <span>${respostas[j]["text"]}</span>
                    <div class="isCorrectAnswer">${respostas[j]["isCorrectAnswer"]}</div>
                </div>`
        }
    }
    // Adicionando botao
    tela2.querySelector(".corpoQuizz").innerHTML += `
        <div class="finalQuizzBotoes">
            <p onclick="voltarHome('tela2_container')">Voltar pra home</p>
        </div>`
}

function corPergunta(hex) {
    const luminosidadeCorPassada = hexToHSL(hex);
    if (luminosidadeCorPassada < 90) {
        return "FFFFFF" // Cor da letra fica branca
    } else {
        return "000000" // Cor da letra fica preta
    }
}
// Converter cor de HEX para HSL
function hexToHSL(H) {
    // Só me interessa o l (luminosidade)!!

    // Convert hex to RGB first
    let r = 0,
        g = 0,
        b = 0;
    r = "0x" + H[1] + H[2];
    g = "0x" + H[3] + H[4];
    b = "0x" + H[5] + H[6];

    // Then to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        //delta = cmax - cmin,
        //h = 0,
        //s = 0,
        l = 0;

    // if (delta == 0)
    //   h = 0;
    // else if (cmax == r)
    //   h = ((g - b) / delta) % 6;
    // else if (cmax == g)
    //   h = (b - r) / delta + 2;
    // else
    //   h = (r - g) / delta + 4;

    // h = Math.round(h * 60);

    // if (h < 0)
    //   h += 360;

    l = (cmax + cmin) / 2;
    // s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    // s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return l
}

// Esbranquecer outras respostas que não foram escolhidas
function repostaUsuario(elemento) {
    const listaOpcoes = elemento.parentElement.querySelectorAll(".opcao");
    TOTAL_RESP_DADAS++
    for (let i = 0; i < listaOpcoes.length; i++) {
        // Clareia as repsostas não marcadas
        if (listaOpcoes[i] !== elemento) {
            listaOpcoes[i].innerHTML += `<div class="filtro"></div>`
        } else {
            if (elemento.querySelector(".isCorrectAnswer").innerHTML === "true") {
                TOTAL_ACERTOS++
            }
        }
        listaOpcoes[i].style["pointer-events"] = "none"

        // Pintando respostas
        const booleano = listaOpcoes[i].querySelector(".isCorrectAnswer").innerHTML
        if (booleano === "false") {
            listaOpcoes[i].querySelector("span").style["color"] = "#FF4B4B"
        } else if (booleano === "true") {
            listaOpcoes[i].querySelector("span").style["color"] = "#009C22"
        }
    }
    questaoCompleta = elemento.parentElement;

    setTimeout(scrollQuestao, SEGUNDO_2)
}

// Scroll para próxima questão ou mostrar resultado
function scrollQuestao() {
    let todasQuestao = questaoCompleta.parentElement.querySelectorAll(".questaoQuizz");
    todasQuestao = Array.from(todasQuestao);
    let posQuestaoAtual = todasQuestao.indexOf(questaoCompleta)

    if (posQuestaoAtual < TOTAL_QUESTOES - 1) {
        if (TOTAL_RESP_DADAS === TOTAL_QUESTOES) {
            adicionaResultado()
        }
        todasQuestao[posQuestaoAtual + 1].scrollIntoView(true);
    } else if (posQuestaoAtual === TOTAL_QUESTOES - 1) {
        if (TOTAL_RESP_DADAS === TOTAL_QUESTOES) {
            adicionaResultado()
        }
    }
}


function adicionaResultado() {
    const percentual = Math.round((TOTAL_ACERTOS / TOTAL_QUESTOES) * 100);
    ver2 = percentual
    let patamar = [];

    for (let i = 0; i < niveis.length; i++) {
        patamar.push(percentual >= niveis[i]["minValue"]);
    }
    ver = patamar
    // Invertendo para pegar a ultima categoria que passou
    patamar = patamar.reverse()
    let posicaoNivel = (patamar.length - 1) - patamar.indexOf(true)
    ver1 = posicaoNivel
    let level = niveis[posicaoNivel]


    tela2.querySelector(".corpoQuizz").innerHTML += `
        <div class="resultadoQuizz">
            <div class="resultadoValor">
                <h3>${level["title"]}</h3>
            </div>
            <img src=${level["image"]}>
            <h4>${level["text"]}</h4>
        </div>`

    // Adicionando botões
    tela2.querySelector(".finalQuizzBotoes").remove()
    tela2.querySelector(".corpoQuizz").innerHTML += `
        <div class="finalQuizzBotoes">
            <button class="reiniciarQuizz_button" onclick="reiniciaQuizz()">Reiniciar Quizz</button>
            <p onclick="voltarHome('tela2_container')">Voltar pra home</p>
        </div>`

    document.querySelector(".resultadoQuizz").scrollIntoView(true)
}

function reiniciaQuizz() {
    entrandoQuizz(quizzAtual, locAtual = ".tela2_container")
}

function acessarQuizz(elemento){
    adicionaLoading(".tela3_container");
    const ID=elemento.data.id
    const promiseEntrandoQuizz = axios.get(LINK_API + `/${ID}`);
    console.log(LINK_API + `/${ID}`)
    promiseEntrandoQuizz.then(exibindoQuestions);
    promiseEntrandoQuizz.catch(falhouExibirQuestions);
}