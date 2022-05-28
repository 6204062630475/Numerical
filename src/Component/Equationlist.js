import React, { Component } from 'react'
import axios from 'axios'
import EquationTableRow from "./EquationTableRow"


export default class EquationList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            equations: []
        }
    }

    componentDidMount() {
        axios.post('http://localhost:4000/Equations',
        {
            "tokenOne": "22bddda5ef96735c780500189c65d7c249ec6716c1dbb7920e50b37d4711cf0d4f1ae7e08a26fe2857496927ba8994a0cc7b1b233d1b954c5412586fd8df5b98"
        })
            .then(res => {
                this.setState({
                    equations: res.data
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    DataTable = () => {
        return this.state.equations.map((res, i) => {
            return <EquationTableRow obj={res} key={i} />
        })
    }

    render() {
        return (
            <center>
                <table>
                    <thead>
                        <tr>
                            <th><h1>Example Equation</h1></th>
                        </tr>
                    </thead>
                    <tbody>
                        <h2>{this.DataTable()}</h2>
                    </tbody>
                </table>
            </center>
        )
    }
}