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
                responsive: true,
                maintainAspectRatio: false,
                layout: {
                    padding: {
                        top: 40,
                        bottom: 40,
                        left: 140,
                        right: 140
                    }
                },
                scales: {
                    r: {
                        angleLines: {
                            display: true,
                            color: 'rgba(0,0,0,0.05)'
                        },
                        grid: {
                            color: 'rgba(0,0,0,0.05)'
                        },
                        suggestedMin: 0,
                        suggestedMax: 100,
                        ticks: { display: false },
                        pointLabels: {
                            font: {
                                size: 13,
                                weight: '600',
                                family: "'Be Vietnam Pro', sans-serif"
                            },
                            color: '#2D3436',
                            padding: 15
                        }
                    }
                },
                plugins: {
                    legend: { display: false }
                }
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
                        top: 30,
                        bottom: 30,
                        left: 100,
                        right: 100
                    }
                },
                scales: {
                    r: {
                        suggestedMin: 0,
                        suggestedMax: 100,
                        ticks: { display: false },
                        pointLabels: {
                            font: {
                                size: 11,
                                weight: '600',
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

    // Message Queue for System Messages to prevent overlapping typing
    let messageQueue = [];
    let isTyping = false;

    async function processQueue() {
        if (isTyping || messageQueue.length === 0) return;
        isTyping = true;
        const { sender, text, qIdx, note, resolve } = messageQueue.shift();

        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-msg ${sender === 'user' ? 'user-msg' : 'system-msg'}`;
        if (qIdx !== -1) msgDiv.setAttribute('data-q-idx', qIdx);
        if (sender === 'user') msgDiv.setAttribute('data-is-user-ans', 'true');

        if (note) {
            const noteDiv = document.createElement('div');
            noteDiv.className = 'msg-note';
            noteDiv.textContent = note;
            msgDiv.appendChild(noteDiv);
        }

        const p = document.createElement('p');
        msgDiv.appendChild(p);

        // Nút sửa câu trả lời cho User
        if (sender === 'user' && qIdx !== -1) {
            const editLink = document.createElement('div');
            editLink.className = 'chat-edit-link';
            editLink.textContent = 'Thay đổi câu trả lời';
            editLink.onclick = () => window.changeAnswer(qIdx);
            msgDiv.appendChild(editLink);
        }

        chatWindow.appendChild(msgDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight;

        // Áp dụng hiệu ứng gõ cho cả User và System
        // User gõ nhanh hơn Bot một chút
        const speed = sender === 'user' ? 15 : 25;
        await typeWriter(p, text, speed);

        isTyping = false;
        if (resolve) resolve();
        processQueue();
    }

    function appendMessage(sender, text, qIdx = -1, note = "") {
        return new Promise(resolve => {
            messageQueue.push({ sender, text, qIdx, note, resolve });
            processQueue();
        });
    }

    async function typeWriter(element, text, speed = 30) {
        return new Promise(resolve => {
            element.classList.add('typing-cursor');
            element.style.opacity = '1';
            let i = 0;

            function type() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                } else {
                    element.classList.remove('typing-cursor');
                    resolve();
                }
            }
            type();
        });
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

        // Hide start button and show restart/view chat options
        const startBtn = document.getElementById('quiz-start-btn');
        const postOptions = document.getElementById('post-quiz-options');
        if (startBtn) startBtn.classList.add('hidden');
        if (postOptions) postOptions.classList.remove('hidden');

        setTimeout(() => {
            generateFinalProfile();
            quizCard.classList.remove('fullscreen');
            document.body.classList.remove('no-scroll');
            window.location.hash = '#results';
        }, 1500);
    }

    window.restartQuiz = function () {
        if (!confirm('Bạn có chắc chắn muốn làm lại bài giải mã từ đầu không?')) return;

        // Reset data
        scores = [0, 0, 0, 0, 0, 0, 0];
        currentIdx = 0;
        appliedWeights = {};

        // Reset UI
        chatWindow.innerHTML = '';
        inputArea.classList.remove('hidden');
        document.getElementById('quiz-progress-fill').style.width = '0%';
        document.getElementById('progress-text').textContent = '0%';

        // Hide post-quiz options
        const postOptions = document.getElementById('post-quiz-options');
        if (postOptions) postOptions.classList.add('hidden');

        // Restart chat flow
        initChat();
    };

    function generateFinalProfile() {
        const maxScoreIdx = scores.indexOf(Math.max(...scores));
        const profiles = [
            {
                tag: 'Người Logic',
                title: 'Kiến trúc sư Hệ thống',
                nature: 'Bạn sở hữu bộ óc phân tích sắc sảo, luôn tìm kiếm quy luật và cấu trúc trong mọi vấn đề. Bạn coi trọng sự chính xác và hiệu quả hơn là những cảm xúc mơ hồ.',
                strengths: ['Tư duy logic mạnh mẽ', 'Giải quyết vấn đề phức tạp', 'Khả năng tập trung cao độ'],
                weaknesses: ['Đôi khi quá cứng nhắc', 'Khó thấu cảm cảm xúc người khác', 'Dễ bị sa lầy vào chi tiết'],
                career: ['Software Engineer', 'Data Scientist', 'Bác sĩ Chẩn đoán hình ảnh', 'Dược sĩ Nghiên cứu & Phát triển', 'Kỹ sư Y sinh (Biomedical)', 'Automation Engineer', 'Security Architect', 'Forensic Data Analyst', 'Kỹ sư Vi mạch', 'Blockchain Developer']
            },
            {
                tag: 'Người Kết nối',
                title: 'Sứ giả Thấu cảm',
                nature: 'Trái tim bạn luôn hướng về con người. Bạn có khả năng cảm nhận được những gì người khác chưa nói ra và luôn mong muốn xây dựng một cộng đồng hòa hợp.',
                strengths: ['Lắng nghe sâu sắc', 'Xây dựng lòng tin tốt', 'Trí tuệ cảm xúc (EQ) cao'],
                weaknesses: ['Dễ bị ảnh hưởng bởi năng lượng tiêu cực', 'Khó từ chối người khác', 'Hay lo âu về các mối quan hệ'],
                career: ['HR Manager', 'Bác sĩ Gia đình', 'Điều dưỡng trưởng', 'Tư vấn viên Tâm lý', 'Customer Success Manager', 'Educational Consultant', 'Community Manager', 'Crisis Intervention Specialist', 'Chuyên viên Tư vấn Tâm lý học đường', 'Social Worker']
            },
            {
                tag: 'Người Nghệ thuật',
                title: 'Phù thủy Sáng tạo',
                nature: 'Bạn nhìn thế giới qua lăng kính của cái đẹp và sự đổi mới. Bạn không chấp nhận những gì rập khuôn và luôn khát khao để lại dấu ấn cá nhân trong mọi việc.',
                strengths: ['Trực giác nhạy bén', 'Khả năng thẩm mỹ tốt', 'Tư duy "out-of-the-box"'],
                weaknesses: ['Dễ mất tập trung', 'Khó làm việc trong môi trường kỷ luật thép', 'Cảm xúc hay thay đổi'],
                career: ['UI/UX Designer', 'Kiến trúc sư nội thất', 'Creative Director', 'Thiết kế thời trang', 'Chủ Gallery nghệ thuật', 'Food Stylist', 'Game Artist', 'Multimedia Designer', 'Nghệ nhân Thủ công mỹ nghệ', 'Chuyên gia Sáng tạo Nội dung Số']
            },
            {
                tag: 'Người Chiến lược',
                title: 'Nhà Lãnh đạo Tầm nhìn',
                nature: 'Bạn sinh ra để nhìn thấy bức tranh lớn. Bạn không chỉ muốn hoàn thành công việc, mà còn muốn dẫn dắt mọi người đi tới một tương lai tốt đẹp hơn.',
                strengths: ['Quyết đoán', 'Khả năng hoạch định', 'Truyền cảm hứng cho đám đông'],
                weaknesses: ['Có xu hướng áp đặt', 'Thiếu kiên nhẫn với tiểu tiết', 'Dễ bị stress do áp lực thành công'],
                career: ['Founder / CEO', 'Kinh doanh Bất động sản', 'Quản trị Bệnh viện', 'Luật sư Tranh tụng', 'Chủ chuỗi F&B', 'Venture Capitalist', 'Management Consultant', 'Corporate Strategist', 'Investment Banker', 'Operations Director']
            },
            {
                tag: 'Người Thực tế',
                title: 'Chuyên gia Tối ưu',
                nature: 'Bạn là người thực tế nhất trong đám đông. Bạn không tin vào những lời hứa suông mà chỉ tin vào những giá trị thực, con số thực và kết quả có thể đo lường.',
                strengths: ['Tính kỷ luật cao', 'Quản lý tài chính tốt', 'Sự kiên định'],
                weaknesses: ['Thiếu sự linh hoạt', 'Ngần ngại với những ý tưởng đột phá', 'Có phần khô khan'],
                career: ['Dược sĩ Lâm sàng', 'Financial Analyst', 'Kinh doanh Thiết bị Y tế', 'Logistics Coordinator', 'Kỹ thuật viên Xét nghiệm', 'Operations Manager', 'Supply Chain Planner', 'Quality Assurance Manager', 'Kiểm toán viên nội bộ', 'Quản lý Kho Dược phẩm']
            },
            {
                tag: 'Người Khám phá',
                title: 'Nhà Thám hiểm Trí tuệ',
                nature: 'Thế giới trong mắt bạn là một kho tàng tri thức vô tận. Bạn luôn đặt câu hỏi "Tại sao?" và không bao giờ thỏa mãn với những câu trả lời bề nổi.',
                strengths: ['Tò mò vô hạn', 'Khả năng tự học xuất sắc', 'Khách quan trong đánh giá'],
                weaknesses: ['Dễ bị cô độc', 'Hay phê phán quá mức', 'Khó hòa nhập vào các quy định xã hội'],
                career: ['Bác sĩ Nghiên cứu (R&D)', 'Dược sĩ Phát triển thuốc', 'AI Ethics Researcher', 'Market Analyst', 'Nhà Khảo cổ học', 'Bioinformatician', 'Consumer Behavior Researcher', 'Data Journalist', 'Product Auditor', 'Geopolitical Analyst']
            },
            {
                tag: 'Người Tinh thần',
                title: 'Người Gieo mầm An lạc',
                nature: 'Bạn tìm thấy ý nghĩa trong sự tĩnh lặng và cân bằng. Mục tiêu cuối cùng của bạn là sự phát triển nội tâm và giúp đỡ mọi người tìm thấy sự bình yên.',
                strengths: ['Kiên nhẫn', 'Ổn định về tâm lý', 'Biết cách thưởng thức cuộc sống'],
                weaknesses: ['Thiếu tính cạnh tranh', 'Dễ bị coi là thụ động', 'Khó thích nghi với môi trường áp lực cao'],
                career: ['Bác sĩ Tâm lý', 'Executive Coach', 'Dược sĩ Tư vấn Cộng đồng', 'Employee Wellness Lead', 'NGO Project Manager', 'Public Health Consultant', 'Life Coach', 'Chuyên gia Trị liệu Tâm lý', 'Sustainability Officer', 'Mindfulness Trainer']
            }
        ];

        const p = profiles[maxScoreIdx];

        // Show title
        const titleEl = document.getElementById('res-personality-title');
        if (titleEl) {
            titleEl.textContent = p.title;
            titleEl.classList.remove('hidden');
        }

        document.getElementById('res-personality-nature').textContent = p.nature;

        // Update Strengths
        const strengthList = document.getElementById('res-personality-strengths');
        strengthList.innerHTML = '';
        p.strengths.forEach(s => {
            const li = document.createElement('li');
            li.textContent = s;
            strengthList.appendChild(li);
        });

        // Update Weaknesses
        const weaknessList = document.getElementById('res-personality-weaknesses');
        weaknessList.innerHTML = '';
        p.weaknesses.forEach(w => {
            const li = document.createElement('li');
            li.textContent = w;
            weaknessList.appendChild(li);
        });

        // Update Career Tags
        const tagContainer = document.getElementById('res-career-tags');
        tagContainer.innerHTML = '';
        p.career.forEach(c => {
            const span = document.createElement('span');
            span.textContent = c;
            tagContainer.appendChild(span);
        });

        // Update result action button
        const resActionBtn = document.getElementById('res-action-btn');
        if (resActionBtn) {
            resActionBtn.textContent = 'Làm lại';
            resActionBtn.onclick = restartQuiz;
        }

        // Feedback Logic
        const feedbackContainer = document.getElementById('res-feedback-container');
        const feedbackOptions = feedbackContainer.querySelector('.feedback-options');
        const feedbackResponse = document.getElementById('feedback-response');
        const yesBtn = document.getElementById('feedback-yes');
        const noBtn = document.getElementById('feedback-no');

        feedbackContainer.classList.remove('hidden');
        feedbackOptions.classList.remove('hidden');
        feedbackResponse.classList.add('hidden');

        yesBtn.onclick = () => {
            feedbackOptions.classList.add('hidden');
            feedbackResponse.textContent = 'Vậy thì cùng bắt tay vào hành động thôi nào!';
            feedbackResponse.classList.remove('hidden');
            feedbackResponse.style.color = 'var(--primary)';
        };

        noBtn.onclick = () => {
            feedbackOptions.classList.add('hidden');
            feedbackResponse.textContent = 'Bạn thấy có điểm nào chưa phù hợp, hãy nói với tôi nhé!';
            feedbackResponse.classList.remove('hidden');
            feedbackResponse.style.color = 'var(--text-muted)';
        };
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

    // 6. Typing Effect for Dream Sequence
    async function startTypingSequence() {
        const text1 = document.getElementById('type-text-1');
        const text2 = document.getElementById('type-text-2');
        const text3 = document.getElementById('type-text-3');

        if (!text1 || !text2 || !text3) return;

        // Lưu văn bản gốc và xóa nội dung hiện tại
        const content1 = text1.textContent.trim().replace(/\s+/g, ' ');
        const content2 = text2.textContent.trim().replace(/\s+/g, ' ');
        const content3 = text3.textContent.trim().replace(/\s+/g, ' ');

        text1.textContent = '';
        text2.textContent = '';
        text3.textContent = '';

        // Sử dụng hàm typeWriter toàn cục đã định nghĩa ở trên

        // Chạy tuần tự với tốc độ chậm hơn và mượt mà hơn
        await typeWriter(text1, content1, 60); // Chậm lại
        await new Promise(r => setTimeout(r, 800));
        await typeWriter(text2, content2, 60); // Chậm lại
        await new Promise(r => setTimeout(r, 1000));
        await typeWriter(text3, content3, 80); // Chậm hơn nữa cho tiêu đề chính 

        // Hiện nút Bắt đầu sau khi gõ xong
        const startBtn = document.getElementById('quiz-start-btn');
        if (startBtn) {
            startBtn.classList.remove('hidden');
            startBtn.style.animation = 'slideUpFade 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) forwards';
        }
    }

    // Kích hoạt hiệu ứng gõ chữ
    startTypingSequence();

    if (typeof lucide !== 'undefined') lucide.createIcons();
});
