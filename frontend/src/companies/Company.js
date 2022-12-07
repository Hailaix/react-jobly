import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import JoblyApi from "../api";
import JobCard from "../jobs/JobCard";
const Company = () => {
    //grab the handle from the params
    const { handle } = useParams();
    const navigate = useNavigate();
    const [company, setCompany] = useState();
    //find the company with that handle
    useEffect(() => {
        const getCompany = async () => {
            //try to retrieve the company and set it in state
            try {
                setCompany(await JoblyApi.getCompany(handle));
            } catch (e) {
                //if we can't, likely a bad handle, so redirect to company list
                navigate('/companies', { replace: true });
            }
        }
        getCompany();
    }, [handle, navigate]);
    //wait for the Data to load
    if (!company) {
        return (<h1>Loading...</h1>);
    }
    // render it
    return (
        <div>
            <h1>{company.name}</h1>
            <p>Employees : {company.numEmployees}</p>
            <p>{company.description}</p>
            {company.jobs.map(job => (
                <JobCard 
                    key={job.id}
                    companyHandle={handle}
                    companyName={company.name} 
                    equity={job.equity}
                    salary={job.salary}
                    title={job.title} 
                />
            ))}
        </div>
    )
}

export default Company;