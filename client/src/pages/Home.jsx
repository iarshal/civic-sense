import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import './Home.css';

function Home() {
    const observerRef = useRef(null);

    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1 }
        );

        document.querySelectorAll('.reveal').forEach(el => {
            observerRef.current.observe(el);
        });

        return () => observerRef.current?.disconnect();
    }, []);

    const topics = [
        { icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28"><path d="M12 2L12 6" /><path d="M9 6h6l1 6H8l1-6z" /><path d="M8 12c-1 4-2 8-2 9a1 1 0 001 1h10a1 1 0 001-1c0-1-1-5-2-9" /><path d="M6 16h12" /></svg>), title: 'Public Cleanliness', desc: 'Keep our streets, parks, and public spaces clean and beautiful.' },
        { icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28"><rect x="6" y="1" width="12" height="22" rx="3" /><circle cx="12" cy="6" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="12" cy="18" r="2" /></svg>), title: 'Traffic Behaviour', desc: 'Follow traffic rules and make roads safer for everyone.' },
        { icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28"><path d="M3 21h18" /><path d="M5 21V7l7-4 7 4v14" /><rect x="9" y="13" width="6" height="8" /><path d="M9 9h6" /></svg>), title: 'Respecting Public Spaces', desc: 'Treat monuments, libraries, and shared spaces with respect.' },
        { icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28"><path d="M16 4c0 1.1.9 2 2 2a2 2 0 002-2 2 2 0 00-2-2c-1.1 0-2 .9-2 2z" /><path d="M6 4a2 2 0 110 4 2 2 0 010-4z" /><path d="M2 17l4-4 2 2 4-4 4 4 2-2 4 4" /><path d="M2 22h20" /></svg>), title: 'Social Etiquette', desc: 'Practice kindness, empathy, and respect in daily interactions.' },
        { icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8" /><path d="M12 17v4" /><path d="M7 8h4" /><path d="M7 11h6" /></svg>), title: 'Digital Civics', desc: 'Be responsible, honest, and kind in the digital world.' },
        { icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28"><path d="M12 2L15 8.5 22 9.5 17 14.5 18 21.5 12 18 6 21.5 7 14.5 2 9.5 9 8.5z" /></svg>), title: 'Moral Values', desc: 'Build integrity, honesty, and compassion in everyday life.' },
    ];

    const steps = [
        { num: '01', icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28"><path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" /></svg>), title: 'Learn', desc: 'Explore interactive modules on civic sense and moral values.' },
        { num: '02', icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28"><path d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z" /></svg>), title: 'Practice', desc: 'Test your knowledge with scenario-based quizzes.' },
        { num: '03', icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28"><path d="M6 9H4.5a2.5 2.5 0 010-5C7 4 7 7 7 7" /><path d="M18 9h1.5a2.5 2.5 0 000-5C17 4 17 7 17 7" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22" /><path d="M18 2H6v7a6 6 0 0012 0V2z" /></svg>), title: 'Get Recognised', desc: 'Score 85%+ and earn your Certificate of Recognition.' },
    ];

    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-bg-shapes">
                    <div className="shape shape-1" />
                    <div className="shape shape-2" />
                    <div className="shape shape-3" />
                </div>
                <div className="container hero-content">
                    <div className="hero-badge animate-fade-in">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16" style={{ marginRight: '4px', verticalAlign: 'middle' }}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg> Free for every Indian citizen
                    </div>
                    <h1 className="hero-title animate-fade-in-up">
                        Small Habits.<br />
                        <span className="text-gradient">Big Change.</span><br />
                        Build a Better India.
                    </h1>
                    <p className="hero-subtitle animate-fade-in-up stagger-2">
                        A free, interactive platform to learn civic sense, practice moral values,
                        and become a recognised responsible citizen.
                    </p>
                    <div className="hero-actions animate-fade-in-up stagger-3">
                        <Link to="/quiz" className="btn btn-primary btn-lg">
                            Start Your Journey →
                        </Link>
                        <Link to="/learn" className="btn btn-secondary btn-lg">
                            Explore Modules
                        </Link>
                    </div>
                    <div className="hero-stats animate-fade-in-up stagger-4">
                        <div className="stat">
                            <strong>150+</strong>
                            <span>Questions</span>
                        </div>
                        <div className="stat-divider" />
                        <div className="stat">
                            <strong>6</strong>
                            <span>Topics</span>
                        </div>
                        <div className="stat-divider" />
                        <div className="stat">
                            <strong>Free</strong>
                            <span>Forever</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Civic Sense Matters */}
            <section className="why-section section">
                <div className="container">
                    <div className="section-header reveal">
                        <span className="badge badge-primary">Why It Matters</span>
                        <h2>Civic Sense is the <span className="text-gradient">Foundation</span> of a Great Nation</h2>
                        <p>Every small act of civic responsibility contributes to building the India we all dream of.</p>
                    </div>
                    <div className="why-cards">
                        <div className="why-card reveal">
                            <div className="why-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28"><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg></div>
                            <h3>Cleaner Communities</h3>
                            <p>When citizens take responsibility, our streets, parks, and public spaces become cleaner and more beautiful.</p>
                        </div>
                        <div className="why-card reveal stagger-1">
                            <div className="why-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg></div>
                            <h3>Stronger Bonds</h3>
                            <p>Social etiquette and respect build trust between neighbours, communities, and fellow citizens.</p>
                        </div>
                        <div className="why-card reveal stagger-2">
                            <div className="why-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg></div>
                            <h3>Progressive India</h3>
                            <p>A civic-minded population drives economic growth, innovation, and global respect for our nation.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Topics */}
            <section className="topics-section section">
                <div className="container">
                    <div className="section-header reveal">
                        <span className="badge badge-accent">What You'll Learn</span>
                        <h2>Key <span className="text-gradient-alt">Learning Topics</span></h2>
                        <p>Comprehensive modules covering every aspect of civic responsibility.</p>
                    </div>
                    <div className="topics-grid">
                        {topics.map((topic, i) => (
                            <div key={i} className={`topic-card card reveal stagger-${i + 1}`}>
                                <div className="topic-icon">{topic.icon}</div>
                                <h3>{topic.title}</h3>
                                <p>{topic.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="how-section section">
                <div className="container">
                    <div className="section-header reveal">
                        <span className="badge badge-success">Simple Process</span>
                        <h2>How It <span className="text-gradient">Works</span></h2>
                        <p>Three simple steps to earn your CivicSense Recognition.</p>
                    </div>
                    <div className="steps">
                        {steps.map((step, i) => (
                            <div key={i} className={`step reveal stagger-${i + 1}`}>
                                <div className="step-number">{step.num}</div>
                                <div className="step-icon">{step.icon}</div>
                                <h3>{step.title}</h3>
                                <p>{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="cta-section section">
                <div className="container">
                    <div className="cta-card reveal">
                        <h2>Ready to Make a Difference?</h2>
                        <p>Join thousands of citizens who are building a better, more civic-minded India.</p>
                        <Link to="/quiz" className="btn btn-primary btn-lg">
                            Take the CivicSense Quiz →
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
