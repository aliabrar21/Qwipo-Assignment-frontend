import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function CustomerEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({ firstName: "", lastName: "", phone: "" });
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:5000/api/customers/${id}`)
            .then(res => setForm({
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                phone: res.data.phone
            }))
            .catch(err => console.error(err));
    }, [id]);

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/customers/${id}`, form);
            setMessage("Customer updated successfully!");
            setTimeout(() => navigate(`/customer/${id}`), 1000);
        } catch (err) {
            setMessage("Error: " + err.response?.data?.message);
        }
    };

    return (
        <div className="form-container">
            <h2>Edit Customer</h2>
            <form onSubmit={handleSubmit}>
                <input name="firstName" value={form.firstName} onChange={handleChange} required />
                <input name="lastName" value={form.lastName} onChange={handleChange} required />
                <input name="phone" value={form.phone} onChange={handleChange} required />
                <button type="submit">Update</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}
