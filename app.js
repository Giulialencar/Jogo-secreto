//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Jogo do numero secreto';

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um numero entre 1 e 10';

let lista = [];
let numeroSecreto = gerarNumero();
let tentativas = 1;
let limite = 100;

function exibirTexto(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function msgInicial(){
    exibirTexto('h1', 'Jogo do numero secreto');
    exibirTexto('p', 'Escolha um numero entre 1 e 100');
}

msgInicial(); 

//input é o quadrado onde vai escrever o numero
function verificarChute() {
    let chute = document.querySelector('input').value
    
    if (chute == numeroSecreto) {
        exibirTexto('h1', 'Acertou');
        let tentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        exibirTexto('p', `Você descobriu o numero secreto com ${tentativas} ${tentativa}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTexto('p', 'O numero é menor');
        } else {
            exibirTexto('p', 'O numero é maior');
        }
        tentativas++
        limparCampo();

    }
}
//includes verifica se o numero ta na lista
function gerarNumero() {
    let numeroEscolhido = parseInt(Math.random() * 10 + 1);
    let quantidadeElementos = lista.length;

    if (quantidadeElementos == 10) {
        lista = [];
    }
    if (lista.includes(numeroEscolhido)) {
        return gerarNumero();
    } else {
        lista.push(numeroEscolhido);
        console.log(lista);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciar() {
    numeroSecreto = gerarNumero();
    limparCampo();
    tentativas = 1;
    msgInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}