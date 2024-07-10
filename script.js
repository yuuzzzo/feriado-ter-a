const nomes = ["Elton", "David", "Rubens", "Felipe", "Alexandre", "Geovanne", "Vinicius", "Danilo"];
const diasSemana = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira"];
let resultado = {};

function sortear(lista, excluidos = []) {
    let sorteado;
    do {
        const indice = Math.floor(Math.random() * lista.length);
        sorteado = lista[indice];
    } while (excluidos.includes(sorteado));
    return sorteado;
}

function sortearNomes() {
    const nomesRestantes = [...nomes];
    resultado = {}; // Limpa o resultado anterior

    for (const dia of diasSemana) {
        if (dia === "Segunda-feira") {
            // Sorteia um nome para segunda-feira, exceto Geovanne, Elton, Alexandre e Felipe
            const nomeSorteado = sortear(nomesRestantes, ["Geovanne", "Elton", "Alexandre", "Felipe"]);
            resultado[dia] = [nomeSorteado];
            nomesRestantes.splice(nomesRestantes.indexOf(nomeSorteado), 1);
        } else if (dia === "Terça-feira") {
            // Sorteia dois nomes para terça-feira, exceto David e Alexandre
            const nome1 = sortear(nomesRestantes, ["David", "Alexandre"]);
            nomesRestantes.splice(nomesRestantes.indexOf(nome1), 1);
            const nome2 = sortear(nomesRestantes, ["David", "Alexandre"]);
            resultado[dia] = [nome1, nome2];
            nomesRestantes.splice(nomesRestantes.indexOf(nome2), 1);
        } else if (dia === "Quarta-feira" || dia === "Quinta-feira") {
            // Sorteia dois nomes para quarta e quinta-feira
            const nome1 = sortear(nomesRestantes);
            nomesRestantes.splice(nomesRestantes.indexOf(nome1), 1);
            const nome2 = sortear(nomesRestantes);
            resultado[dia] = [nome1, nome2];
            nomesRestantes.splice(nomesRestantes.indexOf(nome2), 1);
        } else if (dia === "Sexta-feira") {
            // Sorteia um nome para sexta-feira
            const nomeSorteado = sortear(nomesRestantes);
            resultado[dia] = [nomeSorteado];
            nomesRestantes.splice(nomesRestantes.indexOf(nomeSorteado), 1);
        }
    }
}

function exibirResultado() {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = '';
    for (const [dia, nomesSorteados] of Object.entries(resultado)) {
        const p = document.createElement('p');
        p.textContent = `${dia}: ${nomesSorteados.join(", ")}`;
        resultadoDiv.appendChild(p);
    }
}

document.getElementById('sortearButton').addEventListener('click', () => {
    sortearNomes();
    exibirResultado();
});
