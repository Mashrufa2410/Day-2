import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import { FaCcPaypal, FaCreditCard, FaLock } from "react-icons/fa";

const stripePromise = loadStripe("pk_test_51QhWxJJnGiHo1YY4VPoy1OImU6OzBiHM0vqjl8TnTng89QwovYaNEhHWpqWslUsRRn6Mx8sv8FC9xTG2hSuThstu008J8DgCWo");

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("card");

  useEffect(() => {
    fetch("https://day-2-server-eta.vercel.app/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 8280 }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((err) => setError(err.message));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: e.target.cardholderName.value,
            email: e.target.email.value,
          },
        },
      }
    );

    if (error) {
      setError(error.message);
      setLoading(false);
    } else if (paymentIntent.status === "succeeded") {
      setSuccess(true);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Payment Details</h2>
        <p className="text-gray-500 text-sm mb-6">Complete your purchase by providing your payment details</p>

        <div className="flex gap-2 mb-4">
          <button
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 border rounded-lg font-medium transition-colors ${
              selectedPayment === "card" ? "bg-black text-white" : "bg-gray-100 text-gray-700"
            }`}
            onClick={() => setSelectedPayment("card")}
          >
            <FaCreditCard /> Pay by Card
          </button>
          <button
            className="flex-1 flex items-center justify-center gap-2 py-2 px-4 border rounded-lg text-gray-500"
            onClick={() => setSelectedPayment("paypal")}
          >
            <FaCcPaypal /> Pay with PayPal
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm">{error}</div>}
          {success ? (
            <div className="bg-green-50 text-green-600 p-4 rounded-lg text-sm">Payment Successful!</div>
          ) : (
            <>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Email address</label>
                <input
                  type="email"
                  name="email"
                  defaultValue="hello@123d.one"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Card Number</label>
                <div className="w-full flex items-center px-4 py-3 rounded-lg border border-gray-300 focus-within:ring-2 focus-within:ring-indigo-500">
                  <CardElement className="flex-1" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Cardholder Name</label>
                <input
                  type="text"
                  name="cardholderName"
                  defaultValue="Dima Groshev"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div className="flex justify-between text-gray-700 text-sm border-t pt-4">
                <span>Subtotal</span>
                <span>$69.00</span>
              </div>
              <div className="flex justify-between text-gray-700 text-sm">
                <span>VAT (20%)</span>
                <span>$13.80</span>
              </div>
              <div className="flex justify-between text-gray-900 font-semibold text-md border-t pt-4">
                <span>Total</span>
                <span>$82.80</span>
              </div>
              <button
                type="submit"
                disabled={loading || !stripe || !clientSecret}
                className="w-full bg-blue-600 text-white py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Processing..." : "Pay $82.80"}
              </button>
            </>
          )}
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <FaLock className="w-4 h-4" />
            <span>Payments are secure and encrypted</span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}
