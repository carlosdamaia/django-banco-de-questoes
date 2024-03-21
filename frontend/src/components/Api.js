import Erro from "./Erro"

const buscarEstatisticas = (url_estatisticas) => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch(url_estatisticas, requestOptions)
        .then((response) => response.json())
        .then((estatisticas) => {
            return estatisticas;
        })
        .catch((error) => {
            console.error('Erro ao buscar as estatísicas', error);
        });
}

const buscarQuestao = (url) => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch(url, requestOptions)
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error('Erro ao buscar a questão', error);
            return <Erro />
        });
};

const concluirQuestao = (id, materia, frente) => {
    return fetch(`/api/concluir-questao/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao concluir questão: ' + response.statusText);
        }
        return fetch(`/api/listar/${materia.toLowerCase()}-${frente.toLowerCase()}`);
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao buscar próxima questão: ' + response.statusText);
        }
        return response.json();
    })
    .catch(error => {
        console.error(error);
        throw error;
    });
}

const registrarResposta = (id, materia, frente) => {
    return fetch(`/api/registrar-acerto/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao registrar acerto questão: ' + response.statusText);
        }
        return fetch(`/api/listar/${materia.toLowerCase()}-${frente.toLowerCase()}`);
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao registrar acerto questão: ' + response.statusText);
        }
        return response.json();
    })
    .catch(error => {
        console.error(error);
        throw error;
    });
}

export { buscarQuestao, concluirQuestao, buscarEstatisticas, registrarResposta };
