import React, { useState, useEffect } from 'react';
import ApiService from '../service/ApiService';
import './CustomerSearch.css'; // Import the CSS file

const CustomerSearch = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [customers, setCustomers] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState(null);
    const apiService = new ApiService();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiService.getAllCustomer();
                setCustomers(response.data);
                setSearchResults(response.data); // Initially, search results are same as all customers
                setError(null);
            } catch (error) {
                setError('Error fetching customers');
                console.error('Error fetching customers:', error);
            }
        };

        fetchData();
    }, []);

    const handleSearch = () => {
        if (!searchQuery) {
            setSearchResults(customers); // Reset search results if search query is empty
            return;
        }

        let filteredCustomers = customers;

        if (searchQuery.length === 10 && !isNaN(searchQuery)) { // If searchQuery is a 10-digit number, assume it's a phone number
            filteredCustomers = customers.filter(customer => customer.mobileNumber.includes(searchQuery));
        } else {
            filteredCustomers = customers.filter(customer => (
                customer.customerId.toString().includes(searchQuery) || // Search by customer ID
                customer.email.includes(searchQuery) // Search by email
            ));
        }

        setSearchResults(filteredCustomers);
    };

    return (
        <div className="customer-search-container">
            <h2>Customer Search</h2>
            <input
                type="text"
                placeholder="Search by ID, Email, or Mobile Number"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            {error && <p className="error">{error}</p>}
            <div className="customer-list">
                {searchResults.map(customer => (
                    <div className="customer-card" key={customer.customerId}>
                        <h3>{customer.customerId}</h3>
                        <p>Username: {customer.username}</p>
                        <p>First Name: {customer.customerFirstName}</p>
                        <p>Last Name: {customer.customerLastName}</p>
                        <h2>Address :</h2>
                        <p>House Number: {customer.address.houseNo}</p>
                        <p>Street Name: {customer.address.streetName}</p>
                        <p>City: {customer.address.city}</p>
                        <p> State: {customer.address.state}</p>
                        <p>Email: {customer.email}</p>
                        <p>Mobile Number: {customer.mobileNumber}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomerSearch;
