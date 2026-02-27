import { useState } from 'react';
import './Verify.css';

const API_URL = 'http://localhost:3001/api';

function Verify() {
    const [certId, setCertId] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleVerify = async (e) => {
        e.preventDefault();
        if (!certId.trim()) return;

        setLoading(true);
        setError('');
        setResult(null);

        try {
            const res = await fetch(`${API_URL}/certificate/${encodeURIComponent(certId.trim())}`);
            if (res.ok) {
                const data = await res.json();
                setResult(data.certificate);
            } else if (res.status === 404) {
                setError('No certificate found with this ID. Please check and try again.');
            } else {
                setError('An error occurred. Please try again.');
            }
        } catch (err) {
            setError('Failed to verify. Make sure the server is running.');
        }
        setLoading(false);
    };

    return (
        <div className="verify-page">
            <div className="verify-container">
                <div className="verify-header animate-fade-in-up">
                    <div className="verify-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="36" height="36"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg></div>
                    <h1>Verify <span className="text-gradient">Certificate</span></h1>
                    <p>Enter a certificate ID to verify its authenticity.</p>
                </div>

                <form onSubmit={handleVerify} className="verify-form animate-fade-in-up stagger-1">
                    <div className="verify-input-group">
                        <input
                            type="text"
                            className="input verify-input"
                            placeholder="Enter Certificate ID (e.g., CS-XXXXXX-XXXXXXXX)"
                            value={certId}
                            onChange={(e) => setCertId(e.target.value)}
                            required
                        />
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading || !certId.trim()}
                        >
                            {loading ? <span className="spinner" /> : 'Verify'}
                        </button>
                    </div>
                </form>

                {error && (
                    <div className="verify-error animate-fade-in-up">
                        <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg></span>
                        <p>{error}</p>
                    </div>
                )}

                {result && (
                    <div className="verify-result animate-fade-in-up">
                        <div className="verify-status valid">
                            <span className="status-icon"><svg viewBox="0 0 24 24" fill="none" stroke="#27AE60" strokeWidth="2.5" width="24" height="24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg></span>
                            <h3>Certificate Verified</h3>
                            <p>This is a valid CivicSense certificate.</p>
                        </div>

                        <div className="verify-details">
                            <div className="detail-row">
                                <span className="detail-label">Name</span>
                                <span className="detail-value">{result.name}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Category</span>
                                <span className="detail-value">{result.category}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Score</span>
                                <span className="detail-value">{result.percentage}% ({result.score}/{result.total})</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Date Issued</span>
                                <span className="detail-value">{new Date(result.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Certificate ID</span>
                                <span className="detail-value mono">{result.certificateId}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Status</span>
                                <span className="detail-value">
                                    <span className="badge badge-success">✓ Authentic</span>
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Verify;
