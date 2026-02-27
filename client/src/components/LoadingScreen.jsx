import { useState, useEffect } from 'react';
import './LoadingScreen.css';

function LoadingScreen() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 2;
            });
        }, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="loading-screen">
            <div className="loading-content">
                <div className="chakra-container">
                    <div className="chakra-wheel">
                        {[...Array(24)].map((_, i) => (
                            <div
                                key={i}
                                className="chakra-spoke"
                                style={{ transform: `rotate(${i * 15}deg)` }}
                            />
                        ))}
                        <div className="chakra-center" />
                    </div>
                </div>
                <h1 className="loading-title">
                    <span className="loading-civic">Civic</span>
                    <span className="loading-sense">Sense</span>
                    <span className="loading-india">India</span>
                </h1>
                <p className="loading-tagline">Learn • Practice • Get Recognised</p>
                <div className="loading-bar-container">
                    <div className="loading-bar" style={{ width: `${progress}%` }} />
                </div>
                <p className="loading-text">Building a better India, one citizen at a time...</p>
            </div>
        </div>
    );
}

export default LoadingScreen;
