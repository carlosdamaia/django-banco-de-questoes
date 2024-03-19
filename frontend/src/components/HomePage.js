import React, { Component, useState } from "react";
import Header from "./Header";
import { toggleMateria } from "./Functions";

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            materiasOpen: {}
        };
    }
   
    render() {
        const { materiasOpen } = this.state;
        
        return (
            <div>
                <Header />
                <div className="questoes-header-home">
                    <h2 className="titulo-secundario">Matérias</h2>
                </div>
                
                <ul className="lista-materias">
                    <li>
                        <button className="botoes-materias" onClick={() => this.setState(toggleMateria("biologia"))}>Biologia</button>
                        <ol className={materiasOpen.biologia ? "lista-frentes-open" : "lista-frentes-closed"}>
                            <a href="/biologia/frente-a"><li className="li-frente">Frente A</li></a>
                            <a href="/biologia/frente-b"><li className="li-frente">Frente B</li></a>
                            <a href="/biologia/frente-c"><li className="li-frente">Frente C</li></a>
                            <a href="/biologia/frente-d"><li className="li-frente">Frente D</li></a>
                            <a href="/biologia/frente-e"><li className="li-frente">Frente E</li></a>
                        </ol>
                    </li>
                    <li>
                        <button className="botoes-materias" onClick={() => this.setState(toggleMateria("fisica"))}>Física</button>
                        <ol className={materiasOpen.fisica ? "lista-frentes-open" : "lista-frentes-closed"}>
                            <a href="/fisica/frente-a"><li className="li-frente">Frente A</li></a>
                            <a href="/fisica/frente-b"><li className="li-frente">Frente B</li></a>
                            <a href="/fisica/frente-c"><li className="li-frente">Frente C</li></a>
                            <a href="/fisica/frente-d"><li className="li-frente">Frente D</li></a>
                        </ol>
                    </li>
                    <li>
                        <button className="botoes-materias" onClick={() => this.setState(toggleMateria("geografia"))}>Geografia</button>
                        <ol className={materiasOpen.geografia ? "lista-frentes-open" : "lista-frentes-closed"}>
                            <a href="/geografia/frente-a"><li className="li-frente">Frente A</li></a>
                            <a href="/geografia/frente-b"><li className="li-frente">Frente B</li></a>
                        </ol>
                    </li>
                    <li>
                        <button className="botoes-materias" onClick={() => this.setState(toggleMateria("historia"))}>História</button>
                        <ol className={materiasOpen.historia ? "lista-frentes-open" : "lista-frentes-closed"}>
                            <a href="/historia/frente-a"><li className="li-frente">Frente A</li></a>
                            <a href="/historia/frente-b"><li className="li-frente">Frente B</li></a>
                            <a href="/historia/frente-c"><li className="li-frente">Frente C</li></a>
                        </ol>
                    </li>
                    <li>
                        <button className="botoes-materias" onClick={() => this.setState(toggleMateria("matematica"))}>Matemática</button>
                        <ol className={materiasOpen.matematica ? "lista-frentes-open" : "lista-frentes-closed"}>
                            <a href="/matematica/frente-a"><li className="li-frente">Frente A</li></a>
                            <a href="/matematica/frente-b"><li className="li-frente">Frente B</li></a>
                            <a href="/matematica/frente-c"><li className="li-frente">Frente C</li></a>
                            <a href="/matematica/frente-d"><li className="li-frente">Frente D</li></a>
                            <a href="/matematica/frente-e"><li className="li-frente">Frente E</li></a>
                        </ol>
                    </li>
                    <li>
                        <button className="botoes-materias" onClick={() => this.setState(toggleMateria("portugues"))}>Português</button>
                        <ol className={materiasOpen.portugues ? "lista-frentes-open" : "lista-frentes-closed"}>
                            <a href="/portugues/frente-a"><li className="li-frente">Frente A</li></a>
                            <a href="/portugues/frente-b"><li className="li-frente">Frente B</li></a>
                            <a href="/portugues/frente-c"><li className="li-frente">Frente C</li></a>
                            <a href="/portugues/frente-d"><li className="li-frente">Frente D</li></a>
                        </ol>
                    </li>
                    <li>
                        <button className="botoes-materias" onClick={() => this.setState(toggleMateria("quimica"))}>Química</button>                        <ol className={materiasOpen.quimica ? "lista-frentes-open" : "lista-frentes-closed"}>
                            <a href="/quimica/frente-a"><li className="li-frente">Frente A</li></a>
                            <a href="/quimica/frente-b"><li className="li-frente">Frente B</li></a>
                            <a href="/quimica/frente-c"><li className="li-frente">Frente C</li></a>
                            <a href="/quimica/frente-d"><li className="li-frente">Frente D</li></a>
                            <a href="/quimica/frente-e"><li className="li-frente">Frente E</li></a>
                        </ol>
                    </li>
                </ul>
            </div>
        )
    }
}