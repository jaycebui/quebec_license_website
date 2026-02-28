function checkScore() {
    // Correct answers for Chapter 3
    const answers = {
        q1: "b", q2: "c", q3: "a", q4: "b", q5: "b",
        q6: "a", q7: "c", q8: "b", q9: "a", q10: "b",
        q11: "b", q12: "a", q13: "b", q14: "c", q15: "a",
        q16: "b", q17: "b", q18: "b", q19: "a", q20: "c",
        q21: "b", q22: "b", q23: "a", q24: "b", q25: "b"
    };

    const total = 25;
    const passingScore = 19; 
    const form = document.getElementById('quizForm');
    const resultDiv = document.getElementById('result');
    
    let score = 0;
    let missedQuestions = [];
    let wrongQuestions = [];

    // Reset styles
    const allQuestions = form.querySelectorAll('.question');
    allQuestions.forEach(block => {
        block.style.borderLeft = "none";
        block.style.backgroundColor = "transparent";
    });

    const allLabels = form.querySelectorAll('label');
    allLabels.forEach(label => {
        label.style.backgroundColor = "";
        label.style.color = "";
        label.style.borderColor = "";
        label.style.fontWeight = "normal";
    });

    // Validation
    for (let i = 1; i <= total; i++) {
        const qName = `q${i}`;
        const selected = form.querySelector(`input[name="${qName}"]:checked`);
        if (!selected) {
            missedQuestions.push(i);
            const block = form.querySelector(`input[name="${qName}"]`).closest('.question');
            block.style.borderLeft = "5px solid #e31837";
            block.style.backgroundColor = "#fff5f5";
        }
    }

    if (missedQuestions.length > 0) {
        resultDiv.style.display = 'block';
        resultDiv.className = 'wrong-ans';
        resultDiv.innerHTML = `<h3>Incomplete</h3><p>Please answer: ${missedQuestions.join(', ')}</p>`;
        resultDiv.scrollIntoView({ behavior: 'smooth' });
        return; 
    }

    // Scoring
    for (let i = 1; i <= total; i++) {
        const qName = `q${i}`;
        const selected = form.querySelector(`input[name="${qName}"]:checked`);
        const correctValue = answers[qName];
        const options = form.querySelectorAll(`input[name="${qName}"]`);
        
        if (selected.value === correctValue) {
            score++;
        } else {
            wrongQuestions.push(i);
        }

        options.forEach(opt => {
            const label = opt.parentElement;
            if (opt.value === correctValue) {
                label.style.backgroundColor = "#d4edda";
                label.style.color = "#155724";
                label.style.fontWeight = "bold";
            }
            if (selected.value !== correctValue && opt === selected) {
                label.style.backgroundColor = "#f8d7da";
                label.style.color = "#721c24";
            }
        });
    }

    const percentage = Math.round((score / total) * 100);
    resultDiv.style.display = 'block';
    let feedback = wrongQuestions.length > 0 ? `<p>Review: ${wrongQuestions.join(', ')}</p>` : `<p>Perfect!</p>`;

    if (score >= passingScore) {
        resultDiv.className = 'correct-ans';
        resultDiv.innerHTML = `<h3>Pass! ${score}/${total} (${percentage}%)</h3>${feedback}`;
    } else {
        resultDiv.className = 'wrong-ans';
        resultDiv.innerHTML = `<h3>Fail. ${score}/${total} (${percentage}%)</h3>${feedback}`;
    }
    resultDiv.scrollIntoView({ behavior: 'smooth' });
}