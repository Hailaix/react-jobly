import React from "react";
import './CompanyCard.css'
import { Link } from "react-router-dom";

const CompanyCard = ({ company }) => {
    return (
        <div className="companycard">
            <Link to={`${company.handle}`}>
                <h2 className="companycardtitle">{company.name}</h2>
            </Link>
            <p>{company.description}</p>
        </div>
    )
}

export default CompanyCard;