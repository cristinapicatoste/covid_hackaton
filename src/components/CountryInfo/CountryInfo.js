import React, { useEffect, useState } from 'react';
import { getData } from '../helpers/getData';
import countries from "../utils/countries.json";

export const CountryInfo = (alfaCountry) => {
    const allCountriesAlfa = countries.map(route => route['alpha-3']);
    console.log(allCountriesAlfa);
    const allCountriesName = countries.map(route => route['name']);
    const allCountriesCode = countries.map(route => route['code']);

    const [dataWorld, setDataWorld] = useState();
    useEffect(() => {
        getData("OWID_WRL", setDataWorld)
    }, [])
    console.log(dataWorld);

    return (
        <>
            <h1>{dataWorld.location}</h1>
            <div>

            </div>
            <div>

            </div>
            <p>{dataWorld.population}</p>
        </>
    )
}
