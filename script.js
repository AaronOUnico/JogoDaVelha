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

document.body.classList.add('tema-cosmico');
mensagemEL.innerText = "Vez da Corte Cósmica";


botoes.forEach((botao, index) => {
    botao.addEventListener('click', () => aoClicar(botao, index));
});

function aoClicar(botao, index) {
    
    if (estadoTabuleiro[index] !== '' || !jogoAtivo) {
        return;
    }

    estadoTabuleiro[index] = jogadorAtual;
    botao.innerText = jogadorAtual;
    
    
    if (jogadorAtual === 'X') {
        botao.classList.add('corte-cosmica')
    } else {
        botao.classList.add('cosmos-negro')
    }
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
        if (jogadorAtual === 'X') {
            mensagemEL.innerText = "A corte cósmica prospera!!";
            mensagemEL.style.color = '#00bfff'
        } else {
            mensagemEL.innerText = "A Estrela Negra consumiu tudo..."
            mensagemEL.style.color = '#a855f7'
        }
        TerminaJogo();
        return;
    }
    let empate = !estadoTabuleiro.includes('');
    if (empate) {
        mensagemEL.innerTexc = 'Confronto adiado!';
        mensagemEL.style.color = '#234356'
        TerminaJogo();
        return;
    }

    if (jogadorAtual === 'X') {
        jogadorAtual = 'O';
        mensagemEL.innerText = 'Vez do Cosmos Negro';
        mensagemEL.style.color = '#681993'
        document.body.classList.remove('tema-cosmico')
        document.body.classList.add('tema-cosmos-negro')
    } else {
        jogadorAtual = 'X';
        mensagemEL.innerText = 'Vez da Corte Cósmica';
        mensagemEL.style.color = '#87CEEB'
        document.body.classList.remove('tema-cosmos-negro')
        document.body.classList.add('tema-cosmico')
    }

}   

function TerminaJogo() {
    jogoAtivo = false;
    botoes.forEach(botao => {
        botao.disabled = true; 
    });    
}
