(function () {
  var GROUPS = [
    {
      k: "now",
      label: "Làm ngay",
      hint: "Lỗi chắc chắn có và ảnh hưởng rộng",
    },
    {
      k: "month",
      label: "Trong tháng này",
      hint: "Cải thiện nền tảng kỹ thuật và nội dung",
    },
    {
      k: "later",
      label: "Sau đó",
      hint: "Giá trị thấp hơn hoặc cần điều kiện đi kèm",
    },
  ];
  var TASKS = [
    {
      "g": "now",
      "t": "Dọn Tag Manager: gỡ thẻ Universal Analytics, đặt sự kiện chuyển đổi",
      "tag": [
        "warn",
        "Còn lại sau khi cài Site Kit"
      ],
      "why": "Site Kit đã cài và GA4 (<code>G-JDQTZ90KX9</code>) đã chạy, nhưng container <code>GTM-T5ZGHG9</code> (chèn qua WPCode) vẫn có thẻ Universal Analytics đã ngừng ghi từ 7/2023. Chưa gỡ được vì chưa có tài khoản Tag Manager. Meta Pixel cũng được chèn trực tiếp qua WPCode, nên có thể đang đếm đôi nếu container cũng có Pixel. Sự kiện chuyển đổi duy nhất trong GA4 là <code>purchase</code> do Site Kit tạo sẵn, trong khi website không bán hàng.",
      "how": "Người có quyền Tag Manager gỡ thẻ Universal Analytics và kiểm tra Meta Pixel có trùng không. Trong GA4, bỏ <code>purchase</code> khỏi sự kiện chuyển đổi và đặt sự kiện cho form liên hệ, bấm gọi, bấm Zalo.",
      "verify": "GA4 Realtime (cửa sổ ẩn danh) thấy lượt truy cập và sự kiện liên hệ; Tag Manager không còn thẻ UA; Pixel chỉ được đếm một lần.",
      "who": "Quản trị, người có quyền GTM",
      "src": "OpenSEO (đo lường GA4), HTML trang chủ, WPCode (28/11)"
    },
    {
      "g": "now",
      "t": "Chuyển hướng 9 URL 404 còn lại",
      "tag": [
        "warn",
        "Chờ người làm nội dung xác nhận đích"
      ],
      "why": "Audit 28/11 còn 93 liên kết hỏng và 9 trang 4xx, trỏ tới đúng 9 URL chưa chuyển hướng (ví dụ <code>/cac-mau-ban-ghe-an-go-oc-cho-cao-cap-2023/</code>, <code>/xuong-noi-that-saoviethome/</code>, <code>/tu-ruou-go-oc-cho/</code>). Đã có đích đề xuất theo chủ đề cho từng URL, nhưng đích là phỏng đoán (bài cũ đã đổi tên), một URL (<code>/nha-anh-duc-bac-ninh/</code>) không thấy bài khớp.",
      "how": "Người làm nội dung chốt đích cho 9 URL (file <code>saoviethome-redirects-can-xac-nhan.csv</code> trong thư mục temp), rồi nhập vào danh sách Cloudflare Bulk Redirects như 17 URL đã làm.",
      "verify": "Audit sau không còn liên kết hỏng và trang 4xx; các URL cũ trả 301 về đúng trang đích.",
      "who": "Nội dung chọn đích, quản trị Cloudflare",
      "src": "OpenSEO (audit 28/11), kiểm tra trực tiếp"
    },
    {
      "g": "now",
      "t": "Xóa cache FlyingPress và audit lại để xác nhận H1",
      "tag": [
        "warn",
        "Số 84 chưa phản ánh đúng"
      ],
      "why": "Audit 28/11 còn báo 84 trang thiếu H1: 68 tag sản phẩm, 11 danh mục con, <code>/shop/</code>, <code>/lien-he/</code> và 3 trang khác. Bản HTML mới của <code>/lien-he/</code>, <code>/shop/</code>, một danh mục con và một tag sản phẩm đã có H1, nhưng FlyingPress đang trả bản cache cũ (HIT) không có H1; Google cũng sẽ thấy bản cache. Ba trang chưa xử lý: <code>/author/saoviethome/</code>, <code>/tag/trang-chu/</code>, <code>/uncategorized/</code>.",
      "how": "Xóa toàn bộ cache FlyingPress, chạy lại audit. Sau đó xử lý 3 trang còn thiếu (kiểm tra mẫu giao diện của trang tác giả, thẻ bài viết và danh mục mặc định).",
      "verify": "Audit mới còn khoảng 3 trang thiếu H1.",
      "who": "Quản trị website",
      "src": "OpenSEO (audit 28/11), kiểm tra trực tiếp (có và không có cache)"
    },
    {
      "g": "month",
      "t": "Xử lý các trang tag sản phẩm: noindex hoặc viết meta",
      "tag": [
        "warn",
        "Có dữ liệu Search Console"
      ],
      "why": "68 trang <code>/product-tag/…</code> đều thiếu meta description, đang cho lập chỉ mục (<code>index</code>) và có sơ đồ trang riêng. Sau ngày 28/11 chúng đã có H1 (tên thẻ, kèm tiền tố 'Thẻ:'). Search Console (29/10 đến 25/11) cho thấy phần lớn tag có rất ít lượt hiển thị (tag <code>saoviethome</code> 31, <code>sofa-go-oc-cho</code> 18, <code>ke-tivi-treo</code> 12) và 0 lượt nhấp.",
      "how": "Tag không có lượt hiển thị: Rank Math → Tiêu đề &amp; mô tả → Thẻ sản phẩm, bật noindex và tắt khỏi sơ đồ trang. Tag có lượt hiển thị: viết meta description. Danh sách tag cần giữ do người làm nội dung chọn.",
      "verify": "Sơ đồ trang không còn tag không dùng; audit sau không còn báo thiếu meta cho các trang tag.",
      "who": "SEO, nội dung",
      "src": "OpenSEO (audit và Search Console), curl"
    },
    {
      "g": "month",
      "t": "Rút gọn mẫu title (368 title dài hơn 60 ký tự)",
      "why": "Nhiều title thêm hậu tố \" - Sao Việt Home | Thi Công Nội Thất Cao Cấp Uy Tín\" (khoảng 50 ký tự). Đã thấy ở trang tin tức, dự án, sản phẩm và tag. Trang chủ đã được viết lại (51 ký tự). Với hậu tố này, hầu hết title vượt 60 ký tự và có thể bị Google cắt.",
      "how": "Rank Math → Tiêu đề &amp; mô tả: đổi hậu tố chung thành \" | Sao Việt Home\" cho từng loại nội dung (bài viết, sản phẩm, dự án, trang, danh mục, tag).",
      "verify": "Số title dài trong audit sau giảm mạnh; title trên Google không còn bị cắt.",
      "who": "SEO, quản trị website",
      "src": "OpenSEO, curl"
    },
    {
      "g": "month",
      "t": "Thêm alt cho 3 ảnh trong template (485 trang)",
      "why": "Mọi trang báo thiếu đều thiếu đúng 3 ảnh alt nên đó là ảnh trong template. Trên trang chủ có đúng 3 biểu tượng SVG không có thuộc tính alt: <code>phone-svgrepo-com.svg</code>, <code>house.svg</code>, <code>house-fill.svg</code>. Hai logo (<code>logo-sv.png</code> và <code>Logo-Sao-Viet.png</code>) có alt rỗng.",
      "how": "Trong Header builder hoặc Elementor, đặt alt cho 3 biểu tượng (ví dụ \"Gọi điện\", \"Trang chủ\"); nếu chỉ để trang trí thì để alt rỗng (<code>alt=\"\"</code>) và đặt <code>aria-hidden</code>. Đặt alt \"Sao Việt Home\" cho logo chính.",
      "verify": "Audit sau không còn báo thiếu alt ở các trang.",
      "who": "Lập trình web",
      "src": "OpenSEO, curl (trang chủ)"
    },
    {
      "g": "month",
      "t": "Xử lý title và meta description trùng (chờ quyết định về nội dung)",
      "tag": [
        "warn",
        "Một phần cần người làm nội dung"
      ],
      "why": "8 title trùng: 3 cặp trang danh mục dự án (<code>/du-an-thi-cong-noi-that-go-oc-cho/…</code> và <code>/du-an-thiet-ke-noi-that-go-oc-cho/…</code> cho biệt thự, chung cư, nhà phố) và 1 cặp sản phẩm <code>sofa-go-oc-cho-ma-sfb-15</code> với <code>sfb-15-2</code>. 18 meta trùng: nhóm sản phẩm kệ tivi, sofa, giường (cùng một mô tả cho 4 đến 5 trang), bàn thờ, hai trang danh mục phòng bếp và phòng khách.",
      "how": "Danh mục dự án: đặt title riêng cho từng trang trong Rank Math (có thể phân biệt \"thi công\" và \"thiết kế\"). Sản phẩm: viết meta riêng cho từng mã hoặc xóa meta để Google tự lấy. Cặp sfb-15: quyết định giữ bản nào rồi 301 bản còn lại, việc này cần người làm nội dung.",
      "verify": "Audit sau không còn báo title và meta description trùng.",
      "who": "Nội dung, SEO",
      "src": "OpenSEO (audit 28/11)"
    },
    {
      "g": "month",
      "t": "Chọn H1 có từ khóa cho trang chủ, Shop, danh mục và tag",
      "tag": [
        "warn",
        "Cần người làm nội dung"
      ],
      "why": "H1 hiện là chuỗi kỹ thuật, chưa có từ khóa: trang chủ là 'Một thành viên của Sao Mộc Vương Group (SMV Group)', <code>/shop/</code> là 'Shop', danh mục và tag sản phẩm có tiền tố 'Danh mục:' và 'Thẻ:' (Elementor tự ghép). Danh mục 'Biệt Thự', 'Chung Cư', 'Nhà Phố' trùng tên giữa nhóm thi công và nhóm thiết kế.",
      "how": "Người làm nội dung chọn H1 cho từng loại trang. Trang chủ: đổi chữ trong ô tiêu đề của widget giới thiệu hoặc thêm widget Heading H1. Tiền tố 'Danh mục:' và 'Thẻ:': thay widget Archive Title bằng Heading với dynamic tag Archive Title (tắt phần ngữ cảnh). Tên danh mục trùng: thêm 'thi công' hoặc 'thiết kế' vào tên.",
      "verify": "Curl các trang mẫu thấy H1 đúng ý; H1 không trùng giữa các danh mục.",
      "who": "Nội dung, lập trình web",
      "src": "Kiểm tra trực tiếp (28/11)"
    },
    {
      "g": "later",
      "t": "URL tham số <code>?shop_view=</code> và <code>?per_row=</code> (ưu tiên thấp)",
      "tag": [
        "ok",
        "Đề xuất đóng"
      ],
      "why": "Nút đổi cách xem trên <code>/shop/</code> là link thật (rel=nofollow, canonical về URL sạch). Search Console (29/10 đến 25/11) có khoảng 20 URL kiểu này (thêm cả <code>?per_page=</code>), dưới 100 lượt hiển thị tổng cộng và 0 lượt nhấp. Audit đã loại các URL này. Chặn bằng robots.txt có thể làm Google không đọc được canonical.",
      "how": "Không cần làm. Chỉ cân nhắc chặn trong robots.txt hoặc cho FlyingPress cache các tham số này nếu sau này thấy máy chủ chậm do bot.",
      "verify": "Không có yêu cầu kiểm tra.",
      "who": "SEO, quản trị website",
      "src": "OpenSEO (Search Console), kiểm tra trực tiếp"
    },
    {
      "g": "later",
      "t": "Cho phép phóng to trên điện thoại",
      "why": "Thẻ viewport đang đặt <code>maximum-scale=1.0, user-scalable=no</code>, chặn người dùng phóng to chữ và ảnh. Ảnh nội thất cần phóng to để xem chi tiết.",
      "how": "Đổi thành <code>width=device-width, initial-scale=1</code>. Theme Woodmart in thẻ này, tùy chọn nằm trong Theme settings. Ở Mộc Chất, việc lưu Theme settings bị chặn vì <code>max_input_vars = 1000</code> trong khi form gửi hơn 1.000 trường; có thể gặp lại lỗi này ở đây, khi đó cần host nâng giới hạn.",
      "verify": "Lighthouse không còn báo lỗi viewport trong mục truy cập.",
      "who": "Lập trình web",
      "src": "curl (trang chủ)"
    },
    {
      "g": "later",
      "t": "Kiểm tra heading nhảy cấp (88 trang), meta dài (153) và meta ngắn (4)",
      "why": "Mức thông tin. Số trang nhảy cấp giảm từ 109 xuống 88 sau khi hạ H1 thừa. Chưa tìm nguyên nhân phần còn lại. Ở Mộc Chất, nguyên nhân chính là tiêu đề widget chân trang dùng H5 sau nội dung chỉ có H2; mẫu bài viết ở đây cũng có các tiêu đề H2 của menu bên trái đặt trước nội dung.",
      "how": "Kiểm tra tiêu đề widget chân trang và các tiêu đề trong menu đầu trang và menu bên trái. Meta dài và ngắn sửa cùng lúc khi viết lại meta cho trang trùng.",
      "verify": "Audit sau giảm số trang nhảy cấp heading.",
      "who": "Lập trình web",
      "src": "OpenSEO"
    },
    {
      "g": "later",
      "t": "Bật HSTS",
      "why": "Phản hồi của trang chủ không có header Strict-Transport-Security. Đây là bảo mật nâng cao, chỉ nên bật sau khi chắc chắn HTTPS chạy ổn trên toàn site.",
      "how": "Bật HSTS ở Cloudflare hoặc máy chủ.",
      "verify": "Header Strict-Transport-Security xuất hiện trong phản hồi.",
      "who": "Lập trình web, hosting",
      "src": "curl"
    },
    {
      "g": "later",
      "t": "Đo tốc độ trang chủ và trang sản phẩm (Lighthouse)",
      "why": "Các lần audit không chạy Lighthouse nên chưa có số đo LCP, CLS. Trang chủ tải 47 ảnh và nhiều ảnh JPG khổ lớn (ví dụ ảnh 2560×1920), nên rất có thể nặng, nhưng chưa đo.",
      "how": "Chạy PageSpeed Insights (Site Kit đã cài, có thể đo từ đó), hoặc đo bằng Chrome DevTools (mô phỏng điện thoại) như đã làm cho Mộc Chất.",
      "verify": "Có số LCP và CLS cho trang chủ và một trang sản phẩm.",
      "who": "SEO, lập trình web",
      "src": "Chưa đo"
    }
  ];

  var host = document.getElementById("tasks");
  var n = 0;
  var html = "";
  GROUPS.forEach(function (g) {
    var items = TASKS.filter(function (t) {
      return t.g === g.k;
    });
    html +=
      '<div class="grp"><div class="grp-h"><h3><span class="pri ' +
      g.k +
      '">' +
      g.label +
      "</span>" +
      items.length +
      " việc</h3><span>" +
      g.hint +
      "</span></div>";
    items.forEach(function (t) {
      n += 1;
      var tag = t.tag
        ? '<span class="st ' + t.tag[0] + '">' + t.tag[1] + "</span>"
        : "";
      html +=
        '<article class="task"><div class="no">' +
        n +
        "</div><div>" +
        "<h4>" +
        t.t +
        tag +
        '</h4><p class="why">' +
        t.why +
        "</p>" +
        "<dl><dt>Cách làm</dt><dd>" +
        t.how +
        "</dd><dt>Kiểm tra</dt><dd>" +
        t.verify +
        "</dd></dl></div>" +
        '<div class="side"><div><b>Người làm</b>' +
        t.who +
        "</div><div><b>Nguồn</b>" +
        t.src +
        "</div></div></article>";
    });
    html += "</div>";
  });
  host.innerHTML = html;
  host.style.display = "flex";
  host.style.flexDirection = "column";
  host.style.gap = "24px";
})();
