import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import allQuestions from '../data/questions';
import './Quiz.css';

const categoryNames = {
    cleanliness: 'Public Cleanliness',
    traffic: 'Traffic Behaviour',
    publicSpaces: 'Respecting Public Spaces',
    socialEtiquette: 'Social Etiquette',
    digitalCivics: 'Digital Civic Behaviour',
    moralValues: 'Everyday Moral Values',
};

const categories = [
    { id: 'cleanliness', icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22"><path d="M12 2L12 6" /><path d="M9 6h6l1 6H8l1-6z" /><path d="M8 12c-1 4-2 8-2 9a1 1 0 001 1h10a1 1 0 001-1c0-1-1-5-2-9" /><path d="M6 16h12" /></svg>), name: 'Public Cleanliness', color: '#27AE60' },
    { id: 'traffic', icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22"><rect x="6" y="1" width="12" height="22" rx="3" /><circle cx="12" cy="6" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="12" cy="18" r="2" /></svg>), name: 'Traffic Behaviour', color: '#E74C3C' },
    { id: 'publicSpaces', icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22"><path d="M3 21h18" /><path d="M5 21V7l7-4 7 4v14" /><rect x="9" y="13" width="6" height="8" /><path d="M9 9h6" /></svg>), name: 'Respecting Public Spaces', color: '#8E44AD' },
    { id: 'socialEtiquette', icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22"><path d="M16 4c0 1.1.9 2 2 2a2 2 0 002-2 2 2 0 00-2-2c-1.1 0-2 .9-2 2z" /><path d="M6 4a2 2 0 110 4 2 2 0 010-4z" /><path d="M2 17l4-4 2 2 4-4 4 4 2-2 4 4" /><path d="M2 22h20" /></svg>), name: 'Social Etiquette', color: '#2980B9' },
    { id: 'digitalCivics', icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8" /><path d="M12 17v4" /><path d="M7 8h4" /><path d="M7 11h6" /></svg>), name: 'Digital Civics', color: '#E67E22' },
    { id: 'moralValues', icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22"><path d="M12 2L15 8.5 22 9.5 17 14.5 18 21.5 12 18 6 21.5 7 14.5 2 9.5 9 8.5z" /></svg>), name: 'Moral Values', color: '#16A085' },
];

function Quiz() {
    const navigate = useNavigate();
    const [step, setStep] = useState('name'); // name, category, quiz, submitting
    const [name, setName] = useState('');
    const [category, setCategory] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [currentQ, setCurrentQ] = useState(0);
    const [answers, setAnswers] = useState({});
    const [error, setError] = useState('');

    const fetchQuestions = useCallback((cat) => {
        setError('');
        const categoryQuestions = allQuestions[cat];
        if (!categoryQuestions || categoryQuestions.length === 0) {
            setError('No questions available for this category.');
            return;
        }
        const shuffled = [...categoryQuestions].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, 20).map(q => ({
            id: q.id,
            question: q.question,
            options: q.options,
        }));
        setQuestions(selected);
        setStep('quiz');
    }, []);

    const handleNameSubmit = (e) => {
        e.preventDefault();
        if (name.trim().length >= 2) {
            setStep('category');
        }
    };

    const handleCategorySelect = (cat) => {
        setCategory(cat);
        fetchQuestions(cat);
    };

    const handleAnswerSelect = (optionIndex) => {
        setAnswers(prev => ({ ...prev, [questions[currentQ].id]: optionIndex }));
    };

    const handlePrev = () => {
        if (currentQ > 0) {
            setCurrentQ(prev => prev - 1);
        }
    };

    const handleNext = () => {
        if (currentQ < questions.length - 1) {
            setCurrentQ(prev => prev + 1);
        }
    };

    const submitQuiz = () => {
        setStep('submitting');
        const categoryQuestions = allQuestions[category];
        let score = 0;
        const total = Object.keys(answers).length;
        const results = [];

        for (const [questionId, selectedAns] of Object.entries(answers)) {
            const question = categoryQuestions.find(q => q.id === questionId);
            if (question) {
                const isCorrect = selectedAns === question.correct;
                if (isCorrect) score++;
                results.push({
                    questionId,
                    question: question.question,
                    selectedAnswer: selectedAns,
                    correctAnswer: question.correct,
                    isCorrect,
                    explanation: question.explanation,
                });
            }
        }

        const percentage = Math.round((score / total) * 100);
        const passed = percentage >= 85;
        let certificateId = null;

        if (passed) {
            certificateId = `CS-${Date.now().toString(36).toUpperCase()}-${crypto.randomUUID().split('-')[0].toUpperCase()}`;
            const date = new Date().toISOString().split('T')[0];
            const certs = JSON.parse(localStorage.getItem('civicsense_certs') || '[]');
            certs.push({ name: name.trim(), score, total, percentage, category, date, certificateId });
            localStorage.setItem('civicsense_certs', JSON.stringify(certs));
        }

        navigate('/results', {
            state: {
                name: name.trim(),
                score,
                total,
                percentage,
                passed,
                certificateId,
                category: categoryNames[category] || category,
                results,
            },
        });
    };

    const progress = questions.length > 0 ? ((currentQ + 1) / questions.length) * 100 : 0;
    const answeredCount = Object.keys(answers).length;
    const currentAnswer = questions.length > 0 ? answers[questions[currentQ]?.id] : undefined;

    return (
        <div className="quiz-page">
            <div className="quiz-container">
                {/* Step 1: Name Input */}
                {step === 'name' && (
                    <div className="quiz-step animate-fade-in-up">
                        <div className="quiz-step-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="36" height="36"><path d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z" /></svg></div>
                        <h2>Before We Begin</h2>
                        <p>Enter your name to personalise your learning experience and certificate.</p>
                        <form onSubmit={handleNameSubmit} className="name-form">
                            <input
                                type="text"
                                className="input name-input"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                autoFocus
                                minLength={2}
                                required
                            />
                            <button
                                type="submit"
                                className="btn btn-primary btn-lg"
                                disabled={name.trim().length < 2}
                            >
                                Continue →
                            </button>
                        </form>
                    </div>
                )}

                {/* Step 2: Category Selection */}
                {step === 'category' && (
                    <div className="quiz-step animate-fade-in-up">
                        <div className="quiz-step-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="36" height="36"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" /></svg></div>
                        <h2>Choose a Topic</h2>
                        <p>Welcome, <strong>{name}</strong>! Select a category to begin your quiz.</p>
                        <div className="category-grid">
                            {categories.map((cat, i) => (
                                <button
                                    key={cat.id}
                                    className={`category-card stagger-${i + 1}`}
                                    style={{ '--cat-color': cat.color }}
                                    onClick={() => handleCategorySelect(cat.id)}
                                >
                                    <span className="cat-icon">{cat.icon}</span>
                                    <span className="cat-name">{cat.name}</span>
                                </button>
                            ))}
                        </div>
                        {error && <div className="quiz-error">{error}</div>}
                    </div>
                )}

                {/* Step 3: Quiz Engine */}
                {step === 'quiz' && questions.length > 0 && (
                    <div className="quiz-engine animate-fade-in">
                        <div className="quiz-header">
                            <div className="quiz-meta">
                                <span className="quiz-category-badge" style={{ background: categories.find(c => c.id === category)?.color }}>
                                    {categories.find(c => c.id === category)?.icon} {categories.find(c => c.id === category)?.name}
                                </span>
                                <span className="quiz-counter">Question {currentQ + 1} of {questions.length} ({answeredCount} answered)</span>
                            </div>
                            <div className="quiz-progress-bar">
                                <div className="quiz-progress-fill" style={{ width: `${progress}%` }} />
                            </div>
                        </div>

                        <div className="question-card" key={currentQ}>
                            <h3 className="question-text">{questions[currentQ].question}</h3>
                            <div className="options-list">
                                {questions[currentQ].options.map((option, i) => (
                                    <button
                                        key={i}
                                        className={`option-btn ${currentAnswer === i ? 'selected' : ''}`}
                                        onClick={() => handleAnswerSelect(i)}
                                    >
                                        <span className="option-letter">{String.fromCharCode(65 + i)}</span>
                                        <span className="option-text">{option}</span>
                                        {currentAnswer === i && (
                                            <span className="option-indicator">✓</span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="quiz-nav-bar">
                            <button
                                className="btn btn-secondary"
                                onClick={handlePrev}
                                disabled={currentQ === 0}
                            >
                                ← Previous
                            </button>
                            {currentQ < questions.length - 1 ? (
                                <button
                                    className="btn btn-primary"
                                    onClick={handleNext}
                                >
                                    Next →
                                </button>
                            ) : (
                                <button
                                    className="btn btn-primary"
                                    onClick={submitQuiz}
                                    disabled={answeredCount < questions.length}
                                >
                                    Submit Quiz ({answeredCount}/{questions.length})
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Submitting */}
                {step === 'submitting' && (
                    <div className="quiz-step animate-fade-in">
                        <div className="spinner large" />
                        <h2>Calculating Your Score...</h2>
                        <p>Please wait while we evaluate your responses.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Quiz;
