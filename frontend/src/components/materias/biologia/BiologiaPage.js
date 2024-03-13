import React, { Component } from "react";
import Header from "../../Header";

export default class BiologiaPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dados: []
        };

        this.fetchDados = this.fetchDados.bind(this)
    }

    componentDidMount() {
        this.fetchDados();
    }

    fetchDados() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }
        fetch('/api/apresenta-questoes', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                this.setState({ dados: data });
            })
            .catch((error) => {
                console.error('Erro ao buscar dados:', error);
            });
    }

    render() {
        return (
            <div>
                <Header />
                <div>
                    <p>{this.state.dados.id}</p>
                    <p>{this.state.dados.enunciado}</p>
                </div>
                
            </div>
        )
    }
}