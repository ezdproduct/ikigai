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
                scales: {
                    r: {
                        angleLines: { display: true },
                        suggestedMin: 0,
                        suggestedMax: 100,
                        ticks: { display: false }
                    }
                },
                plugins: { legend: { display: false } }
            }
        });
    }

    initChart();

    // 2. Quiz Data (Extended from Question.pdf)
    const questions = [
        // PART 1: Bookstore
        {
            text: "Chào bạn, hãy bước vào một hiệu sách có đầy đủ mọi kiến thức trên thế giới. Khu vực nào đầu tiên lôi cuốn bạn như một thỏi nam châm?",
            hints: [
                { label: 'A', text: "Khu vực Kỹ thuật, Lập trình & Cơ chế vận hành", weight: [15, 0, 0, 0, 0, 0, 0] },
                { label: 'B', text: "Khu vực Tâm lý học, Xã hội & Kết nối con người", weight: [0, 15, 0, 0, 0, 0, 0] },
                { label: 'C', text: "Khu vực Nghệ thuật, Thiết kế & Sáng tạo độc bản", weight: [0, 0, 15, 0, 0, 0, 0] },
                { label: 'D', text: "Khu vực Lịch sử, Chiến lược & Di sản vĩ nhân", weight: [0, 0, 0, 15, 0, 0, 0] },
                { label: 'E', text: "Khu vực Kinh tế, Quản trị & Tối ưu hóa nguồn lực", weight: [0, 0, 0, 0, 15, 0, 0] },
                { label: 'F', text: "Khu vực Khoa học tự nhiên, Vũ trụ & Khám phá", weight: [0, 0, 0, 0, 0, 15, 0] },
                { label: 'G', text: "Khu vực Sức khỏe, Tinh thần & Phát triển bản thân", weight: [0, 0, 0, 0, 0, 0, 15] }
            ]
        },
        {
            text: "Một cuốn sách bất kỳ bị rơi xuống chân bạn. Điều gì ở bìa sách khiến bạn quyết định 'phải đọc' nó ngay?",
            hints: [
                { label: 'A', text: "Một sơ đồ phức tạp hứa hẹn giải quyết vấn đề logic.", weight: [10, 0, 0, 0, 0, 0, 0] },
                { label: 'B', text: "Một câu chuyện về cách thấu hiểu hành vi con người.", weight: [0, 10, 0, 0, 0, 0, 0] },
                { label: 'C', text: "Một ý tưởng thẩm mỹ táo bạo, phá vỡ quy tắc thiết kế.", weight: [0, 0, 10, 0, 0, 0, 0] },
                { label: 'D', text: "Một bài học từ nhân vật có quyền lực thay đổi thế giới.", weight: [0, 0, 0, 10, 0, 0, 0] },
                { label: 'E', text: "Cách thức quản trị hiệu quả giúp doanh nghiệp tăng trưởng.", weight: [0, 0, 0, 0, 10, 0, 0] }
            ]
        },
        // PART 1: Social Media
        {
            text: "Giữa vô vàn nội dung giải trí trên mạng, điều gì khiến bạn sẵn sàng dừng lại để xem kỹ hoặc lưu lại?",
            hints: [
                { label: 'A', text: "Video giải thích quy trình kỹ thuật 'Behind the scenes'.", weight: [10, 0, 0, 0, 0, 0, 0] },
                { label: 'B', text: "Những bài viết phân tích sâu sắc về cảm xúc con người.", weight: [0, 10, 0, 0, 0, 0, 0] },
                { label: 'C', text: "Những xu hướng sáng tạo nghệ thuật mới nhất (Trends).", weight: [0, 0, 10, 0, 0, 0, 0] },
                { label: 'D', text: "Nội dung về chiến lược kinh doanh của các chuyên gia.", weight: [0, 0, 0, 10, 0, 0, 0] },
                { label: 'G', text: "Meme hài hước nhưng có thông điệp tâm lý sâu sắc.", weight: [0, 0, 0, 0, 0, 0, 10] }
            ]
        },
        // PART 2: Depth
        {
            text: "Hãy nghĩ về một công việc bạn cực kỳ ghét làm. Cảm giác 'ngu người' hay 'mất thời gian' nhất ở đó là gì?",
            hints: [
                { label: 'Hỏi', text: "Tôi ghét những việc lặp đi lặp lại vô nghĩa.", weight: [0, 0, 0, 0, 0, 0, 5] },
                { label: 'Hỏi', text: "Tôi ghét phải giao tiếp gượng ép với quá nhiều người.", weight: [5, 0, 0, 0, 0, 0, 0] },
                { label: 'Hỏi', text: "Tôi ghét các quy trình cứng nhắc bóp nghẹt sáng tạo.", weight: [0, 0, 5, 0, 0, 0, 0] }
            ]
        },
        // PART 3: Imagination
        {
            text: "Nếu sáng mai bạn thức dậy và nhận ra bạn đang sống ĐÚNG với đam mê của mình, bạn sẽ thấy mình đang mặc gì, ánh mắt bạn trông như thế nào?",
            hints: [
                { label: 'Gợi ý', text: "Một bộ đồ đơn giản, ánh mắt cực kỳ tập trung.", weight: [5, 0, 0, 0, 0, 0, 0] },
                { label: 'Gợi ý', text: "Trang phục rực rỡ, ánh mắt đầy sự háo hức.", weight: [0, 0, 5, 0, 0, 0, 0] },
                { label: 'Gợi ý', text: "Một nụ cười bình yên và ánh mắt ấm áp.", weight: [0, 5, 0, 0, 0, 0, 0] }
            ]
        },
        // PART 4: Priority
        {
            text: "Trong 5 điều sau: Tiền bạc, Danh tiếng, Tự do, Sức khỏe, Tình yêu. Bạn sẵn sàng hy sinh điều nào để giữ lấy 4 điều còn lại?",
            hints: [
                { label: 'A', text: "Tôi sẵn sàng hy sinh Danh tiếng để đổi lấy Tự do.", weight: [0, 5, 0, 10, 0, 0, 0] },
                { label: 'B', text: "Tôi sẵn sàng hy sinh Tiền bạc để đổi lấy Tình yêu.", weight: [0, 10, 0, 0, 0, 0, 5] },
                { label: 'C', text: "Tôi sẵn sàng hy sinh Tự do để đổi lấy Sức khỏe.", weight: [0, 0, 0, 0, 0, 0, 10] }
            ]
        },
        {
            text: "Khi một người bạn gặp khó khăn, bạn muốn giúp họ Giải quyết vấn đề hay Lắng nghe chia sẻ hơn?",
            hints: [
                { label: 'A', text: "Giải quyết vấn đề: Tìm nguyên nhân và đề xuất giải pháp.", weight: [10, 0, 0, 10, 0, 0, 0] },
                { label: 'B', text: "Lắng nghe chia sẻ: Đồng cảm và động viên tinh thần.", weight: [0, 15, 0, 0, 0, 0, 5] }
            ]
        }
    ];

    let currentIdx = 0;
    const chatWindow = document.getElementById('quiz-window');
    const inputArea = document.getElementById('quiz-input-area');
    const suggestionBox = document.getElementById('suggestion-box');
    const suggestionGrid = document.getElementById('suggestion-grid');
    const userInput = document.getElementById('user-answer');
    const sendBtn = document.getElementById('send-btn');
    const hintBtn = document.getElementById('show-hints-btn');
    const startScreen = document.getElementById('quiz-start-screen');

    window.initChat = function () {
        startScreen.classList.add('hidden');
        inputArea.classList.remove('hidden');
        chatWindow.innerHTML = '';
        appendMessage('system', 'Bạn: Tôi muốn tìm thấy đam mê của mình');
        setTimeout(() => appendMessage('system', 'YC: Thật mờ mịt, nhưng tôi tin chúng ta sẽ tìm ra mảnh ghép của bạn.'), 800);
        setTimeout(() => nextQuestion(), 1600);
    };

    function appendMessage(sender, text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-msg ${sender === 'user' ? 'user-msg' : 'system-msg'}`;
        msgDiv.innerHTML = `<p>${text}</p>`;
        chatWindow.appendChild(msgDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    function nextQuestion() {
        if (currentIdx >= questions.length) {
            finishQuiz();
            return;
        }

        const q = questions[currentIdx];
        setTimeout(() => {
            appendMessage('system', q.text);
            updateProgress();

            suggestionGrid.innerHTML = '';
            q.hints.forEach(hint => {
                const item = document.createElement('div');
                item.className = 'suggestion-item';
                item.innerHTML = `<span>${hint.label}</span> ${hint.text}`;
                item.onclick = () => selectHint(hint);
                suggestionGrid.appendChild(item);
            });
            if (currentIdx === 0) suggestionBox.classList.remove('hidden');
        }, 600);
    }

    function selectHint(hint) {
        userInput.value = hint.text;
        if (hint.weight) {
            hint.weight.forEach((w, i) => scores[i] += w);
            updateChart();
        }
        submitAnswer();
    }

    function submitAnswer() {
        const text = userInput.value.trim();
        if (!text) return;

        appendMessage('user', text);
        userInput.value = '';
        suggestionBox.classList.add('hidden');

        currentIdx++;
        nextQuestion();
    }

    function updateProgress() {
        const percent = Math.round((currentIdx / questions.length) * 100);
        document.getElementById('quiz-progress-fill').style.width = `${percent}%`;
        document.getElementById('progress-text').textContent = `${percent}%`;
    }

    function updateChart() {
        const max = 100;
        chart.data.datasets[0].data = scores.map(s => Math.min(max, s));
        chart.update();
    }

    function finishQuiz() {
        appendMessage('system', "Tôi đã nhìn thấu tâm hồn bạn. Hãy xem bản đồ kho báu nhé!");
        inputArea.classList.add('hidden');
        setTimeout(() => { generateFinalProfile(); window.location.hash = '#results'; }, 1500);
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

    if (typeof lucide !== 'undefined') lucide.createIcons();
});
