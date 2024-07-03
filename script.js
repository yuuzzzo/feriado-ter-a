const nomes = ["Elton", "David", "Rubens", "Felipe", "Alexandre", "Geovanne", "Vinicius", "Danilo"];
const diasSemana = ["Segunda-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira"];
let resultado = {};

function sortear(lista, excluido) {
    let sorteado;
    do {
        const indice = Math.floor(Math.random() * lista.length);
        sorteado = lista[indice];
    } while (sorteado === excluido);
    return sorteado;
}

function sortearNomes() {
    const nomesRestantes = [...nomes];
    resultado = {}; // Limpa o resultado anterior

    for (const dia of diasSemana) {
        if (dia === "Segunda-feira") {
            // Sorteia um nome para segunda-feira, exceto Geovanne
            const nomeSorteado = sortear(nomesRestantes, "Geovanne");
            resultado[dia] = [nomeSorteado];
            nomesRestantes.splice(nomesRestantes.indexOf(nomeSorteado), 1);
        } else if (dia === "Quarta-feira" || dia === "Quinta-feira") {
            // Sorteia três nomes para quarta e quinta-feira
            const nome1 = sortear(nomesRestantes);
            nomesRestantes.splice(nomesRestantes.indexOf(nome1), 1);
            const nome2 = sortear(nomesRestantes);
            nomesRestantes.splice(nomesRestantes.indexOf(nome2), 1);
            const nome3 = sortear(nomesRestantes);
            resultado[dia] = [nome1, nome2, nome3];
            nomesRestantes.splice(nomesRestantes.indexOf(nome3), 1);
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
