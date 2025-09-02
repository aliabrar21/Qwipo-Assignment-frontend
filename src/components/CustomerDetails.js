import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CustomerDetails() {
    const { id } = useParams();
    const [customer, setCustomer] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/customers/${id}`)
            .then(res => setCustomer(res.data))
            .catch(err => console.error(err));
    }, [id]);

    if (!customer) return <p>Loading...</p>;

    return (
        <div className="details-container">
            <h2>{customer.firstName} {customer.lastName}</h2>
            <p>Phone: {customer.phone}</p>
            <h3>Addresses</h3>
            <ul>
                {customer.addresses.map((a, idx) => (
                    <li key={idx}>{a.street}, {a.city}, {a.state} - {a.pincode}</li>
                ))}
            </ul>
        </div>
    );
}
