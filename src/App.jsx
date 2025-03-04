import { useState } from "react";
import { FaUser, FaCreditCard } from "react-icons/fa";

function App() {
  const [wallet, setWallet] = useState("");
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Payment processed successfully!");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-[#1a1a1a] rounded-xl p-6 w-full max-w-md shadow-lg text-white">
        <h2 className="text-center text-lg font-semibold mb-6">Payment details</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-gray-400 text-sm">Wallet address to receive crypto</label>
            <input
              type="text"
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
              placeholder="Enter your wallet address"
              className="w-full px-4 py-3 rounded-lg bg-[#2b2b2b] text-white border-none focus:outline-none mt-1"
              required
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-400 text-sm">Name</label>
            <div className="relative flex items-center">
              <FaUser className="absolute left-3 text-gray-500" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name on credit card"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#2b2b2b] text-white border-none focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="text-gray-400 text-sm">Card Details</label>
            <div className="relative flex items-center mb-3">
              <FaCreditCard className="absolute left-3 text-gray-500" />
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="Enter credit card number"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#2b2b2b] text-white border-none focus:outline-none"
                required
              />
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                placeholder="MM/YY"
                className="w-1/2 px-4 py-3 rounded-lg bg-[#2b2b2b] text-white border-none focus:outline-none"
                required
              />
              <input
                type="text"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                placeholder="CVV"
                className="w-1/2 px-4 py-3 rounded-lg bg-[#2b2b2b] text-white border-none focus:outline-none"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-white text-black py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Proceed
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
