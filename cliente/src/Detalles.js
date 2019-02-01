import React, { Component } from 'react';

class Detalles extends Component {
  constructor(props) {
    super(props)
    this.state = {
      unProducto: [],
      loading: true,
      categorias: []
    }

  }

  componentDidMount() {
    const id = this.props.match.params.id;
    //   devolveme todos los parametros 
    fetch('http://localhost:3001/api/items/' + id)
      .then((res) => {
        return res.json()
      })

      .then((data) => {
       
        this.setState({
          unProducto: data.item,
          loading: false,
          categorias: data.categories,
        })
      })
  }
  render() {
    const cat = this.state.categorias.map((c, i) =>
      <li key={i}>
        {c}{i < this.state.categorias.length - 1 ? " > " : ""}
      </li>)
    const producto = this.state.unProducto;
    if (this.state.loading === true) {
      return <p>'Espere'</p>
    }


    return (
      <div >
        <ul className="categories">{cat} </ul>
        <div className="cont" key={producto.id}>
          <div className="product">
            <img  alt="" src={producto.picture} />
            <p className="description"> Descripción del producto</p>
            <p className="descriptionProduct"> {producto.description} </p>
          </div>
          <div className="info">
            <p className="condition"> {producto.condition} - {producto.sold_quantity} vendidos </p>
            <p className="tit" >  {producto.title} </p>
            <p className="price priceDet"> {producto.price.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              <span className="decimal"> {producto.price.decimal.padEnd(2, 0)}</span>
            </p>
            <div className="boton">
              <button> Comprar </button>
            </div>
          </div>
        </div>
      </div>

    )
  }
}


export default Detalles;
