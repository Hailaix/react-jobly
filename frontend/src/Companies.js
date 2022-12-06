import React from "react";
import CompanyCard from "./CompanyCard";

const Companies = ({ companies }) => {
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