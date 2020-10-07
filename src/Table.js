import React from 'react'

function Table({countries}) {
    return (
        <div className="table">
            <table>
                {countries.map(country => (
                    <tr>
                        <td>{country.country}</td>
                        <td>{country.todayCases}</td>
                    </tr>
                ))}
            </table>
        </div>
    )
}

export default Table
