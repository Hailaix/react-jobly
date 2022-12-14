import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpForm = ({ submit }) => {
    //initial state for form reset
    const INIT_STATE = {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: ''
    };
    const [formData, setFormData] = useState(INIT_STATE);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    //generic change handler
    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(fData => ({
            ...fData,
            [name]: value
        }));
    };

    //sends data to login function
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await submit(formData);
            navigate('/');
        } catch (e) {
            //error would be failed log in
            setErrors(e);
            setFormData(INIT_STATE);
        }

    }

    return (
        <div className="login-form">
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input
                    name="username"
                    value={formData.username}
                    autoComplete='username'
                    onChange={handleChange} />
                <label>Password</label>
                <input
                    name="password"
                    type='password'
                    value={formData.password}
                    autoComplete='current-password'
                    onChange={handleChange} />
                <label>First Name</label>
                <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange} />
                <label>Last Name</label>
                <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange} />
                <label>Email</label>
                <input
                    name="email"
                    type='email'
                    value={formData.email}
                    autoComplete='email'
                    onChange={handleChange} />
                <input type='submit' />
                {errors.map((e, i) => (
                    <small key={i} className="error">{e}</small>
                ))}
            </form>
        </div>
    )
}

export default SignUpForm;