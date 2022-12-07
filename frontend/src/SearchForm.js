import React, { useState } from "react";

const SearchForm = ({ submit }) => {
    const [search, setSearch] = useState('');
    //form change handler
    const handleChange = e => {
        setSearch(e.target.value);
    };
    //submits the search term to the passed down function
    const handleSubmit = e => {
        e.preventDefault();
        submit(search);
    }
    return (
        <form className="search" onSubmit={handleSubmit}>
            <input
                name="search"
                placeholder="Search..."
                value={search}
                onChange={handleChange}
            />
            <input type='submit'/>
        </form>
    )
}

export default SearchForm;