import React, { PureComponent, useEffect, useState } from 'react';
import {
    BarChart, Bar, Area, AreaChart, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line
} from 'recharts';
import { World } from "../components/World";
import { getData } from '../helpers/getData'
import countries from '../utils/countries.json'

const Home = () => {
    const [data, setData] = useState()
    useEffect(() => {
        getData(data, setData)
    }, [])


    const getDataByMonth = (data) => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const monthsData = {};

        data.data.forEach(day => {
            const dayDate = new Date(day.date);
            const monthName = months[dayDate.getMonth()];
            let monthData;
            if (monthsData[monthName]) {
                monthData = monthsData[monthName];
            } else {
                monthData = {
                    month: monthName,
                    newCases: 0,
                    newDeaths: 0,
                }
            }

            monthData.newCases = monthData.newCases + day.new_cases;
            monthData.newDeaths = monthData.newDeaths + day.new_deaths;

            monthsData[monthName] = monthData;

        })

        return Object.values(monthsData);
    }

    if (data) {
        console.log(getDataByMonth(data));
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setData(event.value)
    }

    return (
        <>
            {/* Grafico mudial para usar de fondo. */}
            {/* <BarChart className={"barChart"} width={1536} height={300} data={data}>
                <Bar dataKey="uv" fill="#8884d8" />
                <Bar dataKey="pv" fill="#d01212" />
            </BarChart> */}
            <AreaChart
                className={"barChart"} width={1536} height={300} data={data}
                margin={{
                    top: 5, right: 0, left: 0, bottom: 5,
                }}
            >
                <Area type="monotone" dataKey="newCases" stroke="#8884d8" fill="#d01212" />
                <Area type="monotone" dataKey="newDeaths" stroke="#d01212" fill="#8884d8" />
            </AreaChart>

            <div className={"home-info"}>
                <h1>App created by:</h1>
                <h2>Salva</h2>
                <h2>Cris</h2>

                <World />

                <form onSubmit={handleSubmit}>
                    <select type="text" class="text-input" id="dropdown">
                        <option selected value={"OWID_WRL"}>World</option>
                        {countries.map(country =>
                            <option value={country['alpha-3']}>{country['name']}</option>
                        )}
                    </select>
                    <button>Search</button>
                </form>
            </div>
        </>
    );
};

export default Home;
