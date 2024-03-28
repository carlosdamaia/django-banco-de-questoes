import React, { Component, useState } from "react";
import Header from "./Header";

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            materiasOpen: {}
        };
    }
   
    render() {
        
        return (
            <div>
                <Header />
                <div className="questoes-header-home">
                    <h2 className="titulo-secundario">Matérias</h2>
                </div>
                
                <ul className="lista-materias">
                    <li>
                        <a href="/home/biologia"><li className="botoes-materias">Biologia</li></a>
                    </li>
                    <li>
                        <a href="/home/fisica"><li className="botoes-materias">Física</li></a>
                    </li>
                    <li>
                        <a href="/home/geografia"><li className="botoes-materias">Geografia</li></a>
                    </li>
                    <li>
                        <a href="/home/historia"><li className="botoes-materias">História</li></a>
                    </li>
                    <li>
                        <a href="/home/matematica"><li className="botoes-materias">Matemática</li></a>
                    </li>
                    <li>
                        <a href="/home/portugues"><li className="botoes-materias">Português</li></a>
                    </li>
                    <li>
                        <a href="/home/quimica"><li className="botoes-materias">Química</li></a>
                    </li>
                </ul>
            </div>
        )
    }
}
