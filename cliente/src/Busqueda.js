import React, { Component } from 'react';
import iconoSearch from './Icono_Search.png';

import iconoAda from './Ada_Iso_Blanco.png'
import { Link } from "react-router-dom";

class Busqueda extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        }

        this.inputChange = this.inputChange.bind(this);
    }
    inputChange(event) {
        this.setState({ value: event.target.value });
    }
    render() {
        return (
            <div className="nav">
                <img alt=""  className="ada" src={iconoAda} />
                <div className="search">
                    <input type="text" value={this.state.value} onChange={this.inputChange} className="input" placeholder="Nunca dejes de buscar" />
                    <Link to={"/items?search=" + this.state.value}> <button className="buscar"> <img src={iconoSearch} alt=""  /> </button>  </Link>
                </div>

            </div>
        )

    }
}

export default Busqueda;
