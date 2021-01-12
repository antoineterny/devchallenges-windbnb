import "./Header.scss"
import React from "react"

class Header extends React.Component {
  state = {
    locationInput: "Helsinki, Finland",
    guestsInput: "",
    expanded: false,
    locationActive: false,
    guestsActive: false,
  }

  expandHeader = () => {
    this.setState({ expanded: true })
  }
  expandLocation = () => {
    this.setState({ locationActive: true })
  }

  render() {
    return (
      <div>
        <header style={this.state.expanded ? { display: "none" } : { display: "flex" }}>
          <h1>windbnb</h1>
          <form>
            <input
              onClick={this.expandHeader}
              type="text"
              name="location"
              id="location"
              placeholder="Search location"
              value={this.state.locationInput}
              onChange={e => this.setState({ locationInput: e.target.value })}
            />
            <input
              onClick={this.expandHeader}
              type="text"
              id="guests"
              name="guests"
              placeholder="Add guests"
              value={this.state.guestsInput}
              onChange={e => this.setState({ guestsInput: e.target.value })}
            />
            <input type="submit" value=" " />
            <span className="material-icons">search</span>
          </form>
        </header>
        <div
          className="overlay overlay-gray"
          style={this.state.expanded ? { display: "block" } : { display: "none" }}
        ></div>
        <div
          className="overlay overlay-white"
          style={this.state.expanded ? { display: "block" } : { display: "none" }}
        ></div>
        <div
          className="expanded-header"
          style={this.state.expanded ? { display: "block" } : { display: "none" }}
        >
          <form>
            <label htmlFor="location">
              location
              <input
                onClick={this.expandLocation}
                type="text"
                name="location"
                id="location"
                placeholder="Search location"
                value={this.state.locationInput}
                onChange={e => this.setState({ locationInput: e.target.value })}
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
                value={this.state.guestsInput}
                onChange={e => this.setState({ guestsInput: e.target.value })}
              />
            </label>
            <label htmlFor="search">
              <button>
                <i className="material-icons">search</i>Search
              </button>
            </label>
          </form>
        </div>
      </div>
    )
  }
}

export default Header
