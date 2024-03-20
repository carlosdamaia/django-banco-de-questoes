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
                    <Route path="/home/biologia/frente-a" element={<PaginaFrente materia="biologia" frente="A" />} />
                    <Route path="/home/biologia/frente-b" element={<PaginaFrente materia="biologia" frente="B" />} />
                    <Route path="/home/biologia/frente-c" element={<PaginaFrente materia="biologia" frente="C" />} />
                    <Route path="/home/biologia/frente-d" element={<PaginaFrente materia="biologia" frente="D" />} />
                    <Route path="/home/biologia/frente-e" element={<PaginaFrente materia="biologia" frente="E" />} />
                    <Route path="/home/fisica/frente-a" element={<PaginaFrente materia="fisica" frente="A"/>} />
                    <Route path="/home/fisica/frente-b" element={<PaginaFrente materia="fisica" frente="B"/>} />
                    <Route path="/home/fisica/frente-c" element={<PaginaFrente materia="fisica" frente="C"/>} />
                    <Route path="/home/fisica/frente-d" element={<PaginaFrente materia="fisica" frente="D"/>} />
                    <Route path="/home/geografia/frente-a" element={<PaginaFrente materia="geografia" frente="A" />} />
                    <Route path="/home/geografia/frente-b" element={<PaginaFrente materia="geografia" frente="B" />} />
                    <Route path="/home/historia/frente-a" element={<PaginaFrente materia="historia" frente="A" />} />
                    <Route path="/home/historia/frente-b" element={<PaginaFrente materia="historia" frente="B" />} />
                    <Route path="/home/historia/frente-c" element={<PaginaFrente materia="historia" frente="C" />} />
                    <Route path="/home/matematica/frente-a" element={<PaginaFrente materia="matematica" frente="A" />} />
                    <Route path="/home/matematica/frente-b" element={<PaginaFrente materia="matematica" frente="B" />} />
                    <Route path="/home/matematica/frente-c" element={<PaginaFrente materia="matematica" frente="C" />} />
                    <Route path="/home/matematica/frente-d" element={<PaginaFrente materia="matematica" frente="D" />} />
                    <Route path="/home/matematica/frente-e" element={<PaginaFrente materia="matematica" frente="E" />} />
                    <Route path="/home/portugues/frente-a" element={<PaginaFrente materia="portugues" frente="A" />} />
                    <Route path="/home/portugues/frente-b" element={<PaginaFrente materia="portugues" frente="B" />} />
                    <Route path="/home/portugues/frente-c" element={<PaginaFrente materia="portugues" frente="C" />} />
                    <Route path="/home/portugues/frente-d" element={<PaginaFrente materia="portugues" frente="D" />} />
                    <Route path="/home/quimica/frente-a" element={<PaginaFrente materia="quimica" frente="A" />} />
                    <Route path="/home/quimica/frente-b" element={<PaginaFrente materia="quimica" frente="B" />} />
                    <Route path="/home/quimica/frente-c" element={<PaginaFrente materia="quimica" frente="C" />} />
                    <Route path="/home/quimica/frente-d" element={<PaginaFrente materia="quimica" frente="D" />} />
                    <Route path="/home/quimica/frente-e" element={<PaginaFrente materia="quimica" frente="E" />} />
                </Routes>
            </Router>
        );
    }
}

const appDiv = document.getElementById("app");
render(<App/>, appDiv);
