// import { render } from "@testing-library/react"
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

  onFormSubmit = e => {
    e.preventDefault()
    const reqCity = e.target[0].value.split(", ")[0]
    const reqCountry = e.target[0].value.split(", ")[1]
    const reqGuests = parseInt(e.target[1].value)

    let selectedStays = this.state.stays
    if (reqCountry) selectedStays = selectedStays.filter(stay => stay.country === reqCountry)
    if (reqCity) {
      selectedStays = selectedStays.filter(stay => stay.city === reqCity)
      this.setState({ city: reqCity })
    }
    if (!reqCity) {
      this.setState({ city: "" })
    }
    if (reqGuests) selectedStays = selectedStays.filter(stay => stay.maxGuests >= reqGuests)

    this.setState({ displayedStays: selectedStays })
  }

  reset = () => {
    this.setState({ displayedStays: this.state.stays, city: "" })
  }

  render() {
    return (
      <div className="App">
        <Header
          onLocationChange={this.onLocationChange}
          availableCities={this.state.availableCities}
          onFormSubmit={this.onFormSubmit}
          reset={this.reset}
        />
        <StaysList
          city={this.state.city ? this.state.city : "Finland"}
          stays={this.state.displayedStays}
        />
        <footer>Antoine Terny @ DevChallenges.io</footer>
      </div>
    )
  }
}

export default App
