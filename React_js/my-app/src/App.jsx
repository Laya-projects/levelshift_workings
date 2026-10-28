{/*import React, { useState, useEffect } from 'react'; // 1. Added useEffect to the import
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

// Login Form Component
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Logging in with ${email} and ${password}`);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '250px' }}>
      <label>EMAIL</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

      <label>PASSWORD</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <button type="submit" style={{ marginTop: '10px', cursor: 'pointer' }}>Login</button>
    </form>
  );
};

// NEW: Joke Fetcher Component using the useEffect hook!
// 100% Reliable Local Fetcher (No external internet servers required!)
const JokeFetcher = () => {
  const [joke, setJoke] = useState("Loading a funny joke...");

  // Our own local list of programming jokes
  const localJokes = [
    "Why do programmers wear glasses? 🤔 ... Because they can't C#! 😂",
    "How many programmers does it take to change a lightbulb? 🤔 ... None, that's a hardware problem! 😂",
    "Where do programmers like to hang out? 🤔 ... Foo Bar! 😂",
    "What is a programmer's favorite place to live? 🤔 ... 127.0.0.1 😂",
    "Why did the programmer quit their job? 🤔 ... Because they didn't get arrays! 😂"
  ];

  useEffect(() => {
    // Simulate a real internet network delay of 1 second (1000 milliseconds)
    const timer = setTimeout(() => {
      // Pick a random joke out of our local list
      const randomIndex = Math.floor(Math.random() * localJokes.length);
      const chosenJoke = localJokes[randomIndex];

      // Put it inside the memory bucket!
      setJoke(chosenJoke);
    }, 1000);

    // Clean up the timer if the component disappears
    return () => clearTimeout(timer);// this is the cleanup function
  }, []); // Only runs once when the component builds -- dependency array
  // 
  return (
    <div>
      <p style={{ fontStyle: 'italic', fontSize: '16px', color: '#333', lineHeight: '1.5' }}>
        {joke}
      </p>
    </div>
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

      //* Practice 1: State Counter 
      <section style={{ marginBottom: '30px' }}>
        <h2>1. Counter Practice (State)</h2>
        <button onClick={() => setCount(count + 1)}>
          Clicked {count} times
        </button>
      </section>

      //* Practice 2: UserProfile Components with Props 
      <section style={{ marginBottom: '30px' }}>
        <h2>2. User Profile Practice (Props)</h2>
        <UserProfile username="Alex" age={28} isAdmin={true} />
        <UserProfile username="Sam" age={24} isAdmin={false} />
      </section>

      //* Practice 3: Login Form Component 
      <section style={{ marginBottom: '30px', border: '1px dashed blue', padding: '10px' }}>
        <h2>3. Login Form Practice (State)</h2>
        <LoginForm />
      </section>

      //* NEW Practice 5: Your Hook Effect Practice! 
      <section style={{ marginBottom: '30px', border: '1px solid orange', padding: '10px', borderRadius: '4px' }}>
        <h2>5. Effect Hook Practice (useEffect FetchJoke)</h2>
        <JokeFetcher />
      </section>

      //* Practice 4: Product Cards with PropTypes 
      <section style={{ marginBottom: '30px' }}>
        <h2>4. Product Card Practice (PropTypes Validation)</h2>
        <ProductCard title="Wireless Mouse" price={19.99} isAvailable={true} />
        <ProductCard title="Mechanical Keyboard" price={89.99} isAvailable={false} />
      </section>
    </div>
  );
}

export default App;
 ... 

import React, { useState, useEffect } from 'react';

export default function CheckoutWizard() {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState('cart');
  const [cartItemsCount, setCartItemsCount] = useState(3);
  const [isGiftWrap, setIsGiftWrap] = useState(false);
  const [couponCode, setCouponCode] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isPageLoading) {
    return <div>Loading checkout steps...</div>;
  }

  const STEP_VIEWS = {
    cart: (
      <div>
        <h4>Shopping Cart</h4>
        <p>You have {cartItemsCount} items ready for purchase.</p>

        <label>
          <input
            type="checkbox"
            checked={isGiftWrap}
            onChange={() => setIsGiftWrap(!isGiftWrap)}
          />
          {' '}Gift Wrap
        </label>

        <div style={{ marginTop: '10px' }}>
          <input
            type="text"
            placeholder="Coupon Code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        </div>
      </div>
    ),

    shipping: (
      <div>
        <h4>Shipping Details</h4>
        <p>Please enter your physical delivery address.</p>
      </div>
    ),

    payment: (
      <div>
        <h4>Payment Method</h4>
        <p>Secure credit card portal initialization.</p>
      </div>
    ),

    confirmation: (
      <div>
        <h4>🎉 Order Placed!</h4>
        <p>Thank you! Your receipt has been sent to your email.</p>
      </div>
    ),
  };

  const handleNextStep = () => {
    if (currentStep === 'cart') {
      setCurrentStep('shipping');
    } else if (currentStep === 'shipping') {
      setCurrentStep('payment');
    } else if (currentStep === 'payment') {
      setCurrentStep('confirmation');
    }
  };

  const handleReset = () => {
    setCurrentStep('cart');
    setCartItemsCount(0);
    setIsGiftWrap(false);
    setCouponCode('');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>🛒 Checkout Workflow</h2>

        <div className="alert-layer">
          {cartItemsCount >= 3 && (
            <div style={styles.alert}>
              ⚠️ Your cart is full! (Limit 3 items)
            </div>
          )}
        </div>

        <div style={styles.contentBox}>
          {STEP_VIEWS[currentStep] || (
            <div>Unknown active checkout step.</div>
          )}
        </div>

        <small style={styles.subtitle}>
          {(() => {
            switch (currentStep) {
              case 'cart':
                return 'Review Items';
              case 'shipping':
                return 'Delivery Details';
              case 'payment':
                return 'Final Details';
              case 'confirmation':
                return 'Order Complete';
              default:
                return 'Processing Completion';
            }
          })()}
        </small>

        <div style={styles.actions}>
          {currentStep === 'confirmation' ? (
            <button
              onClick={handleReset}
              style={{
                ...styles.button,
                backgroundColor: '#6c757d',
              }}
            >
              Back to Dashboard
            </button>
          ) : (
            <button onClick={handleNextStep} style={styles.button}>
              Proceed to Next Step →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
    fontFamily: 'sans-serif',
  },
  card: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    width: '400px',
  },
  contentBox: {
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    minHeight: '100px',
    margin: '15px 0',
    border: '1px solid #dee2e6',
  },
  subtitle: {
    display: 'block',
    color: '#007bff',
    fontWeight: 'bold',
    marginBottom: '20px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  actions: {
    display: 'flex',
    gap: '10px',
    marginTop: '20px',
  },
  alert: {
    backgroundColor: '#fff3cd',
    color: '#856404',
    padding: '10px',
    borderRadius: '6px',
    fontSize: '14px',
    marginBottom: '10px',
    border: '1px solid #ffeeba',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    width: '100%',
  },
};

*/}

