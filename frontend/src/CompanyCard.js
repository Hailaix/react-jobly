import React from "react";
import logo from './logo.svg';
import './CompanyCard.css'
import { Link } from "react-router-dom";

const CompanyCard = ({ company }) => {
    return (
        <div className="companycard">
            <Link to='/'>
                <img src={company.logo ? company.logo : logo} className='companycardimg' alt='logo' />
                <h2 className="companycardtitle">{company.name}</h2>
            </Link>
            <p>{company.description}</p>
        </div>
    )
}

export default CompanyCard;