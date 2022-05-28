import React, { Component } from 'react'

export default class EquationTableRow extends Component {

    render() {
        return (
            <tr>
                <td>{this.props.obj.equation}</td>
            </tr>
        )
    }
}