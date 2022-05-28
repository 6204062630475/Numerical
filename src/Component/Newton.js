import * as React from 'react';
import { useState } from 'react';
import { parse } from "mathjs";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts'
export default function Newton() {



    let [x, X] = useState();
    let [fx, FX] = useState();


    const [tables, settables] = useState([]);
    const [showtable, setshowtable] = useState(false);
    const [showgraph, setshowgraph] = useState(false);
    function Newton() {
        const table = [];
        const f = (fx, value) => parse(fx).evaluate({ x: value })
        const error = (x, fn) => Math.abs(fn / x) * 100
        var i = 0, Ox, fn
        const fd=(x)=>1
        do {
            Ox = x
            fn = f(fx, x) / fd(x)
            x = Ox - fn
            console.log("x: ", Ox.toFixed(6))
            console.log("fx: ", f(fx, x).toFixed(6))
            console.log("error: ", error(x, fn).toFixed(6))
            table.push({
                i: i,
                x: Ox.toFixed(6),
                fx: f(fx, x).toFixed(6),
                error: error(x, fn).toFixed(6)
            });
            console.log(table)
            i++;
        } while (error(x, fn) >= 0.0000001);
        settables(table)
        setshowtable(true);
        setshowgraph(true)
    }


    return (
        <div>
            <h1>Newton Raphson</h1>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField id="outlined-basic" label="Equation" variant="outlined" onChange={event => FX(event.target.value)} />
                <TextField id="filled-basic" label="X" variant="filled" onChange={e => X(+e.target.value)} />
                <Button onClick={Newton} variant="contained"> calculate</Button>
            </Box>
            <center>
                {
                    showtable &&
                    <table style={{ marginTop: 30 }}>
                        <thead>
                            <tr>
                                <th>Iteration</th>
                                <th>X</th>
                                <th>F(x)</th>
                                <th>Error</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tables.map((item, i) => (
                                <tr key={i}>
                                    <td>{item.i}</td>
                                    <td>{item.x}</td>
                                    <td>{item.fx}</td>
                                    <td>{item.error}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
                {
                    showgraph &&
                    <LineChart width={800} height={450} data={tables} margin={{ top: 30, right: 20, left: 20, bottom: 5 }} style={{ backgroundColor: "#Fxmaa" }}>

                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="x" />
                        <YAxis type="number" dataKey="error" domain={["auto", "auto"]} allowDataOverflow="true" />
                        <Tooltip />
                        <Legend />
                        <Line type="linear" dataKey="error" stroke="#82ca9d" strokeWidth={4} />
                    </LineChart>
                }
            </center>
        </div>
    );
}

