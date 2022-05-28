import * as React from 'react';
import { useState } from 'react';
import { parse } from "mathjs";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts'

export default function FalsePosition() {



    let [xl, XL] = useState();
    let [xr, XR] = useState();
    let [fx, FX] = useState();

    //const Ans = []
    //const [datashow, setdatashow] = useState();
    const [tables, settables] = useState([]);
    const [showtable, setshowtable] = useState(false);
    const [showgraph, setshowgraph] = useState(false);
    function FalsePosition() {
        const table = [];
        const f = (fx, value) => parse(fx).evaluate({ x: value })
        const error = (xm, Oxm) => Math.abs((xm - Oxm) / xm)
        var i = 0, xm = 0, Oxm
        do {
            Oxm = xm
            xm = ((xl * f(fx, xr)) - (xr * f(fx, xl))) / (f(fx, xr) - f(fx, xl))
            if (f(fx, xm) * f(fx, xl) > 0) {
                xl = xm
            }
            else {
                xr = xm
            }
            console.log("xl: ", xl.toFixed(6))
            console.log("xr: ", xr.toFixed(6))
            console.log("xm: ", xm.toFixed(6))
            console.log("error: ", error(xm, Oxm).toFixed(6))
            table.push({
                i: i,
                xl: xl.toFixed(6),
                xr: xr.toFixed(6),
                xm: xm.toFixed(6),
                fxm: f(fx, xm).toFixed(6),
                error: error(xm, Oxm).toFixed(6)
            });
            console.log(table)
            i++;
        } while (error(xm, Oxm) >= 0.0000001);
        settables(table)
        setshowtable(true);
        setshowgraph(true)
    }


    return (
        <div>
            <h1>False Position</h1>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField id="outlined-basic" label="Equation" variant="outlined" onChange={event => FX(event.target.value)} />
                <TextField id="filled-basic" label="XL" variant="filled" onChange={e => XL(+e.target.value)} />
                <TextField id="filled-basic" label="XR" variant="filled" onChange={e => XR(+e.target.value)} />
                <Button onClick={FalsePosition} variant="contained"> calculate</Button>
            </Box>
            <center>
                {
                    showtable &&
                    <table style={{ marginTop: 30 }}>
                        <thead>
                            <tr>
                                <th>Iteration</th>
                                <th>XL</th>
                                <th>XR</th>
                                <th>XM</th>
                                <th>Error</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tables.map((item, i) => (
                                <tr key={i}>
                                    <td>{item.i}</td>
                                    <td>{item.xl}</td>
                                    <td>{item.xr}</td>
                                    <td>{item.xm}</td>
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
                        <XAxis dataKey="xm" />
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

