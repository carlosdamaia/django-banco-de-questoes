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
                            <a href="/home/biologia/frente-a"><li className="li-frente">Frente A</li></a>
                            <a href="/home/biologia/frente-b"><li className="li-frente">Frente B</li></a>
                            <a href="/home/biologia/frente-c"><li className="li-frente">Frente C</li></a>
                            <a href="/home/biologia/frente-d"><li className="li-frente">Frente D</li></a>
                            <a href="/home/biologia/frente-e"><li className="li-frente">Frente E</li></a>
                        </ol>
                    </li>
                    <li>
                        <button className="botoes-materias" onClick={() => this.setState(toggleMateria("fisica"))}>Física</button>
                        <ol className={materiasOpen.fisica ? "lista-frentes-open" : "lista-frentes-closed"}>
                            <a href="/home/fisica/frente-a"><li className="li-frente">Frente A</li></a>
                            <a href="/home/fisica/frente-b"><li className="li-frente">Frente B</li></a>
                            <a href="/home/fisica/frente-c"><li className="li-frente">Frente C</li></a>
                            <a href="/home/fisica/frente-d"><li className="li-frente">Frente D</li></a>
                        </ol>
                    </li>
                    <li>
                        <button className="botoes-materias" onClick={() => this.setState(toggleMateria("geografia"))}>Geografia</button>
                        <ol className={materiasOpen.geografia ? "lista-frentes-open" : "lista-frentes-closed"}>
                            <a href="/home/geografia/frente-a"><li className="li-frente">Frente A</li></a>
                            <a href="/home/geografia/frente-b"><li className="li-frente">Frente B</li></a>
                        </ol>
                    </li>
                    <li>
                        <button className="botoes-materias" onClick={() => this.setState(toggleMateria("historia"))}>História</button>
                        <ol className={materiasOpen.historia ? "lista-frentes-open" : "lista-frentes-closed"}>
                            <a href="/home/historia/frente-a"><li className="li-frente">Frente A</li></a>
                            <a href="/home/historia/frente-b"><li className="li-frente">Frente B</li></a>
                            <a href="/home/historia/frente-c"><li className="li-frente">Frente C</li></a>
                        </ol>
                    </li>
                    <li>
                        <button className="botoes-materias" onClick={() => this.setState(toggleMateria("matematica"))}>Matemática</button>
                        <ol className={materiasOpen.matematica ? "lista-frentes-open" : "lista-frentes-closed"}>
                            <a href="/home/matematica/frente-a"><li className="li-frente">Frente A</li></a>
                            <a href="/home/matematica/frente-b"><li className="li-frente">Frente B</li></a>
                            <a href="/home/matematica/frente-c"><li className="li-frente">Frente C</li></a>
                            <a href="/home/matematica/frente-d"><li className="li-frente">Frente D</li></a>
                            <a href="/home/matematica/frente-e"><li className="li-frente">Frente E</li></a>
                        </ol>
                    </li>
                    <li>
                        <button className="botoes-materias" onClick={() => this.setState(toggleMateria("portugues"))}>Português</button>
                        <ol className={materiasOpen.portugues ? "lista-frentes-open" : "lista-frentes-closed"}>
                            <a href="/home/portugues/frente-a"><li className="li-frente">Frente A</li></a>
                            <a href="/home/portugues/frente-b"><li className="li-frente">Frente B</li></a>
                            <a href="/home/portugues/frente-c"><li className="li-frente">Frente C</li></a>
                            <a href="/home/portugues/frente-d"><li className="li-frente">Frente D</li></a>
                        </ol>
                    </li>
                    <li>
                        <button className="botoes-materias" onClick={() => this.setState(toggleMateria("quimica"))}>Química</button>                        <ol className={materiasOpen.quimica ? "lista-frentes-open" : "lista-frentes-closed"}>
                            <a href="/home/quimica/frente-a"><li className="li-frente">Frente A</li></a>
                            <a href="/home/quimica/frente-b"><li className="li-frente">Frente B</li></a>
                            <a href="/home/quimica/frente-c"><li className="li-frente">Frente C</li></a>
                            <a href="/home/quimica/frente-d"><li className="li-frente">Frente D</li></a>
                            <a href="/home/quimica/frente-e"><li className="li-frente">Frente E</li></a>
                        </ol>
                    </li>
                </ul>
            </div>
        )
    }
}