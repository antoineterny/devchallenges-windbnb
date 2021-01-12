import { render } from "@testing-library/react"
import "./App.scss"
import React from "react"
import Header from "./components/Header"
import StaysList from "./components/StaysList"

class App extends React.Component {
  state = { stays: [], city: "", displayedStays: [], availableCities: [] }

  getCities = stays => {
    let cities = []
    stays.forEach(stay => {
      const city = stay.city + ", " + stay.country
      if (!cities.includes(city)) cities.push(city)
    })
    return cities
  }

  componentDidMount() {
    fetch("stays.json")
      .then(res => res.json())
      .then(data =>
        this.setState({ stays: data, displayedStays: data, availableCities: this.getCities(data) })
      )
  }

  render() {
    return (
      <div className="App">
        <Header />
        <StaysList
          city={this.state.city ? this.state.city : "Finland"}
          stays={this.state.displayedStays}
        />
      </div>
    )
  }
}

export default App
