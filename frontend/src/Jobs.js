import React, { useEffect, useState } from "react";
import JoblyApi from "./api";
import JobCard from "./JobCard";

const Jobs = () => {
    const [jobs, setJobs] = useState();
    const getJobs = async () => {
        setJobs(await JoblyApi.getJobs());
    }
    //initial grab of all jobs on mount
    useEffect(() => {
        getJobs();
    }, []);

    if (!jobs) {
        return (<h1>Loading...</h1>);
    }
    console.log(jobs);
    return (
        <div>
            <h1>Job listings</h1>
            {jobs.map(job => (
                <JobCard key={job.id} job={job} />
            ))}
        </div>
    )
}

export default Jobs;