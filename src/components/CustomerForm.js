import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CustomerForm() {
    const [form, setForm] = useState({
        firstName: "", lastName: "", phone: "",
        street: "", city: "", state: "", pincode: ""
    });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/customers", {
                firstName: form.firstName,
                lastName: form.lastName,
                phone: form.phone,
                addresses: [{
                    street: form.street,
                    city: form.city,
                    state: form.state,
                    pincode: form.pincode
                }]
            });
            setMessage("Customer created successfully!");
            setTimeout(() => navigate("/"), 1000);
        } catch (err) {
            setMessage("Error: " + err.response?.data?.message);
        }
    };

    return (
        <div className="form-container">
            <h2>Add New Customer</h2>
            <form onSubmit={handleSubmit}>
                <input name="firstName" placeholder="First Name" onChange={handleChange} required />
                <input name="lastName" placeholder="Last Name" onChange={handleChange} required />
                <input name="phone" placeholder="Phone" onChange={handleChange} required />
                <input name="street" placeholder="Street" onChange={handleChange} required />
                <input name="city" placeholder="City" onChange={handleChange} required />
                <input name="state" placeholder="State" onChange={handleChange} required />
                <input name="pincode" placeholder="Pincode" onChange={handleChange} required />
                <button type="submit">Create</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}
