import React, { Component } from "react";
var Latex = require("react-latex");
import Header from "./Header";
import { buscarQuestao, concluirQuestao, buscarEstatisticas, registrarResposta } from "./Api";
import { mostrarResposta } from "./Functions"
import NotFound from "./NotFound";

export default class PaginaFrente extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dados: {},
            estatisticas: {},
            error: null,
            mostrarResposta: false,
            checkedItems: {},
            selectedAlternatives: [],
            acertou: false
        };
    }

    mostrarResposta() {
        const umSelecionado = Object.values(this.state.checkedItems).some(item => item === true);
        if (umSelecionado) {
            mostrarResposta(this.state.dados, this.state.checkedItems);
            this.setState({ 
                respostas: this.state.dados.alt_correta,
                mostrarResposta: true, 
            });
        } else {
            alert("Selecione uma alternativa antes de solicitar as respostas!");
        }
        const algumComErro = Array.from(document.querySelectorAll("li")).some(li => li.classList.contains("alternativa-errada") || li.classList.contains("alternativa-correta-nao-selecionada")); 
        if (algumComErro == false) {
            registrarResposta(this.state.dados.id, this.state.dados.materia, this.state.dados.frente)
                .then(() => console.log("Resposta registrada com sucesso!"))
                .catch(error => console.error("Erro ao registrar resposta:", error));
        }
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
                const resetCheckedItems = {};
                Object.keys(this.state.checkedItems).forEach((key) => {
                    resetCheckedItems[key] = false;
                })
                this.setState({ 
                    checkedItems: resetCheckedItems,
                    mostrarResposta: false,
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
                console.log(this.state.dados)
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
        const resetCheckedItems = {};
        Object.keys(this.state.checkedItems).forEach((key) => {
            resetCheckedItems[key] = false;
        })
        this.setState({ 
            checkedItems: resetCheckedItems,
            mostrarResposta: false,
        });
        this.carregarQuestao();
        this.limparRespostasCorretas();
    }

    handleClickConcluido = () => {
        const umSelecionado = Object.values(this.state.checkedItems).some(item => item === true);
        if (umSelecionado) {
            this.concluirQuestaoLocal()
                .then(() => {
                    this.buscarEstatisticasLocal();
                })
                .catch(error => {
                    console.error("Erro ao concluir ou buscar estatísticas", error);
                    this.setState({ error: error });
                })
        } else {
            alert("A questão só pode ser concluída após selecionar uma resposta!")
        }
        
    }

    limparRespostasCorretas = () => {
        const respostasCorretas = document.querySelectorAll(".alternativa-correta");
        respostasCorretas.forEach((resposta) => {
            resposta.classList.remove("alternativa-correta");
            resposta.classList.remove("alternativa-errada");
        });

        const respostasErradas = document.querySelectorAll(".alternativa-errada");
        respostasErradas.forEach((resposta) => {
            resposta.classList.remove("alternativa-errada");
        });

        const respostasCorretasNaoSelecionadas = document.querySelectorAll(".alternativa-correta-nao-selecionada");
        respostasCorretasNaoSelecionadas.forEach((resposta) => {
            resposta.classList.remove("alternativa-correta-nao-selecionada");
        });
    }

    handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        if (!this.state.mostrarResposta) {
            this.setState((prevState) => ({
                checkedItems: {
                    ...prevState.checkedItems,
                    [name]: checked
                },
                selectedAlternatives: checked ? [...prevState.selectedAlternatives, name] : prevState.selectedAlternatives.filter(item => item !== name)
            }));
        }
    };

    render() {
        console.log(this.state.dados.imagem)
        const { error } = this.state;

        if(!this.state.dados.id || error) {
            return <NotFound />
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
                            {this.state.dados.imagem && (
                                <div className="div-imagem">
                                    <img className="imagem-enunciado" src={this.state.dados.imagem} />
                                </div>
                            )}
                        </div>
                        <div className="corpo-alternativas">
                            <ol>
                                {this.state.dados.texto_a !== "" && (
                                    <li id="alternativa-1">
                                        <input
                                            className="checkboxes"
                                            type="checkbox"
                                            id="checkbox-alt-1"
                                            name="alt_1"
                                            checked={this.state.checkedItems.alt_1 || false}
                                            onChange={this.handleCheckboxChange}
                                        />
                                    <label htmlFor="checkbox-alt-1">
                                        <span id="alt-1" className="alternativas">{this.state.dados.conta_pontuacao ? "01" : "A"})</span> <Latex>{String(this.state.dados.texto_a)}</Latex>
                                    </label>
                                    </li>
                                )}
                                {this.state.dados.texto_b !== "" && (
                                    <li id="alternativa-2">
                                        <input
                                            className="checkboxes"
                                            type="checkbox"
                                            id="checkbox-alt-2"
                                            name="alt_2"
                                            checked={this.state.checkedItems.alt_2 || false}
                                            onChange={this.handleCheckboxChange}
                                        />
                                    <label htmlFor="checkbox-alt-2">
                                        <span id="alt-2" className="alternativas">{this.state.dados.conta_pontuacao ? "02" : "B"})</span> <Latex>{String(this.state.dados.texto_b)}</Latex>
                                    </label>
                                    </li>
                                )}
                                {this.state.dados.texto_c !== "" && (
                                    <li id="alternativa-3">
                                        <input
                                            className="checkboxes"
                                            type="checkbox"
                                            id="checkbox-alt-3"
                                            name="alt_3"
                                            checked={this.state.checkedItems.alt_3 || false}
                                            onChange={this.handleCheckboxChange}
                                        />
                                    <label htmlFor="checkbox-alt-3">
                                        <span id="alt-3" className="alternativas">{this.state.dados.conta_pontuacao ? "04" : "C"})</span> <Latex>{String(this.state.dados.texto_c)}</Latex>
                                    </label>
                                    </li>
                                )}
                                {this.state.dados.texto_d !== "" && (
                                    <li id="alternativa-4">
                                        <input
                                            className="checkboxes"
                                            type="checkbox"
                                            id="checkbox-alt-4"
                                            name="alt_4"
                                            checked={this.state.checkedItems.alt_4 || false}
                                            onChange={this.handleCheckboxChange}
                                        />
                                    <label htmlFor="checkbox-alt-4">
                                        <span id="alt-4" className="alternativas">{this.state.dados.conta_pontuacao ? "08" : "D"})</span> <Latex>{String(this.state.dados.texto_d)}</Latex>
                                    </label>
                                    </li>
                                )}
                                {this.state.dados.texto_e !== "" && (
                                    <li id="alternativa-5">
                                        <input
                                            className="checkboxes"
                                            type="checkbox"
                                            id="checkbox-alt-5"
                                            name="alt_5"
                                            checked={this.state.checkedItems.alt_5 || false}
                                            onChange={this.handleCheckboxChange}
                                        />
                                    <label htmlFor="checkbox-alt-5">
                                        <span id="alt-5" className="alternativas">{this.state.dados.conta_pontuacao ? "16" : "E"})</span> <Latex>{String(this.state.dados.texto_e)}</Latex>
                                    </label>
                                    </li>
                                )}
                                {this.state.dados.texto_f !== "" && (
                                    <li id="alternativa-6">
                                        <input
                                            className="checkboxes"
                                            type="checkbox"
                                            id="checkbox-alt-6"
                                            name="alt_6"
                                            checked={this.state.checkedItems.alt_6 || false}
                                            onChange={this.handleCheckboxChange}
                                        />
                                    <label htmlFor="checkbox-alt-6">
                                        <span id="alt-6" className="alternativas">{this.state.dados.conta_pontuacao ? "32" : "F"})</span> <Latex>{String(this.state.dados.texto_f)}</Latex>
                                    </label>
                                    </li>
                                )}
                                {this.state.dados.texto_g !== "" && (
                                    <li id="alternativa-7">
                                        <input
                                            className="checkboxes"
                                            type="checkbox"
                                            id="checkbox-alt-7"
                                            name="alt_7"
                                            checked={this.state.checkedItems.alt_7 || false}
                                            onChange={this.handleCheckboxChange}
                                        />
                                    <label htmlFor="checkbox-alt-7">
                                        <span id="alt-7" className="alternativas">{this.state.dados.conta_pontuacao ? "64" : "G"})</span> <Latex>{String(this.state.dados.texto_g)}</Latex>
                                    </label>
                                    </li>
                                )}
                            </ol>
                        </div>
                    </div>
                </div>

                <div className="botoes-acao">
                    <button onClick={() => this.mostrarResposta()}>
                        Resposta
                    </button>
                    <button onClick={this.handleClickConcluido}>
                        Concluir
                    </button>
                    <button onClick={this.handleClickPular}>
                        Pular
                    </button>
                </div>            
            </div>
        )
    }
 }