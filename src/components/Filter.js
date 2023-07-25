import React, { useEffect } from "react";

const Filter = ({
  searchInput,
  setSearchInput,
  setFiltered,
  setCountries,
  countries,
}) => {
  const regions = [
    {
      name: "Filter by region",
      desc: "All",
    },
    {
      name: "Africa",
      desc: "Africa",
    },
    {
      name: "Americas",
      desc: "Americas",
    },
    {
      name: "Asia",
      desc: "Asia",
    },
    {
      name: "Europe",
      desc: "Europe",
    },
    {
      name: "Oceania",
      desc: "Oceania",
    },
  ];

  // Prevent page reload when submitting the form
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // Search countries
  const searchCountries = (searchValue) => {
    setSearchInput(searchValue);

    if (searchInput) {
      const filteredCountries = countries.filter((country) =>
        Object.values(country)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
      setFiltered(filteredCountries);
    } else {
      setFiltered(countries);
    }
  };

  // Filter by region

  const filterRegions = async (region) => {
    //const url = `https://restcountries.eu/rest/v2/region/${region}`;
    const url = `https://restcountries.com/v2/region/${region}`;
    const res = await fetch(url);
    const data = await res.json();
    setCountries(data);
  };

  useEffect(() => {
    filterRegions();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <form className="form" id="form" onSubmit={handleSubmit}>
      <div className="search-container">
      <span className="search-icon">
      <i className="fa fa-search"></i>
     </span>
       <input
      type="search"
      name="search"
      id="search"
      autoComplete="off"
      placeholder="Search for a country..."
      onChange={(e) => searchCountries(e.target.value)}
        />
        </div>

        <div className="select">
          <select
            name="select"
            id="select"
            onChange={(e) => filterRegions(e.target.value)}
            value={regions.name}>
            <option value="" disabled hidden selected>Filter by Region</option>
            <option value="All">All</option>
            <option value="Africa">Africa</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Americas">Americas</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
      </form>
    </>
  );
};

export default Filter;
