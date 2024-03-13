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
                    <Route path="/erro" element={<Erro />} />
                    <Route path="/" element={<HomePage />} />
                    <Route path="/not-found" element={<NotFound />} />
                    <Route path="/biologia/frente-a" element={<PaginaFrente materia="biologia" frente="A" />} />
                    <Route path="/biologia/frente-b" element={<PaginaFrente materia="biologia" frente="B" />} />
                    <Route path="/biologia/frente-c" element={<PaginaFrente materia="biologia" frente="C" />} />
                    <Route path="/biologia/frente-d" element={<PaginaFrente materia="biologia" frente="D" />} />
                    <Route path="/biologia/frente-e" element={<PaginaFrente materia="biologia" frente="E" />} />
                    <Route path="/fisica/frente-a" element={<PaginaFrente materia="fisica" frente="A"/>} />
                    <Route path="/fisica/frente-b" element={<PaginaFrente materia="fisica" frente="B"/>} />
                    <Route path="/fisica/frente-c" element={<PaginaFrente materia="fisica" frente="C"/>} />
                    <Route path="/fisica/frente-d" element={<PaginaFrente materia="fisica" frente="D"/>} />
                    <Route path="/geografia/frente-a" element={<PaginaFrente materia="geografia" frente="A" />} />
                    <Route path="/geografia/frente-b" element={<PaginaFrente materia="geografia" frente="B" />} />
                    <Route path="/historia/frente-a" element={<PaginaFrente materia="historia" frente="A" />} />
                    <Route path="/historia/frente-b" element={<PaginaFrente materia="historia" frente="B" />} />
                    <Route path="/historia/frente-c" element={<PaginaFrente materia="historia" frente="C" />} />
                    <Route path="/matematica/frente-a" element={<PaginaFrente materia="matematica" frente="A" />} />
                    <Route path="/matematica/frente-b" element={<PaginaFrente materia="matematica" frente="B" />} />
                    <Route path="/matematica/frente-c" element={<PaginaFrente materia="matematica" frente="C" />} />
                    <Route path="/matematica/frente-d" element={<PaginaFrente materia="matematica" frente="D" />} />
                    <Route path="/matematica/frente-e" element={<PaginaFrente materia="matematica" frente="E" />} />
                    <Route path="/portugues/frente-a" element={<PaginaFrente materia="portugues" frente="A" />} />
                    <Route path="/portugues/frente-b" element={<PaginaFrente materia="portugues" frente="B" />} />
                    <Route path="/portugues/frente-c" element={<PaginaFrente materia="portugues" frente="C" />} />
                    <Route path="/portugues/frente-d" element={<PaginaFrente materia="portugues" frente="D" />} />
                    <Route path="/quimica/frente-a" element={<PaginaFrente materia="quimica" frente="A" />} />
                    <Route path="/quimica/frente-b" element={<PaginaFrente materia="quimica" frente="B" />} />
                    <Route path="/quimica/frente-c" element={<PaginaFrente materia="quimica" frente="C" />} />
                    <Route path="/quimica/frente-d" element={<PaginaFrente materia="quimica" frente="D" />} />
                    <Route path="/quimica/frente-e" element={<PaginaFrente materia="quimica" frente="E" />} />
                </Routes>
            </Router>
        );
    }
}

const appDiv = document.getElementById("app");
render(<App/>, appDiv);
