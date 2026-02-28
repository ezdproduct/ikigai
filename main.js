document.addEventListener('DOMContentLoaded', () => {
    // 1. Radar Chart Configuration
    const ctx = document.getElementById('radarChart').getContext('2d');
    const categories = [
        'Logic & Kỹ thuật',
        'Thấu cảm & Xã hội',
        'Sáng tạo & Nghệ thuật',
        'Chiến lược & Lãnh đạo',
        'Quản trị & Kinh tế',
        'Khám phá & Khoa học',
        'Phát triển bản thân'
    ];

    let scores = [0, 0, 0, 0, 0, 0, 0];
    let chart;

    function initChart() {
        const data = {
            labels: categories,
            datasets: [{
                label: 'Bản đồ Tiềm năng',
                data: scores,
                fill: true,
                backgroundColor: 'rgba(255, 142, 113, 0.2)',
                borderColor: 'rgb(255, 142, 113)',
                pointBackgroundColor: 'rgb(255, 142, 113)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(255, 142, 113)'
            }]
        };

        chart = new Chart(ctx, {
            type: 'radar',
            data: data,
            options: {
                layout: {
                    padding: {
                        top: 20,
                        bottom: 20,
                        left: 40,
                        right: 40
                    }
                },
                scales: {
                    r: {
                        angleLines: { display: true },
                        suggestedMin: 0,
                        suggestedMax: 100,
                        ticks: { display: false },
                        pointLabels: {
                            font: {
                                size: 11,
                                family: "'Be Vietnam Pro', sans-serif"
                            },
                            padding: 10
                        }
                    }
                },
                plugins: { legend: { display: false } },
                maintainAspectRatio: false
            }
        });
    }

    initChart();

    // 2. Quiz Data (Loaded from questions.js)
    const questions = questionsData;

    let currentIdx = 0;
    const chatWindow = document.getElementById('quiz-window');
    const inputArea = document.getElementById('quiz-input-area');
    const suggestionBox = document.getElementById('suggestion-box');
    const suggestionGrid = document.getElementById('suggestion-grid');
    const userInput = document.getElementById('user-answer');
    const sendBtn = document.getElementById('send-btn');
    const hintBtn = document.getElementById('show-hints-btn');
    const startScreen = document.getElementById('quiz-start-screen');

    const quizCard = document.querySelector('.glass-quiz-card');
    const exitBtn = document.getElementById('exit-quiz-btn');
    const analysisBtn = document.getElementById('analysis-btn');
    const analysisModal = document.getElementById('analysis-modal');
    const closeModal = document.getElementById('close-modal');

    // Current Analysis Chart
    const currentCtx = document.getElementById('currentRadarChart').getContext('2d');
    let currentAnalysisChart;

    function initCurrentChart() {
        currentAnalysisChart = new Chart(currentCtx, {
            type: 'radar',
            data: {
                labels: categories,
                datasets: [{
                    label: 'Tiềm năng hiện tại',
                    data: scores,
                    backgroundColor: 'rgba(118, 225, 218, 0.2)',
                    borderColor: 'rgb(118, 225, 218)',
                    pointBackgroundColor: 'rgb(118, 225, 218)'
                }]
            },
            options: {
                layout: {
                    padding: {
                        top: 10,
                        bottom: 10,
                        left: 30,
                        right: 30
                    }
                },
                scales: {
                    r: {
                        suggestedMin: 0,
                        suggestedMax: 100,
                        ticks: { display: false },
                        pointLabels: {
                            font: {
                                size: 10
                            },
                            padding: 8
                        }
                    }
                },
                plugins: { legend: { display: false } },
                maintainAspectRatio: false
            }
        });
    }

    window.initChat = function () {
        quizCard.classList.add('fullscreen');
        document.body.classList.add('no-scroll');
        startScreen.classList.add('hidden');
        inputArea.classList.remove('hidden');
        chatWindow.innerHTML = '';
        appendMessage('user', 'Tôi muốn tìm thấy đam mê của mình');
        setTimeout(() => appendMessage('system', 'Hmm tôi cảm giác bạn đang khá mơ hồ về con đường phía trước.'), 800);
        setTimeout(() => appendMessage('system', 'Nhưng không sao, chúng ta sẽ cùng nhau tìm ra con đường dành cho bản thân mình mà thoi! Bạn có thể thoải mái chia sẻ qua những gợi mở của tôi nhé!'), 2300);
        setTimeout(() => nextQuestion(), 4000);
    };

    function updateSuggestions(qIdx) {
        if (qIdx < 0 || qIdx >= questions.length) {
            suggestionGrid.innerHTML = '';
            suggestionBox.classList.add('hidden');
            return;
        }

        const q = questions[qIdx];
        suggestionGrid.innerHTML = '';
        q.hints.forEach((hint) => {
            const item = document.createElement('div');
            item.className = 'suggestion-item';
            item.innerHTML = `<i data-lucide="circle" class="hint-icon"></i> ${hint.text}`;
            item.onclick = () => selectHint(hint, item);
            suggestionGrid.appendChild(item);
        });

        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    function exitChat() {
        if (confirm('Bạn có chắc muốn thoát? Kết quả hiện tại sẽ bị hủy.')) {
            quizCard.classList.remove('fullscreen');
            document.body.classList.remove('no-scroll');
            // Reset state
            currentIdx = 0;
            scores = [0, 0, 0, 0, 0, 0, 0];
            updateChart();
            startScreen.classList.remove('hidden');
            inputArea.classList.add('hidden');
            window.location.hash = '#';
        }
    }

    let appliedWeights = []; // Keep track of weights applied at each question index
    let lastAppliedWeight = null;
    let reansweringIdx = null; // Track if we are re-answering an old question
    let selectedHints = []; // NEW: Track multiple selected hints voor each question

    function appendMessage(sender, text, qIdx = -1, note = "") {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-msg ${sender === 'user' ? 'user-msg' : 'system-msg'}`;
        if (qIdx !== -1) msgDiv.setAttribute('data-q-idx', qIdx);
        if (sender === 'user') msgDiv.setAttribute('data-is-user-ans', 'true');

        let html = "";
        if (note) {
            html += `<div class="msg-note">${note}</div>`;
        }

        html += `<p>${text}</p>`;

        // Add "Thay đổi câu trả lời" link for user answers
        if (sender === 'user' && qIdx !== -1) {
            html += `<div class="chat-edit-link" onclick="window.changeAnswer(${qIdx})">Thay đổi câu trả lời</div>`;
        }

        msgDiv.innerHTML = html;
        chatWindow.appendChild(msgDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    function nextQuestion() {
        if (currentIdx >= questions.length) {
            finishQuiz();
            return;
        }

        const q = questions[currentIdx];
        const qIdxAtCalling = currentIdx; // Capture current index
        setTimeout(() => {
            appendMessage('system', q.text, qIdxAtCalling);
            updateProgress();
            selectedHints = []; // Clear current selections
            updateSuggestions(currentIdx);
        }, 600);
    }

    let lastAnswerFeedback = "";

    function selectHint(hint, element) {
        const index = selectedHints.findIndex(h => h.text === hint.text);
        const icon = element.querySelector('.hint-icon');

        if (index > -1) {
            selectedHints.splice(index, 1);
            element.classList.remove('selected');
            if (icon) {
                icon.setAttribute('data-lucide', 'circle');
            }
        } else {
            selectedHints.push(hint);
            element.classList.add('selected');
            if (icon) {
                icon.setAttribute('data-lucide', 'check-circle-2');
            }
        }

        if (typeof lucide !== 'undefined') lucide.createIcons();

        // Update input field based on selections
        if (selectedHints.length > 0) {
            userInput.value = selectedHints.map(h => h.text).join(' - '); // Changed to ' - ' for better parsing in appendMessage
        } else {
            userInput.value = '';
        }
    }

    const defaultResponses = [
        "Tôi đang lắng nghe, hãy cứ tiếp tục chia sẻ nhé.",
        "Tôi cảm nhận được sự chân thành trong câu trả lời của bạn.",
        "Cảm ơn bạn, những điều này giúp chân dung của bạn rõ nét hơn.",
        "Một góc nhìn rất đáng để suy ngẫm."
    ];

    function getFreeTextFeedback(text) {
        const lowerText = text.toLowerCase();

        // Handle basic short/negative answers
        if (lowerText.length < 10) {
            if (lowerText.includes('không') || lowerText.includes('hong') || lowerText.includes('chưa') || lowerText.includes('không có')) {
                return "Sự mơ hồ hay trống trải đôi khi lại là một không gian tốt để chúng ta bắt đầu xây dựng lại mọi thứ từ đầu.";
            }
            if (lowerText.includes('biết') || lowerText.includes('biết nữa')) {
                return "Việc thừa nhận mình chưa biết là bước đầu tiên để chúng ta thực sự bắt đầu hành trình tìm kiếm câu trả lời.";
            }
        }

        const keywords = [
            { words: ['thích', 'yêu', 'đam mê', 'muốn', 'ước'], response: "Sự khao khát chính là ngọn lửa dẫn lối cho mọi hành trình sáng tạo. Tôi cảm nhận được một tâm hồn rất đầy nhiệt huyết." },
            { words: ['ghét', 'không thích', 'bực', 'mệt', 'chán'], response: "Việc nhận ra những gì không phù hợp cũng là một cách để chúng ta tiến gần hơn đến điều mình thực sự cần. Đừng ngại gạt bỏ những thứ không thuộc về mình." },
            { words: ['lo', 'sợ', 'ngại', 'băn khoăn', 'sao'], response: "Sự bất định đôi khi lại mở ra những cánh cửa bất ngờ. Hãy cứ kiên nhẫn và bao dung hơn với chính mình bạn nhé." },
            { words: ['tiền', 'giàu', 'kinh tế', 'tài chính', 'lương'], response: "Sự thịnh vượng là một phần của hạnh phúc, nhưng nó cần một tâm hồn tự do để thực sự rực rỡ và bền vững." },
            { words: ['người', 'nhân loại', 'xã hội', 'giúp', 'gia đình', 'bạn'], response: "Hướng về cộng đồng và những kết nối con người là một cách để chúng ta thấy cuộc sống này có ý nghĩa hơn. Bạn có một trái tim thật ấm áp." },
            { words: ['khoa học', 'logic', 'số', 'kỹ thuật', 'máy', 'code'], response: "Thế giới vận hành theo những quy luật tuyệt đẹp mà chúng ta cần sự tĩnh lặng và kiên nhẫn để thấu hiểu." },
            { words: ['vẽ', 'hát', 'nghệ thuật', 'đẹp', 'nhạc', 'thẩm mỹ', 'sáng tạo'], response: "Nghệ thuật xoa dịu tâm hồn và giúp chúng ta kết nối với những phần bản thể sâu thẳm nhất. Gu của bạn thật đặc biệt." },
            { words: ['tự do', 'đi', 'khám phá', 'phượt', 'du lịch'], response: "Mỗi bước chân đi xa là một lần ta được quay về gần hơn với bản chất thật của mình. Sự tự do là một món quà vô giá." },
            { words: ['học', 'đọc', 'sách', 'kiến thức', 'nghiên cứu'], response: "Tri thức là ánh sáng duy nhất giúp chúng ta không bị lạc lối trong sự hỗn loạn của thế giới này." },
            { words: ['bình yên', 'nhẹ nhàng', 'tĩnh', 'thiền'], response: "Trong sự tĩnh lặng, mọi câu trả lời sẽ tự khắc hiện rõ. Tâm hồn bạn đang tìm về đúng nơi nó cần thuộc về." }
        ];

        for (const item of keywords) {
            if (item.words.some(word => lowerText.includes(word))) {
                return item.response;
            }
        }
        return null;
    }

    function submitAnswer() {
        const text = userInput.value.trim();
        if (!text) return;

        const isReanswer = reansweringIdx !== null;
        const targetIdx = isReanswer ? reansweringIdx : currentIdx;

        // If re-answering, subtract old scores first
        if (isReanswer) {
            const oldWeight = appliedWeights[targetIdx];
            if (oldWeight) {
                oldWeight.forEach((w, i) => scores[i] -= w);
            }

            // Add note to the original answer
            const prevUserMsgs = document.querySelectorAll(`.chat-msg.user-msg[data-q-idx="${targetIdx}"]`);
            if (prevUserMsgs.length > 0) {
                const latestPrev = prevUserMsgs[prevUserMsgs.length - 1];
                // Check if already has a note
                if (!latestPrev.querySelector('.msg-note')) {
                    const noteDiv = document.createElement('div');
                    noteDiv.className = 'msg-note';
                    noteDiv.textContent = 'Đã trả lời lại bên dưới';
                    latestPrev.prepend(noteDiv);
                }
            }
        }

        // Calculate total weight if multiple hints are selected
        let totalWeight = [0, 0, 0, 0, 0, 0, 0];
        let feedback = "";

        if (selectedHints.length > 0) {
            selectedHints.forEach(h => {
                if (h.weight) h.weight.forEach((w, i) => totalWeight[i] += w);
                if (h.feedback) feedback += h.feedback + " ";
            });
            lastAppliedWeight = totalWeight;
            lastAnswerFeedback = feedback.trim();
        }

        // Apply weights and update chart
        if (lastAppliedWeight) {
            lastAppliedWeight.forEach((w, i) => scores[i] += w);
            updateChart();
        }

        // Send answer message
        const noteText = isReanswer ? `Trả lời lại cho câu hỏi: "${questions[targetIdx].text}"` : '';
        appendMessage('user', text, targetIdx, noteText);
        userInput.value = '';
        suggestionBox.classList.add('hidden');
        selectedHints = []; // Clear selections for next question

        // Store weight for undoing/re-answering later
        appliedWeights[targetIdx] = lastAppliedWeight;
        lastAppliedWeight = null;

        if (!isReanswer) {
            currentIdx++;
        }

        // Feedback
        const systemResponse = lastAnswerFeedback || getFreeTextFeedback(text) || defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
        lastAnswerFeedback = "";

        setTimeout(() => {
            appendMessage('system', systemResponse, targetIdx);
            if (!isReanswer) {
                setTimeout(() => nextQuestion(), 1200);
            } else {
                reansweringIdx = null; // Done re-answering
                // Restore suggestions for currentIdx
                updateSuggestions(currentIdx);
            }
        }, 800);
    }

    window.changeAnswer = function (targetQIdx) {
        reansweringIdx = targetQIdx;
        selectedHints = []; // Clear any current selections

        // Show suggestion for that target question
        updateSuggestions(targetQIdx);

        suggestionBox.classList.remove('hidden');
        userInput.focus();

        // Scroll suggestion box to view
        suggestionBox.scrollIntoView({ behavior: 'smooth', block: 'end' });
    };

    function updateProgress() {
        const percent = Math.round((currentIdx / questions.length) * 100);
        document.getElementById('quiz-progress-fill').style.width = `${percent}%`;
        document.getElementById('progress-text').textContent = `${percent}%`;
    }

    function updateChart() {
        const maxVal = Math.max(...scores, 100);
        chart.options.scales.r.suggestedMax = maxVal;
        chart.data.datasets[0].data = scores;
        chart.update();

        if (currentAnalysisChart) {
            currentAnalysisChart.options.scales.r.suggestedMax = maxVal;
            currentAnalysisChart.data.datasets[0].data = scores;
            currentAnalysisChart.update();
        }
    }

    function finishQuiz() {
        appendMessage('system', "Tôi đã nhìn thấu tâm hồn bạn. Hãy xem bản đồ kho báu nhé!");
        inputArea.classList.add('hidden');
        setTimeout(() => {
            generateFinalProfile();
            quizCard.classList.remove('fullscreen');
            document.body.classList.remove('no-scroll');
            window.location.hash = '#results';
        }, 1500);
    }

    function generateFinalProfile() {
        const maxScoreIdx = scores.indexOf(Math.max(...scores));
        const profiles = [
            { tag: 'Người Logic', title: 'Kiến trúc sư hệ thống', desc: 'Bạn có tư duy phản biện sắc bén.', career: ['Lập trình', 'Kỹ thuật'] },
            { tag: 'Người Kết nối', title: 'Sứ giả thấu cảm', desc: 'Bạn nhạy cảm với cảm xúc.', career: ['Tâm lý', 'Nhân sự'] },
            { tag: 'Người Nghệ thuật', title: 'Phù thủy sáng tạo', desc: 'Thế giới là bảng màu của bạn.', career: ['Thiết kế', 'Nghệ thuật'] },
            { tag: 'Người Chiến lược', title: 'Nhà lãnh đạo tầm nhìn', desc: 'Bạn bị thu hút bởi kế hoạch lớn.', career: ['Quản lý', 'Chiến lược'] },
            { tag: 'Người Thực tế', title: 'Chuyên gia tối ưu', desc: 'Bạn thực dụng và quyết đoán.', career: ['Tài chính', 'Kinh doanh'] },
            { tag: 'Người Khám phá', title: 'Nhà thám hiểm trí tuệ', desc: 'Bản tính tò mò dẫn lối.', career: ['Nghiên cứu', 'Khoa học'] },
            { tag: 'Người Tinh thần', title: 'Người gieo mầm hạnh phúc', desc: 'Bạn trân trọng sự cân bằng.', career: ['Coach', 'Thiền'] }
        ];

        const p = profiles[maxScoreIdx];
        document.getElementById('res-personality-tag').textContent = p.tag;
        document.getElementById('res-personality-title').textContent = p.title;
        document.getElementById('res-personality-desc').textContent = p.desc;
        const tagContainer = document.getElementById('res-career-tags');
        tagContainer.innerHTML = '';
        p.career.forEach(c => { const span = document.createElement('span'); span.textContent = c; tagContainer.appendChild(span); });
    }

    sendBtn.onclick = submitAnswer;
    userInput.onkeypress = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submitAnswer(); } };
    hintBtn.onclick = () => suggestionBox.classList.toggle('hidden');

    exitBtn.onclick = exitChat;
    analysisBtn.onclick = () => {
        if (!currentAnalysisChart) initCurrentChart();
        const maxVal = Math.max(...scores, 100);
        currentAnalysisChart.options.scales.r.suggestedMax = maxVal;
        currentAnalysisChart.data.datasets[0].data = scores;
        currentAnalysisChart.update();
        analysisModal.classList.remove('hidden');
    };
    closeModal.onclick = () => analysisModal.classList.add('hidden');

    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.height = '70px';
            document.querySelectorAll('.nav-links a').forEach(a => a.style.color = '#2D3436');
        } else {
            nav.style.background = 'transparent';
            nav.style.height = '90px';
            document.querySelectorAll('.nav-links a').forEach(a => a.style.color = '#FFFFFF');
        }
    });

    // 5. Floating Petals Animation
    function createPetals() {
        const container = document.querySelector('.quiz-bg-effects');
        if (!container) return;

        for (let i = 0; i < 20; i++) {
            const petal = document.createElement('div');
            petal.className = 'petal';

            // Randomize properties
            const size = Math.random() * 15 + 10;
            const left = Math.random() * 100;
            const delay = Math.random() * 20;
            const duration = Math.random() * 15 + 20;

            petal.style.width = `${size}px`;
            petal.style.height = `${size}px`;
            petal.style.left = `${left}%`;
            petal.style.animationDelay = `-${delay}s`; // Use negative delay so they start immediately
            petal.style.animationDuration = `${duration}s`;

            container.appendChild(petal);
        }
    }
    createPetals();

    if (typeof lucide !== 'undefined') lucide.createIcons();
});
