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
        //Conditional rendering for field-specific error layout 
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

      // Button stays disabled until all form fields are filled and errors are completely cleared 
      <button
        disabled={!formData.username || !formData.phone || errors.username || errors.phone}
        style={{ padding: '8px 16px', width: '100%', cursor: 'pointer' }}
      >
        Register
      </button>
    </div>
  );
}


import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// 1. Define your page layouts
const Home = () => <h2>🏠 Welcome to the Home Page</h2>;
const About = () => <h2>ℹ️ Learn More About Us</h2>;
const NotFound = () => <h2>❌ Page Not Found</h2>;

export default function App() {
  return (
    // BrowserRouter acts as the top-level wrapper managing history
    <BrowserRouter>
      <nav style={styles.nav}>
        // ❌ NEVER use <a href="/about">. It triggers a full page refresh! 
        //  ALWAYS use <Link to="...">. It updates the UI instantly without reloading. 
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>

      // Routes looks at the current URL and decides which component to show 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        //Fallback route if the URL doesn't match anything above 
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

const styles = { nav: { padding: '10px', backgroundColor: '#f0f2f5', marginBottom: '25px' } };



import React from 'react';
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';

// 1. Define the Page component that will consume the parameter
function ProductDetail() {
  const { productId } = useParams(); // Matches the exact token key name from step 2

  return (
    <div style={styles.detailBox}>
      <h3>📦 Product Workspace</h3>
      <p>Currently viewing detailed data specifications for SKU ID: <strong>{productId}</strong></p>
    </div>
  );
}

// 2. Core Application Layout Wireframe
export default function App() {
  return (
    <BrowserRouter>
      <div style={styles.container}>
        <h2>🛒 Store Inventory Navigation</h2>

         Dynamic Navigation Sidebar Links   
        <div style={styles.sidebar}>
          <Link to="/product/mouse-101" style={styles.link}>Wireless Mouse</Link>
          <Link to="/product/keyboard-202" style={styles.link}>Mechanical Keyboard</Link>
          <Link to="/product/monitor-303" style={styles.link}>4K Display Screen</Link>
        </div>

        {/* Route Mapping Structure 
        <Routes>
          {/* Note the colon preceding the custom token identifier name   
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/" element={<p>Please select a product above to inspect details.</p>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

const styles = {
  container: { fontFamily: 'sans-serif', padding: '20px', maxWidth: '500px', margin: 'auto' },
  sidebar: { display: 'flex', gap: '15px', marginBottom: '20px', background: '#f8f9fa', padding: '10px', borderRadius: '6px' },
  link: { textDecoration: 'none', color: '#007bff', fontWeight: 'bold' },
  detailBox: { padding: '15px', border: '1px dashed #6c757d', borderRadius: '8px', backgroundColor: '#e9ecef' }
};



import React from 'react';
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';

// 1. Child Sub-Components
const AccountOverview = () => <h4>📈 Main Overview Metrics Dashboard</h4>;
const SecuritySettings = () => <h4>🔒 Password & Security Control Panels</h4>;

// 2. Parent Layout Container Component
function SettingsWorkspace() {
  return (
    <div style={styles.workspace}>
    // Shared Internal Navigation Sidebar 
      <div style={styles.tabBar}>
        <Link to="/settings/overview" style={styles.tab}>Overview Tab</Link>
        <Link to="/settings/security" style={styles.tab}>Security Tab</Link>
      </div>

      <div style={styles.subView}>
        // Dynamic Window: Swaps sub-components silently in place 
        <Outlet />
      </div>
    </div>
  );
}

// 3. Main Application Wireframe
export default function App() {
  return (
    <BrowserRouter>
      <div style={styles.appContainer}>
        // App Main Top Header Bar 
        <header style={styles.header}>
          <h2>⚙️ Global System Center</h2>
          <Link to="/settings" style={{ color: '#fff' }}>Open Workspace Panel</Link>
        </header>

        <Routes>
          // Main Parent Route Configuration 
          <Route path="/settings" element={<SettingsWorkspace />}>
            // Nested Child Route Targets 
            <Route path="overview" element={<AccountOverview />} />
            <Route path="security" element={<SecuritySettings />} />
            // Fallback default child view if standing directly on /settings 
            <Route index element={<p>Please select a specific workspace tab section.</p>} />
          </Route>

          <Route path="/" element={<p style={{ padding: '20px' }}>Welcome! Use the menu link to begin.</p>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

const styles = {
  appContainer: { fontFamily: 'sans-serif', margin: 0, padding: 0 },
  header: { display: 'flex', justifyContent: 'space-between', padding: '10px 20px', background: '#2c3e50', color: '#fff', alignItems: 'center' },
  workspace: { display: 'flex', gap: '20px', padding: '20px' },
  tabBar: { display: 'flex', flexDirection: 'column', gap: '10px', width: '150px', borderRight: '1px solid #ccc', paddingRight: '15px' },
  tab: { textDecoration: 'none', color: '#3498db', fontWeight: 'bold', padding: '8px', background: '#f8f9fa', borderRadius: '4px' },
  subView: { flex: 1, backgroundColor: '#fcfcfc', border: '1px solid #e0e0e0', padding: '20px', borderRadius: '6px' }
};




import React, { useReducer } from 'react';

// 1. Define the Initial State Object
const initialState = {
  items: [],        // Array of items in cart [{ id, name, price, quantity }]
  totalPrice: 0,    // Total cash cost of everything combined
  couponApplied: false
};

// 2. Define the Reducer Function (The state transition brain)
// Crucial Rule: This function MUST be pure. Never mutate state directly; always return a fresh copy.
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      let updatedItems;

      if (existingItemIndex > -1) {
        // Item exists, update its quantity safely
        updatedItems = state.items.map((item, index) =>
          index === existingItemIndex ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Item is brand new to the cart
        updatedItems = [...state.items, { ...action.payload, quantity: 1 }];
      }

      // Calculate total price accurately based on the new array configuration
      const newTotal = updatedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

      return {
        ...state,
        items: updatedItems,
        totalPrice: state.couponApplied ? newTotal * 0.9 : newTotal // keep coupon discount active
      };
    }

    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.id !== action.payload);
      const newTotal = updatedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

      return {
        ...state,
        items: updatedItems,
        totalPrice: state.couponApplied ? newTotal * 0.9 : newTotal
      };
    }

    case 'APPLY_COUPON': {
      if (state.couponApplied) return state; // Don't allow double stacking
      return {
        ...state,
        couponApplied: true,
        totalPrice: state.totalPrice * 0.9 // Give 10% off total price instantly
      };
    }

    case 'CLEAR_CART':
      return initialState; // Reset state back to clean initial values

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

// 3. Main Component Layout
export default function ShoppingCartApp() {
  // Hook usage: pass the reducer function and initial state configuration object
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const mockProduct = { id: 'p1', name: 'Premium Wireless Headphones', price: 100 };

  return (
    <div style={styles.container}>
      <h3>🛒 Complex Checkout Store</h3>

      <button onClick={() => dispatch({ type: 'ADD_ITEM', payload: mockProduct })} style={styles.btn}>
        Add Headphones ($100)
      </button>

      <div style={styles.cartBox}>
        <h4>Your Cart Items:</h4>
        {state.items.length === 0 && <p>Cart is currently empty.</p>}
        <ul>
          {state.items.map(item => (
            <li key={item.id} style={styles.itemRow}>
              {item.name} (x{item.quantity}) - ${item.price * item.quantity}
              <button onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })} style={styles.deleteBtn}>
                Remove
              </button>
            </li>
          ))}
        </ul>

        <hr />
        <div style={styles.summaryContainer}>
          <p>Coupon Status: <strong>{state.couponApplied ? '🟢 10% OFF Applied' : '❌ None'}</strong></p>
          <p>Total Balance: <strong style={{ color: 'green', fontSize: '18px' }}>${state.totalPrice.toFixed(2)}</strong></p>
        </div>

        <div style={styles.actionGroup}>
          <button onClick={() => dispatch({ type: 'APPLY_COUPON' })} disabled={state.couponApplied || state.items.length === 0}>
            Apply "SAVE10" Coupon
          </button>
          <button onClick={() => dispatch({ type: 'CLEAR_CART' })} style={{ backgroundColor: '#dc3545', color: '#fff' }}>
            Empty Cart
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { fontFamily: 'sans-serif', maxWidth: '400px', margin: '20px auto', padding: '15px' },
  btn: { backgroundColor: '#28a745', color: '#fff', padding: '10px', width: '100%', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
  cartBox: { marginTop: '20px', padding: '15px', background: '#f8f9fa', border: '1px solid #ddd', borderRadius: '6px' },
  itemRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '14px', alignItems: 'center' },
  deleteBtn: { backgroundColor: 'transparent', color: '#dc3545', border: 'none', cursor: 'pointer' },
  summaryContainer: { margin: '15px 0' },
  actionGroup: { display: 'flex', gap: '10px', marginTop: '10px' }
};


import { useState, useEffect } from 'react';
import axios from 'axios'; // Import the installed Axios library

export function UserProfileAxios() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 1. Create a modern abort signal to stop requests if you leave the page
    const controller = new AbortController();

    // 2. Call a guaranteed live, working public endpoint using Axios
    axios.get('https://typicode.com', {
      signal: controller.signal
    })
      .then((response) => {
        // Axios automatically parses the response into JSON!
        // The data sits cleanly inside the standard 'response.data' object.
        setUser(response.data);
        setLoading(false);
      })
      .catch((err) => {
        // If the request was cancelled by the AbortController, ignore it.
        // Otherwise, track the error (Axios throws 404/500 errors straight here!)
        if (err.name !== 'CanceledError') {
          setError(err.message);
          setLoading(false);
        }
      });

    // Cleanup function
    return () => controller.abort();
  }, []);

  // 3. Conditional UI Rendering States
  if (loading) return <p style={{ padding: '20px', textAlign: 'center' }}>Loading via Axios...</p>;
  if (error) return <p style={{ padding: '20px', color: 'red', textAlign: 'center' }}>Axios Error: {error}</p>;
  if (!user) return null;

  return (
    <div style={{
      border: '2px solid #007acc',
      padding: '24px',
      borderRadius: '12px',
      maxWidth: '350px',
      margin: '40px auto',
      fontFamily: 'sans-serif',
      boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
    }}>
      <h2 style={{ margin: '0 0 10px 0', color: '#007acc' }}>{user.name}</h2>
      <p style={{ margin: '5px 0', color: '#333' }}><strong>Username:</strong> {user.username}</p>
      <p style={{ margin: '5px 0', color: '#333' }}><strong>Email:</strong> {user.email}</p>
      <p style={{ margin: '5px 0', color: '#333' }}><strong>City:</strong> {user.address?.city}</p>
      <span style={{
        display: 'inline-block',
        marginTop: '15px',
        fontSize: '11px',
        background: '#e1f5fe',
        color: '#0288d1',
        padding: '3px 8px',
        borderRadius: '4px'
      }}>
        Powered by Axios
      </span>
    </div>
  );
}

// Export it as default so your main.jsx automatically finds it
export default UserProfileAxios;
// cant working with http because of office laptop or wifi



//practice:
let newPromise = new Promise((fullfilled, failure) => {
  let dataRecieved = true;
  if (dataRecieved) {
    fullfilled("Data received")
  } else {
    failure("Data not received")
  }
})

let message = await newPromise

console.log(message);

console.log("Last")
*/}

//
import { useState } from 'react';
import { Routes, Route, Link, NavLink, Outlet, useParams, useNavigate } from 'react-router-dom';
import { useShop } from './ShopContext.jsx';

const CATEGORIES = ['All', 'Electronics', 'Fashion', 'Lifestyle'];

// Pastel tile colour per category
const TILE = {
  Electronics: 'from-sky-100 to-indigo-100',
  Fashion: 'from-pink-100 to-rose-100',
  Lifestyle: 'from-amber-100 to-orange-100',
};

// Reusable button styles (shadcn-style variants, pastel palette)
const primaryBtn =
  'rounded-full bg-rose-400 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-rose-200 transition hover:bg-rose-500 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60';
const softBtn =
  'rounded-full bg-violet-100 px-4 py-2.5 text-sm font-semibold text-violet-700 transition hover:bg-violet-200 active:scale-95';

/* ---------- LAYOUT ---------- */
function Layout() {
  const { loadShopData, cartCount, toast } = useShop();

  const navClass = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition ${isActive ? 'bg-violet-100 text-violet-700' : 'text-slate-500 hover:bg-violet-50'
    }`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-violet-50 font-sans text-slate-700">
      <header className="sticky top-0 z-10 border-b border-pink-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-3">
          <Link to="/">
            <h1 className="text-2xl font-extrabold text-rose-400">🌸 MegaStore</h1>
          </Link>

          <div className="flex gap-2">
            <button
              onClick={() => loadShopData(false)}
              className="rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-200"
            >
              Simulate Server Refresh
            </button>
            <button
              onClick={() => loadShopData(true)}
              className="rounded-full bg-red-100 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-200"
            >
              Simulate Server Crash
            </button>
          </div>

          <nav className="flex items-center gap-2">
            <NavLink to="/" end className={navClass}>
              Shop
            </NavLink>
            <NavLink
              to="/cart"
              className="rounded-full bg-pink-100 px-4 py-2 text-sm font-semibold text-rose-500 transition hover:bg-pink-200"
            >
              🛒 Cart
              <span className="ml-2 rounded-full bg-rose-400 px-2 py-0.5 text-xs text-white">
                {cartCount}
              </span>
            </NavLink>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-8">
        <Outlet />
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-slate-800 px-5 py-3 text-sm text-white shadow-lg">
          ✅ {toast}
        </div>
      )}
    </div>
  );
}

/* ---------- Loading / Error wrapper ---------- */
function DataGate({ children }) {
  const { loading, error, loadShopData } = useShop();

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-pink-100 border-t-rose-400" />
        <h3 className="mt-4 text-slate-500">Fetching items from server database...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-lg rounded-3xl border border-red-100 bg-red-50 p-8 text-center">
        <h2 className="text-xl font-bold text-red-700">⚠️ Network Error Caught</h2>
        <p className="my-3 text-red-600">{error}</p>
        <button onClick={() => loadShopData(false)} className={primaryBtn}>
          Reconnect to Database
        </button>
      </div>
    );
  }

  return children;
}

/* ---------- PAGE: Shop ( / ) ---------- */
function ShopPage() {
  const { products, addToCart, addingId } = useShop();
  const [category, setCategory] = useState('All');

  const shown = category === 'All' ? products : products.filter((p) => p.category === category);

  return (
    <DataGate>
      <div className="flex flex-col gap-8 md:flex-row">
        {/* Sidebar */}
        <aside className="shrink-0 md:w-52">
          <div className="rounded-3xl border border-pink-100 bg-white p-4 shadow-sm">
            <h3 className="mb-3 px-2 text-sm font-bold uppercase tracking-wide text-slate-400">
              Categories
            </h3>
            <ul className="space-y-1">
              {CATEGORIES.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => setCategory(cat)}
                    className={`w-full rounded-full px-4 py-2 text-left text-sm transition ${category === cat
                        ? 'bg-rose-400 font-semibold text-white shadow-md shadow-rose-200'
                        : 'text-slate-600 hover:bg-pink-50'
                      }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Products */}
        <main className="grow">
          <p className="mb-4 text-sm text-slate-500">
            Showing {shown.length} items in <strong className="text-rose-400">{category}</strong>
          </p>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-6">
            {shown.map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-between rounded-3xl border border-pink-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-pink-100"
              >
                <div>
                  <div
                    className={`flex h-32 items-center justify-center rounded-2xl bg-gradient-to-br text-6xl ${TILE[item.category] || 'from-pink-100 to-violet-100'
                      }`}
                  >
                    {item.img}
                  </div>
                  <h4 className="mt-4 font-bold text-slate-800">{item.name}</h4>
                  <span className="mt-1 inline-block rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-medium text-violet-600">
                    {item.category}
                  </span>
                </div>

                <div className="mt-5">
                  <div className="mb-3 flex items-center justify-between">
                    <strong className="text-lg text-slate-800">₹{item.price}</strong>
                    <span className="rounded-full bg-amber-50 px-2 py-0.5 text-sm text-amber-500">
                      ⭐ {item.rating}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Link to={`/product/${item.id}`} className={`${softBtn} flex-1 text-center`}>
                      View
                    </Link>
                    <button
                      onClick={() => addToCart(item)}
                      disabled={addingId !== null}
                      className={`${primaryBtn} flex-[2]`}
                    >
                      {addingId === item.id ? 'Adding...' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </DataGate>
  );
}

/* ---------- PAGE: Product details ( /product/:id ) ---------- */
function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, addingId } = useShop();

  return (
    <DataGate>
      {(() => {
        const product = products.find((p) => p.id === Number(id));

        if (!product) {
          return (
            <div className="py-20 text-center">
              <h2 className="mb-3 text-2xl font-bold">Product not found 😕</h2>
              <Link to="/" className="text-rose-400 hover:underline">← Back to shop</Link>
            </div>
          );
        }

        return (
          <div className="mx-auto grid max-w-3xl gap-8 rounded-3xl border border-pink-100 bg-white p-6 shadow-lg shadow-pink-100 md:grid-cols-2">
            <div
              className={`flex items-center justify-center rounded-2xl bg-gradient-to-br py-14 text-8xl ${TILE[product.category] || 'from-pink-100 to-violet-100'
                }`}
            >
              {product.img}
            </div>

            <div className="flex flex-col">
              <span className="w-fit rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-600">
                {product.category}
              </span>
              <h2 className="mt-3 text-2xl font-extrabold text-slate-800">{product.name}</h2>
              <p className="mt-1 text-amber-500">⭐ {product.rating}</p>
              <p className="mt-4 grow text-slate-500">
                This is a high-quality product from our {product.category} lineup. Engineered for
                high durability and performance.
              </p>

              <h3 className="mt-4 text-3xl font-extrabold text-rose-400">₹{product.price}</h3>

              <div className="mt-5 flex gap-2">
                <button onClick={() => navigate(-1)} className={`${softBtn} flex-1`}>
                  ← Back
                </button>
                <button
                  onClick={() => addToCart(product)}
                  disabled={addingId !== null}
                  className={`${primaryBtn} flex-[2]`}
                >
                  {addingId === product.id ? 'Adding...' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </DataGate>
  );
}

/* ---------- PAGE: Cart ( /cart ) ---------- */
function CartPage() {
  const { cart, cartTotal, changeQty, removeFromCart, clearCart } = useShop();
  const [ordered, setOrdered] = useState(false);

  const checkout = () => {
    clearCart();
    setOrdered(true);
  };

  if (ordered) {
    return (
      <div className="py-20 text-center">
        <div className="text-6xl">🎉</div>
        <h2 className="mt-3 mb-2 text-2xl font-bold">Order placed successfully!</h2>
        <Link to="/" onClick={() => setOrdered(false)} className="text-rose-400 hover:underline">
          Continue shopping
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="py-20 text-center">
        <div className="text-6xl">🛒</div>
        <h2 className="mt-3 mb-2 text-2xl font-bold">Your cart is empty</h2>
        <Link to="/" className="text-rose-400 hover:underline">← Go shopping</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="mb-5 text-2xl font-extrabold text-slate-800">Your Cart</h2>

      <div className="space-y-3">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 rounded-3xl border border-pink-100 bg-white p-4 shadow-sm"
          >
            <div
              className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br text-3xl ${TILE[item.category] || 'from-pink-100 to-violet-100'
                }`}
            >
              {item.img}
            </div>

            <div className="grow">
              <Link
                to={`/product/${item.id}`}
                className="font-bold text-slate-800 hover:text-rose-400"
              >
                {item.name}
              </Link>
              <div className="text-sm text-slate-400">₹{item.price} each</div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => changeQty(item.id, -1)}
                className="h-8 w-8 rounded-full bg-violet-100 font-bold text-violet-700 transition hover:bg-violet-200"
              >
                −
              </button>
              <strong className="w-6 text-center">{item.qty}</strong>
              <button
                onClick={() => changeQty(item.id, 1)}
                className="h-8 w-8 rounded-full bg-violet-100 font-bold text-violet-700 transition hover:bg-violet-200"
              >
                +
              </button>
            </div>

            <strong className="w-20 text-right text-slate-800">₹{item.price * item.qty}</strong>

            <button
              onClick={() => removeFromCart(item.id)}
              className="h-8 w-8 rounded-full bg-red-100 text-red-500 transition hover:bg-red-200"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-3xl border border-pink-100 bg-white p-6 shadow-sm">
        <div className="mb-4 flex justify-between text-xl">
          <span>Total</span>
          <strong className="text-rose-400">₹{cartTotal}</strong>
        </div>
        <div className="flex gap-2">
          <button onClick={clearCart} className={`${softBtn} flex-1`}>Clear Cart</button>
          <button onClick={checkout} className={`${primaryBtn} flex-[2]`}>Checkout</button>
        </div>
      </div>
    </div>
  );
}

/* ---------- 404 ---------- */
function NotFound() {
  return (
    <div className="py-20 text-center">
      <h2 className="mb-3 text-3xl font-bold">404 – Page not found</h2>
      <Link to="/" className="text-rose-400 hover:underline">← Back to shop</Link>
    </div>
  );
}

/* ---------- ROUTES ---------- */
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<ShopPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}