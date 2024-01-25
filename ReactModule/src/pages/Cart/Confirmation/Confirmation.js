import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Confirmation = () => {
    const [paymentMethod, setPaymentMethod] = useState('');
    const [address, setAddress] = useState('');
    const Navigate = useNavigate();

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <div>
            <h1>Confirmation Page</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Payment Method:
                    <select value={paymentMethod} onChange={handlePaymentMethodChange}>
                        <option value="">Select Payment Method</option>
                        <option value="mbway">MBWay</option>
                        <option value="paypal">PayPal</option>
                    </select>
                </label>
                <br />
                <label>
                    Address:
                    <input type="text" value={address} onChange={handleAddressChange} />
                </label>
                <br />
                <button type="submit" onClick={() => Navigate("/")}>Confirm</button>
            </form>
        </div>
    );
};

export default Confirmation;
