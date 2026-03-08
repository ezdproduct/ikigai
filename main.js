document.addEventListener('DOMContentLoaded', () => {
    // 1. Radar Chart Configuration
    const ctx = document.getElementById('radarChart').getContext('2d');
    const categories = [
        ['Logic &', 'Kỹ thuật'],
        ['Thấu cảm &', 'Xã hội'],
        ['Sáng tạo &', 'Nghệ thuật'],
        ['Chiến lược &', 'Lãnh đạo'],
        ['Quản trị &', 'Kinh tế'],
        ['Khám phá &', 'Khoa học'],
        ['Phát triển', 'bản thân']
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

        const isMobile = window.innerWidth <= 768;
        chart = new Chart(ctx, {
            type: 'radar',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                layout: {
                    padding: {
                        top: 20,
                        bottom: isMobile ? 30 : 80,
                        left: isMobile ? 25 : 50,
                        right: isMobile ? 25 : 50
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
                                size: isMobile ? 9 : 10,
                                weight: '600',
                                family: "'Be Vietnam Pro', sans-serif"
                            },
                            color: '#2D3436',
                            padding: isMobile ? 12 : 30
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
    // --- CHẾ ĐỘ TEST ---
    const isTestMode = true; // Đổi thành false để khôi phục đầy đủ 100 câu
    let questions = questionsData;
    if (isTestMode) {
        questions = [
            ...questionsData.slice(0, 2),   // Ch 1: Sở thích
            ...questionsData.slice(30, 32), // Ch 2: Trăn trở
            ...questionsData.slice(55, 57), // Ch 3: Khát vọng
            ...questionsData.slice(75, 77)  // Ch 4: Lựa chọn
        ];
    }
    // -------------------

    let currentIdx = 0;
    let isChatStarted = false;
    let isQuizCompleted = false;
    const chatWindow = document.getElementById('quiz-window');
    const inputArea = document.getElementById('quiz-input-area');
    const suggestionBox = document.getElementById('suggestion-box');
    const suggestionGrid = document.getElementById('suggestion-grid');
    const userInput = document.getElementById('user-answer');
    const sendBtn = document.getElementById('send-btn');
    const hintBtn = document.getElementById('show-hints-btn');
    const showAnalysisBtn = document.getElementById('show-analysis-btn');
    const chapterTabs = document.getElementById('chapter-tabs');
    const chapterMobileToggle = document.getElementById('chapter-mobile-toggle');
    const startScreen = document.getElementById('quiz-start-screen');
    const quizSection = document.getElementById('test');

    const quizCard = document.querySelector('.glass-quiz-card');
    const exitBtn = document.getElementById('exit-quiz-btn');
    const analysisModal = document.getElementById('analysis-modal');
    const closeModal = document.getElementById('close-modal');

    // Current Analysis Chart
    const currentCtx = document.getElementById('currentRadarChart').getContext('2d');
    let currentAnalysisChart;

    const sideCtx = document.getElementById('sideRadarChart').getContext('2d');
    let sideAnalysisChart;

    // Mini Radar Chart (thumbnail trong nút xem phân tích trên mobile)
    const miniRadarCanvas = document.getElementById('mini-radar-chart');
    let miniRadarChart;

    function initMiniRadarChart() {
        if (!miniRadarCanvas) return;
        miniRadarChart = new Chart(miniRadarCanvas.getContext('2d'), {
            type: 'radar',
            data: {
                labels: categories,
                datasets: [{
                    data: scores,
                    backgroundColor: 'rgba(255, 142, 113, 0.35)',
                    borderColor: 'rgb(255, 142, 113)',
                    borderWidth: 1.5,
                    pointRadius: 0,
                }]
            },
            options: {
                responsive: false,
                animation: { duration: 400 },
                scales: {
                    r: {
                        suggestedMin: 0,
                        suggestedMax: 100,
                        ticks: { display: false },
                        pointLabels: { display: false },
                        grid: { color: 'rgba(0,0,0,0.08)' },
                        angleLines: { color: 'rgba(0,0,0,0.08)' },
                    }
                },
                plugins: { legend: { display: false } },
            }
        });
    }

    initMiniRadarChart();


    function initSideChart() {
        sideAnalysisChart = new Chart(sideCtx, {
            type: 'radar',
            data: {
                labels: categories,
                datasets: [{
                    label: 'Tiềm năng',
                    data: scores,
                    backgroundColor: 'rgba(255, 142, 113, 0.2)',
                    borderColor: 'rgb(255, 142, 113)',
                    pointBackgroundColor: 'rgb(255, 142, 113)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        suggestedMin: 0,
                        suggestedMax: 100,
                        ticks: { display: false },
                        pointLabels: {
                            font: { size: 9, weight: '600' },
                            padding: 25
                        }
                    }
                },
                layout: {
                    padding: {
                        top: 10,
                        bottom: 40,
                        left: 10,
                        right: 10
                    }
                },
                plugins: { legend: { display: false } }
            }
        });
    }

    function updateActionButtons() {
        const resActionBtn = document.getElementById('res-action-btn');
        const startBtn = document.getElementById('quiz-start-btn');

        let label = "Bắt đầu giải mã";
        if (isQuizCompleted) {
            label = "Xem đoạn chat";
        } else if (isChatStarted) {
            label = "Tiếp tục giải mã";
        }

        if (resActionBtn) resActionBtn.textContent = label;
        // Also update quiz window start button label for consistency if desired
        if (startBtn) {
            if (isQuizCompleted) startBtn.textContent = "Xem đoạn chat";
            else if (isChatStarted) startBtn.textContent = "Tiếp tục";
            else startBtn.textContent = "Bắt đầu";
        }
    }
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
                        top: 40,
                        bottom: 40,
                        left: 60,
                        right: 60
                    }
                },
                scales: {
                    r: {
                        suggestedMin: 0,
                        suggestedMax: 100,
                        ticks: { display: false },
                        pointLabels: {
                            font: {
                                size: 10,
                                weight: '600',
                                family: "'Be Vietnam Pro', sans-serif"
                            },
                            padding: 12
                        }
                    }
                },
                plugins: { legend: { display: false } },
                maintainAspectRatio: false
            }
        });
    }

    window.initChat = function () {
        if (quizSection) quizSection.classList.remove('hidden');
        quizCard.classList.add('fullscreen');
        document.body.classList.add('no-scroll');
        const gardenEffects = document.querySelector('.garden-effects-container');
        if (gardenEffects) {
            quizCard.appendChild(gardenEffects);
            gardenEffects.classList.add('in-modal');
        }
        if (startScreen) startScreen.classList.add('hidden');

        const quizBody = document.querySelector('.quiz-body-wrapper');
        if (quizBody) quizBody.classList.remove('hidden');

        inputArea.classList.remove('hidden');

        if (!isChatStarted) {
            isChatStarted = true;
            updateActionButtons();
            updateProgress();
            if (chapterTabs) chapterTabs.classList.remove('hidden');
            chatWindow.innerHTML = '';
            appendMessage('user', 'Tôi muốn tìm thấy đam mê của mình');
            const dFactor = isTestMode ? 0.1 : 1;
            setTimeout(() => appendMessage('system', 'Hmm tôi cảm giác bạn đang khá mơ hồ về con đường phía trước.'), 500 * dFactor);
            setTimeout(() => appendMessage('system', 'Nhưng không sao, chúng ta rồi sẽ tìm ra con đường dành cho bản thân mình mà thoi! Bạn có thể thoải mái chia sẻ qua những gợi mở của tôi nhé!'), 1500 * dFactor);
            setTimeout(() => nextQuestion(), 2500 * dFactor);
        } else {
            // Continuation logic: ensure scroll to bottom
            chatWindow.scrollTop = chatWindow.scrollHeight;
        }
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
            item.innerHTML = `<i data-lucide="check" class="hint-icon"></i> ${hint.text}`;
            item.onclick = () => selectHint(hint, item);
            suggestionGrid.appendChild(item);
        });

        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    function syncHintBtn() {
        if (!hintBtn) return;
        const isHidden = suggestionBox.classList.contains('hidden');
        if (isHidden) {
            hintBtn.innerHTML = `<i data-lucide="help-circle"></i> Xem gợi ý`;
            hintBtn.title = "Xem gợi ý";
        } else {
            hintBtn.innerHTML = `<i data-lucide="eye-off"></i> Ẩn gợi ý`;
            hintBtn.title = "Ẩn gợi ý";
        }
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    const confirmModal = document.getElementById('confirm-modal');
    const confirmTitle = document.getElementById('confirm-title');
    const confirmMessage = document.getElementById('confirm-message');
    const confirmOkBtn = document.getElementById('confirm-ok-btn');
    const confirmCancelBtn = document.getElementById('confirm-cancel-btn');

    function showConfirm(title, message, callback) {
        confirmTitle.textContent = title;
        confirmMessage.innerHTML = message;
        confirmModal.classList.remove('hidden');

        confirmOkBtn.onclick = () => {
            confirmModal.classList.add('hidden');
            callback();
        };

        confirmCancelBtn.onclick = () => {
            confirmModal.classList.add('hidden');
        };
    }

    function exitChat() {
        showConfirm(
            'Tạm dừng hội thoại',
            'Bạn có chắc muốn tạm dừng không?<br>Đoạn chat sẽ được lưu và chúng ta vẫn có thể tiếp tục đoạn chat khi bạn sẵn sàng!',
            () => {
                // Chúng ta không reset currentIdx hay scores ở đây để user có thể quay lại
                hideChatAndShowStart();
                window.location.hash = '#';
            }
        );
    }

    function hideChatAndShowStart() {
        if (quizSection) quizSection.classList.add('hidden');
        quizCard.classList.remove('fullscreen');
        document.body.classList.remove('no-scroll');
        const gardenEffects = document.querySelector('.garden-effects-container');
        if (gardenEffects) {
            document.body.appendChild(gardenEffects);
            gardenEffects.classList.remove('in-modal');
        }

        const quizBody = document.querySelector('.quiz-body-wrapper');
        if (quizBody) quizBody.classList.add('hidden');

        inputArea.classList.add('hidden');
        if (startScreen) startScreen.classList.remove('hidden');

        updateActionButtons();
    }

    let appliedWeights = []; // Keep track of weights applied at each question index
    let lastAppliedWeight = null;
    let reansweringIdx = null; // Track if we are re-answering an old question
    let selectedHints = []; // NEW: Track multiple selected hints voor each question
    let offTopicCounter = {}; // Track off-topic/short answers per question index

    // Message Queue for System Messages to prevent overlapping typing
    let messageQueue = [];
    let isTyping = false;

    if (isTestMode) {
        console.log('--- CHẾ ĐỘ TEST ĐÃ BẬT: 2 CÂU/CHƯƠNG, GÕ NHANH ---');
    }

    async function processQueue() {
        if (isTyping || messageQueue.length === 0) return;
        isTyping = true;
        const { sender, text, qIdx, note, resolve } = messageQueue.shift();

        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-msg ${sender === 'user' ? 'user-msg' : 'system-msg'}`;
        if (qIdx !== -1) msgDiv.setAttribute('data-q-idx', qIdx);
        if (sender === 'user') msgDiv.setAttribute('data-is-user-ans', 'true');

        let msgContentWrapper = msgDiv;
        if (sender === 'system') {
            const avatar = document.createElement('img');
            avatar.src = 'system_avatar.jpg';
            avatar.className = 'system-avatar';
            avatar.alt = 'System Avatar';
            msgDiv.appendChild(avatar);

            const msgContent = document.createElement('div');
            msgContent.className = 'system-msg-content';
            msgDiv.appendChild(msgContent);
            msgContentWrapper = msgContent;
        }

        if (note) {
            const noteDiv = document.createElement('div');
            noteDiv.className = 'msg-note';
            noteDiv.textContent = note;
            msgContentWrapper.appendChild(noteDiv);
        }

        const p = document.createElement('p');
        msgContentWrapper.appendChild(p);

        // Nút sửa câu trả lời cho User
        if (sender === 'user' && qIdx !== -1) {
            const editLink = document.createElement('div');
            editLink.className = 'chat-edit-link';
            editLink.textContent = 'Thay đổi câu trả lời';
            editLink.onclick = () => window.changeAnswer(qIdx);
            msgContentWrapper.appendChild(editLink);
        }

        chatWindow.appendChild(msgDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight;

        // Áp dụng hiệu ứng gõ cho cả User và System
        // User gõ nhanh hơn Bot một chút
        let speed = sender === 'user' ? 15 : 25;
        if (isTestMode) speed = 0; // Gõ tức thì khi test

        // Use innerHTML for messages with HTML tags, otherwise use textContent
        if (text.includes('<')) {
            await typeWriterHTML(p, text, speed);
        } else {
            await typeWriter(p, text, speed);
        }

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
                    chatWindow.scrollTop = chatWindow.scrollHeight;
                    setTimeout(type, speed);
                } else {
                    element.classList.remove('typing-cursor');
                    chatWindow.scrollTop = chatWindow.scrollHeight;
                    resolve();
                }
            }
            type();
        });
    }

    async function typeWriterHTML(element, html, speed = 30) {
        return new Promise(resolve => {
            element.classList.add('typing-cursor');
            element.style.opacity = '1';

            // For HTML, we'll just inject it and simulate typing delay for UX
            // because typing character by character into innerHTML is complex
            let i = 0;
            const textContent = html.replace(/<[^>]*>/g, '');

            function fakeType() {
                if (i < textContent.length) {
                    i += 2; // Type faster
                    chatWindow.scrollTop = chatWindow.scrollHeight;
                    setTimeout(fakeType, speed);
                } else {
                    element.innerHTML = html;
                    element.classList.remove('typing-cursor');
                    chatWindow.scrollTop = chatWindow.scrollHeight;

                    // Re-bind Lucide icons if any
                    if (typeof lucide !== 'undefined') lucide.createIcons();

                    // Add click event for the custom links
                    const resultLink = element.querySelector('.result-link-chat');
                    if (resultLink) {
                        resultLink.onclick = (e) => {
                            e.preventDefault();
                            hideChatAndShowStart();
                            window.location.hash = '#results';
                        };
                    }

                    // View analysis for chapter
                    const viewChapterAnalysisBtn = element.querySelector('.view-chapter-analysis-btn');
                    if (viewChapterAnalysisBtn) {
                        viewChapterAnalysisBtn.onclick = (e) => {
                            e.preventDefault();
                            // The onclick is already in the HTML as showChapterAnalysis(chapterNum)
                            // But since we inject HTML, sometimes inline handlers need a nudge or we do it here
                            const chMatch = html.match(/showChapterAnalysis\((\d+)\)/);
                            if (chMatch) showChapterAnalysis(parseInt(chMatch[1]));
                        };
                    }

                    // Continue to next chapter
                    const nextChapterBtn = element.querySelector('.next-chapter-btn');
                    if (nextChapterBtn) {
                        nextChapterBtn.onclick = (e) => {
                            e.preventDefault();
                            inputArea.classList.remove('hidden');
                            nextQuestion();
                            // Remove buttons after clicking
                            const btnContainer = nextChapterBtn.closest('.chapter-completion-btns');
                            if (btnContainer) btnContainer.style.display = 'none';
                        };
                    }

                    resolve();
                }
            }
            fakeType();
        });
    }

    function nextQuestion() {
        if (currentIdx >= questions.length) {
            finishQuiz();
            return;
        }

        const q = questions[currentIdx];
        const qIdxAtCalling = currentIdx;

        const dFactor = isTestMode ? 0.1 : 1;
        setTimeout(async () => {
            updateProgress(true);

            // Show suggestions IMMEDIATELY as typing starts
            selectedHints = [];
            updateSuggestions(currentIdx);
            syncHintBtn();

            await appendMessage('system', q.text, qIdxAtCalling);

            // Check for split trigger AFTER the message has finished typing
            if (q.text.includes("Hãy tưởng tượng bạn bước vào một hiệu sách")) {
                activateSplitView();
            }
        }, 600);
    }

    function activateSplitView() {
        const sidePanel = document.getElementById('analysis-side-panel');
        if (sidePanel && sidePanel.classList.contains('hidden')) {
            sidePanel.classList.remove('hidden');
            setTimeout(() => {
                sidePanel.classList.add('active');
                quizCard.classList.add('is-split');
                if (!sideAnalysisChart) initSideChart();
                if (typeof lucide !== 'undefined') lucide.createIcons();
            }, 100);
        }
    }

    let lastAnswerFeedback = "";

    function selectHint(hint, element) {
        const index = selectedHints.findIndex(h => h.text === hint.text);
        const icon = element.querySelector('.hint-icon');

        if (index > -1) {
            selectedHints.splice(index, 1);
            element.classList.remove('selected');
            if (icon) {
                icon.setAttribute('data-lucide', 'check');
            }
        } else {
            selectedHints.push(hint);
            element.classList.add('selected');
            if (icon) {
                icon.setAttribute('data-lucide', 'check');
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
        "Có vẻ như bạn là người luôn quan sát cuộc sống một cách khá tỉ mỉ và có chiều sâu.",
        "Tôi nhận thấy một phần tính cách khá thú vị ẩn sau cách bạn lựa chọn đấy.",
        "Những chia sẻ này bắt đầu cho thấy một lăng kính thực sự khác biệt ở bạn.",
        "Tôi đang dần hình dung rõ hơn về 'bản đồ' bên trong con người bạn rồi, hãy cứ tiếp tục nhé.",
        "Lựa chọn này nói lên khá nhiều điều về cách bạn vận hành thế giới nội tâm của mình.",
        "Thú vị đấy, đây là một góc nhìn mà không phải ai cũng dễ dàng nhận ra."
    ];

    function validateAnswer(text, qIdx) {
        const lowerText = text.toLowerCase();
        const q = questions[qIdx];

        // Nếu người dùng chọn từ gợi ý, luôn tính là hợp lệ
        if (selectedHints.length > 0) return { valid: true };

        // Khởi tạo counter cho câu hỏi này nếu chưa có
        if (!offTopicCounter[qIdx]) offTopicCounter[qIdx] = 0;

        // 1. Kiểm tra độ dài (Dữ liệu chưa đủ)
        const words = lowerText.split(/\s+/).filter(w => w.length > 0);

        // 2. Kiểm tra lạc đề (Relevance Check)
        const qWords = q.text.toLowerCase().replace(/[?,.!“"”]/g, '').split(/\s+/).filter(w => w.length > 3);
        const hintWords = q.hints.flatMap(h => h.text.toLowerCase().replace(/[.,!“"”]/g, '').split(/\s+/)).filter(w => w.length > 3);
        const allKeywords = [...new Set([...qWords, ...hintWords])];
        const stopWords = ['không', 'có', 'là', 'và', 'của', 'cho', 'với', 'trong', 'như', 'một', 'những', 'để', 'thấy', 'cuốn', 'nên', 'này', 'đó', 'bạn', 'mình', 'được', 'ngay', 'phải'];
        const meaningfulWords = words.filter(w => !stopWords.includes(w) && w.length > 1);
        const hasOverlap = meaningfulWords.some(w =>
            allKeywords.some(kw => kw.includes(w) || w.includes(kw))
        );

        const isTooShort = words.length < 3;
        const isOffTopic = !hasOverlap && words.length < 8;

        if (isTooShort || isOffTopic) {
            offTopicCounter[qIdx]++;

            // Nếu mới lạc đề/ngắn 1-2 lần, cho phép "trò chuyện" thay vì chặn đứng
            if (offTopicCounter[qIdx] <= 2) {
                const politeResponses = [
                    "Tôi hiểu ý bạn, một góc nhìn khá ngẫu hứng! Nhưng để 'giãi mã' sâu hơn, bạn kể tôi nghe thêm về [target] được không?",
                    "Thú vị đấy, dường như tâm trí bạn đang phiêu du một chút. Quay lại một chút nhé, bạn thấy sao về [target]?",
                    "Mọi chia sẻ đều có giá trị riêng, nhưng tôi rất muốn biết cụ thể hơn cảm giác của bạn về [target] vào lúc này."
                ];
                let msg = politeResponses[Math.floor(Math.random() * politeResponses.length)];

                // Trích xuất từ khóa chính từ câu hỏi để gợi ý quay lại (lọc bỏ stop-words)
                const subjects = allKeywords.filter(w => !stopWords.includes(w)).slice(0, 2);
                const targetSubject = subjects.length > 0 ? subjects.join(' ') : "chủ đề này";
                msg = msg.replace("[target]", targetSubject);

                return {
                    valid: true,
                    isConversationOnly: true, // Tag để không nhảy sang câu hỏi tiếp theo
                    message: msg
                };
            } else {
                // Sau 2 lần thì yêu cầu nghiêm túc quay lại
                return {
                    valid: false,
                    message: isTooShort
                        ? "Chúng ta cần đi sâu hơn một chút để thấy được bức tranh toàn cảnh. Bạn hãy chia sẻ chi tiết hơn câu trả lời nhé!"
                        : "Tôi rất thích trò chuyện cùng bạn, nhưng hãy giúp tôi tập trung vào câu hỏi này để kết quả phân tích chính xác nhất bạn nhé!"
                };
            }
        }

        return { valid: true };
    }

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
            { words: ['thích', 'yêu', 'đam mê', 'muốn', 'ước'], response: "Có vẻ bạn là người sống rất nhiệt huyết. Khi bạn đã xác định được mục tiêu, ngọn lửa bên trong bạn sẽ tỏa sáng rất mạnh mẽ." },
            { words: ['ghét', 'không thích', 'bực', 'mệt', 'chán'], response: "Phản ứng này cho thấy bạn là người có tiêu chuẩn khá rõ ràng. Việc biết mình ghét gì đôi khi quan trọng hơn cả việc biết mình thích gì." },
            { words: ['lo', 'sợ', 'ngại', 'băn khoăn', 'sao'], response: "Sự bất định này cho thấy bạn là một tâm hồn nhạy cảm. Đừng lo, những người sâu sắc thường hay có những trăn trở như vậy." },
            { words: ['tiền', 'giàu', 'kinh tế', 'tài chính', 'lương'], response: "Bạn có vẻ là người khá thực tế và có đầu óc quản trị. Trong thế giới đầy mơ mộng này, sự tỉnh táo của bạn là một lợi thế lớn." },
            { words: ['người', 'nhân loại', 'xã hội', 'giúp', 'gia đình', 'bạn'], response: "Có vẻ bạn là người có xu hướng hướng ngoại và vị tha. Kết nối con người chính là nguồn năng lượng của bạn." },
            { words: ['khoa học', 'logic', 'số', 'kỹ thuật', 'máy', 'code'], response: "Có vẻ bạn tôn sùng sự mạch lạc và trật tự. Đây là một lĩnh vực khá kén người và cần một trí tuệ sắc bén đấy." },
            { words: ['vẽ', 'hát', 'nghệ thuật', 'đẹp', 'nhạc', 'thẩm mỹ', 'sáng tạo'], response: "Tâm hồn bạn có vẻ rất bay bổng và không chịu khuất phục trước những quy tắc gò bó. Gu thẩm mỹ của bạn thực sự có 'chất' riêng." },
            { words: ['tự do', 'đi', 'khám phá', 'phượt', 'du lịch'], response: "Có vẻ bạn là một linh hồn tự do, luôn khao khát những chân trời mới. Sự tò mò chính là chiếc la bàn tốt nhất của bạn." },
            { words: ['học', 'đọc', 'sách', 'kiến thức', 'nghiên cứu'], response: "Bạn có vẻ là người có trí tò mò vô hạn. Tri thức đối với bạn không chỉ là thông tin, mà là cách bạn định nghĩa bản thân." },
            { words: ['bình yên', 'nhẹ nhàng', 'tĩnh', 'thiền'], response: "Bạn có vẻ đang tìm kiếm sự cân bằng tuyệt đối. Một tâm hồn tĩnh lặng giữa thế giới ồn ào là một sức mạnh cực kỳ đáng gờm." }
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

        // XÁC THỰC CÂU TRẢ LỜI
        const validation = validateAnswer(text, targetIdx);
        if (!validation.valid) {
            appendMessage('user', text, targetIdx);
            userInput.value = '';
            setTimeout(() => {
                appendMessage('system', validation.message, targetIdx);
            }, 600);
            return;
        }

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
        syncHintBtn();
        selectedHints = []; // Clear selections for next question

        // Store weight for undoing/re-answering later
        appliedWeights[targetIdx] = lastAppliedWeight;
        lastAppliedWeight = null;

        if (!isReanswer) {
            currentIdx++;
        }

        // Feedback
        const systemResponse = validation.isConversationOnly
            ? validation.message
            : (lastAnswerFeedback || getFreeTextFeedback(text) || defaultResponses[Math.floor(Math.random() * defaultResponses.length)]);

        lastAnswerFeedback = "";

        const dFactor = isTestMode ? 0.1 : 1;
        setTimeout(() => {
            updateProgress();
            appendMessage('system', systemResponse, targetIdx);

            // Nếu chỉ là trò chuyện (lạc đề), không chuyển câu hỏi
            if (validation.isConversationOnly) {
                // Loop back: update suggestions for the same question
                updateSuggestions(targetIdx);
                return;
            }

            if (!isReanswer) {
                // CHAPTER BOUNDARIES
                const boundaries = isTestMode ? { 2: 1, 4: 2, 6: 3 } : { 30: 1, 55: 2, 75: 3 };
                if (boundaries[currentIdx]) {
                    showChapterCompletion(boundaries[currentIdx]);
                } else {
                    setTimeout(() => nextQuestion(), 1200 * dFactor);
                }
            } else {
                reansweringIdx = null; // Done re-answering
                updateSuggestions(currentIdx);
            }
        }, 800 * dFactor);
    }

    function getChapterNumber(idx) {
        if (isTestMode) {
            if (idx < 2) return 1;
            if (idx < 4) return 2;
            if (idx < 6) return 3;
            return 4;
        } else {
            if (idx < 30) return 1;
            if (idx < 55) return 2;
            if (idx < 75) return 3;
            return 4;
        }
    }

    function showChapterCompletion(chapterNum) {
        const nextChapter = chapterNum + 1;
        const msg = `Chúc mừng bạn đã hoàn thành xong chương ${chapterNum}. Bạn có thể xem kết quả phân tích về bản thân trong chương này và đến với hành trình tiếp theo!<br><div class="chapter-completion-btns">
            <button class="btn-chat-primary view-chapter-analysis-btn" onclick="openAnalysisAtChapter(${chapterNum})">Xem phân tích</button>
            <button class="btn-chat-primary next-chapter-btn">Đến chương ${nextChapter}</button>
        </div>`;

        inputArea.classList.add('hidden');
        appendMessage('system', msg);
    }

    const chapterAnalysisModal = document.getElementById('chapter-analysis-modal');
    let chapterRadarChart;

    // Nội dung phân tích cho từng chương
    const chapterDescsInline = {
        1: "Thông qua các <b>sở thích tự nhiên</b>, chúng tôi xác định được loại hình đam mê tiềm ẩn của bạn (Kỹ thuật, Sáng tạo, Chiến lược, Thấu cảm, Khám phá hay Phát triển bản thân) và mức độ 'phù hợp' của bạn với các lĩnh vực nghề nghiệp tương ứng.",
        2: "Chương này giúp hiểu rõ những <b>'nỗi đau'</b> hoặc sự thiếu hụt đang thúc đẩy bạn muốn thay đổi. Từ đó, chúng ta tìm ra <b>động lực nội tại</b> (intrinsic motivation) cần thiết để bạn theo đuổi đam mê một cách bền vững nhất.",
        3: "Chúng ta đang xây dựng một <b>bức tranh tương lai</b> rõ ràng. Những phân tích này giúp bạn gọi tên và vượt qua những nỗi sợ hiện tại, đồng thời định hướng những <b>mục tiêu dài hạn</b> mang tính bản sắc cá nhân.",
        4: "Lựa chọn cuối cùng làm lộ diện <b>hệ thống ưu tiên</b> (priority stack) thực sự của bạn. Đây là lúc phân biệt giữa đam mê 'bề mặt' với đam mê 'thật sự', giúp dự đoán chính xác những <b>lựa chọn nghề nghiệp</b> và phong cách sống trong tương lai."
    };

    window.switchAnalysisTab = function (chNum) {
        const tabs = document.querySelectorAll('#analysis-chapter-tabs .analysis-tab');
        const textEl = document.getElementById('analysis-chapter-text');
        tabs.forEach(t => {
            t.classList.toggle('active', parseInt(t.dataset.ch) === chNum);
        });

        const boundaries = isTestMode ? { 1: 2, 2: 4, 3: 6 } : { 1: 30, 2: 55, 3: 75 };
        const isChDone = isQuizCompleted ||
            (boundaries[chNum] && currentIdx >= boundaries[chNum]) ||
            (chNum === 4 && currentIdx >= questions.length);

        if (isChDone) {
            textEl.innerHTML = chapterDescsInline[chNum] || '';
        } else {
            textEl.innerHTML = `<span class="ch-locked">🔒 Hoàn thành Chương ${chNum} để xem phân tích này.</span>`;
        }
    };

    // Mở modal phân tích radar chính + tự chuyển sang tab chương tương ứng
    window.openAnalysisAtChapter = function (chNum) {
        if (!currentAnalysisChart) initCurrentChart();
        updateChart();
        analysisModal.classList.remove('hidden');
        switchAnalysisTab(chNum);
    };

    window.showChapterAnalysis = function (chapterNum) {
        const modal = document.getElementById('chapter-analysis-modal');
        const title = document.getElementById('chapter-analysis-title');
        const desc = document.getElementById('chapter-analysis-desc');
        const canvas = document.getElementById('chapterRadarChart');
        const contentWrap = document.getElementById('chapter-analysis-content-wrap');
        const placeholder = document.getElementById('chapter-analysis-placeholder');
        const tabs = document.querySelectorAll('.modal-tab');

        // Update active tab UI
        tabs.forEach((tab) => {
            if (parseInt(tab.dataset.chapter) === chapterNum) tab.classList.add('active');
            else tab.classList.remove('active');
        });

        modal.classList.remove('hidden');

        // Check if chapter has been reached
        // Calculate boundaries to check if chapter is completed
        const boundaries = isTestMode ? { 1: 2, 2: 4, 3: 6 } : { 1: 30, 2: 55, 3: 75 };
        const isChapterCompleted = isQuizCompleted || (boundaries[chapterNum] && currentIdx >= boundaries[chapterNum]) || (chapterNum === 4 && currentIdx >= questions.length);

        if (!isChapterCompleted) {
            contentWrap.classList.add('hidden');
            placeholder.classList.remove('hidden');
            if (typeof lucide !== 'undefined') lucide.createIcons();
            return;
        }

        contentWrap.classList.remove('hidden');
        placeholder.classList.add('hidden');

        const chapterTitles = {
            1: "Chương 1: Loại hình Đam mê",
            2: "Chương 2: Động lực & Nỗi đau",
            3: "Chương 3: Tầm nhìn & Mục tiêu",
            4: "Chương 4: Hệ thống Ưu tiên"
        };

        const chapterDescs = {
            1: "Thông qua các sở thích tự nhiên, chúng tôi xác định được loại hình đam mê tiềm ẩn của bạn (Kỹ thuật, Sáng tạo, Chiến lược, Thấu cảm, Khám phá hay Phát triển bản thân) và mức độ 'phù hợp' của bạn với các lĩnh vực nghề nghiệp tương ứng.",
            2: "Chương này giúp hiểu rõ những 'nỗi đau' hoặc sự thiếu hụt đang thúc đẩy bạn muốn thay đổi. Từ đó, chúng ta tìm ra động lực nội tại (intrinsic motivation) cần thiết để bạn theo đuổi đam mê một cách bền vững nhất.",
            3: "Chúng ta đang xây dựng một bức tranh tương lai rõ ràng. Những phân tích này giúp bạn gọi tên và vượt qua những nỗi sợ hiện tại, đồng thời định hướng những mục tiêu dài hạn mang tính bản sắc cá nhân.",
            4: "Lựa chọn cuối cùng làm lộ diện hệ thống ưu tiên (priority stack) thực sự của bạn. Đây là lúc phân biệt giữa đam mê 'bề mặt' với đam mê 'thật sự', giúp dự đoán chính xác những lựa chọn nghề nghiệp và phong cách sống trong tương lai."
        };

        title.textContent = chapterTitles[chapterNum];
        desc.textContent = chapterDescs[chapterNum];

        // Global scores used for the chart (continuous analysis)
        if (chapterRadarChart) {
            const maxVal = Math.max(...scores, 100);
            chapterRadarChart.options.scales.r.suggestedMax = maxVal;
            chapterRadarChart.data.datasets[0].data = scores;
            chapterRadarChart.update();
        } else {
            const ctx = canvas.getContext('2d');
            chapterRadarChart = new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: categories,
                    datasets: [{
                        label: 'Bản đồ Tiềm năng',
                        data: scores,
                        backgroundColor: 'rgba(255, 142, 113, 0.2)',
                        borderColor: 'rgb(255, 142, 113)',
                        pointBackgroundColor: 'rgb(255, 142, 113)',
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        r: {
                            suggestedMin: 0,
                            suggestedMax: 100,
                            ticks: { display: false },
                            pointLabels: { font: { size: 9, weight: '600' }, padding: 15 }
                        }
                    },
                    plugins: { legend: { display: false } }
                }
            });
        }
    };

    window.changeAnswer = function (targetQIdx) {
        reansweringIdx = targetQIdx;
        selectedHints = []; // Clear any current selections

        // Show suggestion for that target question
        updateSuggestions(targetQIdx);

        suggestionBox.classList.remove('hidden');
        syncHintBtn();
        userInput.focus();

        // Scroll suggestion box to view
        suggestionBox.scrollIntoView({ behavior: 'smooth', block: 'end' });
    };

    function updateProgress(isQuestionStarting = false) {
        let currentChapter = 1;
        let chapterIdx = 0;
        let chapterTotal = 30;

        const boundaries = isTestMode ? { 2: 1, 4: 2, 6: 3 } : { 30: 1, 55: 2, 75: 3 };

        if (!isQuestionStarting && boundaries[currentIdx]) {
            // Hiển thị 100% của chương vừa hoàn thành
            currentChapter = boundaries[currentIdx];
            if (isTestMode) {
                chapterTotal = 2;
                chapterIdx = 2;
            } else {
                if (currentChapter === 1) { chapterTotal = 30; chapterIdx = 30; }
                else if (currentChapter === 2) { chapterTotal = 25; chapterIdx = 25; }
                else if (currentChapter === 3) { chapterTotal = 20; chapterIdx = 20; }
            }
        } else {
            if (isTestMode) {
                chapterTotal = 2;
                if (currentIdx >= 6) {
                    currentChapter = 4;
                    chapterIdx = currentIdx - 6;
                } else if (currentIdx >= 4) {
                    currentChapter = 3;
                    chapterIdx = currentIdx - 4;
                } else if (currentIdx >= 2) {
                    currentChapter = 2;
                    chapterIdx = currentIdx - 2;
                } else {
                    currentChapter = 1;
                    chapterIdx = currentIdx;
                }
            } else {
                // Ch 1 (Sở thích): 0-29, Ch 2: 30-54, Ch 3: 55-74, Ch 4: 75-99
                if (currentIdx >= 75) {
                    currentChapter = 4;
                    chapterIdx = currentIdx - 75;
                    chapterTotal = 25;
                } else if (currentIdx >= 55) {
                    currentChapter = 3;
                    chapterIdx = currentIdx - 55;
                    chapterTotal = 20;
                } else if (currentIdx >= 30) {
                    currentChapter = 2;
                    chapterIdx = currentIdx - 30;
                    chapterTotal = 25;
                } else {
                    currentChapter = 1;
                    chapterIdx = currentIdx;
                    chapterTotal = 30;
                }
            }
        }

        // Clamp chapterIdx for the 100% case when finishing
        const totalQ = questions.length;
        if (currentIdx >= totalQ) chapterIdx = chapterTotal;

        const percent = Math.round((chapterIdx / chapterTotal) * 100);
        document.getElementById('quiz-progress-fill').style.width = `${percent}%`;
        document.getElementById('progress-text').textContent = `${percent}%`;

        // Update Chapter Tabs
        document.querySelectorAll('.chapter-tab').forEach(tab => {
            if (parseInt(tab.dataset.chapter) === currentChapter) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
    }

    function updateChart() {
        const maxVal = Math.max(...scores, 100);
        if (chart) {
            chart.options.scales.r.suggestedMax = maxVal;
            chart.data.datasets[0].data = scores;
            chart.update();
        }
        if (currentAnalysisChart) {
            currentAnalysisChart.options.scales.r.suggestedMax = maxVal;
            currentAnalysisChart.data.datasets[0].data = scores;
            currentAnalysisChart.update();
        }
        if (sideAnalysisChart) {
            sideAnalysisChart.options.scales.r.suggestedMax = maxVal;
            sideAnalysisChart.data.datasets[0].data = scores;
            sideAnalysisChart.update();
        }
        if (chapterRadarChart) {
            chapterRadarChart.data.datasets[0].data = scores;
            chapterRadarChart.update();
        }
        // Cập nhật mini radar thumbnail trên mobile
        if (miniRadarChart) {
            miniRadarChart.options.scales.r.suggestedMax = maxVal;
            miniRadarChart.data.datasets[0].data = scores;
            miniRadarChart.update();
        }
    }

    function finishQuiz() {
        isQuizCompleted = true;
        updateActionButtons();
        const finalText = `Tuyệt vời, chúng ta đã dần hiểu rõ bản thân mình rồi đấy! Hãy cùng xem kết quả phân tích cuối cùng nào!<br><br><a href="#results" class="result-link-chat"><b>Xem kết quả phân tích chi tiết</b></a>`;

        appendMessage('system', finalText);
        inputArea.classList.add('hidden');

        // Close quiz window after a delay to let user see the message
        setTimeout(() => {
            generateFinalProfile();
            // We keep the chat open but let the profile generate in the background
        }, 1500);
    }

    window.restartQuiz = function () {
        showConfirm(
            'Làm lại từ đầu',
            'Bạn muốn xóa hết những gì chúng ta đã cùng trò chuyện và bắt đầu lại từ chương đầu tiên sao?',
            () => {
                // Reset data
                scores = [0, 0, 0, 0, 0, 0, 0];
                currentIdx = 0;
                appliedWeights = {};

                // Reset UI
                chatWindow.innerHTML = '';
                inputArea.classList.remove('hidden');
                document.getElementById('quiz-progress-fill').style.width = '0%';
                document.getElementById('progress-text').textContent = '0%';

                // Reset split view
                const sidePanel = document.getElementById('analysis-side-panel');
                if (sidePanel) {
                    sidePanel.classList.add('hidden');
                    sidePanel.classList.remove('active');
                }
                quizCard.classList.remove('is-split');

                // Hide post-quiz options
                const postOptions = document.getElementById('post-quiz-options');
                if (postOptions) postOptions.classList.add('hidden');

                // Restart dynamic samples
                isQuizCompleted = false;
                isChatStarted = false;
                updateActionButtons();
                startCycleSamples();

                // Restart chat flow
                initChat();
            }
        );
    };

    // Updated: Result Update Logic for both Sample & Real data
    function updateResultsUI(p, finalScores = null, isDemo = false) {
        const resultsSection = document.getElementById('results');
        if (isDemo) {
            resultsSection.classList.add('is-preview');
        } else {
            resultsSection.classList.remove('is-preview');
        }


        // Update Chart
        if (chart) {
            chart.data.datasets[0].data = finalScores || [80, 80, 80, 80, 80, 80, 80];
            chart.update('none');
        }

        // Show title
        const titleEl = document.getElementById('res-personality-title');
        if (titleEl) {
            titleEl.textContent = p.title;
            titleEl.classList.remove('hidden');
        }

        const natureEl = document.getElementById('res-personality-nature');
        if (natureEl) natureEl.textContent = p.nature;

        // Update Strengths
        const strengthList = document.getElementById('res-personality-strengths');
        if (strengthList) {
            strengthList.innerHTML = '';
            p.strengths.forEach(s => {
                const li = document.createElement('li');
                li.textContent = s;
                strengthList.appendChild(li);
            });
        }

        // Update Weaknesses
        const weaknessList = document.getElementById('res-personality-weaknesses');
        if (weaknessList) {
            weaknessList.innerHTML = '';
            p.weaknesses.forEach(w => {
                const li = document.createElement('li');
                li.textContent = w;
                weaknessList.appendChild(li);
            });
        }

        // Update Career Tags
        const tagContainer = document.getElementById('res-career-tags');
        if (tagContainer) {
            tagContainer.innerHTML = '';
            p.career.forEach(c => {
                const span = document.createElement('span');
                span.textContent = c;
                tagContainer.appendChild(span);
            });
        }

        // Removed button changes to "Làm lại" per user request
    }


    let sampleInterval;

    const sampleProfiles = [
        {
            title: 'Kiến trúc sư Hệ thống',
            nature: 'Bạn sở hữu bộ óc phân tích sắc sảo, luôn tìm kiếm quy luật và cấu trúc trong mọi vấn đề.',
            strengths: ['Tư duy logic mạnh mẽ', 'Giải quyết vấn đề phức tạp'],
            weaknesses: ['Đôi khi quá cứng nhắc', 'Khó thấu cảm'],
            career: ['Software Engineer', 'Data Scientist', 'System Architect'],
            demoScores: [95, 20, 30, 60, 50, 85, 40]
        },
        {
            title: 'Phù thủy Sáng tạo',
            nature: 'Bạn nhìn thế giới qua lăng kính của cái đẹp và sự đổi mới. Bạn không chấp nhận những gì rập khuôn.',
            strengths: ['Trực giác nhạy bén', 'Khả năng thẩm mỹ'],
            weaknesses: ['Dễ mất tập trung', 'Cảm xúc hay thay đổi'],
            career: ['UI/UX Designer', 'Creative Director', 'Artist'],
            demoScores: [25, 45, 95, 35, 20, 60, 75]
        },
        {
            title: 'Sứ giả Thấu cảm',
            nature: 'Trái tim bạn luôn hướng về con người. Bạn có khả năng cảm nhận được những gì người khác chưa nói ra.',
            strengths: ['Lắng nghe sâu sắc', 'EQ cao'],
            weaknesses: ['Dễ bị ảnh hưởng tiêu cực', 'Khó từ chối'],
            career: ['HR Manager', 'Bác sĩ Gia đình', 'Tư vấn Tâm lý'],
            demoScores: [35, 95, 45, 75, 40, 35, 65]
        },
        {
            title: 'Nhà Lãnh đạo Tầm nhìn',
            nature: 'Bạn sinh ra để nhìn thấy bức tranh lớn. Bạn muốn dẫn dắt mọi người đi tới một tương lai tốt đẹp hơn.',
            strengths: ['Quyết đoán', 'Khả năng hoạch định'],
            weaknesses: ['Có xu hướng áp đặt', 'Thiếu kiên nhẫn'],
            career: ['Founder / CEO', 'Quản trị Bệnh viện', 'Strategist'],
            demoScores: [65, 35, 55, 95, 80, 45, 55]
        }
    ];

    function startCycleSamples() {
        if (sampleInterval) clearInterval(sampleInterval);
        let currentSampleIdx = 0;

        const updateSample = () => {
            if (isQuizCompleted) {
                clearInterval(sampleInterval);
                return;
            }
            updateResultsUI(sampleProfiles[currentSampleIdx], sampleProfiles[currentSampleIdx].demoScores, true);
            currentSampleIdx = (currentSampleIdx + 1) % sampleProfiles.length;
        };

        updateSample();
        sampleInterval = setInterval(updateSample, 3000);
    }

    // Start initial cycling
    startCycleSamples();

    function generateFinalProfile() {
        isQuizCompleted = true;
        clearInterval(sampleInterval);
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
        updateResultsUI(p, scores, false);


    }

    sendBtn.onclick = submitAnswer;
    userInput.onkeypress = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submitAnswer(); } };
    hintBtn.onclick = (e) => {
        e.stopPropagation(); // Ngăn sự kiện lan lên trên làm nó tự đóng
        suggestionBox.classList.toggle('hidden');
        syncHintBtn();
    };

    // Khi bấm vào khoảng không của chat thì ẩn gợi ý đi
    chatWindow.addEventListener('click', () => {
        if (!suggestionBox.classList.contains('hidden')) {
            suggestionBox.classList.add('hidden');
            syncHintBtn();
        }
    });

    // Ngăn chặn bấm vào bên trong khung gợi ý làm nó tự đóng
    suggestionBox.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    exitBtn.onclick = exitChat;
    closeModal.onclick = () => analysisModal.classList.add('hidden');

    if (showAnalysisBtn) {
        showAnalysisBtn.onclick = () => {
            if (!currentAnalysisChart) initCurrentChart();
            updateChart(); // make sure it has latest data
            analysisModal.classList.remove('hidden');
            // Auto switch to current chapter tab
            switchAnalysisTab(getChapterNumber(currentIdx));
        };
    }

    const sideViewAnalysisBtn = document.getElementById('side-view-analysis-btn');
    if (sideViewAnalysisBtn) {
        sideViewAnalysisBtn.onclick = () => {
            const currentCh = getChapterNumber(currentIdx);
            showChapterAnalysis(currentCh);
        };
    }

    const closeChapterModal = document.getElementById('close-chapter-modal');
    if (closeChapterModal) {
        closeChapterModal.onclick = () => document.getElementById('chapter-analysis-modal').classList.add('hidden');
    }

    if (chapterMobileToggle && chapterTabs) {
        chapterMobileToggle.onclick = () => {
            chapterMobileToggle.classList.toggle('active');
            chapterTabs.classList.toggle('mobile-visible');
        };
    }

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

    // Hiệu ứng mũi tên quét dọc các Trạm hành trình
    const stepsRow = document.querySelector('.journey-steps-row');
    const journeySteps = document.querySelectorAll('.journey-step-box');
    const scanArrow = document.getElementById('journey-scan-arrow');

    if (journeySteps.length > 0 && scanArrow && stepsRow) {
        let currentStepIndex = 0;

        function updateScanner() {
            journeySteps.forEach(step => step.classList.remove('active-scan'));
            const currentStep = journeySteps[currentStepIndex];
            currentStep.classList.add('active-scan');

            const stepOffsetTop = currentStep.offsetTop;
            const stepHeight = currentStep.offsetHeight;
            const arrowTop = stepOffsetTop + (stepHeight / 2) - 14;

            scanArrow.style.transform = `translateY(${arrowTop}px)`;
            currentStepIndex = (currentStepIndex + 1) % journeySteps.length;
        }

        setTimeout(updateScanner, 100);
        setInterval(updateScanner, 3500);
    }

    if (typeof lucide !== 'undefined') lucide.createIcons();
});
