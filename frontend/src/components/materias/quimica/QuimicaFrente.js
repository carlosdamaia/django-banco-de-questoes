import React, { Component } from "react";
var Latex = require("react-latex");
import Header from "../../Header";
import { buscarQuestao, concluirQuestao, buscarEstatisticas } from "../../Api";
import { mostrarResposta } from "../../Functions"
import Erro from "../../Erro";
import NotFound from "../../NotFound";


export default class QuimicaFrente extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dados: {},
            estatisticas: {},
            error: null,
            mostrarResposta: false,
        };
    }  

    mostrarResposta = () => {
        mostrarResposta(this.state.dados);
        this.setState({ 
            respostas: this.state.dados.alt_correta,
            mostrarResposta: true, 
        });
    };

    concluirQuestaoLocal = () => {
        const id = this.state.dados.id
        const materia = this.state.dados.materia
        const frente = this.state.dados.frente
        concluirQuestao(id, materia, frente)
            .then(data => {
                this.setState({ dados: data });
                this.limparRespostasCorretas();
            })
            .catch(error => {
                console.error('Erro ao concluir ou buscar a próxima questão:', error);
                this.setState({ error: error });
            });
    }

    componentDidMount() {
        const { materia, frente, error } = this.props;
        const url = `/api/listar/${materia.toLowerCase()}-${frente.toLowerCase()}`;
        const url_estatisticas = `/api/estatisticas-frente/${materia.toLowerCase()}/${frente.toLowerCase()}`
        buscarEstatisticas(url_estatisticas)
            .then((data) => {
                this.setState({ estatisticas: data })
            })
        buscarQuestao(url, error)
            .then((data) => {
                this.setState({ dados: data });
            })
            .catch((error) => {
                console.error('Erro ao buscar buscar questão via API', error);
                this.setState({ error: error });
            })
    }

    carregarQuestao = () => {
        const { materia, frente } = this.props;
        const url = `/api/listar/${materia.toLowerCase()}-${frente.toLowerCase()}`;
        buscarQuestao(url)
            .then((data) => {
                if (!data) {
                    throw new Error('Nenhuma questão encontrada ao pular uma questão');
                }
                this.setState({ dados: data, error: null});
            })
            .catch((error) => {
                console.error('Erro ao buscar NOVA questão ao pular questão', error);
                this.setState({ error: error });
            });
    }

    handleClickPular = () => {
        this.carregarQuestao();
        this.limparRespostasCorretas();
    }

    limparRespostasCorretas = () => {
        const respostasCorretas = document.querySelectorAll(".alternativa-correta");
        respostasCorretas.forEach((resposta) => {
            resposta.classList.remove("alternativa-correta");
        });
    }

    render() {
        
        const { error } = this.state;

        if(!this.state.dados.id) {
            return <NotFound />
        }

        if (error) {
            return <Erro />
        }

        return (
            <div>
                <Header />
                <div>
                    <div className="questoes-header">
                        <h2 className="titulo-secundario">{this.state.dados.materia} - Frente {this.state.dados.frente}</h2>
                        <h2 className="titulo-secundario">{this.state.estatisticas.questoes_concluidas}/{this.state.estatisticas.questoes_total}</h2>
                    </div>                    
                    <div className="corpo-questao">
                        <div className="numero-criador">
                            <h3>{this.state.dados.numero} ({this.state.dados.criador})</h3>
                        </div>
                        <div className="corpo-enunciado">
                            <Latex>
                                {String(this.state.dados.enunciado)}
                            </Latex>
                        </div>
                        <div className="corpo-alternativas">
                            <ol>
                                {this.state.dados.alt_a && (
                                    <li id="alternativa-1">{this.state.dados.alt_a}) <Latex>{String(this.state.dados.texto_a)}</Latex></li>
                                )}
                                {this.state.dados.alt_b && (
                                    <li id="alternativa-2">{this.state.dados.alt_b}) <Latex>{String(this.state.dados.texto_b)}</Latex></li>
                                )}
                                {this.state.dados.alt_c && (
                                    <li id="alternativa-3">{this.state.dados.alt_c}) <Latex>{String(this.state.dados.texto_c)}</Latex></li>
                                )}
                                {this.state.dados.alt_d && (
                                    <li id="alternativa-4">{this.state.dados.alt_d}) <Latex>{String(this.state.dados.texto_d)}</Latex></li>
                                )}
                                {this.state.dados.texto_e && (
                                    <li id="alternativa-5">{this.state.dados.alt_e}) <Latex>{String(this.state.dados.texto_e)}</Latex></li>
                                )}
                                {this.state.dados.texto_f && (
                                    <li id="alternativa-6">{this.state.dados.alt_f}) <Latex>{String(this.state.dados.texto_f)}</Latex></li>
                                )}
                                {this.state.dados.texto_g && (
                                    <li id="alternativa-7">{this.state.dados.alt_g}) <Latex>{String(this.state.dados.texto_g)}</Latex></li>
                                )}
                            </ol>
                        </div>
                    </div>
                </div>

                <div className="botoes-acao">
                    <button onClick={() => mostrarResposta(this.state.dados)}>
                        Mostrar resposta
                    </button>
                    <button onClick={this.concluirQuestaoLocal}>
                        Concluído
                    </button>
                    <button onClick={this.handleClickPular}>
                        Pular
                    </button>
                </div>            
            </div>
        )
    }
 }