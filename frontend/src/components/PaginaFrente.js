import React, { Component } from "react";
var Latex = require("react-latex");
import Header from "./Header";
import { buscarQuestao, concluirQuestao, buscarEstatisticas } from "./Api";
import { mostrarResposta } from "./Functions"
import Erro from "./Erro";
import NotFound from "./NotFound";

export default class PaginaFrente extends Component {
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

    buscarEstatisticasLocal = () => {
        const materia = this.state.dados.materia
        const frente = this.state.dados.frente
        const url_estatisticas = `/api/estatisticas-frente/${materia.toLowerCase()}/${frente.toLowerCase()}`
        buscarEstatisticas(url_estatisticas)
            .then(data => {
                this.setState(prevState => ({
                    estatisticas: { ...prevState.estatisticas, ...data }
                }))
            })
            .catch(error => {
                console.error('Erro ao concluir ou buscar estatísticas', error);
                this.setState({ error: error });
            });
    }

    concluirQuestaoLocal = () => {
        const id = this.state.dados.id
        const materia = this.state.dados.materia
        const frente = this.state.dados.frente
        return concluirQuestao(id, materia, frente)
            .then(data => {
                this.setState({ 
                    dados: data
                });
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
        const url_estatisticas = `/api/estatisticas-frente/${materia.toLowerCase()}/${frente.toLowerCase()}`
        buscarEstatisticas(url_estatisticas)
            .then(data => {
            this.setState(prevState => ({
                estatisticas: { ...prevState.estatisticas, ...data }
            }))
            })
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
        let questoes_total = this.state.estatisticas.questoes_total
        let questoes_concluidas = this.state.estatisticas.questoes_concluidas
        if (questoes_total - questoes_concluidas == 1) {
            alert("Não existe mais questões para pular nesta frente!")
        }
        this.carregarQuestao();
        this.limparRespostasCorretas();
    }

    handleClickConcluido = () => {
        this.concluirQuestaoLocal()
            .then(() => {
                this.buscarEstatisticasLocal();
            })
            .catch(error => {
                console.error("Erro ao concluir ou buscar estatísticas", error);
                this.setState({ error: error });
            })
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
                        <h2 className="titulo-secundario">{this.state.dados.materia} - {this.state.dados.frente}</h2>
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
                                    <li id="alternativa-1"><span id="alt-1" className="alternativas">{this.state.dados.conta_pontuacao ? "01" : "A"})</span> <Latex>{String(this.state.dados.texto_a)}</Latex></li>
                                )}
                                {this.state.dados.alt_b && (
                                    <li id="alternativa-2"><span id="alt-2" className="alternativas">{this.state.dados.conta_pontuacao ? "02" : "B"})</span> <Latex>{String(this.state.dados.texto_b)}</Latex></li>
                                )}
                                {this.state.dados.alt_c && (
                                    <li id="alternativa-3"><span id="alt-3" className="alternativas">{this.state.dados.conta_pontuacao ? "04" : "C"})</span> <Latex>{String(this.state.dados.texto_c)}</Latex></li>
                                )}
                                {this.state.dados.alt_d && (
                                    <li id="alternativa-4"><span id="alt-4" className="alternativas">{this.state.dados.conta_pontuacao ? "08" : "D"})</span> <Latex>{String(this.state.dados.texto_d)}</Latex></li>
                                )}
                                {this.state.dados.texto_e && (
                                    <li id="alternativa-5"><span id="alt-5" className="alternativas">{this.state.dados.conta_pontuacao ? "16" : "E"})</span> <Latex>{String(this.state.dados.texto_e)}</Latex></li>
                                )}
                                {this.state.dados.texto_f && (
                                    <li id="alternativa-6"><span id="alt-6" className="alternativas">{this.state.dados.conta_pontuacao ? "32" : "F"})</span> <Latex>{String(this.state.dados.texto_f)}</Latex></li>
                                )}
                                {this.state.dados.texto_g && (
                                    <li id="alternativa-7"><span id="alt-7" className="alternativas">{this.state.dados.conta_pontuacao ? "64" : "G"})</span> <Latex>{String(this.state.dados.texto_g)}</Latex></li>
                                )}
                            </ol>
                        </div>
                    </div>
                </div>

                <div className="botoes-acao">
                    <button onClick={() => mostrarResposta(this.state.dados)}>
                        Mostrar resposta
                    </button>
                    <button onClick={this.handleClickConcluido}>
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