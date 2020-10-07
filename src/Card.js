import React from 'react'

function Card(props) {
    return (
        <div className="card">
            <p>{props.title}</p>
            <h3>{props.countryInfo}</h3>
            <p>{props.total} Total</p>
        </div>
    )
}

export default Card
