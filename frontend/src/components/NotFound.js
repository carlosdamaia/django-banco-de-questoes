import React, { Component } from "react";
import Header from "./Header";

export default class NotFound extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Header />
                <div className="container-pagina-erro">
                    <h1>Ops...</h1>
                    <h2>Parece que nenhuma questão foi encontrada... Talvez todas as perguntas foram concluídas?</h2>
                    <div className="botao-voltar">
                        <a href="/">Voltar para a página inicial</a>
                    </div>
                </div>
            </div>
        )
    }
}