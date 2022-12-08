import React, { useEffect, useState } from "react";
import JoblyApi from "../api";
import JobCard from "./JobCard";
import SearchForm from "../forms/SearchForm";

const Jobs = () => {
    const [jobs, setJobs] = useState();
    
    const getJobs = async (search) => {
        setJobs(await JoblyApi.getJobs(search));
    }
    //initial grab of all jobs on mount
    useEffect(() => {
        getJobs();
    }, []);

    if (!jobs) {
        return (<h1>Loading...</h1>);
    }
    return (
        <div>
            <h1>Job listings</h1>
            <SearchForm submit={getJobs} />
            {jobs.map(job => (
                <JobCard
                    key={job.id}
                    id={job.id}
                    companyHandle={job.companyHandle}
                    companyName={job.companyName}
                    equity={job.equity}
                    salary={job.salary}
                    title={job.title}
                />
            ))}
        </div>
    )
}

export default Jobs;