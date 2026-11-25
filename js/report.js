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
      t: "Cho FlyingPress cache các URL <code>?per_page=</code> và bật preload",
      why: "Các URL có <code>?per_page=N</code> không bao giờ được cache (MISS, 2,7 đến 3,1 giây mỗi lần), trong khi URL thường được cache và trả về trong 0,13 đến 0,28 giây. Ngoài ra, mỗi lần lưu bài FlyingPress xóa cache nên crawler và khách vào lúc đó phải chờ máy chủ dựng lại trang: audit mới nhất vẫn báo 45 trang chậm 3,8 đến 6,8 giây dù đo lại bằng curl chúng đều có cache.",
      how: "Trong FlyingPress → Cache: thêm <code>per_page</code> vào danh sách query string được cache (chưa xác nhận tên mục trong bản 4.14.4) và bật <b>Preload cache</b> sau khi xóa cache. Có thể thêm <code>Disallow: /*?per_page=</code> vào robots.txt sau khi bật cache.",
      verify:
        "Đo lại bằng curl: URL <code>?per_page=</code> trả HIT; số trang chậm trong audit sau giảm.",
      who: "Quản trị website",
      src: "curl, OpenSEO (audit 25/11)",
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
      t: "Xử lý các trang nội dung trùng (chờ người làm nội dung quyết định)",
      tag: ["warn", "Chờ quyết định"],
      why: "Đã so sánh nội dung từng cặp: <b>Hoa Sữa</b> (hai URL, 41/50 câu giống hệt, cả hai không có lượt hiển thị trong Search Console 28 ngày), <b>T Villa Hoài Đức</b> (hai bài, khoảng 62% câu giống), <b>Tuấn Dung Ninh Hiệp</b> (hai bài cùng dự án nhưng nội dung khác hẳn nhau, một bài thi công và một bài thiết kế), <b>BAOC-22 và BAOC-23</b> (hai sản phẩm khác nhau nhưng meta description giống nhau, 6/18 câu chung). Bài Anh Mạnh Ninh Hiệp là dự án khác, không cần xử lý. Chủ website quyết định giữ nguyên tất cả các trang vì không phải người làm nội dung.",
      how: "Hoa Sữa: 301 bản ở root về bản <code>/du-an/</code> (đầy đủ hơn, 50 ảnh so với 13) và sửa link nội bộ. T Villa và Tuấn Dung: gộp về bài có nhiều nội dung và lượt hiển thị hơn, hoặc viết lại để mỗi bài nhắm một chủ đề khác nhau. BAOC-22 và BAOC-23: viết mô tả riêng cho từng sản phẩm.",
      verify:
        "Site audit không còn báo meta description trùng và nội dung trùng; Search Console không còn hai URL cạnh tranh cùng một chủ đề.",
      who: "Nội dung",
      src: "So sánh nội dung bằng curl, Search Console qua OpenSEO",
    },
    {
      g: "month",
      t: "Sửa lỗi redirect Rank Math khi URL có tham số",
      tag: ["warn", "Mới phát hiện"],
      why: "Regex <code>^tu-van-noi-that/vat-lieu/go-oc-cho/([^/]+)/?$</code> trong Rank Math cũng khớp với đường dẫn có chuỗi truy vấn. Vì vậy <code>…/go-oc-cho/?z=abc</code> bị chuyển hướng 301 sang <code>/1/?z=abc</code>, là trang 404. Các tham số quảng cáo thường gặp (<code>utm_source</code>, <code>fbclid</code>, <code>gclid</code>) không bị lỗi (đã thử bằng curl).",
      how: "Trong Rank Math → Chuyển hướng, đổi biểu thức thành <code>^tu-van-noi-that/vat-lieu/go-oc-cho/([^/?]+)/?$</code> để slug không chứa dấu hỏi chấm.",
      verify:
        "Các URL <code>…/go-oc-cho/?z=abc</code> và <code>?ver=2026</code> trả 200 thay vì 301.",
      who: "Quản trị website",
      src: "curl (25/11)",
    },
    {
      g: "month",
      t: "Kiểm tra lỗi 526 của www.mocchat.vn",
      tag: ["warn", "Mới phát hiện"],
      why: "Địa chỉ <code>https://www.mocchat.vn/</code> trả lỗi 526 (Cloudflare không xác minh được chứng chỉ SSL của máy chủ gốc). Nếu có link hoặc backlink dùng bản www, khách sẽ thấy lỗi. Chưa kiểm tra cấu hình DNS và chứng chỉ.",
      how: "Xem lại bản ghi DNS của www trên Cloudflare, và chứng chỉ SSL ở máy chủ gốc. Sau đó chuyển hướng www về bản không có www.",
      verify: "<code>https://www.mocchat.vn/</code> trả 301 về <code>https://mocchat.vn/</code>.",
      who: "Quản trị website, hosting",
      src: "curl (23/11)",
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
      why: "Mọi yêu cầu chưa có cache mất 3 đến 6 giây, trong khi trang có cache chỉ 0,13 giây. Máy chủ chạy PHP 8.0 và MariaDB 10.3 (cả hai đã hết hỗ trợ), không thấy object cache. Redirect của Rank Math cũng chạy bằng PHP nên mất khoảng 2 giây mỗi lần (đã chuyển phần lớn sang Cloudflare). Audit 25/11 báo 45 trang phản hồi chậm.",
      how: "Nâng PHP lên 8.2 hoặc 8.3 (sao lưu trước, thử các plugin Elementor, JetEngine, Woodmart, FlyingPress). Hỏi hosting về Redis. Cài tạm Query Monitor để tìm plugin nặng khi khởi động.",
      verify:
        "Thời gian phản hồi của trang chưa cache và số trang bị báo chậm giảm trong lần audit sau.",
      who: "Lập trình web, hosting",
      src: "curl, Site Health, OpenSEO",
    },
    {
      g: "later",
      t: "Gỡ chức năng giỏ hàng khi website không bán hàng",
      why: "Website không bán hàng nên giỏ hàng là thừa: nút thêm vào giỏ trên trang dự án tạo ra các URL <code>?add-to-cart=</code> mà Google đã ghi nhận (3 URL trong Search Console), mini-cart và script giỏ hàng vẫn tải trên mọi trang. Đã loại trang giỏ hàng khỏi sitemap và đã chuyển hướng bỏ tham số <code>?add-to-cart=</code> ở Cloudflare.",
      how: "Tắt nút thêm vào giỏ và mini-cart trong Woodmart → Theme settings (mục Shop, Header). Nếu còn cần hiển thị giá hoặc nút báo giá, giữ lại phần đó.",
      verify: "Không còn nút thêm vào giỏ và không còn tải script giỏ hàng trên trang thường.",
      who: "Lập trình web",
      src: "Search Console, curl",
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
