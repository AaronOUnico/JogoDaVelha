let jogadorAtual = 'X';
let jogoAtivo = true;
let estadoTabuleiro = ['', '', '', '', '', '', '', '', '',];

const mensagemEL = document.getElementById('mensagem');
// retorna NodeList, parece-se, mas não é um array
const botoes = document.querySelectorAll('.tabuleiro button')
const condicoesVictory = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

botoes.forEach((botao, index) => {
    botao.addEventListener('click', () => aoClicar(botao, index));
});

function aoClicar(botao, index) {
    
    if (estadoTabuleiro[index] !== '' || !jogoAtivo) {
        return
    }

    estadoTabuleiro[index] = jogadorAtual;
    botao.innerText = jogadorAtual;
    //? é p if/else
    botao.classList.add(jogadorAtual === 'X' ? 'jogador-x' : 'jogador-o');

    botao.disabled = true;

    isResultado();
}

function isResultado() {
    let rodadaVencida = false;

    for (let i = 0; i < condicoesVictory.length; i++) {
        const [a, b, c] = condicoesVictory[i];
        if (estadoTabuleiro[a] &&
            estadoTabuleiro[a] === estadoTabuleiro[b] &&
            estadoTabuleiro[a] === estadoTabuleiro[c]) {
            rodadaVencida = true;
            break;
        }

    }

    if (rodadaVencida) {
        mensagemEL.innerText = ` Jogador ${jogadorAtual} venceu!`
        return TerminaJogo();
    }

    let empate = !estadoTabuleiro.includes('');
    if (empate) {
        mensagemEL.innerText = 'Deu velha!';
        mensagemEL.style.color = '#facc15'
        TerminaJogo();
        return;
    }

    jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X';
    mensagemEL.innerText = `Vez do jogador ${jogadorAtual}`;

}   

function TerminaJogo() {
    jogoAtivo = false;
    botoes.forEach(botao => {
        botao.disabled = true; 
    });    
}
