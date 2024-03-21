const toggleMateria = (materia) => (prevState) => {
    const newMateriasOpen = { ...prevState.materiasOpen }; 
    newMateriasOpen[materia] = !newMateriasOpen[materia];
    return { materiasOpen: newMateriasOpen };
}

/*const mostrarResposta = (dados) => {
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
};*/

const mostrarResposta = (dados, checkedItems) => {

    console.log("Dados recebidos:", dados);
    console.log("Checked items recebidos:", checkedItems);

    if (!dados || !dados.alt_correta) {
        console.error("DADOS INVÁLIDOS!");
        return;
    }

    const alternativasCorretas = dados.alt_correta;
    const todasAsAlternativas = [];

    for (let i = 'a'.charCodeAt(0); i <= 'g'.charCodeAt(0); i++) {
        const letra = String.fromCharCode(i);
        const texto = dados[`texto_${letra}`];
        const alternativa_add = dados[`alt_${letra}`];

        if (texto !== '') {
            todasAsAlternativas.push(alternativa_add);
        }
    }

    todasAsAlternativas.forEach((alt) => {
        const alternativa = document.getElementById(`alternativa-${alt}`);
        console.log("ALT", alt)
        if (alternativa) {
            const isChecked = checkedItems[`alt_${alt}`];;
            const isCorreta = alternativasCorretas.includes(alt);
            
            console.log(`isChecked: ${isChecked}, isCorreta: ${isCorreta}`);
            console.log("Alternativa:", alternativa)

            if (isCorreta && isChecked) {
                alternativa.classList.add("alternativa-correta");
            } else if (!isCorreta && isChecked) {
                alternativa.classList.add("alternativa-errada");
            } else if (isCorreta && !isChecked) {
                alternativa.classList.add("alternativa-correta-nao-selecionada");
            }
        }
    });
};

export { toggleMateria, mostrarResposta };
