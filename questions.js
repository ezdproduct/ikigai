const questionsData = [
    // PHẦN 1: TRẮC NGHIỆM TÌNH HUỐNG MỞ RỘNG
    // Tình huống 1: Hiệu sách khổng lồ
    {
        text: "Hãy tưởng tượng bạn bước vào một hiệu sách có đầy đủ mọi kiến thức trên thế giới. Khu vực nào đầu tiên lôi cuốn bạn như một thỏi nam châm?",
        hints: [
            { label: 'A', text: "Khu vực Kỹ thuật, Lập trình & Cơ chế vận hành", weight: [15, 0, 0, 0, 0, 0, 0], feedback: "Sự thấu hiểu về cấu trúc là nền tảng vững chắc." },
            { label: 'B', text: "Khu vực Tâm lý học, Xã hội & Kết nối con người", weight: [0, 15, 0, 0, 0, 0, 0], feedback: "Lòng trắc ẩn là món quà quý giá của bạn." },
            { label: 'C', text: "Khu vực Nghệ thuật, Thiết kế & Sáng tạo độc bản", weight: [0, 0, 15, 0, 0, 0, 0], feedback: "Sự sáng tạo chính là cách bạn cảm nhận cuộc sống." },
            { label: 'D', text: "Khu vực Lịch sử, Chiến lược & Di sản vĩ nhân", weight: [0, 0, 0, 15, 0, 0, 0], feedback: "Tư duy chiến lược giúp bạn nhìn thấu tương lai." },
            { label: 'E', text: "Khu vực Kinh tế, Quản trị & Tối ưu hóa nguồn lực", weight: [0, 0, 0, 0, 15, 0, 0], feedback: "Khả năng điều phối nguồn lực là tố chất thực tế." },
            { label: 'F', text: "Khu vực Khoa học tự nhiên, Vũ trụ & Khám phá", weight: [0, 0, 0, 0, 0, 15, 0], feedback: "Trí tò mò không giới hạn dẫn lối cho bạn." },
            { label: 'G', text: "Khu vực Sức khỏe, Tinh thần & Phát triển bản thân", weight: [0, 0, 0, 0, 0, 0, 15], feedback: "Quay về bên trong là khởi đầu của sự trưởng thành." }
        ]
    },
    {
        text: "Ngay tại khu vực đó, bạn cầm một cuốn sách lên. Điều gì khiến bạn quyết định 'cuốn này phải đọc' ngay lập tức?",
        hints: [
            { label: 'A', text: "Một sơ đồ, thuật toán rõ ràng hứa hẹn giải quyết logic.", weight: [10, 0, 0, 0, 0, 0, 0] },
            { label: 'B', text: "Một câu chuyện vượt nghịch cảnh hoặc hành vi con người.", weight: [0, 10, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Hình ảnh minh họa đẹp, ý tưởng phá vỡ mọi quy tắc.", weight: [0, 0, 10, 0, 0, 0, 0] },
            { label: 'D', text: "Lời giới thiệu về chiến lược thay đổi cả một đế chế.", weight: [0, 0, 0, 10, 0, 0, 0] },
            { label: 'E', text: "Case study về cách công ty tăng trưởng thần tốc.", weight: [0, 0, 0, 0, 10, 0, 0] },
            { label: 'F', text: "Giả thuyết khoa học mới lý giải nguồn gốc vũ trụ.", weight: [0, 0, 0, 0, 0, 10, 0] },
            { label: 'G', text: "Bài tập thực hành về thiền, năng lượng hoặc lối sống.", weight: [0, 0, 0, 0, 0, 0, 10] }
        ]
    },
    {
        text: "Giả sử bạn có 3 giờ hoàn toàn tự do trong hiệu sách này. Bạn sẽ làm gì?",
        hints: [
            { label: 'A', text: "Đào sâu vào một chủ đề kỹ thuật cụ thể.", weight: [10, 0, 0, 0, 0, 0, 0] },
            { label: 'B', text: "Đọc lướt nhiều sách Tâm lý, xem các thí nghiệm hành vi.", weight: [0, 10, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Xem sách nghệ thuật và phác thảo lại ý tưởng.", weight: [0, 0, 10, 0, 0, 0, 0] },
            { label: 'D', text: "Đọc kỹ tự truyện nhân vật ngưỡng mộ, ghi chép chiến lược.", weight: [0, 0, 0, 10, 0, 0, 0] },
            { label: 'E', text: "Phân tích báo cáo tài chính, vẽ đồ thị dự đoán.", weight: [0, 0, 0, 0, 10, 0, 0] },
            { label: 'F', text: "Mê mẩn với atlas địa lý, bản đồ sao hoặc động vật lạ.", weight: [0, 0, 0, 0, 0, 10, 0] },
            { label: 'G', text: "Tìm phương pháp cụ thể cải thiện thói quen bản thân.", weight: [0, 0, 0, 0, 0, 0, 10] }
        ]
    },
    {
        text: "Trước khi ra về, nếu được tặng một cuốn sách bất kỳ, bạn sẽ chọn cuốn nào?",
        hints: [
            { label: 'A', text: "Cấu trúc của các cuộc cách mạng khoa học (Thomas Kuhn)", weight: [10, 0, 0, 0, 0, 0, 0] },
            { label: 'B', text: "Đi tìm lẽ phải (Jonathan Haidt)", weight: [0, 10, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Nghệ thuật là vĩnh cửu - Sách ảnh kinh điển", weight: [0, 0, 10, 0, 0, 0, 0] },
            { label: 'D', text: "Thuật trị vì (Machiavelli) - Quyền lực & Chiến lược", weight: [0, 0, 0, 10, 0, 0, 0] },
            { label: 'E', text: "Kinh tế học hài hước (Freakonomics)", weight: [0, 0, 0, 0, 10, 0, 0] },
            { label: 'F', text: "Lược sử thời gian (Stephen Hawking)", weight: [0, 0, 0, 0, 0, 10, 0] },
            { label: 'G', text: "Bảy thói quen của người thành đạt (Stephen Covey)", weight: [0, 0, 0, 0, 0, 0, 10] }
        ]
    },
    {
        text: "Nếu hiệu sách có khu vực cho 'những người sáng tạo nội dung', bạn có tò mò ghé vào không?",
        hints: [
            { label: 'A', text: "Có, xem hướng dẫn kỹ thuật làm video chất lượng cao.", weight: [10, 0, 0, 0, 0, 0, 0] },
            { label: 'B', text: "Có, học cách xây dựng kịch bản, kết nối cảm xúc.", weight: [0, 10, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Có, ngắm nghía setup đẹp, ánh sáng và thẩm mỹ.", weight: [0, 0, 10, 0, 0, 0, 0] },
            { label: 'D', text: "Có, tìm hiểu chiến lược phát triển kênh, thuật toán.", weight: [0, 0, 0, 10, 0, 0, 0] },
            { label: 'E', text: "Không, tôi không thấy hứng thú lắm.", weight: [0, 0, 0, 0, 0, 0, 0] }
        ]
    },
    {
        text: "Bạn tình cờ thấy một nhóm người thảo luận sôi nổi. Chủ đề gì khiến bạn cảm thấy tò mò muốn nghe nhất?",
        hints: [
            { label: 'A', text: "Giải pháp kỹ thuật cho bài toán lập trình hóc búa.", weight: [10, 0, 0, 0, 0, 0, 0] },
            { label: 'B', text: "Cách nuôi dạy con cái khoa học và thấu hiểu tâm lý.", weight: [0, 10, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Bộ phim mới có hình ảnh xuất sắc và cách kể chuyện độc đáo.", weight: [0, 0, 10, 0, 0, 0, 0] },
            { label: 'D', text: "Biến động địa chính trị và tác động đến tương lai thế giới.", weight: [0, 0, 0, 10, 0, 0, 0] },
            { label: 'E', text: "Xu hướng đầu tư chứng khoán, cổ phiếu tiềm năng.", weight: [0, 0, 0, 0, 10, 0, 0] },
            { label: 'F', text: "Khám phá mới về sự sống trên sao Hỏa.", weight: [0, 0, 0, 0, 0, 10, 0] },
            { label: 'G', text: "Cách tập luyện vượt qua trầm cảm và lo âu.", weight: [0, 0, 0, 0, 0, 0, 10] }
        ]
    },
    {
        text: "Giả sử bạn thấy một cuốn sách tiếng nước ngoài chưa được dịch nhưng chủ đề rất hay. Bạn sẽ làm gì?",
        hints: [
            { label: 'A', text: "Cố gắng đọc vì chủ đề quá cuốn hút kỹ thuật.", weight: [5, 0, 0, 0, 0, 0, 0] },
            { label: 'B', text: "Tìm mọi cách để hiểu nội dung (dùng Google Dịch, hỏi người khác).", weight: [0, 5, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Thích thú với thiết kế bìa sách và cách trình bày.", weight: [0, 0, 5, 0, 0, 0, 0] },
            { label: 'D', text: "Nghĩ rằng nếu quan trọng sẽ có người dịch thôi.", weight: [0, 0, 0, 0, 0, 0, 0] },
            { label: 'E', text: "Hỏi nhân viên nhà sách tóm tắt nội dung.", weight: [0, 5, 0, 0, 0, 0, 0] }
        ]
    },
    {
        text: "Nếu bạn thấy một cuốn sách rất dày và đắt tiền đúng chủ đề bạn tìm kiếm, phản ứng của bạn là gì?",
        hints: [
            { label: 'A', text: "Lật xem mục lục và kết luận để chắc chắn nội dung.", weight: [5, 0, 0, 0, 0, 0, 0] },
            { label: 'B', text: "Quyết định mua ngay không cần suy nghĩ.", weight: [0, 0, 0, 5, 0, 0, 0] },
            { label: 'C', text: "Chụp ảnh bìa để về tìm bản PDF hoặc ebook.", weight: [0, 0, 0, 0, 5, 0, 0] },
            { label: 'D', text: "Tìm mua cuốn rẻ hơn nhưng cùng chủ đề.", weight: [0, 0, 0, 0, 5, 0, 0] },
            { label: 'E', text: "Hỏi nhân viên về chương trình khuyến mãi.", weight: [0, 0, 0, 0, 5, 0, 0] }
        ]
    },
    {
        text: "Nếu bạn rời hiệu sách với một món đồ không phải sách, đó có thể là gì?",
        hints: [
            { label: 'A', text: "Một cây bút kỹ thuật mới.", weight: [5, 0, 0, 0, 0, 0, 0] },
            { label: 'B', text: "Một cuốn sổ tay ghi chép hàng ngày.", weight: [0, 0, 0, 0, 0, 0, 5] },
            { label: 'C', text: "Một tấm poster nghệ thuật.", weight: [0, 0, 5, 0, 0, 0, 0] },
            { label: 'D', text: "Tiểu sử/Lịch để bàn vĩ nhân/nhà lãnh đạo.", weight: [0, 0, 0, 5, 0, 0, 0] },
            { label: 'E', text: "Một tạp chí kinh tế tuần này.", weight: [0, 0, 0, 0, 5, 0, 0] },
            { label: 'F', text: "Một quả địa cầu mini.", weight: [0, 0, 0, 0, 0, 5, 0] },
            { label: 'G', text: "Một hộp trà thảo mộc thư giãn.", weight: [0, 0, 0, 0, 0, 0, 5] }
        ]
    },
    {
        text: "Cảm xúc chính của bạn khi rời khỏi hiệu sách là gì?",
        hints: [
            { label: 'A', text: "Hưng phấn vì tìm thấy lời giải cho vấn đề.", weight: [10, 0, 0, 0, 0, 0, 0] },
            { label: 'B', text: "Thấy tâm hồn nhẹ nhõm, thấu hiểu bản thân hơn.", weight: [0, 10, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Tràn đầy cảm hứng sáng tạo.", weight: [0, 0, 10, 0, 0, 0, 0] },
            { label: 'D', text: "Có tầm nhìn xa hơn về sự nghiệp.", weight: [0, 0, 0, 10, 0, 0, 0] },
            { label: 'E', text: "Thôi thúc bắt tay vào kế hoạch kinh doanh.", weight: [0, 0, 0, 0, 10, 0, 0] },
            { label: 'F', text: "Ngạc nhiên về những điều kỳ vĩ của thế giới.", weight: [0, 0, 0, 0, 0, 10, 0] },
            { label: 'G', text: "Bình yên và có thêm động lực chăm sóc bản thân.", weight: [0, 0, 0, 0, 0, 0, 10] }
        ]
    },

    // Tình huống 2: Lướt mạng xã hội
    {
        text: "Giữa vô vàn nội dung giải trí, điều gì khiến bạn sẵn sàng dừng lại xem kỹ?",
        hints: [
            { label: 'A', text: "Video giải thích quy trình kỹ thuật 'Behind the scenes'.", weight: [10, 0, 0, 0, 0, 0, 0] },
            { label: 'B', text: "Những bài viết phân tích sâu sắc về cảm xúc con người.", weight: [0, 10, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Xu hướng sáng tạo nghệ thuật mới nhất.", weight: [0, 0, 10, 0, 0, 0, 0] },
            { label: 'D', text: "Chiến lược kinh doanh của các chuyên gia.", weight: [0, 0, 0, 10, 0, 0, 0] },
            { label: 'E', text: "Thành tựu của người khác khiến bạn 'ghen tị tích cực'.", weight: [0, 0, 0, 0, 10, 0, 0] },
            { label: 'F', text: "Bài hướng dẫn (tutorial) cụ thể về kỹ năng mới.", weight: [5, 0, 0, 0, 0, 5, 0] },
            { label: 'G', text: "Những meme hài hước nhưng mang ý nghĩa sâu xa.", weight: [0, 0, 0, 0, 0, 0, 10] }
        ]
    },
    {
        text: "Nếu bạn thấy bạn thân đăng ảnh đi du lịch châu Âu sang trọng, cảm xúc đầu tiên nảy ra là gì?",
        hints: [
            { label: 'A', text: "Vui cho bạn và bắt đầu lên kế hoạch tiết kiệm để đi.", weight: [0, 0, 0, 0, 5, 0, 5] },
            { label: 'B', text: "Tò mò về hành trình, chi phí để học hỏi kinh nghiệm.", weight: [0, 0, 0, 5, 5, 0, 0] },
            { label: 'C', text: "Tò mò bạn ấy làm nghề gì mà sướng thế.", weight: [0, 0, 0, 0, 10, 0, 0] },
            { label: 'D', text: "Ngắm bố cục ảnh đẹp, thời trang của bạn ấy.", weight: [0, 0, 10, 0, 0, 0, 0] },
            { label: 'E', text: "Hơi chạnh lòng nhưng lướt tiếp vì ai cũng có đời tư.", weight: [0, 5, 0, 0, 0, 0, 5] },
            { label: 'F', text: "Bình luận ngay xin lịch trình.", weight: [0, 5, 0, 0, 0, 0, 0] }
        ]
    },
    {
        text: "Giả sử bạn xem phỏng vấn một người trẻ khởi nghiệp thành công, bạn muốn hỏi họ điều gì nhất?",
        hints: [
            { label: 'A', text: "Bí quyết kỹ thuật, công nghệ họ dùng.", weight: [10, 0, 0, 0, 0, 0, 0] },
            { label: 'B', text: "Cách kiên trì vượt qua stress và áp lực.", weight: [0, 5, 0, 0, 0, 0, 5] },
            { label: 'C', text: "Cảm hứng thiết kế/sản phẩm độc đáo đó từ đâu.", weight: [0, 0, 10, 0, 0, 0, 0] },
            { label: 'D', text: "Chiến lược tiếp cận thị trường và gọi vốn.", weight: [0, 0, 0, 10, 5, 0, 0] },
            { label: 'E', text: "Cách quản lý dòng tiền và thu nhập.", weight: [0, 0, 0, 0, 10, 0, 0] },
            { label: 'F', text: "Hành trình bắt đầu từ con số 0.", weight: [0, 0, 0, 0, 0, 0, 10] }
        ]
    },
    {
        text: "Loại quảng cáo nào dễ khiến bạn click vào nhất?",
        hints: [
            { label: 'A', text: "Khóa học lập trình/kỹ năng công nghệ mới.", weight: [10, 0, 0, 0, 0, 0, 0] },
            { label: 'B', text: "Sách tâm lý/hôn nhân gia đình mới ra mắt.", weight: [0, 10, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Công cụ thiết kế/chỉnh sửa ảnh chuyên nghiệp.", weight: [0, 0, 10, 0, 0, 0, 0] },
            { label: 'D', text: "Hội thảo chiến lược kinh doanh từ chuyên gia.", weight: [0, 0, 0, 10, 5, 0, 0] },
            { label: 'E', text: "Cơ hội đầu tư tài chính lãi suất hấp dẫn.", weight: [0, 0, 0, 0, 10, 0, 0] },
            { label: 'F', text: "Tour du lịch khám phá thiên nhiên mạo hiểm.", weight: [0, 0, 0, 0, 0, 10, 0] },
            { label: 'G', text: "Ứng dụng thiền/chăm sóc tinh thần.", weight: [0, 0, 0, 0, 0, 0, 10] }
        ]
    },
    {
        text: "Điều gì ở một bài viết rất dài giữ chân bạn lại?",
        hints: [
            { label: 'A', text: "Nhiều số liệu, bằng chứng khoa học cẩn thận.", weight: [10, 0, 0, 0, 0, 5, 0] },
            { label: 'B', text: "Câu chuyện con người gây đồng cảm sâu sắc.", weight: [0, 10, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Hình ảnh đẹp, cách trình bày sáng tạo.", weight: [0, 0, 10, 0, 0, 0, 0] },
            { label: 'D', text: "Luận điểm gây tranh cãi, thách thức quan điểm.", weight: [0, 0, 0, 10, 0, 0, 0] },
            { label: 'E', text: "Checklist hành động thực tế, dễ áp dụng.", weight: [0, 0, 0, 0, 10, 0, 5] },
            { label: 'F', text: "Bí mật góc khuất mà báo chí không đưa tin.", weight: [0, 0, 0, 0, 0, 10, 0] }
        ]
    },
    {
        text: "Bạn có xu hướng tương tác với video TikTok/Reels nào hơn?",
        hints: [
            { label: 'A', text: "Vẽ lại logo thương hiệu trong 1 phút (kỹ năng, quy trình).", weight: [10, 0, 0, 0, 0, 0, 0] },
            { label: 'B', text: "Cách nhận biết người nói dối qua ngôn ngữ cơ thể.", weight: [0, 10, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Video ghép ảnh 'trước và sau' của nhiếp ảnh gia.", weight: [0, 0, 10, 0, 0, 0, 0] },
            { label: 'D', text: "Giải thích chiến dịch marketing thất bại.", weight: [0, 0, 0, 10, 0, 0, 0] },
            { label: 'E', text: "Review sản phẩm công nghệ, thông số kỹ thuật.", weight: [10, 0, 0, 0, 5, 0, 0] },
            { label: 'F', text: "Hiện tượng tự nhiên/động vật kỳ lạ.", weight: [0, 0, 0, 0, 0, 10, 0] },
            { label: 'G', text: "5 phút thiền buổi sáng hướng dẫn từng bước.", weight: [0, 0, 0, 0, 0, 0, 10] }
        ]
    },
    {
        text: "Nếu bạn thấy bình luận của một người rất am hiểu trên mạng, phản ứng của bạn thường là gì?",
        hints: [
            { label: 'A', text: "Vào trang cá nhân đọc xem họ chia sẻ gì khác.", weight: [0, 0, 0, 0, 0, 5, 0] },
            { label: 'B', text: "Đặt câu hỏi chuyên sâu để được giải đáp.", weight: [5, 0, 0, 0, 0, 5, 0] },
            { label: 'C', text: "Lưu lại bình luận để sau này xem lại.", weight: [0, 0, 0, 0, 5, 0, 0] },
            { label: 'D', text: "Thấy hơi 'ngợp' vì kiến thức và lướt qua.", weight: [0, 0, 0, 0, 0, 0, 0] },
            { label: 'E', text: "Nghi ngờ họ copy ở đâu đó thôi.", weight: [0, 0, 0, 0, 0, 0, 0] }
        ]
    },
    {
        text: "Hãy tưởng tượng một nhóm bạn đang 'cãi nhau' về một chủ đề trên mạng. Bạn sẽ làm gì?",
        hints: [
            { label: 'A', text: "Đọc hết comment xem ai đúng sai, lý lẽ bên nào vững.", weight: [10, 0, 0, 0, 0, 0, 0] },
            { label: 'B', text: "Chỉ đọc lướt, thấy mệt và rời đi.", weight: [0, 0, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Tham gia bảo vệ quan điểm nếu thấy người khác hiểu sai.", weight: [0, 5, 0, 10, 0, 0, 0] },
            { label: 'D', text: "Tag bạn bè vào xem 'hóng hớt'.", weight: [0, 5, 0, 0, 0, 0, 0] },
            { label: 'E', text: "Không quan tâm lắm.", weight: [0, 0, 0, 0, 0, 0, 0] }
        ]
    },
    {
        text: "Nếu bạn thấy thông báo cuộc thi trong lĩnh vực bạn yêu thích, suy nghĩ đầu tiên là gì?",
        hints: [
            { label: 'A', text: "Xem điều kiện tham gia có gì khó không.", weight: [0, 0, 0, 0, 0, 0, 10] },
            { label: 'B', text: "Chắc toàn cao thủ thôi, mình tham gia chỉ tốn thời gian.", weight: [0, 0, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Không biết giải thưởng có giá trị lớn không.", weight: [0, 0, 0, 0, 10, 0, 0] },
            { label: 'D', text: "Tag người bạn hợp với cuộc thi này.", weight: [0, 10, 0, 0, 0, 0, 0] },
            { label: 'E', text: "Lướt qua ngay vì không phải lĩnh vực mình.", weight: [0, 0, 0, 0, 0, 0, 0] }
        ]
    },
    {
        text: "Nội dung nào ám ảnh khiến bạn suy nghĩ nhiều nhất trong tuần qua?",
        hints: [
            { label: 'A', text: "Một công thức/giải pháp kỹ thuật cho vấn đề gặp phải.", weight: [10, 0, 0, 0, 0, 0, 0] },
            { label: 'B', text: "Câu chuyện cảm động về lòng tốt con người.", weight: [0, 10, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Tác phẩm nghệ thuật thị giác đầy ám ảnh.", weight: [0, 0, 10, 0, 0, 0, 0] },
            { label: 'D', text: "Bài phân tích sắc bén về tình hình chính trị/xã hội.", weight: [0, 0, 0, 10, 0, 0, 0] },
            { label: 'E', text: "Câu nói hay về sự giàu có và thành công.", weight: [0, 0, 0, 0, 10, 0, 0] },
            { label: 'F', text: "Bức ảnh chụp sao trời tuyệt đẹp.", weight: [0, 0, 0, 0, 0, 10, 0] },
            { label: 'G', text: "Lời khuyên tâm lý giúp nhìn nhận lại bản thân.", weight: [0, 0, 0, 0, 0, 0, 10] }
        ]
    },

    // Tình huống 3: Giải quyết vấn đề cho người khác
    {
        text: "Nếu một người bạn thân gặp khó khăn và tâm sự với bạn, bạn sẽ làm gì để giúp họ?",
        hints: [
            { label: 'A', text: "Giúp họ phân tích vấn đề, tìm nguyên nhân gốc rễ và đề xuất giải pháp.", weight: [10, 0, 0, 0, 0, 0, 0] },
            { label: 'B', text: "Lắng nghe, đồng cảm và động viên họ vượt qua.", weight: [0, 15, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Kể câu chuyện tương tự và cách người khác giải quyết.", weight: [0, 10, 5, 0, 0, 0, 0] },
            { label: 'D', text: "Giới thiệu người khác có thể giúp tốt hơn.", weight: [0, 10, 0, 0, 0, 0, 0] },
            { label: 'E', text: "Khuyên họ bỏ đi kiếm việc khác mà làm.", weight: [0, 0, 0, 0, 5, 0, 0] },
            { label: 'F', text: "Hỏi họ muốn tình huống này kết thúc thế nào.", weight: [0, 5, 0, 0, 0, 0, 10] }
        ]
    },
    {
        text: "Khi giải thích khái niệm phức tạp cho người khác, bạn thích gì nhất?",
        hints: [
            { label: 'A', text: "Vẽ sơ đồ, đưa ra công thức dễ hình dung.", weight: [10, 0, 0, 0, 0, 0, 0] },
            { label: 'B', text: "Dùng chuyện đời thường, ví dụ gần gũi.", weight: [0, 10, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Tạo ra hình ảnh ẩn dụ đẹp, dễ nhớ.", weight: [0, 0, 10, 0, 0, 0, 0] },
            { label: 'D', text: "Chỉ cho họ thấy ứng dụng thực tế.", weight: [0, 0, 0, 10, 0, 0, 0] },
            { label: 'E', text: "Tìm video YouTube cho họ xem nhanh hơn.", weight: [0, 0, 0, 0, 5, 0, 0] },
            { label: 'F', text: "Kiên nhẫn giải thích đến khi họ hiểu thực sự.", weight: [0, 5, 0, 0, 0, 0, 5] }
        ]
    },
    {
        text: "Nếu bạn thấy một sản phẩm 'cẩu thả' ngoài thị trường, suy nghĩ đầu tiên của bạn là gì?",
        hints: [
            { label: 'A', text: "Tôi có thể thiết kế lại quy trình để nó tốt hơn.", weight: [10, 0, 0, 0, 0, 0, 0] },
            { label: 'B', text: "Khách hàng chắc thất vọng dữ lắm.", weight: [0, 10, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Thương hiệu này đang đánh mất uy tín.", weight: [0, 0, 0, 5, 5, 0, 0] },
            { label: 'D', text: "Nếu là tôi, tôi đã làm nó khác đi (cá nhân hóa).", weight: [0, 0, 10, 0, 0, 0, 0] },
            { label: 'E', text: "Thôi, bỏ qua.", weight: [0, 0, 0, 0, 0, 0, 0] }
        ]
    },
    {
        text: "Hãy tưởng tượng đồng nghiệp trình bày ý tưởng mới có nhiều lỗ hổng. Bạn sẽ xử lý thế nào?",
        hints: [
            { label: 'A', text: "Chỉ ra ngay lỗi logic và đề xuất cách sửa.", weight: [10, 0, 0, 0, 0, 0, 0] },
            { label: 'B', text: "Khen ngợi trước, sau đó hỏi nhẹ nhàng để họ tự nhận ra.", weight: [0, 10, 0, 5, 0, 0, 0] },
            { label: 'C', text: "Im lặng để không làm mất lòng.", weight: [0, 5, 0, 0, 0, 0, 0] },
            { label: 'D', text: "Vẽ sơ đồ tư duy chỉ ra điểm mạnh yếu.", weight: [5, 0, 0, 10, 0, 0, 0] },
            { label: 'E', text: "Khuyên họ cân nhắc thêm các phần khác.", weight: [0, 0, 0, 5, 5, 0, 0] }
        ]
    },
    {
        text: "Bạn được giao tổ chức sự kiện cho nhóm. Bạn hào hứng phần nào nhất?",
        hints: [
            { label: 'A', text: "Lên kế hoạch chi tiết, phân công, quản lý thời gian.", weight: [10, 0, 0, 0, 5, 0, 0] },
            { label: 'B', text: "Tạo không khí vui vẻ, kết nối mọi người.", weight: [0, 10, 0, 0, 0, 0, 5] },
            { label: 'C', text: "Trang trí, thiết kế backdrop, chọn nhạc có gu.", weight: [0, 0, 15, 0, 0, 0, 0] },
            { label: 'D', text: "Lên ý tưởng chủ đề ấn tượng, tầm ảnh hưởng.", weight: [0, 0, 10, 10, 0, 0, 0] },
            { label: 'E', text: "Tìm kiếm nhà tài trợ, quà tặng để tối ưu chi phí.", weight: [0, 0, 0, 0, 15, 0, 0] },
            { label: 'F', text: "Nghĩ ra các trò chơi team-building mới lạ.", weight: [0, 5, 10, 0, 0, 0, 0] }
        ]
    },
    {
        text: "Nếu chứng kiến một người bị đối xử bất công, phản ứng tự nhiên nhất của bạn là gì?",
        hints: [
            { label: 'A', text: "Tìm cách can thiệp bảo vệ họ ngay lập tức.", weight: [0, 5, 0, 10, 0, 0, 0] },
            { label: 'B', text: "Tìm hiểu rõ đầu đuôi câu chuyện trước khi hành động.", weight: [5, 5, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Bất bình nhưng ngại va chạm nên đứng ngoài.", weight: [0, 0, 0, 0, 0, 0, 0] },
            { label: 'D', text: "Viết bài mạng xã hội để lên án sự bất công.", weight: [0, 5, 0, 10, 0, 0, 0] },
            { label: 'E', text: "An ủi người bị hại sau sự việc.", weight: [0, 10, 0, 0, 0, 0, 0] }
        ]
    },
    {
        text: "Giả sử bạn đang hướng dẫn người mới, bạn cảm thấy mệt mỏi nhất khi gặp tình huống nào?",
        hints: [
            { label: 'A', text: "Họ không chịu đọc tài liệu, cứ hỏi đi hỏi lại cơ bản.", weight: [10, 0, 0, 0, 0, 0, 5] },
            { label: 'B', text: "Họ làm việc cẩu thả, sai sót chi tiết liên tục.", weight: [10, 0, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Họ thụ động, không có chính kiến, chỉ dạ vâng.", weight: [0, 0, 0, 5, 0, 0, 10] },
            { label: 'D', text: "Họ không tôn trọng, cãi lại kinh nghiệm của bạn.", weight: [0, 0, 0, 10, 0, 0, 0] },
            { label: 'E', text: "Dù cố gắng hết sức nhưng họ không tiến bộ.", weight: [0, 10, 0, 0, 0, 0, 5] }
        ]
    },
    {
        text: "Nếu tham gia một nhóm tình nguyện, công việc nào bạn thấy phù hợp với mình nhất?",
        hints: [
            { label: 'A', text: "Điều phối, sắp xếp công việc cho các tình nguyện viên.", weight: [0, 0, 0, 10, 5, 0, 0] },
            { label: 'B', text: "Trực tiếp đi phát quà, trò chuyện động viên.", weight: [0, 15, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Chụp ảnh, viết bài truyền thông cho nhóm.", weight: [0, 0, 10, 0, 0, 0, 5] },
            { label: 'D', text: "Lên kế hoạch gây quỹ, kêu gọi mạnh thường quân.", weight: [0, 0, 0, 5, 15, 0, 0] },
            { label: 'E', text: "Dạy học cho trẻ em nghèo.", weight: [0, 10, 0, 0, 0, 0, 10] },
            { label: 'F', text: "Không tham gia vì quá bận.", weight: [0, 0, 0, 0, 0, 0, 0] }
        ]
    },
    {
        text: "Nếu một người lạ hỏi bạn vấn đề chuyên môn trên mạng, bạn sẽ làm gì?",
        hints: [
            { label: 'A', text: "Trả lời chi tiết, tận tình kèm cả tài liệu.", weight: [5, 10, 0, 0, 0, 0, 0] },
            { label: 'B', text: "Trả lời ngắn gọn, hướng dẫn họ tự tìm hiểu.", weight: [5, 0, 0, 0, 0, 0, 5] },
            { label: 'C', text: "Không trả lời vì không có thời gian.", weight: [0, 0, 0, 0, 0, 0, 0] },
            { label: 'D', text: "Hỏi lại họ đã tìm hiểu ở đâu chưa.", weight: [5, 0, 0, 0, 0, 0, 0] },
            { label: 'E', text: "Giới thiệu khóa học có phí của bạn.", weight: [0, 0, 0, 0, 10, 0, 0] }
        ]
    },
    {
        text: "Sau khi dự án nhóm thành công kết thúc, điều gì làm bạn cảm thấy tự hào nhất?",
        hints: [
            { label: 'A', text: "Sản phẩm cuối cùng hoàn hảo như thiết kế.", weight: [15, 0, 0, 0, 0, 0, 0] },
            { label: 'B', text: "Các thành viên gắn kết và vui vẻ với nhau.", weight: [0, 15, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Dự án có 'bản sắc' riêng biệt.", weight: [0, 0, 15, 0, 0, 0, 0] },
            { label: 'D', text: "Đạt được mục tiêu lớn lao đầu đề ra.", weight: [0, 0, 0, 15, 0, 0, 0] },
            { label: 'E', text: "Hoàn thành đúng tiến độ và ngân sách.", weight: [0, 0, 0, 0, 15, 0, 0] },
            { label: 'F', text: "Cả nhóm cùng vượt qua vô số khó khăn.", weight: [0, 5, 0, 0, 0, 0, 10] }
        ]
    },
    // PHẦN 2: CÂU HỎI CHIỀU SÂU - KHÁM PHÁ TRĂN TRỞ (25 câu)
    {
        text: "Hãy nghĩ về một công việc thường ngày bạn cực kỳ ghét làm. Điều gì khiến bạn ghét nó nhất?",
        hints: [
            { label: 'A', text: "Lặp đi lặp lại, thiếu tính thử thách trí tuệ.", weight: [5, 0, 0, 0, 0, 0, 0] },
            { label: 'B', text: "Phải tương tác với quá nhiều người tiêu cực.", weight: [0, 5, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Gò bó, không có không gian sáng tạo.", weight: [0, 0, 5, 0, 0, 0, 0] },
            { label: 'D', text: "Vô nghĩa, không đóng góp giá trị chiến lược.", weight: [0, 0, 0, 5, 0, 0, 0] },
            { label: 'E', text: "Mất thời gian nhưng thu nhập không xứng đáng.", weight: [0, 0, 0, 0, 5, 0, 0] }
        ]
    },
    {
        text: "Nếu nhìn vào quy trình làm việc hiện tại, bước nào làm bạn cảm thấy 'mất thời gian vô ích' nhất?",
        hints: [
            { label: 'A', text: "Các thủ tục hành chính, giấy tờ tẻ nhạt.", weight: [5, 0, 0, 0, 5, 0, 0] },
            { label: 'B', text: "Phải giải thích đi giải thích lại cho người khác.", weight: [0, 5, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Chỉnh sửa những chi tiết vụn vặt thẩm mỹ.", weight: [0, 0, 5, 0, 0, 0, 0] },
            { label: 'D', text: "Hội họp liên miên không đi đến quyết định.", weight: [0, 0, 0, 5, 0, 0, 0] }
        ]
    },
    {
        text: "Trong cuộc sống hiện tại, có điều gì khiến bạn cảm thấy 'bế tắc' nhất không?",
        hints: [
            { label: 'A', text: "Thiếu kiến thức/kỹ năng để giải quyết vấn đề.", weight: [5, 0, 0, 0, 0, 0, 0] },
            { label: 'B', text: "Không tìm được người đồng điệu, thấu hiểu.", weight: [0, 5, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Mất đi niềm cảm hứng sáng tạo mỗi ngày.", weight: [0, 0, 5, 0, 0, 0, 0] },
            { label: 'D', text: "Không thấy được tương lai sự nghiệp rõ ràng.", weight: [0, 0, 0, 5, 0, 0, 0] },
            { label: 'E', text: "Áp lực tài chính đè nặng.", weight: [0, 0, 0, 0, 5, 0, 0] }
        ]
    },
    {
        text: "Bạn sẵn sàng chi tiền cho sản phẩm/dịch vụ để giải quyết vấn đề gì?",
        hints: [
            { label: 'A', text: "Công cụ giúp tự động hóa công việc.", weight: [10, 0, 0, 0, 5, 0, 0] },
            { label: 'B', text: "Khóa học tâm lý, kết nối bản thân.", weight: [0, 10, 0, 0, 0, 0, 10] },
            { label: 'C', text: "Thiết bị hỗ trợ sáng tạo nghệ thuật.", weight: [0, 0, 15, 0, 0, 0, 0] },
            { label: 'D', text: "Tư vấn chiến lược từ chuyên gia đầu ngành.", weight: [0, 0, 0, 15, 0, 0, 0] }
        ]
    },
    {
        text: "Hãy kể về lần bạn bực mình đến mức muốn viết bài phàn nàn về một sản phẩm. Bạn phàn nàn gì?",
        hints: [
            { label: 'A', text: "Lỗi kỹ thuật, hỏng hóc hoặc vận hành sai.", weight: [10, 0, 0, 0, 0, 0, 0] },
            { label: 'B', text: "Thái độ phục vụ của nhân viên quá tệ.", weight: [0, 10, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Thiết kế xấu, khó dùng, không thẩm mỹ.", weight: [0, 0, 10, 0, 0, 0, 0] },
            { label: 'D', text: "Quảng cáo sai sự thật, lừa dối khách hàng.", weight: [0, 0, 0, 10, 5, 0, 0] }
        ]
    },
    {
        text: "Nếu có thể 'thuê' ai đó làm một việc để bạn không bao giờ phải làm nữa, đó là việc gì?",
        hints: [
            { label: 'A', text: "Các công việc tính toán, kỹ thuật khô khan.", weight: [5, 0, 0, 0, 0, 0, 0] },
            { label: 'B', text: "Gặp gỡ khách hàng, thương thảo khó khăn.", weight: [0, 5, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Dọn dẹp, sắp xếp không gian sống.", weight: [0, 0, 0, 0, 0, 0, 5] },
            { label: 'D', text: "Lập kế hoạch và quản lý dự án phức tạp.", weight: [0, 0, 0, 10, 0, 0, 0] }
        ]
    },
    {
        text: "Bạn lo lắng điều gì nhất nếu tiếp tục trì hoãn mục tiêu trong 1 năm tới?",
        hints: [
            { label: 'A', text: "Bị tụt hậu về kiến thức so với đồng nghiệp.", weight: [10, 0, 0, 0, 0, 0, 0] },
            { label: 'B', text: "Mất đi niềm tin vào chính mình và lòng tự trọng.", weight: [0, 5, 0, 0, 0, 0, 10] },
            { label: 'C', text: "Cảm thấy cuộc đời vô nghĩa, không có điểm nhấn.", weight: [0, 5, 10, 0, 0, 0, 0] },
            { label: 'D', text: "Đánh mất những cơ hội tài chính lớn.", weight: [0, 0, 0, 0, 10, 0, 0] }
        ]
    },
    {
        text: "Nếu bây giờ bạn bắt đầu thay đổi, điều tuyệt vời nhất xảy đến trong 3 năm tới là gì?",
        hints: [
            { label: 'A', text: "Trở thành chuyên gia xuất sắc trong lĩnh vực của mình.", weight: [15, 0, 0, 0, 0, 0, 0] },
            { label: 'B', text: "Có những mối quan hệ sâu sắc và ý nghĩa.", weight: [0, 15, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Tạo ra những tác phẩm/sản phẩm để đời.", weight: [0, 0, 15, 0, 0, 0, 0] },
            { label: 'D', text: "Đạt được sự tự do tài chính hoàn toàn.", weight: [0, 0, 0, 0, 15, 0, 0] }
        ]
    },
    {
        text: "Nghĩ về một quyết định sai lầm gần đây. Bạn đã bỏ qua dấu hiệu cảnh báo nào?",
        hints: [
            { label: 'A', text: "Dấu hiệu về logic, số liệu không khớp.", weight: [10, 0, 0, 0, 0, 0, 0] },
            { label: 'B', text: "Linh cảm không ổn về con người đó.", weight: [0, 10, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Cảm nhận về sự mất cân bằng trong thẩm mỹ/trực giác.", weight: [0, 0, 10, 0, 0, 0, 0] },
            { label: 'D', text: "Cảnh báo về rủi ro tài chính quá cao.", weight: [0, 0, 0, 0, 10, 0, 0] }
        ]
    },
    {
        text: "Một người bạn thân sẽ nói 'điểm mù' lớn nhất của bạn là gì?",
        hints: [
            { label: 'A', text: "Quá cứng nhắc, coi trọng logic mà quên cảm xúc.", weight: [0, 10, 0, 0, 0, 0, 0] },
            { label: 'B', text: "Quá bao dung, dễ bị người khác lợi dụng.", weight: [0, 0, 0, 5, 0, 0, 5] },
            { label: 'C', text: "Quá mơ mộng, thiếu thực tế.", weight: [0, 0, 0, 0, 15, 0, 0] },
            { label: 'D', text: "Quá cầu toàn, chậm trễ ra quyết định.", weight: [0, 0, 0, 0, 0, 0, 10] }
        ]
    },
    {
        text: "Bạn cảm thấy ghen tị nhất với ai? Điều đó nói lên khao khát gì của bạn?",
        hints: [
            { label: 'A', text: "Ghen tị với kiến thức uyên bác của họ.", weight: [10, 0, 0, 0, 0, 0, 0] },
            { label: 'B', text: "Ghen tị với sự được yêu mến, nhiều mối quan hệ.", weight: [0, 10, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Ghen tị với sự tự do sáng tạo không biên giới.", weight: [0, 0, 15, 0, 0, 0, 0] },
            { label: 'D', text: "Ghen tị với quyền lực và tầm ảnh hưởng.", weight: [0, 0, 0, 15, 0, 0, 0] },
            { label: 'E', text: "Ghen tị với sự giàu sang, thượng lưu.", weight: [0, 0, 0, 0, 15, 0, 0] }
        ]
    },
    {
        text: "Nhìn lại 5 năm trước. Bạn ước gì mình đã biết điều gì sớm hơn?",
        hints: [
            { label: 'A', text: "Kỹ năng chuyên môn hái ra tiền.", weight: [10, 0, 0, 0, 0, 0, 0] },
            { label: 'B', text: "Cách đối nhân xử thế, thấu hiểu lòng người.", weight: [0, 10, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Tầm quan trọng của việc tin vào chính mình.", weight: [0, 0, 0, 0, 0, 0, 15] },
            { label: 'D', text: "Cách quản lý tài chính cá nhân sớm.", weight: [0, 0, 0, 0, 15, 0, 0] }
        ]
    },
    {
        text: "Hãy thành thật, bạn thường có xu hướng né tránh những cuộc trò chuyện nào?",
        hints: [
            { label: 'A', text: "Tranh luận gay gắt về kiến thức, chuyên môn.", weight: [0, 0, 0, 0, 0, 0, 0] },
            { label: 'B', text: "Đối chất về tình cảm, mâu thuẫn cá nhân.", weight: [0, 10, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Đòi nợ hoặc nói về sòng phẳng tiền bạc.", weight: [0, 0, 0, 0, 10, 0, 0] },
            { label: 'D', text: "Thương thảo hợp đồng, quyền lợi sát sườn.", weight: [0, 0, 0, 10, 0, 0, 0] }
        ]
    },
    {
        text: "Bạn thấy mình có tài lẻ gì mà không bao giờ khoe ra?",
        hints: [
            { label: 'A', text: "Tính toán nhẩm cực nhanh.", weight: [15, 0, 0, 0, 0, 0, 0] },
            { label: 'B', text: "Nhìn thấu tâm trạng người khác chỉ qua ánh mắt.", weight: [0, 15, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Họa tiết, trang trí thủ công vô cùng tinh tế.", weight: [0, 0, 15, 0, 0, 0, 0] },
            { label: 'D', text: "Phát hiện ra quy luật kinh doanh từ những việc nhỏ.", weight: [0, 0, 0, 0, 15, 0, 0] }
        ]
    },
    {
        text: "Hãy kể cho tôi nghe một câu chuyện về tuổi thơ của bạn. Câu chuyện đó nói lên điều gì?",
        hints: [
            { label: 'A', text: "Thích tháo tung đồ đạc ra để xem nó hoạt động thế nào.", weight: [10, 0, 0, 0, 0, 0, 0] },
            { label: 'B', text: "Hay chia sẻ đồ ăn, đồ chơi với các bạn cùng lứa.", weight: [0, 10, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Luôn vẽ lên tường, sáng tạo những trò chơi mới.", weight: [0, 0, 15, 0, 0, 0, 0] },
            { label: 'D', text: "Thích làm 'đại ca' chỉ huy cả nhóm bạn.", weight: [0, 0, 0, 15, 0, 0, 0] }
        ]
    },
    {
        text: "Bạn từng thức trắng đêm để làm việc gì chỉ vì nó quá cuốn hút?",
        hints: [
            { label: 'A', text: "Giải một bài toán, viết một đoạn code.", weight: [15, 0, 0, 0, 0, 0, 0] },
            { label: 'B', text: "Tâm sự thâu đêm với một người bạn thân.", weight: [0, 15, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Hoàn thiện một bản thiết kế, tranh vẽ.", weight: [0, 0, 15, 0, 0, 0, 0] },
            { label: 'D', text: "Nghiên cứu thị trường chứng khoán/đầu tư.", weight: [0, 0, 0, 0, 15, 0, 0] }
        ]
    },
    {
        text: "Khi xem phim, bạn bị cuốn hút nhất bởi thể loại nhân vật nào?",
        hints: [
            { label: 'A', text: "Thiên tài lập dị, giải quyết vấn đề khó tin.", weight: [15, 0, 0, 0, 0, 0, 0] },
            { label: 'B', text: "Người kết nối, hy sinh vì tập thể.", weight: [0, 15, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Người nghệ sĩ bay bổng, tâm hồn tự do.", weight: [0, 0, 15, 0, 0, 0, 0] },
            { label: 'D', text: "Nhà chiến lược đại tài, đứng sau tất cả.", weight: [0, 0, 0, 15, 0, 0, 0] }
        ]
    },
    {
        text: "Bạn có 'sở thích xấu hổ' nào không? Điều gì ở đó khiến bạn thích?",
        hints: [
            { label: 'A', text: "Đọc truyện ngôn tình/xem phim Hàn sướt mướt.", weight: [0, 10, 0, 0, 0, 0, 0] },
            { label: 'B', text: "Sưu tập những món đồ chơi trẻ con, mô hình kỹ thuật.", weight: [5, 0, 0, 0, 0, 0, 5] },
            { label: 'C', text: "Thích ngắm nhìn những thứ có trật tự hoàn hảo.", weight: [10, 0, 0, 0, 0, 0, 0] },
            { label: 'D', text: "Ước được làm tổng thống/ông chủ quyền lực.", weight: [0, 0, 0, 10, 0, 0, 0] }
        ]
    },
    {
        text: "Nếu chắc chắn rằng mình không thể thất bại, bạn sẽ dám thử thực hiện điều điên rồ nhất nào?",
        hints: [
            { label: 'A', text: "Nghỉ việc và khởi nghiệp lĩnh vực hoàn toàn mới.", weight: [0, 0, 0, 15, 10, 0, 0] },
            { label: 'B', text: "Tỏ tình với người mình thầm mến từ lâu.", weight: [0, 15, 0, 0, 0, 0, 5] },
            { label: 'C', text: "Tổ chức một buổi triển lãm nghệ thuật của riêng mình.", weight: [0, 0, 20, 0, 0, 0, 0] },
            { label: 'D', text: "Du hành một mình vòng quanh thế giới.", weight: [0, 0, 0, 0, 0, 10, 10] }
        ]
    },
    {
        text: "Điều gì trên thế giới này khiến bạn thực sự tức giận nhất?",
        hints: [
            { label: 'A', text: "Sự bất công, kẻ mạnh ức hiếp kẻ yếu.", weight: [0, 5, 0, 15, 0, 0, 0] },
            { label: 'B', text: "Sự lãng phí nguồn lực và thời gian.", weight: [0, 0, 0, 0, 15, 0, 0] },
            { label: 'C', text: "Sự giả dối, phản bội niềm tin con người.", weight: [0, 15, 0, 0, 0, 0, 0] },
            { label: 'D', text: "Sự thiếu hiểu biết và thủ cựu bảo vệ sai lầm.", weight: [10, 0, 0, 0, 0, 0, 5] }
        ]
    },
    {
        text: "Nếu không sợ bất kỳ phản ứng nào, bạn muốn nói ra bí mật gì với gia đình nhất?",
        hints: [
            { label: 'A', text: "Tôi muốn sống theo cách tôi thích, không theo định hướng.", weight: [0, 0, 0, 0, 0, 0, 20] },
            { label: 'B', text: "Tôi thực sự không quan tâm đến bằng cấp/danh vọng.", weight: [0, 0, 10, 0, 0, 0, 10] },
            { label: 'C', text: "Về chuyện tình cảm kín đáo của tôi.", weight: [0, 15, 0, 0, 0, 0, 0] },
            { label: 'D', text: "Về khoản nợ hoặc đầu tư thất bại.", weight: [0, 0, 0, 0, 15, 0, 0] }
        ]
    },
    {
        text: "Hãy nghĩ về khoảnh khắc bạn 'sống thật' nhất. Khi đó bạn đang ở đâu, làm gì?",
        hints: [
            { label: 'A', text: "Khi đắm chìm trong đam mê nghiên cứu, học tập.", weight: [15, 0, 0, 0, 0, 0, 0] },
            { label: 'B', text: "Khi hòa mình vào thiên nhiên, đi phượt xa.", weight: [0, 0, 0, 0, 0, 10, 10] },
            { label: 'C', text: "Khi sáng tác, biểu diễn nghệ thuật.", weight: [0, 0, 15, 0, 0, 0, 0] },
            { label: 'D', text: "Khi tranh luận và bảo vệ được lý tưởng của mình.", weight: [0, 0, 0, 15, 0, 0, 0] }
        ]
    },
    {
        text: "Hãy nhìn lại công việc hiện tại, phần nào khiến bạn cảm thấy mình đang bị 'chết mòn' dần?",
        hints: [
            { label: 'A', text: "Môi trường độc hại, đấu đá nội bộ.", weight: [0, 0, 0, 10, 0, 0, 0] },
            { label: 'B', text: "Các tác vụ lặp đi lặp lại tẻ nhạt.", weight: [10, 0, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Không có quyền tự quyết, bị sai bảo quá nhiều.", weight: [0, 0, 0, 15, 0, 0, 0] },
            { label: 'D', text: "Lương quá thấp so với công sức bỏ ra.", weight: [0, 0, 0, 0, 15, 0, 0] }
        ]
    },
    {
        text: "Nếu một đồng nghiệp trẻ xin lời khuyên chân thành, bạn muốn khuyên họ điều gì nhất?",
        hints: [
            { label: 'A', text: "Hãy tập trung mài dũa kỹ năng, đó là gốc rễ.", weight: [10, 0, 0, 0, 0, 0, 10] },
            { label: 'B', text: "Hãy học cách xây dựng mối quan hệ, nó rất quan trọng.", weight: [0, 15, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Đừng bao giờ để ngọn lửa đam mê sáng tạo nguội đi.", weight: [0, 0, 15, 0, 0, 0, 0] },
            { label: 'D', text: "Luôn có tư duy quản lý tài chính và tiết kiệm.", weight: [0, 0, 0, 0, 15, 0, 0] }
        ]
    },
    {
        text: "Bạn thấy mình giống nhân vật nào nhất trong phim/sách? Ở điểm nào?",
        hints: [
            { label: 'A', text: "Giống Sherlock Holmes: Sắc sảo, logic và cô đơn.", weight: [15, 0, 0, 0, 0, 5, 0] },
            { label: 'B', text: "Giống Naruto: Kiên trì, nhiệt huyết và vì đồng đội.", weight: [0, 15, 0, 0, 0, 0, 10] },
            { label: 'C', text: "Giống nhân vật nghệ sĩ tự do, lang thang tìm cái đẹp.", weight: [0, 0, 20, 0, 0, 0, 0] },
            { label: 'D', text: "Giống nhà vua/lãnh đạo phải hy sinh cá nhân vì đại cuộc.", weight: [0, 0, 0, 15, 0, 0, 5] }
        ]
    },
    // PHẦN 3: CÂU HỎI TƯỞNG TƯỢNG & PHÉP MÀU (20 câu)
    {
        text: "Giả sử đêm nay có một phép màu xảy ra và mọi rào cản biến mất. Sáng mai thức dậy, dấu hiệu nào cho bạn biết mình đang thực hiện đúng đam mê?",
        hints: [
            { label: 'A', text: "Thức dậy với đầu óc tỉnh táo, nảy ra ngay ý tưởng giải quyết vấn đề kỹ thuật.", weight: [10, 0, 0, 0, 0, 0, 0] },
            { label: 'B', text: "Cảm thấy yêu đời, muốn kết nối và giúp đỡ mọi người ngay.", weight: [0, 10, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Muốn bắt tay vào vẽ, viết hoặc sáng tạo điều gì đó.", weight: [0, 0, 15, 0, 0, 0, 0] },
            { label: 'D', text: "Có kế hoạch rõ ràng và hừng hực khí thế thực hiện.", weight: [0, 0, 0, 10, 5, 0, 0] }
        ]
    },
    {
        text: "Sau phép màu, bạn soi gương buổi sáng. Bạn thấy nụ cười của mình thế nào?",
        hints: [
            { label: 'A', text: "Nụ cười tự tin của người làm chủ được kiến thức.", weight: [5, 0, 0, 0, 0, 0, 0] },
            { label: 'B', text: "Nụ cười ấm áp, rạng rỡ vì cảm thấy được yêu thương.", weight: [0, 10, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Ánh mắt đầy ý tưởng và sự tinh nghịch sáng tạo.", weight: [0, 0, 10, 0, 0, 0, 0] },
            { label: 'D', text: "Vẻ mặt kiên định, sẵn sàng chinh phục thử thách.", weight: [0, 0, 0, 10, 0, 0, 0] }
        ]
    },
    {
        text: "Người đầu tiên bạn gặp sau khi phép màu xảy ra là ai? Bạn nói gì với họ?",
        hints: [
            { label: 'A', text: "Nói với cộng sự về một bước đột phá mới.", weight: [10, 0, 0, 0, 0, 0, 0] },
            { label: 'B', text: "Nói lời cảm ơn và yêu thương với người thân.", weight: [0, 10, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Kể cho bạn bè về một dự án điên rồ vừa nảy ra.", weight: [0, 0, 10, 5, 0, 0, 0] },
            { label: 'D', text: "Thông báo về một kế hoạch phát triển lớn.", weight: [0, 0, 0, 10, 10, 0, 0] }
        ]
    },
    {
        text: "Trong ngày hôm đó, công việc đầu tiên bạn làm là gì? Ở đâu?",
        hints: [
            { label: 'A', text: "Tại phòng làm việc yên tĩnh, giải quyết số liệu.", weight: [10, 0, 0, 0, 0, 5, 0] },
            { label: 'B', text: "Tại quán cafe, gặp gỡ và lắng nghe khách hàng.", weight: [0, 10, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Tại studio, đắm mình vào không gian nghệ thuật.", weight: [0, 0, 15, 0, 0, 0, 0] },
            { label: 'D', text: "Tại văn phòng lớn, điều hành cuộc họp chiến lược.", weight: [0, 0, 0, 15, 10, 0, 0] }
        ]
    },
    {
        text: "Kết thúc ngày hôm đó, bạn cảm thấy mệt mỏi hay hạnh phúc? Bạn nghĩ gì trước khi ngủ?",
        hints: [
            { label: 'A', text: "Mệt nhưng sướng vì đã hiểu ra quy luật.", weight: [10, 0, 0, 0, 0, 0, 0] },
            { label: 'B', text: "Hạnh phúc vì đã giúp được ai đó thay đổi.", weight: [0, 15, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Lâng lâng vì vừa hoàn thành một tác phẩm ưng ý.", weight: [0, 0, 20, 0, 0, 0, 0] },
            { label: 'D', text: "Tự hào vì bước đầu tiến gần tới mục tiêu lớn.", weight: [0, 0, 0, 15, 5, 0, 0] }
        ]
    },
    {
        text: "Nếu 5 năm nữa bạn nổi tiếng, người ta sẽ gọi bạn là 'bậc thầy' của lĩnh vực gì?",
        hints: [
            { label: 'A', text: "Bậc thầy về giải thuật và hệ thống.", weight: [20, 0, 0, 0, 0, 0, 0] },
            { label: 'B', text: "Bậc thầy về tâm lý và kết nối con người.", weight: [0, 20, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Bậc thầy về sáng tạo và ngôn ngữ hình ảnh.", weight: [0, 0, 20, 0, 0, 0, 0] },
            { label: 'D', text: "Bậc thầy điều hành và quản trị đế chế triệu đô.", weight: [0, 0, 0, 20, 20, 0, 0] }
        ]
    },
    {
        text: "Giả sử bạn sống đến 90 tuổi. Bạn muốn điều gì được khắc trên bia mộ mình?",
        hints: [
            { label: 'A', text: "Người đã giải mã những bí ẩn của thế giới.", weight: [10, 0, 0, 0, 0, 10, 0] },
            { label: 'B', text: "Người đã mang lại hạnh phúc cho hàng triệu trái tim.", weight: [0, 15, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Người đã lưu lại cái đẹp vĩnh cửu cho nhân loại.", weight: [0, 0, 20, 0, 0, 0, 0] },
            { label: 'D', text: "Người đã kiến tạo và dẫn dắt một thế hệ vĩ đại.", weight: [0, 0, 0, 15, 0, 0, 10] }
        ]
    },
    {
        text: "Nhìn lại cuộc đời ở tuổi 80, bạn sợ nhất điều gì mình sẽ hối tiếc nhất?",
        hints: [
            { label: 'A', text: "Hối tiếc vì chưa đủ dũng cảm theo đuổi tri thức mới.", weight: [10, 0, 0, 0, 0, 0, 5] },
            { label: 'B', text: "Hối tiếc vì đã quá lạnh lùng với những người thân yêu.", weight: [0, 15, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Hối tiếc vì đã đánh mất chất riêng để chạy theo số đông.", weight: [0, 0, 20, 0, 0, 0, 0] },
            { label: 'D', text: "Hối tiếc vì đã sống một cuộc đời quá an toàn, nhỏ bé.", weight: [0, 0, 0, 10, 5, 0, 15] }
        ]
    },
    {
        text: "Nếu trúng số 100 tỷ đồng ngày mai, bạn sẽ tiếp tục làm công việc hiện tại không?",
        hints: [
            { label: 'A', text: "Có, vì tôi thực sự đam mê việc mình đang làm.", weight: [0, 0, 0, 0, 0, 0, 20] },
            { label: 'B', text: "Nghỉ ngay và đi du lịch, khám phá thế giới.", weight: [0, 0, 0, 0, 0, 15, 10] },
            { label: 'C', text: "Nghỉ để đầu tư vào dự án riêng hằng mong ước.", weight: [0, 0, 0, 10, 15, 0, 0] },
            { label: 'D', text: "Dùng tiền làm từ thiện và tham gia các hoạt động xã hội.", weight: [0, 15, 0, 0, 0, 0, 0] }
        ]
    },
    {
        text: "Bạn sẽ dùng số tiền 100 tỷ đó để giải quyết vấn đề gì đầu tiên?",
        hints: [
            { label: 'A', text: "Xây dựng phòng thí nghiệm/công ty công nghệ.", weight: [15, 0, 0, 0, 0, 0, 0] },
            { label: 'B', text: "Giúp đỡ người thân và xây trường học cho trẻ nghèo.", weight: [0, 15, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Tài trợ cho các nghệ sĩ trẻ và dự án sáng tạo.", weight: [0, 0, 15, 0, 0, 0, 0] },
            { label: 'D', text: "Thâu tóm các công ty tiềm năng để mở rộng tầm ảnh hưởng.", weight: [0, 0, 0, 15, 15, 0, 0] }
        ]
    },
    {
        text: "Bạn có mua một món đồ xa xỉ nào không? Đó là gì?",
        hints: [
            { label: 'A', text: "Dàn máy tính cực khủng hoặc thiết bị kỹ thuật đỉnh cao.", weight: [10, 0, 0, 0, 0, 0, 0] },
            { label: 'B', text: "Căn biệt thự ấm cúng để sum họp gia đình.", weight: [0, 10, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Một tác phẩm nghệ thuật/du thuyền được thiết kế riêng.", weight: [0, 0, 15, 0, 0, 0, 0] },
            { label: 'D', text: "Sở hữu một hòn đảo riêng để tĩnh dưỡng.", weight: [0, 0, 0, 0, 0, 0, 15] }
        ]
    },
    {
        text: "Nếu có thể 'dừng thời gian' một ngày mà không ai thấy, bạn làm gì trong 24 giờ đó?",
        hints: [
            { label: 'A', text: "Đọc hết những cuốn sách/tài liệu mật khó tiếp cận.", weight: [10, 0, 0, 0, 0, 10, 0] },
            { label: 'B', text: "Ở bên cạnh quan sát người mình thầm thương trộm nhớ.", weight: [0, 15, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Đi lang thang ngắm nhìn thế giới ở những góc độ đẹp nhất.", weight: [0, 0, 15, 0, 0, 0, 0] },
            { label: 'D', text: "Tìm hiểu các bí mật kinh doanh/chiến lược của đối thủ.", weight: [0, 0, 0, 10, 15, 0, 0] }
        ]
    },
    {
        text: "Nếu được 'tải' ngay một kỹ năng hoàn hảo vào não, bạn chọn kỹ năng gì?",
        hints: [
            { label: 'A', text: "Kỹ năng lập trình/toán học đỉnh cao.", weight: [15, 0, 0, 0, 0, 0, 0] },
            { label: 'B', text: "Kỹ năng thấu hiểu tâm lý và thôi miên bằng ngôn từ.", weight: [0, 15, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Kỹ năng hội họa/âm nhạc thiên tài.", weight: [0, 0, 20, 0, 0, 0, 0] },
            { label: 'D', text: "Kỹ năng lãnh đạo và quản trị vạn người.", weight: [0, 0, 0, 15, 10, 0, 0] }
        ]
    },
    {
        text: "Bạn dùng kỹ năng đó để tạo ra sản phẩm gì đầu tiên?",
        hints: [
            { label: 'A', text: "Một phần mềm thay đổi cuộc sống con người.", weight: [15, 0, 0, 0, 0, 0, 0] },
            { label: 'B', text: "Một phong trào/tổ chức hàn gắn vết thương xã hội.", weight: [0, 15, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Một kiệt tác nghệ thuật gây sốc toàn cầu.", weight: [0, 0, 20, 0, 0, 0, 0] },
            { label: 'D', text: "Một hệ thống kinh doanh tự vận hành siêu lợi nhuận.", weight: [0, 0, 0, 10, 15, 0, 0] }
        ]
    },
    {
        text: "Bạn có thể mời 3 người trong lịch sử đến dự bữa tối. Bạn mời ai và hỏi gì?",
        hints: [
            { label: 'A', text: "Mời các nhà khoa học lỗi lạc (Einstein, Tesla).", weight: [15, 0, 0, 0, 0, 5, 0] },
            { label: 'B', text: "Mời các nhà tư tưởng, triết gia (Socrates, Đức Phật).", weight: [0, 15, 0, 0, 0, 0, 10] },
            { label: 'C', text: "Mời các nghệ sĩ vĩ đại (Da Vinci, Van Gogh).", weight: [0, 0, 20, 0, 0, 0, 0] },
            { label: 'D', text: "Mời các nhà quân sự/lãnh đạo lẫy lừng (Napoleon, Steve Jobs).", weight: [0, 0, 0, 15, 15, 0, 0] }
        ]
    },
    {
        text: "Bạn muốn xây dựng một cộng đồng lý tưởng của mình. Giá trị cốt lõi là gì?",
        hints: [
            { label: 'A', text: "Sự minh bạch, logic và tiến bộ kỹ thuật.", weight: [15, 0, 0, 0, 0, 0, 0] },
            { label: 'B', text: "Lòng trắc ẩn, sự thấu cảm và sẻ chia.", weight: [0, 15, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Tôn trọng sự khác biệt và tự do sáng tạo.", weight: [0, 0, 15, 0, 0, 0, 0] },
            { label: 'D', text: "Sự kỷ luật, hiệu quả và thịnh vượng.", weight: [0, 0, 0, 10, 15, 0, 0] }
        ]
    },
    {
        text: "3 tính từ bạn muốn mọi người dùng để miêu tả về cộng đồng đó là gì?",
        hints: [
            { label: 'A', text: "Thông minh - Sắc bén - Tiên phong.", weight: [10, 0, 0, 0, 0, 0, 0] },
            { label: 'B', text: "Ấm áp - Tử tế - Chân thành.", weight: [0, 10, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Độc bản - Màu sắc - Tự do.", weight: [0, 0, 10, 0, 0, 0, 0] },
            { label: 'D', text: "Hùng mạnh - Quyết đoán - Giàu có.", weight: [0, 0, 0, 10, 10, 0, 0] }
        ]
    },
    {
        text: "Bạn sẽ tạo ra 'nghi thức' đặc biệt nào cho tổ chức của mình?",
        hints: [
            { label: 'A', text: "Giờ giải mật mã/logic mỗi tuần.", weight: [5, 0, 0, 0, 0, 0, 0] },
            { label: 'B', text: "Vòng tròn lắng nghe và chữa lành.", weight: [0, 10, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Lễ hội triển lãm những ý tưởng điên rồ nhất.", weight: [0, 0, 10, 0, 0, 0, 0] },
            { label: 'D', text: "Nghi lễ vinh danh những người tạo ra kết quả thực tế.", weight: [0, 0, 0, 10, 5, 0, 0] }
        ]
    },
    {
        text: "Hình dung bạn đứng trước 1000 người nói về đam mê của mình. Bạn nói câu mở đầu thế nào?",
        hints: [
            { label: 'A', text: "Tôi sẽ chứng minh cho bạn thấy logic đằng sau sự thành công.", weight: [10, 0, 0, 10, 0, 0, 0] },
            { label: 'B', text: "Hôm nay, tôi muốn chúng ta hãy mở rộng trái tim để lắng nghe nhau.", weight: [0, 15, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Mọi thứ bạn nhìn thấy ở đây, đều bắt đầu từ một giấc mơ.", weight: [0, 0, 15, 0, 0, 0, 0] },
            { label: 'D', text: "Tôi ở đây để thay đổi cách các bạn vận hành thế giới này.", weight: [0, 0, 0, 15, 10, 0, 0] }
        ]
    },
    {
        text: "Nếu sân khấu sụp đổ, thông điệp cuối cùng bạn muốn để lại là gì?",
        hints: [
            { label: 'A', text: "Đừng bao giờ ngừng đặt câu hỏi Tại sao.", weight: [10, 0, 0, 0, 0, 5, 5] },
            { label: 'B', text: "Tình yêu là sức mạnh lớn nhất trên đời.", weight: [0, 15, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Hãy mạo hiểm để sống một cuộc đời độc bản.", weight: [0, 0, 15, 0, 0, 0, 10] },
            { label: 'D', text: "Kết quả cuối cùng mới là thứ định nghĩa bạn.", weight: [0, 0, 0, 0, 15, 0, 0] }
        ]
    },

    // PHẦN 4: CÂU HỎI LỰA CHỌN & ƯU TIÊN (25 câu)
    {
        text: "Trong 5 điều sau, bạn sẵn sàng hy sinh điều nào NHẤT để đạt được 4 điều còn lại? (Tiền bạc, Danh tiếng, Tự do, Sức khỏe, Tình yêu)",
        hints: [
            { label: 'A', text: "Danh tiếng: Tôi không cần ai biết đến, miễn là tôi giỏi.", weight: [10, 0, 0, 0, 0, 5, 0] },
            { label: 'B', text: "Tiền bạc: Tôi chọn những giá trị tinh thần và cảm xúc.", weight: [0, 10, 5, 0, 0, 0, 10] },
            { label: 'C', text: "Tình yêu: Tôi sống vì lý tưởng và sự nghiệp lớn lao.", weight: [5, 0, 0, 15, 10, 0, 0] },
            { label: 'D', text: "Một lựa chọn khác (Tự do/Sức khỏe).", weight: [0, 0, 0, 0, 0, 0, 0] }
        ]
    },
    {
        text: "Nếu chỉ được một, bạn muốn cuốn sách bạn viết ra được đánh giá thế nào?",
        hints: [
            { label: 'A', text: "Cực kỳ hữu ích và thực tế.", weight: [15, 0, 0, 0, 10, 0, 0] },
            { label: 'B', text: "Cực kỳ lay động cảm xúc người đọc.", weight: [0, 15, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Cực kỳ đẹp và có giá trị nghệ thuật cao.", weight: [0, 0, 15, 0, 0, 0, 0] },
            { label: 'D', text: "Cực kỳ uyên thâm và thay đổi tư duy cả một thế hệ.", weight: [5, 0, 0, 15, 0, 0, 10] }
        ]
    },
    {
        text: "Nếu phải chọn giữa hai lời khen, bạn thích nghe lời nào hơn?",
        hints: [
            { label: 'A', text: "Bạn thật thông minh và giải quyết vấn đề nhanh gọn!", weight: [15, 0, 0, 0, 0, 0, 0] },
            { label: 'B', text: "Bạn thật tốt bụng và khiến mọi người thấy ấm áp!", weight: [0, 15, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Bạn có gu thẩm mỹ tuyệt vời, cái gì qua tay bạn cũng đẹp!", weight: [0, 0, 15, 0, 0, 0, 0] },
            { label: 'D', text: "Bạn có tầm nhìn xa, đi theo bạn là đúng hướng!", weight: [0, 0, 0, 15, 0, 0, 0] }
        ]
    },
    {
        text: "Bạn chọn quà sinh nhật cho người thân. Tiêu chí nào ưu tiên nhất?",
        hints: [
            { label: 'A', text: "Món quà thực sự hữu dụng, giải quyết vấn đề của họ.", weight: [15, 0, 0, 0, 0, 0, 0] },
            { label: 'B', text: "Món quà thể hiện được tình cảm sâu sắc của bạn.", weight: [0, 15, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Món quà đẹp, đóng gói tinh tế sang trọng.", weight: [0, 0, 15, 0, 0, 0, 0] },
            { label: 'D', text: "Món quà đắt tiền, thể hiện đẳng cấp.", weight: [0, 0, 0, 0, 15, 0, 0] }
        ]
    },
    {
        text: "Dựa vào yếu tố nào nhất để bạn chọn một bộ phim xem cuối tuần?",
        hints: [
            { label: 'A', text: "Nội dung thông minh, kịch tính, nhiều nút thắt.", weight: [15, 0, 0, 0, 0, 0, 0] },
            { label: 'B', text: "Diễn xuất hay, câu chuyện cảm động rơi nước mắt.", weight: [0, 15, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Hình ảnh đẹp, âm nhạc hay, đạo diễn có gu.", weight: [0, 0, 15, 0, 0, 0, 0] },
            { label: 'D', text: "Phim bom tấn, được nhiều người ca ngợi.", weight: [0, 0, 0, 10, 10, 0, 0] }
        ]
    },
    {
        text: "Điều gì dễ khiến bạn bỏ dở một cuốn sách hay nhất?",
        hints: [
            { label: 'A', text: "Quá dài dòng, lặp lại, thiếu thông tin mới.", weight: [10, 0, 0, 0, 0, 0, 0] },
            { label: 'B', text: "Nhân vật hành động thiếu logic, trái tâm lý con người.", weight: [0, 10, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Cách viết khô khan, thiếu hình ảnh sáng tạo.", weight: [0, 0, 10, 0, 0, 0, 0] },
            { label: 'D', text: "Tác giả đưa ra lập luận thiếu thuyết phục, ngụy biện.", weight: [10, 0, 0, 5, 0, 0, 0] }
        ]
    },
    {
        text: "Bạn cảm thấy nản lòng nhất khi học kỹ năng mới vào lúc nào?",
        hints: [
            { label: 'A', text: "Khi không thấy mình tiến bộ dù đã tập luyện nhiều.", weight: [10, 0, 0, 0, 0, 0, 5] },
            { label: 'B', text: "Khi không có ai hướng dẫn, phải tự mày mò cô đơn.", weight: [0, 10, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Khi sản phẩm làm ra quá xấu so với kỳ vọng thẩm mỹ.", weight: [0, 0, 15, 0, 0, 0, 0] },
            { label: 'D', text: "Khi thấy người khác học nhanh hơn mình nhiều.", weight: [0, 0, 0, 0, 0, 0, 15] }
        ]
    },
    {
        text: "Bạn sắp xếp tủ đồ của mình theo nguyên tắc nào?",
        hints: [
            { label: 'A', text: "Theo loại đồ và màu sắc (tổ chức, logic).", weight: [15, 0, 0, 0, 0, 0, 0] },
            { label: 'B', text: "La liệt, nhưng tôi biết chính xác món đồ nằm ở đâu.", weight: [0, 0, 0, 0, 0, 0, 15] },
            { label: 'C', text: "Tối giản hết mức có thể.", weight: [0, 0, 0, 0, 0, 0, 10] },
            { label: 'D', text: "Để người khác sắp xếp giúp mình (ủy thác).", weight: [0, 0, 0, 0, 15, 0, 0] }
        ]
    },
    {
        text: "Chọn bàn trong quán cafe đông đúc, bạn chọn chỗ nào?",
        hints: [
            { label: 'A', text: "Bàn góc yên tĩnh, ít người qua lại để tập trung.", weight: [10, 0, 0, 0, 0, 0, 5] },
            { label: 'B', text: "Bàn giữa, năng động, dễ quan sát mọi người.", weight: [0, 10, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Đợi thêm một lát để có chỗ có view đẹp hơn.", weight: [0, 0, 15, 0, 0, 0, 0] },
            { label: 'D', text: "Bỏ đi tìm quán khác vắng hơn.", weight: [0, 0, 0, 0, 0, 0, 10] }
        ]
    },
    {
        text: "Khi làm việc nhóm, bạn thích đảm nhận vai trò nào nhất?",
        hints: [
            { label: 'A', text: "Người lên kế hoạch và giải pháp kỹ thuật chi tiết.", weight: [15, 0, 0, 0, 0, 0, 0] },
            { label: 'B', text: "Người giữ lửa, kết nối và giải quyết xung đột.", weight: [0, 20, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Người thiết kế bài thuyết trình và làm đẹp sản phẩm.", weight: [0, 0, 15, 0, 0, 0, 0] },
            { label: 'D', text: "Người thuyết trình và đại diện nhóm.", weight: [0, 5, 0, 15, 0, 0, 0] },
            { label: 'E', text: "Người thực hiện những phần việc cụ thể, chắc chắn.", weight: [0, 0, 0, 0, 15, 0, 0] },
            { label: 'F', text: "Người tổng kết và theo dõi tiến độ.", weight: [5, 0, 0, 5, 10, 0, 0] }
        ]
    },
    {
        text: "Cách bạn khám phá một thành phố lạ là gì?",
        hints: [
            { label: 'A', text: "Nghiên cứu kỹ bản đồ, lên lịch trình các điểm phải đến.", weight: [10, 0, 0, 0, 0, 0, 0] },
            { label: 'B', text: "Hỏi người dân địa phương nơi nào ăn ngon, chơi vui.", weight: [0, 15, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Đi lang thang không mục đích, thấy đâu đẹp thì rẽ vào.", weight: [0, 0, 15, 0, 0, 0, 10] },
            { label: 'D', text: "Thuê hướng dẫn viên du lịch dẫn đi.", weight: [0, 0, 0, 0, 10, 0, 0] }
        ]
    },
    {
        text: "Khi đọc tin tức hàng ngày, bạn thường có thói quen vào mục nào đầu tiên?",
        hints: [
            { label: 'A', text: "Kinh tế, Công nghệ, Khoa học.", weight: [15, 0, 0, 0, 5, 5, 0] },
            { label: 'B', text: "Xã hội, Đời sống, Giải trí.", weight: [0, 15, 5, 0, 0, 0, 0] },
            { label: 'C', text: "Thời trang, Nghệ thuật, Văn hóa.", weight: [0, 0, 15, 0, 0, 0, 0] },
            { label: 'D', text: "Bình luận, Chuyên gia phân tích, Quan điểm.", weight: [0, 0, 0, 15, 0, 0, 5] }
        ]
    },
    {
        text: "Nếu được chọn một chiếc điện thoại mới, yếu tố nào đối với bạn là quan trọng nhất?",
        hints: [
            { label: 'A', text: "Cấu hình mạnh, chip xử lý tốt nhất.", weight: [15, 0, 0, 0, 0, 0, 0] },
            { label: 'B', text: "Camera chụp ảnh đẹp, nghệ thuật.", weight: [0, 0, 15, 0, 0, 0, 0] },
            { label: 'C', text: "Thiết kế mỏng nhẹ, màu sắc ấn tượng.", weight: [0, 0, 10, 0, 0, 0, 0] },
            { label: 'D', text: "Thương hiệu đẳng cấp, sang trọng.", weight: [0, 0, 0, 0, 15, 0, 0] },
            { label: 'E', text: "Thời lượng pin cực trâu.", weight: [5, 0, 0, 0, 0, 0, 0] },
            { label: 'F', text: "Giá cả hợp lý, đáng đồng tiền.", weight: [0, 0, 0, 0, 15, 0, 0] }
        ]
    },
    {
        text: "Nếu được tặng chuyến du lịch, bạn đi đâu?",
        hints: [
            { label: 'A', text: "Thành phố hiện đại Tokyo, New York.", weight: [5, 0, 0, 0, 10, 10, 0] },
            { label: 'B', text: "Vùng quê yên bình, thanh thản ở châu Âu.", weight: [0, 10, 0, 0, 0, 0, 15] },
            { label: 'C', text: "Địa danh kiến trúc độc đáo Barcelona, Florence.", weight: [0, 0, 20, 0, 0, 0, 0] },
            { label: 'D', text: "Nơi có bề dày lịch sử Rome, Ai Cập.", weight: [0, 0, 0, 10, 0, 15, 0] }
        ]
    },
    {
        text: "Giả sử bạn rảnh 30 phút giữa hai cuộc hẹn, bạn sẽ thường làm gì để giết thời gian?",
        hints: [
            { label: 'A', text: "Lấy điện thoại đọc báo, kiểm tra mail công việc.", weight: [5, 0, 0, 0, 15, 0, 0] },
            { label: 'B', text: "Gọi điện hỏi thăm người thân, bạn bè.", weight: [0, 15, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Ngắm dòng người qua lại, quan sát cuộc sống.", weight: [0, 10, 10, 0, 0, 0, 0] },
            { label: 'D', text: "Ngồi yên, nhắm mắt thư giãn hoặc thiền.", weight: [0, 0, 0, 0, 0, 0, 15] },
            { label: 'E', text: "Mở sách ra đọc vài trang.", weight: [5, 0, 0, 0, 0, 0, 10] }
        ]
    },
    {
        text: "Khi phải ra quyết định quan trọng, bạn làm gì?",
        hints: [
            { label: 'A', text: "Liệt kê ưu nhược điểm và cân nhắc logic.", weight: [15, 0, 0, 0, 0, 0, 0] },
            { label: 'B', text: "Lắng nghe trực giác 'mách bảo' trái tim.", weight: [0, 15, 0, 0, 0, 0, 5] },
            { label: 'C', text: "Hỏi ý kiến của vài người bạn tin tưởng.", weight: [0, 10, 0, 5, 0, 0, 0] },
            { label: 'D', text: "Tìm chuyên gia kinh nghiệm xin lời khuyên.", weight: [0, 0, 0, 15, 0, 0, 0] }
        ]
    },
    {
        text: "Khi gặp một người lần đầu tiên, điều gì ở họ thu hút sự chú ý của bạn nhất?",
        hints: [
            { label: 'A', text: "Cách họ nói chuyện logic, kiến thức uyên bác.", weight: [15, 0, 0, 0, 0, 0, 0] },
            { label: 'B', text: "Sự chân thành, ấm áp tỏa ra từ họ.", weight: [0, 15, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Gu thời trang và phong cách riêng biệt.", weight: [0, 0, 15, 0, 0, 0, 0] },
            { label: 'D', text: "Sự tự tin, câu chuyện thành công của họ.", weight: [0, 0, 0, 10, 10, 0, 0] }
        ]
    },
    {
        text: "Điều gì trong nhà hàng làm bạn khó chịu nhất?",
        hints: [
            { label: 'A', text: "Đồ ăn trình bày đẹp nhưng hương vị quá tệ.", weight: [0, 0, 15, 0, 0, 0, 0] },
            { label: 'B', text: "Nhân viên phục vụ thái độ lạnh nhạt, thiếu chuyên nghiệp.", weight: [0, 15, 0, 5, 0, 0, 0] },
            { label: 'C', text: "Âm nhạc ồn ào, không gian lộn xộn.", weight: [10, 0, 0, 0, 0, 0, 0] },
            { label: 'D', text: "Bàn ghế bẩn, không ngăn nắp.", weight: [15, 0, 0, 0, 0, 0, 0] },
            { label: 'E', text: "Giá cả quá đắt so với chất lượng thực tế.", weight: [0, 0, 0, 0, 20, 0, 0] }
        ]
    },
    {
        text: "Trong gia đình hoặc nhóm bạn, bạn thấy mình thường đóng vai trò gì?",
        hints: [
            { label: 'A', text: "Người lo toan, sắp xếp công việc ổn thỏa.", weight: [10, 0, 0, 0, 10, 0, 0] },
            { label: 'B', text: "Người lắng nghe, là chỗ dựa tinh thần.", weight: [0, 15, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Người tạo ra các bữa tiệc và niềm vui.", weight: [0, 10, 10, 0, 0, 0, 0] },
            { label: 'D', text: "Người đưa ra lời khuyên định hướng quan trọng.", weight: [0, 0, 0, 15, 0, 0, 10] },
            { label: 'E', text: "Người hòa giải khi có mâu thuẫn.", weight: [0, 15, 0, 10, 0, 0, 0] }
        ]
    },
    {
        text: "Bạn thích kết bạn với người thế nào nhất?",
        hints: [
            { label: 'A', text: "Người cùng lĩnh vực chuyên môn để bàn luận sâu.", weight: [15, 0, 0, 0, 0, 0, 0] },
            { label: 'B', text: "Người có chiều sâu cảm xúc, biết lắng nghe.", weight: [0, 15, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Người có gu thẩm mỹ, thích đi thực tế cùng nhau.", weight: [0, 0, 15, 0, 0, 0, 5] },
            { label: 'D', text: "Người có tham vọng lớn để cùng làm dự án.", weight: [0, 0, 0, 15, 10, 0, 0] }
        ]
    },
    {
        text: "Muốn nhận được gì nhất sau một khóa học?",
        hints: [
            { label: 'A', text: "Bộ kỹ năng, công cụ áp dụng được ngay.", weight: [15, 0, 0, 0, 5, 0, 0] },
            { label: 'B', text: "Sự kết nối với các mối quan hệ chất lượng.", weight: [0, 15, 0, 10, 0, 0, 0] },
            { label: 'C', text: "Góc nhìn mới, thay đổi tư duy mạnh mẽ.", weight: [0, 0, 0, 0, 0, 0, 20] },
            { label: 'D', text: "Một tấm bằng danh giá có giá trị.", weight: [0, 0, 0, 0, 15, 0, 0] }
        ]
    },
    {
        text: "Ghét nhất điều gì ở một người bạn?",
        hints: [
            { label: 'A', text: "Nói chuyện thiếu logic, hay nói dối.", weight: [15, 0, 0, 0, 0, 0, 0] },
            { label: 'B', text: "Ích kỷ, chỉ biết đến bản thân.", weight: [0, 15, 0, 5, 0, 0, 0] },
            { label: 'C', text: "Ăn mặc lôi thôi, giao tiếp thiếu tinh tế.", weight: [0, 0, 15, 0, 0, 0, 0] },
            { label: 'D', text: "Hèn nhát, không dám bảo vệ bạn bè khi cần.", weight: [0, 15, 0, 15, 0, 0, 0] }
        ]
    },
    {
        text: "Nếu bị người khác chỉ ra lỗi sai một cách thẳng thắn, phản ứng của bạn thường là gì?",
        hints: [
            { label: 'A', text: "Cảm ơn và phân tích xem mình sai ở đâu để sửa.", weight: [15, 0, 0, 0, 0, 0, 10] },
            { label: 'B', text: "Hơi xấu hổ nhưng vui vì được hỗ trợ.", weight: [0, 15, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Cảm thấy bị xúc phạm, hơi khó chịu.", weight: [0, 0, 0, 0, 0, 0, 0] },
            { label: 'D', text: "Tìm lý do để biện minh cho mình.", weight: [0, 0, 0, 0, 0, 0, 0] }
        ]
    },
    {
        text: "Muốn thế hệ sau nhớ đến bạn về điều gì nhất?",
        hints: [
            { label: 'A', text: "Một bộ não thông thái và sáng tạo.", weight: [10, 0, 10, 0, 0, 10, 0] },
            { label: 'B', text: "Một trái tim nhân hậu, sống vì mọi người.", weight: [0, 15, 0, 0, 0, 0, 0] },
            { label: 'C', text: "Một biểu tượng của sự tự do và bứt phá.", weight: [0, 0, 15, 0, 0, 0, 15] },
            { label: 'D', text: "Sự giàu có và nền tảng tài chính cực vững.", weight: [0, 0, 0, 0, 20, 0, 0] }
        ]
    },
    {
        text: "Kết thúc hành trình này, câu hỏi nào làm bạn suy nghĩ nhiều nhất? Vì sao?",
        hints: [
            { label: 'A', text: "Câu hỏi về sự hối tiếc ở tuổi 80.", weight: [0, 0, 0, 0, 0, 0, 15] },
            { label: 'B', text: "Câu hỏi về việc chi tiền để thuê người khác.", weight: [0, 0, 0, 0, 15, 0, 0] },
            { label: 'C', text: "Câu hỏi về việc nổi tiếng sau 5 năm.", weight: [0, 0, 0, 15, 0, 0, 5] },
            { label: 'D', text: "Một câu hỏi về đam mê/phép màu.", weight: [0, 0, 15, 0, 0, 0, 10] }
        ]
    }
];
