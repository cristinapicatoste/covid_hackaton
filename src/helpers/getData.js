export const getData = async (country) => {
    const url = `http://localhost:3001/${country}`;
    const respose = await fetch(url);
    const { covidData } = await respose.json();
    return covidData;
    //${encodeURI(category)}
}
