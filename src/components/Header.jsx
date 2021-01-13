import "./Header.scss"
import React from "react"

class Header extends React.Component {
  state = {
    locationInput: "",
    guestsInput: "",
    expanded: false,
    locationActive: false,
    guestsActive: false,
    nbAdults: 0,
    nbChildren: 0,
  }
  baseState = this.state

  expandHeader = () => {
    this.setState({ expanded: true })
  }
  contractHeader = () => {
    this.setState({ expanded: false })
  }
  expandLocation = () => {
    this.setState({ locationActive: true, guestsActive: false })
  }
  expandGuests = () => {
    this.setState({ locationActive: false, guestsActive: true })
  }

  render() {
    return (
      <React.Fragment>
        <header style={this.state.expanded ? { display: "none" } : { display: "flex" }}>
          <h1
            onClick={() => {
              this.props.reset()
              this.setState(this.baseState)
            }}
          >
            windbnb
          </h1>
          <form onSubmit={this.props.onFormSubmit}>
            <input
              onClick={this.expandHeader}
              type="text"
              name="location"
              id="location"
              placeholder="Search location"
              autoComplete="off"
              value={this.state.locationInput}
              onChange={e => this.setState({ locationInput: e.target.value })}
            />
            <input
              onClick={this.expandHeader}
              type="text"
              id="guests"
              name="guests"
              placeholder="Add guests"
              autoComplete="off"
              value={
                this.state.nbAdults + this.state.nbChildren === 0
                  ? ""
                  : this.state.nbAdults + this.state.nbChildren === 1
                  ? this.state.nbAdults + this.state.nbChildren + " guest"
                  : this.state.nbAdults + this.state.nbChildren + " guests"
              }
              onChange={e => this.setState({ guestsInput: e.target.value })}
            />
            <span className="material-icons">search</span>
            <input type="submit" value=" " />
          </form>
        </header>
        <div
          className="overlay overlay-gray"
          style={this.state.expanded ? { display: "block" } : { display: "none" }}
          onClick={this.contractHeader}
        ></div>
        <div
          className="overlay overlay-white"
          style={this.state.expanded ? { display: "block" } : { display: "none" }}
        ></div>

        <div
          className="expanded-header"
          style={this.state.expanded ? { display: "block" } : { display: "none" }}
        >
          <div className="mobile-only">
            <p>Edit your search</p>
            <i className="material-icons" onClick={this.contractHeader}>
              close
            </i>
          </div>
          <form onSubmit={this.props.onFormSubmit} autoComplete="off">
            <label htmlFor="location">
              location
              <input
                onClick={this.expandLocation}
                type="text"
                name="location"
                id="location"
                placeholder="Search location"
                autoComplete="off"
                value={this.state.locationInput}
                onChange={e => {
                  this.setState({ locationInput: e.target.value })
                  // this.onLocationChange(e)
                }}
              />
            </label>
            <label htmlFor="guests">
              guests
              <input
                onClick={this.expandGuests}
                type="text"
                name="guests"
                id="guests"
                placeholder="Add guests"
                autoComplete="off"
                value={
                  this.state.nbAdults + this.state.nbChildren === 0
                    ? ""
                    : this.state.nbAdults + this.state.nbChildren === 1
                    ? this.state.nbAdults + this.state.nbChildren + " guest"
                    : this.state.nbAdults + this.state.nbChildren + " guests"
                }
                onChange={e => this.setState({ guestsInput: e.target.value })}
              />
            </label>
            <label htmlFor="search">
              <button type="submit" onClick={this.contractHeader}>
                <i className="material-icons">search</i>Search
              </button>
            </label>
          </form>

          <div className="controls">
            <div
              className="location-list"
              style={this.state.locationActive ? { display: "block" } : { display: "none" }}
            >
              <ul>
                {this.props.availableCities
                  .filter(city =>
                    city.toLowerCase().includes(this.state.locationInput.toLowerCase())
                  )
                  .map(city => (
                    <li onClick={() => this.setState({ locationInput: city })}>
                      <i className="material-icons">location_on</i> {city}
                    </li>
                  ))}
              </ul>
            </div>
            <div
              className="guests-controls"
              style={this.state.guestsActive ? { display: "block" } : { display: "none" }}
            >
              <div className="adults-counter">
                <h5>Adults</h5>
                <p>Ages 13 or above</p>
                <div className="counter">
                  <button
                    onClick={() => {
                      this.state.nbAdults === 0
                        ? this.setState({ nbAdults: 0 })
                        : this.setState({ nbAdults: this.state.nbAdults - 1 })
                    }}
                    className="minus"
                  >
                    <i className="material-icons">remove</i>
                  </button>
                  <span>{this.state.nbAdults}</span>
                  <button
                    onClick={() => {
                      this.setState({ nbAdults: this.state.nbAdults + 1 })
                    }}
                    className="plus"
                  >
                    <i className="material-icons">add</i>
                  </button>
                </div>
              </div>
              <div className="children-counter">
                <h5>Children</h5>
                <p>Ages 2 - 12</p>
                <div className="counter">
                  <button
                    onClick={() => {
                      this.state.nbChildren === 0
                        ? this.setState({ nbChildren: 0 })
                        : this.setState({ nbChildren: this.state.nbChildren - 1 })
                    }}
                    className="minus"
                  >
                    <i className="material-icons">remove</i>
                  </button>
                  <span>{this.state.nbChildren}</span>
                  <button
                    onClick={() => {
                      this.setState({ nbChildren: this.state.nbChildren + 1 })
                    }}
                    className="plus"
                  >
                    <i className="material-icons">add</i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Header
