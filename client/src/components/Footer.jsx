import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-top">
                    <div className="footer-brand">
                        <h3>
                            <span className="brand-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20"><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg></span>
                            <span className="brand-civic">Civic</span>
                            <span className="brand-sense">Sense</span>
                            <span> India</span>
                        </h3>
                        <p>Empowering citizens with civic awareness and moral values for a better India.</p>
                    </div>

                    <div className="footer-links-group">
                        <h4>Quick Links</h4>
                        <Link to="/">Home</Link>
                        <Link to="/learn">Learning Modules</Link>
                        <Link to="/quiz">Take Quiz</Link>
                        <Link to="/verify">Verify Certificate</Link>
                    </div>

                    <div className="footer-links-group">
                        <h4>Topics</h4>
                        <span>Public Cleanliness</span>
                        <span>Traffic Behaviour</span>
                        <span>Social Etiquette</span>
                        <span>Digital Civics</span>
                    </div>

                    <div className="footer-links-group">
                        <h4>About</h4>
                        <span>Free for all citizens</span>
                        <span>No registration needed</span>
                        <span>Community driven</span>
                        <span>Open initiative</span>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© {new Date().getFullYear()} CivicSense India. Free civic education for every Indian citizen.</p>
                    <p className="footer-credit">Made with <svg viewBox="0 0 24 24" fill="#E74C3C" stroke="none" width="14" height="14" style={{ verticalAlign: 'middle', margin: '0 2px' }}><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg> by <strong>Arshal</strong></p>
                    <p className="footer-motto">Small Habits. Big Change.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
