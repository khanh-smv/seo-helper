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
      g: "now",
      t: "Cài GA4 và Search Console, gỡ thẻ Universal Analytics cũ trong GTM",
      tag: ["crit", "Chưa đo được gì"],
      why: 'Trang chủ có Google Tag Manager (<code>GTM-T5ZGHG9</code>) nhưng container chỉ chứa thẻ Universal Analytics (<code>UA-167860943-1</code>), loại Google đã ngừng ghi dữ liệu từ 1/7/2023, và không có thẻ GA4. Không có Site Kit, không thấy mã GA4 (<code>gtag</code>, <code>G-…</code>) trong HTML. Search Console chưa nối với OpenSEO. Vì vậy chưa biết trang nào có lượt hiển thị, lượt nhấp và khách liên hệ, nên các quyết định như ẩn trang tag hay gộp trang trùng đều phải làm khi chưa có số liệu. Website có Facebook Pixel và thẻ Google Ads trong container, nên nhiều khả năng đang chạy quảng cáo.',
      how: "Cài Site Kit, nối Search Console, Analytics (GA4) và PageSpeed Insights, giống cách đã làm cho Mộc Chất. Nếu muốn giữ GTM thì thêm thẻ GA4 vào GTM thay vì để Site Kit chèn thêm (tránh đếm hai lần). Gỡ thẻ UA cũ. Sau đó nối OpenSEO với Search Console và GA4, và đặt sự kiện chuyển đổi cho form liên hệ, bấm gọi, bấm Zalo.",
      verify:
        "GA4 Realtime thấy lượt truy cập khi mở trang ở cửa sổ ẩn danh (Site Kit loại người dùng đã đăng nhập). OpenSEO đọc được dữ liệu Search Console và GA4.",
      who: "Quản trị, lập trình web",
      src: "HTML trang chủ, nội dung container GTM (25/11)",
    },
    {
      g: "now",
      t: "Chuyển hướng 18 URL đã chết và sửa các link trỏ tới chúng",
      tag: ["crit", "330 link hỏng"],
      why: "Audit báo 330 liên kết nội bộ trỏ tới URL trả 404, nhưng chỉ có 18 URL đích khác nhau (đều là bài cũ ghi năm 2023 và vài trang danh mục đã xóa). Nhiều nhất: <code>top-mau-ke-tivi-oc-cho-hot-nhat-thi-truong-hien-nay</code> (51 link), <code>top-nhung-bo-suu-tap-cac-mau-sofa-go-oc-cho-cao-cap-2023</code> (41), <code>cac-mau-ban-ghe-an-go-oc-cho-cao-cap-2023</code> (35), <code>bst-cac-mau-giuong-ngu-go-oc-cho-hien-dai-dep-nhat-2023</code> (33), <code>tu-bep-go-oc-cho-sao-viet-home</code> (27), <code>tu-ao-go-oc-cho</code> (22), <code>so-1-toi-tu-noi-that-sao-viet-home</code> (21). Cùng một URL xuất hiện ở hàng chục trang, nên nhiều khả năng nằm trong một khối dùng chung (menu, chân trang hoặc khối bài liên quan), chưa xác nhận. Ngoài ra có 3 URL dạng <code>?p=…&amp;post_type=product</code> (sản phẩm đã xóa) cũng trả 404 khi bị quét, chưa biết chúng được liên kết từ đâu.",
      how: "Với mỗi URL 404, chọn trang đích gần nhất cùng chủ đề rồi chuyển hướng 301 (Rank Math → Chuyển hướng, hoặc Cloudflare Bulk Redirects để nhanh hơn). Tìm khối đang chứa các link đó và sửa trực tiếp thành URL mới. Cần chọn trang đích trước khi làm.",
      verify:
        "Audit sau không còn lỗi liên kết hỏng và trang lỗi 4xx; các URL cũ trả 301 về đúng trang đích.",
      who: "Quản trị website, nội dung chọn trang đích",
      src: "OpenSEO (audit 25/11)",
    },
    {
      g: "now",
      t: "Thêm H1 và sửa meta description cho trang chủ",
      tag: ["crit", "Trang quan trọng nhất"],
      why: "HTML trang chủ không có thẻ H1 nào (đã kiểm tra bằng curl). Meta description đang tự lấy từ nội dung nên hai câu dính liền nhau, đọc lên là \"12 Năm Làm Nội Thất Gỗ Óc ChóSao Việt Home tự hào là một trong những đơn vị dẫn đầu…\". Title hiện là \"Trang Chủ - Sao Việt Home | Thi Công Nội Thất Cao Cấp Uy Tín\", bắt đầu bằng chữ \"Trang Chủ\", không có từ khóa.",
      how: "Trong Elementor, đặt một tiêu đề chính làm H1 (ví dụ câu giới thiệu đầu trang). Trong Rank Math, tự viết meta description khoảng 120–155 ký tự và đổi title để bắt đầu bằng từ khóa chính.",
      verify:
        "Curl trang chủ thấy đúng một H1; meta description đọc trơn tru, title bắt đầu bằng từ khóa.",
      who: "Nội dung, quản trị website",
      src: "curl, OpenSEO",
    },
    {
      g: "now",
      t: "Loại URL tham số <code>?shop_view=</code> và <code>?per_row=</code> khỏi quá trình quét",
      why: "431 trong 1.000 URL đã quét là URL có tham số, trong đó 424 là <code>?shop_view=list</code>, <code>?per_row=2</code>… (nút đổi cách xem lưới/danh sách). Chúng canonical về URL sạch nên không gây trùng nội dung, nhưng chiếm 42% giới hạn quét (audit dừng ở 1.000 trang, còn trang chưa quét) và không được cache: đo bằng curl, <code>/shop/?shop_view=list</code> mất 4,6 giây (MISS) trong khi <code>/shop/</code> mất 0,33 giây (HIT). Vì vậy 424 trong 426 trang báo \"phản hồi chậm\" là các URL này, và nó cũng làm tăng số lỗi thiếu H1, meta, alt ở phần bên dưới.",
      how: 'Thêm <code>/*?shop_view=</code> và <code>/*?per_row=</code> vào danh sách loại trừ của audit. Để giảm tải máy chủ, có thể thêm <code>Disallow: /*?shop_view=</code> và <code>Disallow: /*?per_row=</code> vào robots.txt (Rank Math → Cài đặt chung → Chỉnh sửa robots.txt) hoặc cho FlyingPress cache các tham số này; chưa kiểm tra tác động của hai cách, nên làm từng cách và đo lại.',
      verify:
        "Audit sau quét xong toàn bộ trang thật trong giới hạn; phản hồi chậm giảm từ 426 xuống còn vài trang.",
      who: "SEO, quản trị website",
      src: "OpenSEO (audit 25/11), curl",
    },

    {
      g: "month",
      t: "Giảm số thẻ H1 thừa ở trang sản phẩm (58 trang)",
      why: "Trang sản phẩm có từ 2 đến 4 H1. Ví dụ <code>/sofa-go-oc-cho-ma-sfb-24/</code> có 4 H1: tên sản phẩm, \"TẠI SAO QUÝ KHÁCH NÊN CHỌN SAO VIỆT HOME?\", \"QUY TRÌNH LÀM VIỆC\" và \"GIỚI THIỆU MẪU SOFA…\". Các tiêu đề thừa lặp lại ở nhiều sản phẩm (sfb, ktv, gba, btg, ta, gng) nên có thể nằm trong khối dùng chung.",
      how: "Giữ H1 là tên sản phẩm, đổi các tiêu đề còn lại thành H2 trong Elementor (sửa ở khối dùng chung nếu có, để áp dụng cho tất cả sản phẩm). Đổi chữ in hoa trong tiêu đề nếu muốn, không bắt buộc.",
      verify: "Audit sau không còn báo nhiều H1 ở trang sản phẩm.",
      who: "Lập trình web, nội dung",
      src: "OpenSEO, curl",
    },
    {
      g: "month",
      t: "Thêm H1 cho 189 trang thật đang thiếu (tin tức, dự án, trang tag)",
      why: "Trong 491 trang báo thiếu H1, có 189 là trang thật (không tham số): 68 trang tag sản phẩm, 58 trang tin tức, 44 trang dự án, 19 trang khác gồm giới thiệu, liên hệ và shop. Trang mẫu có menu đầu trang dùng thẻ H2 (\"NỘI THẤT PHÒNG KHÁCH\", \"NỘI THẤT PHÒNG BẾP\"…) và H4 (\"Hotline\", \"VP &amp; nhà máy…\") nằm trước nội dung; chưa kiểm tra template nên chưa biết vì sao các trang này không có H1.",
      how: "Mở template của bài viết, dự án và trang lưu trữ trong Elementor Theme Builder (hoặc Woodmart) và đặt tiêu đề trang làm H1 như đã làm cho Mộc Chất. Nếu menu đầu trang đang dùng H2, đổi thành thẻ không phải tiêu đề để thứ tự heading bắt đầu từ H1.",
      verify: "Curl vài trang mỗi loại thấy đúng một H1; audit sau giảm số trang thiếu H1.",
      who: "Lập trình web",
      src: "OpenSEO (audit 25/11), curl",
    },
    {
      g: "month",
      t: "Xử lý 68 trang tag sản phẩm: noindex hoặc viết meta",
      tag: ["warn", "Nên xem Search Console trước"],
      why: "68 trang <code>/product-tag/…</code> đều thiếu meta description và H1, vẫn cho lập chỉ mục (<code>index</code>) và có sitemap riêng (<code>product_tag-sitemap.xml</code>). Mẫu kiểm tra: tag <code>ban-an-go-oc-cho</code> không có meta. Chưa biết các trang này có lượt hiển thị hay không vì chưa có dữ liệu Search Console.",
      how: "Sau khi nối Search Console, kiểm tra tag nào có lượt hiển thị. Tag không có: Rank Math → Tiêu đề &amp; mô tả → Thẻ sản phẩm, bật noindex và tắt khỏi sơ đồ trang. Tag có: viết meta description và thêm H1.",
      verify: "Sơ đồ trang không còn tag không dùng; audit sau không còn báo thiếu meta cho các trang tag.",
      who: "SEO",
      src: "OpenSEO, curl",
    },
    {
      g: "month",
      t: "Rút gọn mẫu title (607 title dài hơn 60 ký tự)",
      why: "Nhiều title thêm hậu tố \" - Sao Việt Home | Thi Công Nội Thất Cao Cấp Uy Tín\" (khoảng 50 ký tự). Đã thấy ở trang chủ, trang tin tức, dự án, sản phẩm và tag (mẫu 5 trang). Với hậu tố này, hầu hết title vượt 60 ký tự và có thể bị Google cắt.",
      how: "Rank Math → Tiêu đề &amp; mô tả: đổi hậu tố chung thành \" | Sao Việt Home\" cho từng loại nội dung (bài viết, sản phẩm, dự án, trang, danh mục, tag).",
      verify: "Số title dài trong audit sau giảm mạnh; title trên Google không còn bị cắt.",
      who: "SEO, quản trị website",
      src: "OpenSEO, curl",
    },
    {
      g: "month",
      t: "Thêm alt cho 3 ảnh trong template (906 trang)",
      why: "Mọi trang đều báo thiếu đúng 3 ảnh alt (tổng 2.718 ảnh) nên đó là ảnh trong template. Trên trang chủ có đúng 3 biểu tượng SVG không có thuộc tính alt: <code>phone-svgrepo-com.svg</code>, <code>house.svg</code>, <code>house-fill.svg</code> (khớp với số 3 của audit). Hai logo (<code>logo-sv.png</code> và <code>Logo-Sao-Viet.png</code>) có alt rỗng.",
      how: "Trong Header builder hoặc Elementor, đặt alt cho 3 biểu tượng (ví dụ \"Gọi điện\", \"Trang chủ\"); nếu chỉ để trang trí thì để alt rỗng (<code>alt=\"\"</code>) và đặt <code>aria-hidden</code>. Đặt alt \"Sao Việt Home\" cho logo chính.",
      verify: "Audit sau không còn báo thiếu alt ở các trang.",
      who: "Lập trình web",
      src: "OpenSEO, curl (trang chủ)",
    },
    {
      g: "month",
      t: "Xử lý title và meta description trùng (chờ quyết định về nội dung)",
      tag: ["warn", "Một phần cần người làm nội dung"],
      why: "8 title trùng: 3 cặp trang danh mục dự án (<code>/du-an-thi-cong-noi-that-go-oc-cho/…</code> và <code>/du-an-thiet-ke-noi-that-go-oc-cho/…</code> cho biệt thự, chung cư, nhà phố) và 1 cặp sản phẩm <code>sofa-go-oc-cho-ma-sfb-15</code> với <code>sfb-15-2</code>. 18 meta trùng: nhóm sản phẩm kệ tivi, sofa, giường (cùng một mô tả cho 4 đến 5 trang), bàn thờ, hai trang danh mục phòng bếp và phòng khách.",
      how: "Danh mục dự án: đặt title riêng cho từng trang trong Rank Math (có thể phân biệt \"thi công\" và \"thiết kế\"). Sản phẩm: viết meta riêng cho từng mã hoặc xóa meta để Google tự lấy. Cặp sfb-15: quyết định giữ bản nào rồi 301 bản còn lại, việc này cần người làm nội dung.",
      verify: "Audit sau không còn báo title và meta description trùng.",
      who: "Nội dung, SEO",
      src: "OpenSEO (audit 25/11)",
    },

    {
      g: "later",
      t: "Cho phép phóng to trên điện thoại",
      why: "Thẻ viewport đang đặt <code>maximum-scale=1.0, user-scalable=no</code>, chặn người dùng phóng to chữ và ảnh. Ảnh nội thất cần phóng to để xem chi tiết.",
      how: "Đổi thành <code>width=device-width, initial-scale=1</code>. Theme Woodmart in thẻ này, chưa xác nhận có tùy chọn trong Theme Settings, nếu không có thì cần sửa bằng theme con.",
      verify: "Lighthouse không còn báo lỗi viewport trong mục truy cập.",
      who: "Lập trình web",
      src: "curl (trang chủ)",
    },
    {
      g: "later",
      t: "Kiểm tra heading nhảy cấp (213 trang), meta dài (167) và meta ngắn (11)",
      why: "Mức thông tin. Chưa tìm nguyên nhân heading nhảy cấp. Ở Mộc Chất, nguyên nhân chính là tiêu đề widget chân trang dùng H5 sau nội dung chỉ có H2; theme và cấu trúc giống nhau nên có thể là cùng lỗi, chưa kiểm tra.",
      how: "Kiểm tra tiêu đề widget chân trang và các tiêu đề trong menu đầu trang. Meta dài và ngắn sửa cùng lúc khi viết lại meta cho trang trùng.",
      verify: "Audit sau giảm số trang nhảy cấp heading.",
      who: "Lập trình web",
      src: "OpenSEO",
    },
    {
      g: "later",
      t: "Bật HSTS",
      why: "Phản hồi của trang chủ không có header Strict-Transport-Security. Đây là bảo mật nâng cao, chỉ nên bật sau khi chắc chắn HTTPS chạy ổn trên toàn site.",
      how: "Bật HSTS ở Cloudflare hoặc máy chủ.",
      verify: "Header Strict-Transport-Security xuất hiện trong phản hồi.",
      who: "Lập trình web, hosting",
      src: "curl",
    },
    {
      g: "later",
      t: "Đo tốc độ trang chủ và trang sản phẩm (Lighthouse)",
      why: "Lần audit này không chạy Lighthouse nên chưa có số đo LCP, CLS. Trang chủ tải 47 ảnh và nhiều ảnh JPG khổ lớn (ví dụ ảnh 2560×1920), nên rất có thể nặng, nhưng chưa đo.",
      how: "Chạy PageSpeed Insights sau khi nối Site Kit, hoặc đo bằng Chrome DevTools (mô phỏng điện thoại) như đã làm cho Mộc Chất.",
      verify: "Có số LCP và CLS cho trang chủ và một trang sản phẩm.",
      who: "SEO, lập trình web",
      src: "Chưa đo",
    },
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
