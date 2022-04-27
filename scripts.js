/* Após criar as funções e testar elas você pode colocar aqui aquelas que ocorrem independentes,
 * como obter os quizz, que tem que ocorrer toda vez.
 * Ou então funções que precise de funções de outras páginas.
 */

obterQuizz()

function deVoltaPraCasa() {
    const pag1AMostra = document.querySelector(".tela1_container").classList.contains("hidden")
    const pag2AMostra = document.querySelector(".tela2_container").classList.contains("hidden")
    const pag3AMostra = document.querySelector(".tela3_container").classList.contains("hidden")

    // Página 1 a mostra
    if (!(pag1AMostra)) {
        document.querySelector(".tela1_container").scrollIntoView({block: "start", behavior: "smooth"})
    } else if (pag1AMostra && !pag2AMostra && pag3AMostra) { // Página 2 a mostra
        voltarHome('tela2_container')
    } else if (pag1AMostra && pag2AMostra && !pag3AMostra) { // Página 3 a mostra
        voltarHome('tela3_container')
    }
}