import React, { PureComponent, useEffect, useState } from 'react';
import {
    BarChart, Bar, Area, AreaChart, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line
} from 'recharts';
import { getData } from '../helpers/getData'
import countries from '../utils/countries.json'

const Home = () => {
    const [data, setData] = useState(undefined)
    const [pais, setPais] = useState('OWID_WRL')

    const [groupedMonth, setGroupedMonth] = useState([]);

    useEffect(() => {
        getData(pais, setData)
    }, [pais])


    useEffect(() => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const monthsData = {};

        if (data !== undefined && data.data !== undefined) {
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
        }
        setGroupedMonth(Object.values(monthsData));

    }, [data])



    console.log(pais);
    console.log(groupedMonth);

    const country = countries.filter(country => country["alpha-3"] === pais)[0];
    const countryName = country ? country.name : "WORLD";
    const countryDeaths = country ? country.name : "WORLD";
    const countryOtros = country ? country.name : "WORLD";
    const handleSubmit = (event) => {
        console.log(event);
        setPais(event.target.value)
    }

    if(groupedMonth !== undefined){
        console.log(groupedMonth[11]+'hola')
    }
    
    return (
        <>
            {/* Grafico mudial para usar de fondo. */}
            {/* <BarChart className={"barChart"} width={1536} height={300} data={data}>
                <Bar dataKey="uv" fill="#8884d8" />
                <Bar dataKey="pv" fill="#d01212" />
            </BarChart> */}
            <div className={"home-info"}>
                <h1>COVID APP App created by:</h1>
                <h3>App created by Salva & Cris</h3>
                <select type="text" class="text-input" id="dropdown" onChange={handleSubmit}>
                    <option selected value={pais}>World</option>
                    {countries.map(country =>
                        <option value={country['alpha-3']}>{country['name']}</option>
                    )}
                </select>
                <h2>{countryName}</h2>
            </div>
            <div className={"otro"}>
                <div>
                    <h3>Last month's new cases</h3>
                    {/* <p>{groupedMonth[11]}</p> */}
                </div>
                <div>
                    <h3>Last death's new cases</h3>
                    {/* <p>{groupedMonth[11]}</p> */}
                </div>
            </div>
            <h4>Total Cases by Month</h4>
            <AreaChart
                className={"barChart"} width={1200} height={300} data={groupedMonth}
                margin={{
                    top: 10, right: 30, left: 0, bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="newCases" stroke="#ffffff" fill="#ffffff" />
            </AreaChart>
            <h4>Total Deaths by Month</h4>
            <AreaChart
                className={"barChart"} width={1200} height={300} data={groupedMonth}
                margin={{
                    top: 10, right: 30, left: 0, bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="newDeaths" stroke="#ffffff" fill="#8884d8" />
            </AreaChart>
        </>
    );
};

export default Home;
