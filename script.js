const nomes = ["Elton", "David", "Rubens", "Felipe", "Alexandre", "Geovanne", "Vinicius", "Danilo", "Victor"];
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
        let excluidos = [];
        if (dia === "Segunda-feira") {
            // Sorteia dois nomes para segunda-feira, exceto Elton
            excluidos = ["Elton"];
            const nome1 = sortear(nomesRestantes, excluidos);
            nomesRestantes.splice(nomesRestantes.indexOf(nome1), 1);
            excluidos.push(nome1); // Adiciona o primeiro sorteado à lista de excluídos para não repetir no mesmo dia
            const nome2 = sortear(nomesRestantes, excluidos);
            resultado[dia] = [nome1, nome2];
            nomesRestantes.splice(nomesRestantes.indexOf(nome2), 1);
        } else if (dia === "Terça-feira") {
            // Sorteia um nome para terça-feira, exceto David
            excluidos = ["David"];
            const nomeSorteado = sortear(nomesRestantes, excluidos);
            resultado[dia] = [nomeSorteado];
            nomesRestantes.splice(nomesRestantes.indexOf(nomeSorteado), 1);
        } else if (dia === "Quarta-feira" || dia === "Quinta-feira" || dia === "Sexta-feira") {
            // Sorteia dois nomes para quarta, quinta e sexta-feira
            const nome1 = sortear(nomesRestantes);
            nomesRestantes.splice(nomesRestantes.indexOf(nome1), 1);
            excluidos.push(nome1); // Adiciona o primeiro sorteado à lista de excluídos para não repetir no mesmo dia
            const nome2 = sortear(nomesRestantes, excluidos);
            resultado[dia] = [nome1, nome2];
            nomesRestantes.splice(nomesRestantes.indexOf(nome2), 1);
        }
    }
}

function verificarRepeticoes(resultado) {
    const nomesUsados = new Set();
    for (const nomesSorteados of Object.values(resultado)) {
        for (const nome of nomesSorteados) {
            if (nomesUsados.has(nome)) {
                return true; // Encontrou repetição
            }
            nomesUsados.add(nome);
        }
    }
    return false; // Não encontrou repetição
}

function sortearNomesSemRepeticoes() {
    do {
        sortearNomes();
    } while (verificarRepeticoes(resultado));
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
    sortearNomesSemRepeticoes();
    exibirResultado();
});
