import React, { Component } from 'react';
import './App.scss';
import {BrowserRouter, Route} from "react-router-dom";
import Busqueda from './Busqueda';
import Detalles from './Detalles';
import Productos from './Productos';
// import 'typeface-roboto'

class App extends Component {
  render() {

    return (
        <BrowserRouter>
           <div>
            <Busqueda> </Busqueda>
{/* exact  */}
            <Route exact path="/items" component={Productos} />
            <Route path="/items/:id" component={Detalles} />
          </div>
        </BrowserRouter>
    )
  }
}

export default App;
