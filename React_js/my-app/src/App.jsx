import React, { useState } from 'react';
import PropTypes from 'prop-types';

// --- 1. CHILD COMPONENTS ---

// User Profile Component
const UserProfile = (props) => {
  return (
    <div style={{ border: '1px solid gray', padding: '10px', margin: '10px 0' }}>
      <h2>User: {props.username}</h2>
      <p>Age: {props.age}</p>
      <p>{props.isAdmin ? "Admin User" : "Regular User"}</p>
    </div>
  );
};

// Product Card Component with PropTypes
const ProductCard = ({ title, price, isAvailable }) => {
  return (
    <div style={{ border: '1px solid green', padding: '10px', margin: '10px 0' }}>
      <h3>{title}</h3>
      <p>Price: ${price}</p>
      <p>{isAvailable ? "In Stock" : "Out of Stock"}</p>
    </div>
  );
};

// For component composition
const BorderBox = ({ children }) => {
  return (
    <div style={{ border: '2px solid purple', padding: '20px', borderRadius: '8px' }}>
      {children}
    </div>
  );
};

// --- PUTTING LOGIN FORM BACK HERE ---
const LoginForm = () => {
  const [email, setEmail] = useState(""); // Fixed: removed initial space string
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => { // Fixed: changed to standard camelCase
    e.preventDefault();
    alert(`Logging in with ${email}`);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '250px' }}>
      <label>EMAIL</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label>PASSWORD</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit" style={{ marginTop: '10px', cursor: 'pointer' }}>Login</button>
    </form>
  );
};

// Attach the propTypes validator to ProductCard
ProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number,
  isAvailable: PropTypes.bool
};


// --- 2. THE MAIN PARENT COMPONENT (App) ---
function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Laya's Practice Sandbox</h1>

      <BorderBox>
        <h3>Alert!</h3>
        <p>This box uses component composition.</p>
        <button>Dismiss</button>
      </BorderBox>

      {/* Practice 1: State Counter */}
      <section style={{ marginBottom: '30px' }}>
        <h2>1. Counter Practice (State)</h2>
        <button onClick={() => setCount(count + 1)}>
          Clicked {count} times
        </button>
      </section>

      {/* Practice 2: UserProfile Components with Props */}
      <section style={{ marginBottom: '30px' }}>
        <h2>2. User Profile Practice (Props)</h2>
        <UserProfile username="Alex" age={28} isAdmin={true} />
        <UserProfile username="Sam" age={24} isAdmin={false} />
      </section>

      {/* NEW Practice 3: Your Login Form component! */}
      <section style={{ marginBottom: '30px', border: '1px dashed blue', padding: '10px' }}>
        <h2>3. Login Form Practice (State)</h2>
        <LoginForm />
      </section>

      {/* Practice 4: Product Cards with PropTypes */}
      <section style={{ marginBottom: '30px' }}>
        <h2>4. Product Card Practice (PropTypes Validation)</h2>
        <ProductCard title="Wireless Mouse" price={19.99} isAvailable={true} />
        <ProductCard title="Mechanical Keyboard" price={89.99} isAvailable={false} />
      </section>
    </div>
  );
}

export default App;
