import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function CustomerList() {
    const [customers, setCustomers] = useState([]);

    const fetchCustomers = () => {
        axios.get("http://localhost:5000/api/customers")
            .then(res => setCustomers(res.data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this customer?")) {
            await axios.delete(`http://localhost:5000/api/customers/${id}`);
            fetchCustomers();
        }
    };

    return (
        <div className="list-container">
            <h2>Customer List</h2>
            <ul>
                {customers.map(c => (
                    <li key={c._id}>
                        <Link to={`/customer/${c._id}`}>
                            {c.firstName} {c.lastName} - {c.phone}
                        </Link>
                        {" | "}
                        <Link to={`/customer/${c._id}/edit`} className="edit-btn">Edit</Link>
                        {" | "}
                        <button onClick={() => handleDelete(c._id)} className="delete-btn">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
