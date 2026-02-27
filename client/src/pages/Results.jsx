import { useEffect, useState, useRef } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import './Results.css';

function Results() {
    const location = useLocation();
    const navigate = useNavigate();
    const data = location.state;
    const canvasRef = useRef(null);
    const [animatedScore, setAnimatedScore] = useState(0);
    const [showDetails, setShowDetails] = useState(false);
    const [confettiPieces, setConfettiPieces] = useState([]);

    useEffect(() => {
        if (!data) {
            navigate('/quiz');
            return;
        }
        // Animate score counter
        let current = 0;
        const target = data.percentage;
        const duration = 1500;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
                setTimeout(() => {
                    setShowDetails(true);
                    if (data.passed) {
                        // Generate confetti pieces
                        const pieces = Array.from({ length: 50 }, (_, i) => ({
                            id: i,
                            left: Math.random() * 100,
                            delay: Math.random() * 2,
                            duration: 2 + Math.random() * 3,
                            color: ['#FF6B35', '#4ECDC4', '#2ECC71', '#1A535C', '#F39C12'][Math.floor(Math.random() * 5)]
                        }));
                        setConfettiPieces(pieces);
                    }
                }, 300);
            }
            setAnimatedScore(Math.round(current));
        }, 16);
        return () => clearInterval(timer);
    }, [data, navigate]);

    useEffect(() => {
        if (data?.passed && data?.certificateId && canvasRef.current && showDetails) {
            drawCertificate();
        }
    }, [data, showDetails]);

    const drawCertificate = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        // Load the user's certificate template image
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            // Use original image dimensions for high quality
            canvas.width = img.width;
            canvas.height = img.height;

            // Draw the template image as background (exactly as-is)
            ctx.drawImage(img, 0, 0, img.width, img.height);

            // ========== OVERLAY: Participant Name ONLY ==========
            // Name goes between "THIS CERTIFICATE IS PRESENTED TO" and the gold line
            const nameY = img.height * 0.495;

            ctx.textAlign = 'center';
            ctx.fillStyle = '#1A1A1A';

            // Auto-size the name font to fit
            let nameFont = Math.round(img.width * 0.042);
            ctx.font = `bold ${nameFont}px Georgia, "Times New Roman", serif`;
            const maxNameWidth = img.width * 0.43;
            while (ctx.measureText(data.name).width > maxNameWidth && nameFont > 30) {
                nameFont -= 2;
                ctx.font = `bold ${nameFont}px Georgia, "Times New Roman", serif`;
            }
            ctx.fillText(data.name, img.width * 0.545, nameY);
        };
        img.src = '/certificate-template.png';
    };

    const downloadCertificate = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const link = document.createElement('a');
        link.download = `CivicSense-Certificate-${data.name.replace(/\s+/g, '-')}-${data.certificateId}.png`;
        link.href = canvas.toDataURL('image/png', 1.0);
        link.click();
    };

    if (!data) return null;

    return (
        <div className="results-page">
            {/* Confetti */}
            {data.passed && confettiPieces.length > 0 && (
                <div className="confetti-container">
                    {confettiPieces.map(piece => (
                        <div
                            key={piece.id}
                            className="confetti-piece"
                            style={{
                                left: `${piece.left}%`,
                                animationDelay: `${piece.delay}s`,
                                animationDuration: `${piece.duration}s`,
                                backgroundColor: piece.color,
                            }}
                        />
                    ))}
                </div>
            )}

            <div className="results-container">
                {/* Score Display */}
                <div className="score-section animate-fade-in">
                    <div className={`score-circle ${data.passed ? 'passed' : 'failed'}`}>
                        <span className="score-number">{animatedScore}%</span>
                        <span className="score-label">{data.score}/{data.total} correct</span>
                    </div>

                    <div className={`result-message ${showDetails ? 'show' : ''}`}>
                        {data.passed ? (
                            <>
                                <h2 className="result-title passed-title">Congratulations!</h2>
                                <p className="result-text">
                                    You are now a <strong>CivicSense Recognised Citizen</strong>.<br />
                                    Your awareness and values make India proud.
                                </p>
                            </>
                        ) : (
                            <>
                                <h2 className="result-title failed-title">Keep Going!</h2>
                                <p className="result-text">
                                    You need <strong>85%</strong> to pass. Don't worry — every attempt makes you a more aware citizen.
                                    Review the modules and try again!
                                </p>
                            </>
                        )}
                    </div>
                </div>

                {/* Certificate */}
                {data.passed && showDetails && (
                    <div className="certificate-section animate-fade-in-up">
                        <div className="cert-header">
                            <h3><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20" style={{ marginRight: '6px', verticalAlign: 'middle' }}><circle cx="12" cy="8" r="7" /><path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" /></svg>Your Certificate of Appreciation</h3>
                            <p>Download and share your achievement with pride</p>
                        </div>
                        <div className="certificate-wrapper">
                            <canvas ref={canvasRef} className="certificate-canvas" />
                        </div>
                        <div className="certificate-actions">
                            <button className="btn btn-primary btn-lg" onClick={downloadCertificate}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18" style={{ marginRight: '6px', verticalAlign: 'middle' }}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>Download Certificate (PNG)
                            </button>
                            <div className="cert-id-display">
                                <span>Certificate ID</span>
                                <strong>{data.certificateId}</strong>
                            </div>
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div className={`result-actions ${showDetails ? 'show' : ''}`}>
                    <Link to="/quiz" className="btn btn-accent">
                        {data.passed ? 'Take Another Quiz' : 'Try Again'} →
                    </Link>
                    <Link to="/learn" className="btn btn-secondary">
                        Review Modules
                    </Link>
                    {data.passed && (
                        <Link to="/verify" className="btn btn-secondary">
                            Verify Certificate
                        </Link>
                    )}
                </div>

                {/* Answer Review */}
                {showDetails && data.results && (
                    <div className="review-section animate-fade-in-up">
                        <h3><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20" style={{ marginRight: '6px', verticalAlign: 'middle' }}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>Answer Review</h3>
                        <div className="review-list">
                            {data.results.map((r, i) => (
                                <div key={i} className={`review-item ${r.isCorrect ? 'correct' : 'incorrect'}`}>
                                    <div className="review-status">
                                        {r.isCorrect ? (<svg viewBox="0 0 24 24" fill="none" stroke="#27AE60" strokeWidth="3" width="18" height="18"><polyline points="20 6 9 17 4 12" /></svg>) : (<svg viewBox="0 0 24 24" fill="none" stroke="#E74C3C" strokeWidth="3" width="18" height="18"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>)}
                                    </div>
                                    <div className="review-content">
                                        <p className="review-question">{r.question}</p>
                                        <p className="review-explanation">{r.explanation}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
}

export default Results;
