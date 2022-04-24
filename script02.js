// Entrando no quizz e exibindo perguntas
function entrandoQuizz(elemento) {
    adicionaLoading(".tela1_container");
    const ID_DO_QUIZZ = elemento.querySelector(".id").innerHTML;
    const promiseEntrandoQuizz = axios.get(LINK_API+`/${ID_DO_QUIZZ}`);
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
    const niveis   = objetoComValores["levels"];
    const tela2 = document.querySelector(".tela2_container");

    // Adicionando imagem e título no banner
    tela2.querySelector(".bannerQuizz").innerHTML += `
        <img src="${objetoComValores["image"]}">
        <div class="telaPreta"></div>
        <h2>${objetoComValores["title"]}</h2>`

    // Laço para adiconar cada questão
    for (let i = 0; i < questoes.length; i++) {
        const respostas = questoes[i]["answers"];
        respostas.sort(comparador)

        tela2.querySelector(".corpoQuizz").innerHTML += `
            <div class="questaoQuizz">
                <div class="perguntaQuizz" style="background-color:${questoes[i]["color"]}">
                    <h4>${questoes[i]["title"]}</h4>
                </div>
                <div class="opcao" onclick="repostaUsuario(this)">
                    <img src="${respostas[0]["image"]}">
                    <span>${respostas[0]["text"]}</span>
                    <div class="isCorrectAnswer">${respostas[0]["isCorrectAnswer"]}</div>
                </div>
                <div class="opcao" onclick="repostaUsuario(this)">
                    <img src="${respostas[1]["image"]}">
                    <span>${respostas[1]["text"]}</span>
                    <div class="isCorrectAnswer">${respostas[1]["isCorrectAnswer"]}</div>
                </div>
                <div class="opcao" onclick="repostaUsuario(this)">
                    <img src="${respostas[2]["image"]}">
                    <span>${respostas[2]["text"]}</span>
                    <div class="isCorrectAnswer">${respostas[2]["isCorrectAnswer"]}</div>
                </div>
                <div class="opcao" onclick="repostaUsuario(this)">
                    <img src="${respostas[3]["image"]}">
                    <span>${respostas[3]["text"]}</span>
                    <div class="isCorrectAnswer">${respostas[3]["isCorrectAnswer"]}</div>
                </div>
            </div>`
    }
}

// Esbranquecer outras respostas que não foram escolhidas
function repostaUsuario(elemento) {
    console.log(1)
    const listaOpcoes = elemento.parentElement.querySelectorAll(".opcao");
    ver = listaOpcoes
    for (let i = 0; i < listaOpcoes.length; i++) {
        // Clareia as repsostas não marcadas
        if (listaOpcoes[i] !== elemento) {
            listaOpcoes[i].innerHTML += `<div class="filtro"></div>`
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
}