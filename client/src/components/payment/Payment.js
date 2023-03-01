import React, { useState } from 'react';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import NavBar from '../NavBar';
import { Link } from 'react-router-dom';

const Payment = ({ amount, description, userId }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    });

    if (stripeError) {
      setLoading(false);
      setError(stripeError.message);
      return;
    }

    try {
      const { id: paymentMethodId } = paymentMethod;

      const response = await fetch('/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount,
          token: { id: paymentMethodId },
          description,
          userId
        })
      });

      const data = await response.json();

      if (data.success) {
        setLoading(false);
        console.log('Payment successful!');
      } else {
        setLoading(false);
        setError('Payment failed.');
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  
  return (
    <div>
  <NavBar />
  <div className="container">
    <br />
    <Link to="/schedule/book" className="btn btn-light">
      Go Back
    </Link>
    <h1 className="h3 mb-3 font-weight-normal text-center">Confirm Your Appointment</h1>
    <div className="row">
      <div className="col-md-6 mt-5 mx-auto text-center">
      
        <div className="form-group text-left">
          <form onSubmit={handleSubmit}>
            <label htmlFor="card-number" className="h3 mb-3 font-weight-normal text-center">
              Card number
            </label>
            <div className="border rounded-md px-3 py-2">
              <CardNumberElement id="card-number" className="form-control" options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }} />
            </div>
            <br />
            <label htmlFor="card-expiry" className="h3 mb-3 font-weight-normal text-center">
              Expiration date
            </label>
            <div className="border rounded-md px-3 py-2">
              <CardExpiryElement id="card-expiry" className="form-control" options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }} />
            </div>
            <br />
            <label htmlFor="card-cvc" className="h3 mb-3 font-weight-normal text-center">
              CVC
            </label>
            <div className="border rounded-md px-3 py-2">
              <CardCvcElement id="card-cvc" className="form-control" options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }} />
            </div>
            {error && <div className="text-red-500">{error}</div>}
            <button 
              type="submit" 
              disabled={loading} 
              className="btn btn-primary hover:btn-light-700 text-black font-bold py-2 px-4 rounded"
              style={{ 
                borderRadius: '0.25rem', 
                fontSize: '1rem', 
                fontWeight: 'bold',
                marginTop: '1rem'
              }}
            >
              {loading ? 'Processing...' : `Pay $${amount}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default Payment;
