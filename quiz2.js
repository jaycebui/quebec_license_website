function checkScore() {
    // Correct answers for Chapter 2
    const answers = {
        q1: "b", q2: "c", q3: "a", q4: "b", q5: "b",
        q6: "a", q7: "c", q8: "b", q9: "a", q10: "b",
        q11: "b", q12: "b", q13: "a", q14: "a", q15: "b",
        q16: "c", q17: "b", q18: "b", q19: "b", q20: "b",
        q21: "b", q22: "a", q23: "b", q24: "a", q25: "a"
    };

    const total = 25;
    const passingScore = 19; // 75%
    const form = document.getElementById('quizForm');
    const resultDiv = document.getElementById('result');
    
    let score = 0;
    let missedQuestions = [];
    let wrongQuestions = [];

    // 1. RESET STYLES
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

    // 2. VALIDATION
    for (let i = 1; i <= total; i++) {
        const qName = `q${i}`;
        const selected = form.querySelector(`input[name="${qName}"]:checked`);
        const questionBlock = form.querySelector(`input[name="${qName}"]`).closest('.question');
        
        if (!selected) {
            missedQuestions.push(i);
            questionBlock.style.borderLeft = "5px solid #e31837";
            questionBlock.style.backgroundColor = "#fff5f5";
        }
    }

    if (missedQuestions.length > 0) {
        resultDiv.style.display = 'block';
        resultDiv.className = 'wrong-ans';
        resultDiv.innerHTML = `<h3>Incomplete Test</h3>
                               <p>You haven't finished! Please answer: <strong>${missedQuestions.join(', ')}</strong>.</p>`;
        resultDiv.scrollIntoView({ behavior: 'smooth' });
        return; 
    }

    // 3. SCORING & FEEDBACK
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
            const parentLabel = opt.parentElement;
            if (opt.value === correctValue) {
                parentLabel.style.backgroundColor = "#d4edda";
                parentLabel.style.color = "#155724";
                parentLabel.style.borderColor = "#c3e6cb";
                parentLabel.style.fontWeight = "bold";
            }
            if (selected.value !== correctValue && opt === selected) {
                parentLabel.style.backgroundColor = "#f8d7da";
                parentLabel.style.color = "#721c24";
                parentLabel.style.borderColor = "#f5c6cb";
            }
        });
    }

    // 4. FINAL RESULTS
    const percentage = Math.round((score / total) * 100);
    resultDiv.style.display = 'block';
    
    let wrongMsg = wrongQuestions.length > 0 
        ? `<p style="margin-top:10px;">Questions to review: <strong>${wrongQuestions.join(', ')}</strong></p>` 
        : `<p>Perfect score! No mistakes.</p>`;

    if (score >= passingScore) {
        resultDiv.className = 'correct-ans';
        resultDiv.innerHTML = `<h3>Pass! Score: ${score}/${total} (${percentage}%)</h3>${wrongMsg}`;
    } else {
        resultDiv.className = 'wrong-ans';
        resultDiv.innerHTML = `<h3>Fail. Score: ${score}/${total} (${percentage}%)</h3>
                               <p>You need 19/25 to pass.</p>${wrongMsg}`;
    }

    resultDiv.scrollIntoView({ behavior: 'smooth' });
}