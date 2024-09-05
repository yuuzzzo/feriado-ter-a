const nomes = ["Elton", "David", "Rubens", "Felipe", "Alexandre", "Geovanne", "Vinicius", "Danilo", "Victor", "Viictor"];
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
    let nomesRestantes = [...nomes];
    resultado = {}; // Limpa o resultado anterior

    // Sorteia Victor para a sexta-feira
    const victorIndex = nomesRestantes.indexOf("Victor");
    const victor = nomesRestantes.splice(victorIndex, 1)[0];
    resultado["Sexta-feira"] = [victor];

    // Sorteia o segundo nome para sexta-feira
    const nomeSexta = sortear(nomesRestantes);
    resultado["Sexta-feira"].push(nomeSexta);
    nomesRestantes.splice(nomesRestantes.indexOf(nomeSexta), 1);

    // Sorteia dois nomes para os outros dias da semana
    for (const dia of diasSemana) {
        if (dia === "Sexta-feira") continue; // Já tratado acima

        let excluidos = [];

        if (dia === "Terça-feira") {
            // Sorteia dois nomes para terça-feira, exceto David
            excluidos = ["David"];
            const nome1 = sortear(nomesRestantes, excluidos);
            nomesRestantes.splice(nomesRestantes.indexOf(nome1), 1);
            excluidos.push(nome1); // Adiciona o primeiro sorteado à lista de excluídos
            const nome2 = sortear(nomesRestantes, excluidos);
            resultado[dia] = [nome1, nome2];
            nomesRestantes.splice(nomesRestantes.indexOf(nome2), 1);
        } else {
            // Sorteia dois nomes para os demais dias, Victor pode ser sorteado
            const nome1 = sortear(nomesRestantes);
            nomesRestantes.splice(nomesRestantes.indexOf(nome1), 1);
            excluidos.push(nome1); // Adiciona o primeiro sorteado à lista de excluídos
            const nome2 = sortear(nomesRestantes, excluidos);
            resultado[dia] = [nome1, nome2];
            nomesRestantes.splice(nomesRestantes.indexOf(nome2), 1);
        }
    }

    // Adiciona Victor aos dias onde apenas um nome foi sorteado, se necessário
    for (const dia of ["Segunda-feira", "Quarta-feira", "Quinta-feira"]) {
        if (resultado[dia] && resultado[dia].length === 1) {
            resultado[dia].push("Victor");
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
    document.getElementById("resultado").style.border = '3px solid black';
    document.getElementById("resultado").style.boxShadow = '1px 1px 3px black';
    sortearNomesSemRepeticoes();
    exibirResultado();
    console.log("Código executado com êxito");
});
