import React, { useEffect, useState } from "react";
import JoblyApi from "./api";
import CompanyCard from "./CompanyCard";
import SearchForm from "./SearchForm";

const Companies = () => {
    const [companies, setCompanies] = useState();
    const getCompanies = async (search) => {
        setCompanies(await JoblyApi.getCompanies(search))
    }
    //initial grab of full company list on render
    useEffect(() => {
        getCompanies();
    }, []);
    if (!companies) {
        return (<h1>Loading...</h1>);
    }
    return (
        <div className="companyList">
            <h1>Companies</h1>
            <SearchForm submit={getCompanies} />
            {companies.map(company => (
                <CompanyCard key={company.handle} company={company} />
            ))}
        </div>
    )
}

export default Companies;