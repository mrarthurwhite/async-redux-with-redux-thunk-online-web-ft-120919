import React from 'react';
import './App.css';
import NavBar from './components/NavBar.js'
import NewCar from './components/NewCar.js'
import Home from './components/Home.js'
import CarsContainer from './containers/CarsContainer.js'
import ReviewsContainer from './containers/ReviewsContainer.js'
import { Switch, Route } from 'react-router-dom'

import { connect } from 'react-redux'
import { loadCars } from './actions/cars.js'

class App extends React.Component {

  componentDidMount() {
    this.getCars()
  }

  getCars = () => {
    fetch("http://localhost:3001/api/v1/cars")
      .then(resp => resp.json())
      .then(carsJSON => {
        if (carsJSON.error) {
          alert(carsJSON.error)
        } else {
          this.props.loadCars(carsJSON)
        }
      })
  }

  // the render method should be a pure function of props and state
  render() {

    return (

      <div className="App">
        <h1><span role="img" aria-label="red car">🚗</span> React Cars <span role="img" aria-label="blue car">🚙</span></h1>
        <NavBar />
        <Switch>
          <Route exact path="/cars/new" component={NewCar}/>
          <Route path="/cars" component={CarsContainer}/>
          <Route exact path="/reviews" component={ReviewsContainer}/>
          <Route path="/" component={Home}/>
        </Switch>

      </div>

    );

  }
}

export default connect(null, { loadCars })(App);
