const toggleMateria = (materia) => (prevState) => {
    const newMateriasOpen = { ...prevState.materiasOpen }; 
    newMateriasOpen[materia] = !newMateriasOpen[materia];
    return { materiasOpen: newMateriasOpen };
}

const mostrarResposta = (dados) => {
    if (!dados || !dados.alt_correta) {
        console.error("Dados inválidos");
        return;
    }

    const alternativasCorretas = dados.alt_correta;
    console.log(alternativasCorretas)
    alternativasCorretas.forEach((alt) => {
        const alternativa = document.getElementById(`alternativa-${alt}`);
        if (alternativa) {
            alternativa.classList.add("alternativa-correta");
        }
    });

    return alternativasCorretas;
};

export { toggleMateria, mostrarResposta };
