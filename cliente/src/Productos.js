import React, { Component } from 'react';
import { Link } from "react-router-dom";
import shipping from './Icono_Envio.png'

class Productos extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todosLosProductos: [],
      palabraDeBusqueda: "",
      categorias: [],
    }
  }

  mostraProductos() {
    const urlParams = new URLSearchParams(window.location.search);
    const pr = urlParams.get('search');
    fetch('http://localhost:3001/api/items?search=' + pr)
      .then((res) => {
        return res.json()
      })

      .then((data) => {
        this.setState({
          todosLosProductos: data.items,
          palabraDeBusqueda: pr,
          categorias: data.categories,

        })
      })
  }

  componentDidMount() {
    this.mostraProductos()
  }

  componentDidUpdate() {
    const urlParams = new URLSearchParams(window.location.search);
    const pr = urlParams.get('search');

    if (this.state.palabraDeBusqueda !== pr) {
      this.mostraProductos()
    }

  }

  render() {
    const cat = this.state.categorias.map((c, i) =>
      <li key={i}>
        {c}{i < this.state.categorias.length - 1 ? " > " : ""}
      </li>
    )
    const product = this.state.todosLosProductos.map((p) =>

      <Link to={"/items/" + p.id}  key={p.id} >
        <div key={p.id} className="container">
          <div className="image" >
            <img alt="" src={p.picture} className="img" />
          </div>
          <div className="title">
            <div className="price-shipping">
              <p className="price">  <span> {p.price.currency === "ARS" && "$"}</span> {p.price.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                <span className="decimal">{p.price.decimal.padEnd(2, 0)}</span>
              </p>
              {p.free_shipping === true && <img className="shipping" src={shipping} alt=""  />}
            </div>
            <p> {p.title} </p>
          </div>
          <div className="loc">
                 <p className="location">{p.location}</p>
          </div>
        </div>

      </Link>)



    return (

      <div className="datos">
        <ul> {cat}  </ul>
        {product}

      </div>

    )
  }
}


export default Productos;



