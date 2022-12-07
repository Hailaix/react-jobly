import React, { useEffect, useState } from "react";
import JoblyApi from "./api";
import CompanyCard from "./CompanyCard";

const Companies = () => {
    const [companies, setCompanies] = useState();
    useEffect(() => {
        const getCompanies = async () => {
            setCompanies(await JoblyApi.getCompanies());
        }
        getCompanies();
    }, []);
    if(!companies){
        return(<h1>Loading...</h1>);
    }
    return (
        <div className="companyList">
            <h1>Companies</h1>
            {companies.map(company => (
                <CompanyCard key={company.handle} company={company} />
            ))}
        </div>
    )
}

export default Companies;