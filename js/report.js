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
      t: "Hạ LCP trang chủ trên điện thoại xuống dưới 2,5 giây",
      tag: ["warn", "Đã giảm, chưa đạt"],
      why: "Lighthouse 26/11: LCP mobile 4,8 giây (các lần đo cùng cấu hình dao động 3,8 đến 7,2 giây), desktop 1,2 giây. Phần tử LCP là ảnh slide đầu (2560 px, khoảng 280 KB), tải lâu vì cùng lúc đó khoảng 12 ảnh dự án và sản phẩm ngay dưới carousel cũng được tải, và trong danh sách request ảnh LCP chỉ có ưu tiên thấp do thẻ preload của FlyingPress thiếu <code>fetchpriority=high</code> (Lighthouse cảnh báo; chưa kiểm chứng đây là nguyên nhân chính). Dung lượng trang tăng sau khi tắt Lazyload (mobile 5,7 MB) và Lighthouse vẫn ước tính tiết kiệm được khoảng 3,6 MB ảnh. Ba ảnh bìa video còn lại nặng 736 đến 832 KB (chưa đổi kích thước, nằm sâu dưới trang). Thử đổi ảnh carousel sang 1920×768 làm LCP xấu hơn (mobile 9,9 đến 11,8 giây) nên đã hoàn lại; chưa rõ nguyên nhân.",
      how: "Làm từng cách rồi đo lại mobile 3 lần: (1) nén lại file WebP của 8 slide carousel nhưng giữ nguyên kích thước 2560 px; (2) thử tắt <b>Preload critical images</b> trong FlyingPress → Images để ảnh LCP tải theo thẻ img có <code>fetchpriority=high</code> (logo và icon sẽ mất preload, cần đo); (3) đổi ba ảnh bìa video còn lại sang Custom 800×533 như ảnh đầu tiên. Không đổi kích thước carousel sang 1920×768 khi chưa biết nguyên nhân.",
      verify:
        "Lighthouse mobile 3 lần liên tiếp: LCP trung bình dưới 2,5 giây (hoặc giảm rõ so với 4,8 giây) và CLS vẫn dưới 0,1.",
      who: "Lập trình web, quản trị website",
      src: "Lighthouse (trình duyệt, 25–26/11), FlyingPress",
    },
    {
      g: "now",
      t: 'Đặt sự kiện chuyển đổi trong GA4 và xem lại nguồn "chưa phân loại"',
      why: 'GA4 đã chạy từ 23/11 nhưng sự kiện chuyển đổi duy nhất là <code>purchase</code> trong khi website không bán hàng, nên chưa đo được khách liên hệ, là mục tiêu thật của website. Ngoài ra 38% phiên (46/121) bị xếp vào nguồn "chưa phân loại" và chỉ 28% có tương tác, làm số liệu nguồn truy cập khó tin cậy.',
      how: 'Trong GA4, đánh dấu làm sự kiện chuyển đổi: gửi form liên hệ, bấm gọi điện, bấm Zalo (Site Kit đã bật "theo dõi lượt chuyển đổi từ plugin" cho các plugin form được hỗ trợ; chưa kiểm tra form Elementor của website có được nhận ra không, còn bấm gọi và Zalo thường cần thêm sự kiện riêng). Bỏ <code>purchase</code> khỏi sự kiện chuyển đổi. Kiểm tra các liên kết quảng cáo mạng xã hội có gắn tham số UTM chưa.',
      verify:
        'Thoát đăng nhập (Site Kit loại người dùng đã đăng nhập), gửi thử một form liên hệ và bấm nút gọi, thấy sự kiện xuất hiện trong GA4 (Realtime). Tỷ lệ "chưa phân loại" giảm trong các ngày sau.',
      who: "Quản trị, lập trình web",
      src: "GA4 qua OpenSEO (23–24/11)",
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
      g: "later",
      t: "Cho phép phóng to trên điện thoại",
      tag: ["warn", "Chưa làm được"],
      why: "Thẻ viewport đang đặt <code>maximum-scale=1.0, user-scalable=no</code>, chặn người dùng phóng to chữ và ảnh. Ảnh nội thất cần phóng to để xem chi tiết. Đã thử ngày 26/11: theme có tùy chọn <b>Theme settings → General → Other → Viewport tag</b> (đang là Not scalable), nhưng lưu bị lỗi vì PHP của host giới hạn <code>max_input_vars = 1000</code> trong khi form cài đặt gửi 1.027 trường, nên trang chuyển sang <code>options.php</code> và giá trị không đổi. Chủ website quyết định bỏ qua việc này lúc này.",
      how: "Nâng <code>max_input_vars</code> lên khoảng 3000 (thêm vào <code>.user.ini</code> hoặc chỉnh trong bảng điều khiển host), rồi đổi Viewport tag sang Scalable và lưu. Cách khác: snippet PHP thay thẻ viewport (chưa biết theme in thẻ bằng hook nào).",
      verify: "Thẻ viewport trên trang thật không còn <code>user-scalable=no</code>; Lighthouse không còn báo lỗi viewport trong mục truy cập.",
      who: "Quản trị host, lập trình web",
      src: "Theme settings, Site Health, Lighthouse, curl",
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
      t: "Kiểm tra lỗi 526 của www.mocchat.vn",
      tag: ["warn", "Mới phát hiện"],
      why: "Địa chỉ <code>https://www.mocchat.vn/</code> trả lỗi 526 (Cloudflare không xác minh được chứng chỉ SSL của máy chủ gốc). Nếu có link hoặc backlink dùng bản www, khách sẽ thấy lỗi. Chưa kiểm tra cấu hình DNS và chứng chỉ.",
      how: "Xem lại bản ghi DNS của www trên Cloudflare, và chứng chỉ SSL ở máy chủ gốc. Sau đó chuyển hướng www về bản không có www.",
      verify:
        "<code>https://www.mocchat.vn/</code> trả 301 về <code>https://mocchat.vn/</code>.",
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
      why: "Mọi yêu cầu chưa có cache mất 3 đến 6 giây, trong khi trang có cache chỉ 0,13 giây. Máy chủ chạy PHP 8.0 và MariaDB 10.3 (cả hai đã hết hỗ trợ), không thấy object cache. Redirect của Rank Math cũng chạy bằng PHP nên mất khoảng 2 giây mỗi lần (đã chuyển phần lớn sang Cloudflare). Audit sáng 25/11 báo 45 trang phản hồi chậm, audit sau khi cache dựng lại (08:35) chỉ còn 1 trang, nên phần lớn do cache bị xóa sau mỗi lần lưu.",
      how: "Nâng PHP lên 8.2 hoặc 8.3 (sao lưu trước, thử các plugin Elementor, JetEngine, Woodmart, FlyingPress). Hỏi hosting về Redis. Cài tạm Query Monitor để tìm plugin nặng khi khởi động.",
      verify:
        "Thời gian phản hồi của trang chưa cache và số trang bị báo chậm giảm trong lần audit sau.",
      who: "Lập trình web, hosting",
      src: "curl, Site Health, OpenSEO",
    },
    {
      g: "later",
      t: "Rút gọn title và meta description quá dài",
      why: 'Audit 25/11 báo 75 title dài hơn 60 ký tự và 29 meta description dài hơn 160 ký tự. Google có thể cắt bớt khi hiển thị. Mức thông tin. Title: khoảng 45 trang sản phẩm (đa số vượt dưới 10 ký tự), khoảng 13 trang dự án, còn lại là trang danh mục và bài viết. Hậu tố " | Mộc Chất" của sản phẩm đến từ mẫu title chung trong Rank Math (<code>%title% | %sitename%</code>), không gõ tay từng bài. Meta description dài chủ yếu là trang sản phẩm (kệ tivi, sofa, bàn trà), lấy từ phần tóm tắt, dài nhất 259 ký tự. Chưa sửa: để người làm nội dung quyết.',
      how: "Title sản phẩm có hai cách: (1) đổi mẫu thành <code>%title%</code> trong Rank Math → Tiêu đề &amp; Meta → Sản phẩm, sửa 1 chỗ, khoảng 40 title xuống dưới 60 ký tự nhưng mọi trang sản phẩm mất tên thương hiệu trong title; (2) giữ hậu tố và rút gọn từng bài (bỏ các chữ như Đẹp, Cao Cấp, Hiện Đại), khoảng 45 bài phải lưu riêng. Title bài viết, dự án, danh mục và meta description phải sửa tay từng bài.",
      verify: "Số title và meta quá dài trong audit sau giảm.",
      who: "SEO, người làm nội dung",
      src: "OpenSEO (audit 25/11)",
    },
    {
      g: "later",
      t: "Heading nhảy cấp ở 18 trang danh mục sản phẩm (không bắt buộc)",
      why: "Tên sản phẩm trong danh sách là H3 ngay sau H1 do mã của theme Woodmart tạo ra. Template Product archive và cài đặt theme không có tùy chọn đổi thẻ. Mức thông tin, không ảnh hưởng thứ hạng.",
      how: "Chỉ làm nếu cần: snippet PHP thay hàm hiển thị tên sản phẩm của theme (có rủi ro làm lệch giao diện danh sách và khối sản phẩm liên quan), hoặc thêm một tiêu đề H2 vào template (cần duyệt chữ).",
      verify: "Audit không còn báo heading nhảy cấp ở các trang danh mục.",
      who: "Lập trình web",
      src: "OpenSEO, kiểm tra mã HTML",
    },
    {
      g: "later",
      t: "Gỡ chức năng giỏ hàng khi website không bán hàng",
      why: "Website không bán hàng nên giỏ hàng là thừa: nút thêm vào giỏ trên trang dự án tạo ra các URL <code>?add-to-cart=</code> mà Google đã ghi nhận (3 URL trong Search Console), mini-cart và script giỏ hàng vẫn tải trên mọi trang. Đã loại trang giỏ hàng khỏi sitemap và đã chuyển hướng bỏ tham số <code>?add-to-cart=</code> ở Cloudflare.",
      how: "Tắt nút thêm vào giỏ và mini-cart trong Woodmart → Theme settings (mục Shop, Header). Nếu còn cần hiển thị giá hoặc nút báo giá, giữ lại phần đó.",
      verify:
        "Không còn nút thêm vào giỏ và không còn tải script giỏ hàng trên trang thường.",
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
      verify: "Header Strict-Transport-Security xuất hiện trong phản hồi.",
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
