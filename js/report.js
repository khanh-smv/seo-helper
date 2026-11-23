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
      t: "Sửa CLS 0,14 của trang chủ",
      tag: ["crit", "Mới phát sinh"],
      why: "CLS tăng từ 0,00 lên 0,14 (ngưỡng tốt là 0,1) trong cả hai lần đo sau khi bật Lazyload cho carousel đầu trang. Bố cục dịch chuyển khoảng giây 12 đến 13, ở khối tiêu đề động bên dưới carousel. Giả thuyết: ảnh slide đầu cao 974 px, các slide sau cao 1024 px, nên chiều cao carousel đổi khi chuyển slide. Chưa kiểm chứng.",
      how: "Đặt tỉ lệ cố định 2560:1024 cho các slide bằng CSS <code>aspect-ratio</code> và cắt ảnh <code>upscalemedia…</code> từ 2560×974 về 2560×1024. Nếu CLS không giảm thì tắt Lazyload của carousel.",
      verify:
        "Đo lại bằng Chrome DevTools (mô phỏng điện thoại, cửa sổ không đăng nhập): CLS từ 0,1 trở xuống.",
      who: "Lập trình web",
      src: "Chrome DevTools (2 lần đo ngày 21/11)",
    },
    {
      g: "now",
      t: "Hạ LCP trang chủ: ảnh bìa video và các ảnh còn nặng",
      tag: ["warn", "Làm tiếp việc nén ảnh"],
      why: "LCP mô phỏng giảm từ 19,1 xuống 15,7 giây, vẫn rất chậm. Phần tử LCP hiện là ảnh bìa video <code>anh-2.webp</code> (350 KB). Nó là ảnh nền CSS nên trình duyệt phát hiện muộn, tải ưu tiên thấp và tranh băng thông với khoảng 5 MB ảnh khác. Còn khoảng 13 ảnh JPG 550–812 KB trong lưới dự án, và Chrome đánh giá còn 2,2 đến 3,3 MB ảnh có thể tối ưu thêm.",
      how: "Tạo bản nhỏ cho ảnh bìa video (khoảng 800 px) và preload ảnh này. Chuyển các ảnh JPG nặng trong lưới dự án sang WebP. Resize ảnh carousel từ 2560 px về 1920 px.",
      verify:
        "Đo lại LCP bằng cùng phương pháp. Mốc tốt của Google là 2,5 giây.",
      who: "Lập trình web, plugin ảnh hoặc cache",
      src: "Chrome DevTools, FlyingPress",
    },
    {
      g: "now",
      t: "Chọn và cài công cụ đo truy cập",
      why: "Website chưa dùng Google Analytics hay Rybbit. Search Console đã xác minh và đã đọc sitemap, nhưng chưa có dữ liệu lượng truy cập, nguồn và chuyển đổi để đo tác động của các việc đã làm.",
      how: 'Chọn một công cụ ở mục "Đo lường truy cập" và cài mã (qua WPCode Header &amp; Footer hoặc Elementor Pro Custom Code).',
      verify: "Công cụ đo ghi nhận lượt truy cập sau vài ngày.",
      who: "Quản trị, lập trình web",
      src: "Xác nhận từ chủ website; curl",
    },

    {
      g: "month",
      t: "Viết meta description cho các trang còn thiếu (54 trang)",
      why: "Gồm 8 trang thật: <code>/phong-bep/</code>, <code>/phong-ngu/</code>, <code>/phong-khach-sofa/</code>, <code>/phong-cach-ke-tv/</code>, <code>/hoat-dong-cua-moc-chat/</code>, <code>/tu-van-noi-that/</code>, <code>/tu-van-noi-that/vat-lieu/</code>, <code>/tu-van-noi-that/vat-lieu/go-oc-cho/</code>. Thêm 9 trang Video Library mới vào sitemap, và 37 phân trang hoặc URL biến thể (trang tác giả, <code>/page/N/</code>, <code>?per_page=</code>).",
      how: "Viết mô tả khoảng 70–160 ký tự cho 8 trang thật và 9 trang video. Với các biến thể <code>?per_page=</code>, phân trang và trang tác giả, đặt canonical về trang gốc hoặc noindex.",
      verify: "Site audit không còn báo thiếu meta ở các trang thật.",
      who: "Nội dung",
      src: "OpenSEO (audit lần 7)",
    },
    {
      g: "month",
      t: "Cho phép phóng to trên điện thoại",
      why: "Thẻ viewport đang đặt <code>maximum-scale=1.0, user-scalable=no</code>, chặn người dùng phóng to chữ và ảnh. Ảnh nội thất cần phóng to để xem chi tiết.",
      how: "Đổi thành <code>width=device-width, initial-scale=1</code>. Theme Woodmart in thẻ này, chưa xác nhận có tùy chọn trong Theme Settings, nếu không có thì cần sửa bằng theme con.",
      verify: "Lighthouse không còn báo lỗi viewport trong mục truy cập.",
      who: "Lập trình web",
      src: "SEOquake, Lighthouse, curl",
    },
    {
      g: "month",
      t: "Gộp nội dung trùng và sửa thẻ H1",
      why: "Bài Vinhomes Riverside tồn tại ở hai URL. Hai trang <code>/tu-van-noi-that/</code> và <code>/tu-van-noi-that/vat-lieu/</code> trùng nội dung, đều thiếu meta và H1. Audit lần 7: 25 trang thiếu H1 (gồm <code>/gioi-thieu/</code>, <code>/du-an/</code>, <code>/video-library/</code>), 13 trang nhiều thẻ H1, 6 meta description trùng.",
      how: "Chọn một URL chính cho bài Vinhomes và 301 URL còn lại. Viết nội dung riêng cho hai trang hub. Viết meta riêng cho từng cặp trùng. Giữ một H1 mỗi trang.",
      verify:
        "Site audit không còn báo trùng nội dung, trùng meta và nhiều H1.",
      who: "Nội dung, lập trình web",
      src: "OpenSEO (audit lần 7)",
    },
    {
      g: "month",
      t: "Lập rank tracker và mở rộng từ khóa cụm tủ rượu",
      why: 'Danh sách đã lưu chỉ có "tủ rượu gỗ óc chó" (90 lượt tìm). Các từ rộng hơn như "tủ rượu" (4.400), "tủ rượu phòng khách" (1.600), "tủ rượu đẹp" (1.000) chưa được theo dõi, trong khi đối thủ mới ở vị trí 18–21.',
      how: "Bổ sung các từ này, tạo rank tracker cho 7 từ khóa chính, đối chiếu title và H1 của trang <code>/noi-that-go-oc-cho/tu-ruou-go-oc-cho/</code>. Rank tracker dùng dữ liệu bên ngoài nên tốn phí, cần xem ước tính chi phí trước.",
      verify:
        "Có số đo thứ hạng đầu tiên của mocchat.vn cho các từ khóa mục tiêu.",
      who: "SEO",
      src: "OpenSEO",
    },

    {
      g: "later",
      t: "Giảm thời gian phản hồi của máy chủ khi chưa có cache",
      why: "Mọi yêu cầu chưa có cache mất 3 đến 6 giây, trong khi trang có cache chỉ 0,13 giây. Máy chủ chạy PHP 8.0 và MariaDB 10.3 (cả hai đã hết hỗ trợ), không thấy object cache. Audit báo 221 trang phản hồi chậm.",
      how: "Nâng PHP lên 8.2 hoặc 8.3 (sao lưu trước, thử các plugin Elementor, JetEngine, Woodmart, FlyingPress). Hỏi hosting về Redis. Cài tạm Query Monitor để tìm plugin nặng khi khởi động.",
      verify:
        "Thời gian phản hồi của trang chưa cache và số trang bị báo chậm giảm trong lần audit sau.",
      who: "Lập trình web, hosting",
      src: "curl, Site Health, OpenSEO",
    },
    {
      g: "later",
      t: "Sửa link gốc trong template (không bắt buộc)",
      why: "17 link hỏng đã được chuyển hướng 301 nên không còn lỗi, nhưng các trang nguồn vẫn chứa link tới URL cũ, mỗi lần bấm mất thêm một bước chuyển hướng.",
      how: "Sửa link trực tiếp trong template của các trang bàn ăn (baoc-NN) và 6 trang gỗ óc chó.",
      verify: "Không còn link nội bộ nào đi qua chuyển hướng.",
      who: "Lập trình web",
      src: "OpenSEO, curl",
    },
    {
      g: "later",
      t: "Bổ sung schema doanh nghiệp",
      why: "Schema Organization chỉ có tên, chưa có logo, địa chỉ, điện thoại. Trang chủ đang được gắn kiểu Article.",
      how: "Thêm LocalBusiness (cửa hàng nội thất) với địa chỉ showroom hoặc nhà máy thật, số điện thoại, giờ mở cửa và logo (Rank Math → Tiêu đề &amp; mô tả → SEO Local). Website bán toàn quốc nên không cần gắn tên thành phố vào nội dung SEO. Gợi ý, cần kiểm tra bằng công cụ thử dữ liệu có cấu trúc.",
      verify:
        "Công cụ kiểm tra schema không báo lỗi; thông tin doanh nghiệp được nhận diện.",
      who: "Lập trình web",
      src: "SEOquake (gợi ý chưa kiểm chứng)",
    },
    {
      g: "later",
      t: "Kiểm tra trang bàn trà btoc-16",
      why: "Trang <code>/noi-that-go-oc-cho/ban-tra-go-oc-cho/btoc-16/</code> từng hết thời gian chờ 16 giây (audit lần 2) và có trong sitemap. Chưa kiểm tra lại.",
      how: "Mở trang và kiểm tra lỗi hoặc truy vấn chậm.",
      verify: "Trang tải bình thường trong audit sau.",
      who: "Lập trình web",
      src: "OpenSEO (audit lần 2)",
    },
    {
      g: "later",
      t: "Bật HSTS",
      why: "Phản hồi của trang chủ thiếu header Strict-Transport-Security. Đây là bảo mật nâng cao, chỉ nên bật sau khi chắc chắn HTTPS chạy ổn trên toàn site.",
      how: "Bật HSTS ở Cloudflare hoặc máy chủ.",
      verify:
        "Header Strict-Transport-Security xuất hiện trong phản hồi.",
      who: "Lập trình web, hosting",
      src: "SEOquake, curl",
    },
    {
      g: "later",
      t: "Xem lại robots.txt nếu định dùng công cụ SEO khác",
      why: 'File robots.txt chặn AhrefsBot, SemrushBot, MJ12bot, Dotbot, "Screaming" (Screaming Frog), Rogerbot, SEOkicks, serpstatbot bằng hàng trăm dòng riêng. Screaming Frog mặc định tuân thủ robots.txt nên sẽ không quét được. OpenSEO và Googlebot không bị ảnh hưởng.',
      how: "Chỉ cần xử lý nếu muốn dùng các công cụ trên. Có thể tắt tuân thủ robots.txt trong công cụ, hoặc cho phép bot cần dùng.",
      verify: "Công cụ quét được website.",
      who: "Quản trị website",
      src: "curl",
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