import React, { useState } from 'react';

export default function RealTimeValidationForm() {
  const [formData, setFormData] = useState({ username: '', phone: '' });
  const [errors, setErrors] = useState({ username: '', phone: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // 1. Update the form input state
    setFormData(prev => ({ ...prev, [name]: value }));

    // 2. Validate field data instantly in real-time
    let errorMessage = '';

    if (name === 'username') {
      if (value.trim().length < 3) {
        errorMessage = 'Username must be at least 3 characters.';
      }
    }

    if (name === 'phone') {
      const numbersOnly = /^[0-9]*$/;
      if (!numbersOnly.test(value)) {
        errorMessage = 'Phone number must contain only numbers.';
      }
    }

    // 3. Update the error map state reference
    setErrors(prev => ({ ...prev, [name]: errorMessage }));
  };

  return (
    <div style={{ maxWidth: '300px', margin: '20px auto', fontFamily: 'sans-serif' }}>
      <h3>Create Account</h3>

      <div style={{ marginBottom: '15px' }}>
        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          style={{ width: '100%', padding: '8px' }}
        />
        {/* Conditional rendering for field-specific error layout */}
        {errors.username && <small style={{ color: 'red' }}>{errors.username}</small>}
      </div>

      <div style={{ marginBottom: '15px' }}>
        <input
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          style={{ width: '100%', padding: '8px' }}
        />
        {errors.phone && <small style={{ color: 'red' }}>{errors.phone}</small>}
      </div>

      {/* Button stays disabled until all form fields are filled and errors are completely cleared */}
      <button
        disabled={!formData.username || !formData.phone || errors.username || errors.phone}
        style={{ padding: '8px 16px', width: '100%', cursor: 'pointer' }}
      >
        Register
      </button>
    </div>
  );
}
