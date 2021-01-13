import "./StaysList.scss"
import React from "react"

const StaysList = props => {
  return (
    <div className="stays-list">
      <div className="stays-list-title">
        <h2>Stays in {props.city ? props.city : "Finland"}</h2>
        <p className="stays-list-number">
          {props.stays.length > 12 ? "12+" : props.stays.length} stays
        </p>
      </div>
      <div className="stays-list-cards">
        {props.stays.length === 0 ? <p>Sorry, no stay match your criteria</p> : null}
        {props.stays.map(stay => (
          <div className="stay-card" key={stay.rating + stay.maxGuests}>
            <img src={stay.photo} alt="" />
            <div className="stay-card-description">
              <div className="stay-card-description-left">
                {stay.superHost ? <span className="super-host">super host</span> : null}
                <span className="type">{stay.type}</span>
                {stay.beds ? (
                  <span className="beds">
                    {" "}
                    . {stay.beds} {stay.beds === 1 ? "bed" : "beds"}
                  </span>
                ) : null}
              </div>
              <div className="stay-card-description-right">
                <i className="material-icons">star</i> {stay.rating.toFixed(2)}
              </div>
            </div>
            <h4>{stay.title}</h4>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StaysList
