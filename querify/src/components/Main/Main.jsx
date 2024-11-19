import React, { useContext, useState } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';
import LoginModal from '../LoginModal/LoginModal';  // Importing the LoginModal component
import { logout } from "../../firebase"; // Importing the logout function

const Main = () => {
    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);
    const [showLogin, setShowLogin] = useState(false);  // State to control the visibility of the login modal
    const [isSignUp, setIsSignUp] = useState(true);  // State to control if the modal shows Sign-Up or Login
    const [isLoggedIn, setIsLoggedIn] = useState(false);  // State to track login status

    return (
        <div className='main'>
            <div className="nav">
                <p>Querify</p>
                <img 
                    src={assets.dummy_icon} 
                    alt="User Icon" 
                    onClick={() => {
                        if (isLoggedIn) {
                            // If logged in, offer sign out option
                            const confirmLogout = window.confirm("Do you want to sign out?");
                            if (confirmLogout) {
                                logout();  // Sign out the user
                                setIsLoggedIn(false);  // Update state to reflect that the user is logged out
                            }
                        } else {
                            setShowLogin(true);  // Show login modal
                        }
                    }} 
                />
            </div>
            <div className="main-container">

                {!showResult ?
                    <>
                        <div className="greet">
                            <p><span>Hello, Welcome to Querify.</span></p>
                            <p>How can I help you today?</p>
                        </div>
                        <div className="cards">
                            <div className="card">
                                <p>Suggest beautiful places to see on an upcoming road trip</p>
                                <img src={assets.compass_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Briefly summarize this concept: urban planning</p>
                                <img src={assets.bulb_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Brainstorm team bonding activities for our work retreat</p>
                                <img src={assets.message_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Improve the readability of the following code</p>
                                <img src={assets.code_icon} alt="" />
                            </div>
                        </div>
                    </>
                    : <div className='result'>
                        <div className="result-title">
                            <img src={assets.dummy_icon} alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="" />
                            {
                                loading ? <div className='loader'>
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                                    :
                                    <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                            }
                        </div>
                    </div>
                }

                <div className="main-bottom">
                    <div className="search-box">
                        <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here' />
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            {input ? <img onClick={() => onSent()} src={assets.send_icon} alt="" /> : null}
                        </div>
                    </div>
                    <p className="bottom-info">
                        Querify may display inaccurate info, including about people, so double-check its response. Your privacy and Querify Apps
                    </p>
                </div>
            </div>

            {showLogin && <LoginModal onClose={() => setShowLogin(false)} isSignUp={isSignUp} setIsSignUp={setIsSignUp} setIsLoggedIn={setIsLoggedIn} />}  {/* Pass state to LoginModal */}
        </div>
    );
};

export default Main;
