import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, useHistory } from "react-router-dom";
import { render } from "react-dom";
import HomePage from "./HomePage";
import PaginaFrente from "./PaginaFrente";
import Erro from "./Erro"
import NotFound from "./NotFound";

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <Routes>
                    <Route path="/home/erro" element={<Erro />} />
                    <Route path="/home/" element={<HomePage />} />
                    <Route path="/home/not-found" element={<NotFound />} />
                    <Route path="/home/biologia" element={<PaginaFrente materia="biologia"/>} />
                    <Route path="/home/fisica" element={<PaginaFrente materia="fisica"/>} />
                    <Route path="/home/geografia" element={<PaginaFrente materia="geografia"/>} />
                    <Route path="/home/historia" element={<PaginaFrente materia="historia"/>} />
                    <Route path="/home/matematica" element={<PaginaFrente materia="matematica"/>} />
                    <Route path="/home/portugues" element={<PaginaFrente materia="portugues"/>} />
                    <Route path="/home/quimica" element={<PaginaFrente materia="quimica"/>} />
                </Routes>
            </Router>
        );
    }
}

const appDiv = document.getElementById("app");
render(<App/>, appDiv);
