import React, { useState } from 'react';
import './LoginModal.css';
import { signup, login } from "../../firebase"; // Import Firebase functions

const LoginModal = ({ onClose, isSignUp, setIsSignUp, setIsLoggedIn }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false); // State to track terms acceptance
    const [error, setError] = useState(''); // State to handle errors

    const handleSignUp = async () => {
        if (!termsAccepted) {
            setError('You must accept the terms of use and privacy policy.');
            return;
        }
        try {
            await signup(name, email, password);
            setIsLoggedIn(true);  // Set login status to true after successful sign-up
            onClose();  // Close the modal after successful sign-up
        } catch (err) {
            setError(err.message);  // Set error message if sign-up fails
        }
    };

    const handleLogin = async () => {
        if (!termsAccepted) {
            setError('You must accept the terms of use and privacy policy.');
            return;
        }
        try {
            await login(email, password);
            setIsLoggedIn(true);  // Set login status to true after successful login
            onClose();  // Close the modal after successful login
        } catch (err) {
            setError(err.message);  // Set error message if login fails
        }
    };

    return (
        <div className="login-modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                {error && <p className="error">{error}</p>} {/* Display error message */}
                {isSignUp ? (
                    <>
                        <h2>Sign Up</h2>
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="terms">
                            <input 
                                type="checkbox" 
                                checked={termsAccepted} 
                                onChange={(e) => setTermsAccepted(e.target.checked)} 
                            />
                            <span>By continuing, I agree to the terms of use & privacy policy.</span>
                        </div>
                        <button onClick={handleSignUp}>Create Account</button>
                        <p>
                            Already have an account?{' '}
                            <span onClick={() => setIsSignUp(false)} className="link">
                                Login here
                            </span>
                        </p>
                    </>
                ) : (
                    <>
                        <h2>Login</h2>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="terms">
                            <input 
                                type="checkbox" 
                                checked={termsAccepted} 
                                onChange={(e) => setTermsAccepted(e.target.checked)} 
                            />
                            <span>By continuing, I agree to the terms of use & privacy policy.</span>
                        </div>
                        <button onClick={handleLogin}>Login</button>
                        <p>
                            Create a new account?{' '}
                            <span onClick={() => setIsSignUp(true)} className="link">
                                Click here
                            </span>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default LoginModal;
