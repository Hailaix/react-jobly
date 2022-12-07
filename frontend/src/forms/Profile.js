import React, { useContext, useState } from "react";
import loginContext from "../loginContext";

const Profile = ({ submit }) => {
    const { user } = useContext(loginContext);
    const [editing, setEditing] = useState(false);
    const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: '',
    });

    //generic change handler
    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(fData => ({
            ...fData,
            [name]: value
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            //submit the changes to the server
            await submit(formData);
            //return to regular profile view
            setEditing(false);
        } catch (e) {
            //if anything went wrong with the update, show the errors
            setErrors(e);
        }
    }

    return (
        <div className="profile">
            {editing
                ? <form onSubmit={handleSubmit}>
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
                    <label>Password</label>
                    <input
                        name="password"
                        type='password'
                        value={formData.password}
                        autoComplete='current-password'
                        onChange={handleChange} />
                    <input type='submit' />
                    {errors.map((e, i) => (
                        <small key={i} className="error">{e}</small>
                    ))}
                </form>
                : <>
                    <h1>{user.username}</h1>
                    <h3>{user.firstName} {user.lastName}</h3>
                    <h4>{user.email}</h4>
                    <button onClick={() => setEditing(true)}>Edit Profile</button>
                </>
            }
        </div>
    )
}

export default Profile;