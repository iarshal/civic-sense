const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const { getDb, saveDb } = require('./db');
const questions = require('./questions');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Get questions for a category
app.get('/api/questions', (req, res) => {
    const { category } = req.query;

    if (!category || !questions[category]) {
        return res.status(400).json({
            error: 'Invalid category',
            availableCategories: Object.keys(questions)
        });
    }

    // Shuffle and return questions without correct answers
    const categoryQuestions = [...questions[category]];
    const shuffled = categoryQuestions.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 20);

    const sanitized = selected.map(q => ({
        id: q.id,
        question: q.question,
        options: q.options
    }));

    res.json({ questions: sanitized, total: sanitized.length });
});

// Get available categories
app.get('/api/categories', (req, res) => {
    const categories = Object.keys(questions).map(key => ({
        id: key,
        name: getCategoryName(key),
        questionCount: questions[key].length
    }));
    res.json({ categories });
});

// Submit quiz answers
app.post('/api/quiz/submit', async (req, res) => {
    try {
        const { name, answers, category } = req.body;

        if (!name || !answers || !category || !questions[category]) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        if (!name.trim() || name.trim().length < 2) {
            return res.status(400).json({ error: 'Name must be at least 2 characters' });
        }

        // Score the quiz
        const categoryQuestions = questions[category];
        let score = 0;
        const total = Object.keys(answers).length;
        const results = [];

        for (const [questionId, selectedAnswer] of Object.entries(answers)) {
            const question = categoryQuestions.find(q => q.id === questionId);
            if (question) {
                const isCorrect = selectedAnswer === question.correct;
                if (isCorrect) score++;
                results.push({
                    questionId,
                    question: question.question,
                    selectedAnswer,
                    correctAnswer: question.correct,
                    isCorrect,
                    explanation: question.explanation
                });
            }
        }

        const percentage = Math.round((score / total) * 100);
        const passed = percentage >= 85;

        let certificateId = null;

        if (passed) {
            certificateId = `CS-${Date.now().toString(36).toUpperCase()}-${uuidv4().split('-')[0].toUpperCase()}`;
            const date = new Date().toISOString().split('T')[0];

            const db = await getDb();
            db.run(
                `INSERT INTO certificates (name, score, total, percentage, category, date, certificate_id)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [name.trim(), score, total, percentage, category, date, certificateId]
            );
            saveDb();
        }

        res.json({
            name: name.trim(),
            score,
            total,
            percentage,
            passed,
            certificateId,
            category: getCategoryName(category),
            results
        });
    } catch (error) {
        console.error('Quiz submit error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Verify certificate
app.get('/api/certificate/:id', async (req, res) => {
    try {
        const db = await getDb();
        const result = db.exec(
            `SELECT * FROM certificates WHERE certificate_id = ?`,
            [req.params.id]
        );

        if (result.length === 0 || result[0].values.length === 0) {
            return res.status(404).json({ error: 'Certificate not found' });
        }

        const cols = result[0].columns;
        const vals = result[0].values[0];
        const cert = {};
        cols.forEach((col, i) => { cert[col] = vals[i]; });

        res.json({
            valid: true,
            certificate: {
                name: cert.name,
                score: cert.score,
                total: cert.total,
                percentage: cert.percentage,
                category: getCategoryName(cert.category),
                date: cert.date,
                certificateId: cert.certificate_id
            }
        });
    } catch (error) {
        console.error('Certificate verify error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

function getCategoryName(key) {
    const names = {
        cleanliness: 'Public Cleanliness',
        traffic: 'Traffic Behaviour',
        publicSpaces: 'Respecting Public Spaces',
        socialEtiquette: 'Social Etiquette',
        digitalCivics: 'Digital Civic Behaviour',
        moralValues: 'Everyday Moral Values'
    };
    return names[key] || key;
}

async function start() {
    await getDb();
    app.listen(PORT, () => {
        console.log(`🚀 CivicSense API running on http://localhost:${PORT}`);
    });
}

start();
