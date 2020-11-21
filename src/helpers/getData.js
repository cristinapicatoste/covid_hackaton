export const getData = (country, onSuccess) => {
    const url = `http://localhost:3001/${country}`;
    const covidData = fetch(url)
        .then(response => response.json())
        .then(resJson => onSuccess(resJson))
        .catch(error => (error));
    return covidData;
}