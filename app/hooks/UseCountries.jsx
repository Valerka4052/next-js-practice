import countries from 'world-countries';
const formatedCountries = countries.map(({ cca2, name: { common }, flag, latlng, region }) => ({ value: cca2, label: common, flag, latlng, region, }));
const useCountries = () => {
    const getAll = () => formatedCountries;
    const getByValue = (value) => formatedCountries.find(country => country === value);
    return { getAll, getByValue };
};
export default useCountries