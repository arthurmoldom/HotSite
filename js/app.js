// --------------------
// contador anos 2000
// --------------------

let visits = localStorage.getItem("gdpg_visits") || 0;

visits++;

localStorage.setItem("gdpg_visits", visits);

document.getElementById("counter").textContent =
    String(visits).padStart(6, "0");


// --------------------
// parser csv simples
// --------------------

function parseCSV(text) {

    const linhas = text.trim().split('\n');

    const cabecalho = linhas[0]
        .split(',')
        .map(c => c.trim());

    return linhas.slice(1).map(linha => {

        const valores = linha.split(',');

        const obj = {};

        cabecalho.forEach((coluna, i) => {
            obj[coluna] = valores[i]
                ? valores[i].trim()
                : '';
        });

        return obj;
    });
}


// --------------------
// aulas
// --------------------

async function carregarAulas() {

    const response =
        await fetch('./data/links_canva.csv');

    const texto = await response.text();

    const dados = parseCSV(texto);

    const lista =
        document.getElementById("aulas-lista");

    lista.innerHTML = '';

    dados.forEach(item => {

        const aula = item.aula_n;
        const link = item.link_url;

        if (!link) return;

        lista.innerHTML += `
            <li>
                <a href="${link}" target="_blank">
                    Aula ${aula}
                </a>
            </li>
        `;
    });
}


// --------------------
// alunos
// --------------------

async function carregarAlunos() {

    const response =
        await fetch('./data/links_alunos.csv');

    const texto = await response.text();

    const dados = parseCSV(texto);

    const lista =
        document.getElementById("alunos-lista");

    lista.innerHTML = '';

    dados.forEach(item => {

        const desc = item.desc;
        const link = item.link_url;

        if (!link) return;

        lista.innerHTML += `
            <li>
                <a href="${link}" target="_blank">
                    ${desc}
                </a>
            </li>
        `;
    });
}


// --------------------
// init
// --------------------

carregarAulas();
carregarAlunos();