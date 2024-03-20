import React, { Component } from "react";
import "./home.css";


export default class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="header">
                <h1 className="titulo-principal">
                    <a href="/home">Banco de Questões</a>
                </h1>
            </div>
        )
    }
}