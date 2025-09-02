import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CustomerForm from "./components/CustomerForm";
import CustomerList from "./components/CustomerList";
import CustomerDetails from "./components/CustomerDetails";
import CustomerEdit from "./components/CustomerEdit";
import "./App.css";

function App() {
    return (
        <Router>
            <nav className="navbar">
                <Link to="/">Customers</Link>
                <Link to="/create">Add Customer</Link>
            </nav>

            <Routes>
                <Route path="/" element={<CustomerList />} />
                <Route path="/create" element={<CustomerForm />} />
                <Route path="/customer/:id" element={<CustomerDetails />} />
                <Route path="/customer/:id/edit" element={<CustomerEdit />} />
            </Routes>
        </Router>
    );
}

export default App;
