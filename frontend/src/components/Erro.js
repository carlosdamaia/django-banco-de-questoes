import React, { Component } from "react";
import Header from "./Header";
import NotFound from "./NotFound";

export default class Erro extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <NotFound />
            </div>
        )
    }
}