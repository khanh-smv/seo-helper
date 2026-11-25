(function () {
  var TOOLS = [
    { k: "os", name: "OpenSEO", sub: "tự cài đặt" },
    { k: "sf", name: "Screaming Frog", sub: "" },
    { k: "ps", name: "SEO PowerSuite", sub: "" },
    { k: "se", name: "Semrush", sub: "" },
    { k: "ah", name: "Ahrefs", sub: "" },
    { k: "gg", name: "Google", sub: "Search Console, PageSpeed" },
    { k: "ga", name: "Google Analytics", sub: "GA4" },
    { k: "rb", name: "Rybbit", sub: "analytics" },
  ];
  var STATE = {
    y: { t: "Có", i: "✓" },
    p: { t: "Một phần", i: "◐" },
    n: { t: "Không", i: "✗" },
    u: { t: "Chưa rõ", i: "?" },
  };
  // [hạng mục, OpenSEO, Screaming Frog, PowerSuite, Semrush, Ahrefs, Google, Rybbit]
  var ROWS = [
    { g: "Audit kỹ thuật" },
    ["Link 404 và link hỏng nội bộ", "y", "y", "y", "y", "y", "p", "n"],
    ["Redirect 301/302, redirect chain", "y", "y", "y", "y", "y", "n", "n"],
    ["Title, meta, H1 thiếu, trùng, dài", "y", "y", "y", "y", "y", "n", "n"],
    ["Ảnh thiếu alt, ảnh quá nặng", "p", "y", "y", "y", "y", "p", "n"],
    ["Link ra ngoài, link hỏng ra ngoài", "n", "y", "y", "y", "y", "n", "n"],
    ["Canonical, noindex, phân trang", "p", "y", "y", "y", "y", "p", "n"],
    ["Sitemap, robots.txt", "p", "y", "y", "y", "y", "p", "n"],
    ["SSL, www và non-www", "n", "p", "p", "y", "p", "n", "n"],
    { g: "Tốc độ và Google" },
    ["Tốc độ tải trang, Core Web Vitals", "p", "y", "y", "y", "p", "y", "u"],
    ["Tình trạng index, Search Console", "p", "y", "y", "y", "y", "y", "n"],
    { g: "Nghiên cứu và theo dõi" },
    ["Nghiên cứu từ khóa, SERP", "y", "n", "p", "y", "y", "p", "n"],
    ["Phân tích đối thủ, backlink", "y", "n", "y", "y", "y", "p", "n"],
    ["Theo dõi thứ hạng", "y", "n", "y", "y", "y", "p", "n"],
    ["Hiển thị trong câu trả lời AI", "y", "n", "n", "y", "y", "n", "n"],
    { g: "Phân tích truy cập" },
    ["Lượng truy cập, nguồn, trang đích", "p", "n", "n", "u", "u", "p", "y"],
    ["Phễu chuyển đổi, mục tiêu", "n", "n", "n", "n", "n", "n", "y"],
    ["Phát lại phiên truy cập", "n", "n", "n", "n", "n", "n", "y"],
    { g: "Tích hợp" },
    ["Cho Claude đọc kết quả qua MCP", "y", "n", "n", "u", "u", "u", "u"],
  ];
  // Cột Google Analytics (GA4) chèn trước cột Rybbit.
  var GA4 = {
    "Lượng truy cập, nguồn, trang đích": "y",
    "Phễu chuyển đổi, mục tiêu": "y",
    "Cho Claude đọc kết quả qua MCP": "u",
  };
  ROWS.forEach(function (r) {
    if (!r.g) r.splice(7, 0, GA4[r[0]] || "n");
  });

  function mk(s) {
    var d = STATE[s];
    return (
      '<span class="mk ' +
      s +
      '" title="' +
      d.t +
      '"><span aria-hidden="true">' +
      d.i +
      '</span><span class="vh">' +
      d.t +
      "</span></span>"
    );
  }

  document.getElementById("legend").innerHTML = ["y", "p", "n", "u"]
    .map(function (s) {
      return "<span>" + mk(s) + STATE[s].t + "</span>";
    })
    .join("");

  var t = document.getElementById("cap");
  var cols =
    '<colgroup><col class="c0">' +
    TOOLS.map(function () {
      return "<col>";
    }).join("") +
    "</colgroup>";
  var head =
    '<thead><tr><th scope="col">Hạng mục</th>' +
    TOOLS.map(function (x) {
      return (
        '<th scope="col"' +
        (x.k === "os" ? ' class="os"' : "") +
        ">" +
        x.name +
        (x.sub ? "<small>" + x.sub + "</small>" : "") +
        "</th>"
      );
    }).join("") +
    "</tr></thead>";

  var body = ROWS.map(function (r) {
    if (r.g)
      return (
        '<tr class="group"><th colspan="9" scope="colgroup">' +
        r.g +
        "</th></tr>"
      );
    return (
      '<tr><th scope="row">' +
      r[0] +
      "</th>" +
      r
        .slice(1)
        .map(function (s, i) {
          return "<td" + (i === 0 ? ' class="os"' : "") + ">" + mk(s) + "</td>";
        })
        .join("") +
      "</tr>"
    );
  }).join("");

  var rows = ROWS.filter(function (r) {
    return !r.g;
  });
  var total = rows.length;
  var foot =
    '<tr class="score"><th scope="row">Số hạng mục có đủ</th>' +
    TOOLS.map(function (_, i) {
      var n = rows.filter(function (r) {
        return r[i + 1] === "y";
      }).length;
      return (
        "<td" + (i === 0 ? ' class="os"' : "") + ">" + n + "/" + total + "</td>"
      );
    }).join("") +
    "</tr>";

  t.innerHTML = cols + head + "<tbody>" + body + foot + "</tbody>";

  // Đối chiếu trực tiếp Google Analytics (GA4) và Rybbit
  var VS = [
    [
      "Chi phí",
      { t: "Miễn phí (bản tiêu chuẩn)" },
      { t: "Tự lưu trữ miễn phí", n: "Cloud từ $19/tháng" },
    ],
    [
      "Nơi lưu dữ liệu",
      { t: "Máy chủ của Google" },
      {
        t: "Máy chủ riêng khi tự lưu trữ",
        n: "Hoặc cloud do hãng vận hành",
      },
    ],
    [
      "Cookie và banner đồng ý",
      {
        s: "n",
        t: "Dùng cookie",
        n: "Thường cần banner đồng ý theo quy định quyền riêng tư của từng khu vực",
      },
      { s: "y", t: "Không dùng cookie", n: "Theo mô tả của hãng" },
    ],
    [
      "Lượng truy cập, nguồn, trang đích",
      { s: "y", t: "Có" },
      { s: "y", t: "Có" },
    ],
    ["Phễu chuyển đổi và mục tiêu", { s: "y", t: "Có" }, { s: "y", t: "Có" }],
    [
      "Giữ chân người dùng và hành trình",
      { s: "y", t: "Có" },
      { s: "y", t: "Có" },
    ],
    ["Phát lại phiên truy cập", { s: "n", t: "Không có" }, { s: "y", t: "Có" }],
    [
      "Liên kết với Search Console, Google Ads, BigQuery",
      { s: "y", t: "Liên kết sẵn" },
      { s: "n", t: "Không có" },
    ],
    [
      "Đọc được trong OpenSEO",
      { s: "y", t: "Có tool đọc dữ liệu GA4" },
      { s: "n", t: "Chưa ghi nhận tích hợp" },
    ],
    [
      "Giới hạn dữ liệu",
      {
        t: "Dữ liệu chi tiết lưu tối đa 14 tháng ở bản tiêu chuẩn",
        n: "Một số báo cáo khám phá có lấy mẫu",
      },
      {
        t: "Không giới hạn sự kiện khi tự lưu trữ",
        n: "Cloud tính theo gói sự kiện",
      },
    ],
  ];

  function vsCell(c, label) {
    var mark = c.s ? mk(c.s).replace('class="mk', 'class="mk') : "";
    return (
      '<td data-label="' +
      label +
      '">' +
      mark +
      '<span class="t">' +
      c.t +
      "</span>" +
      (c.n ? "<small>" + c.n + "</small>" : "") +
      "</td>"
    );
  }

  document.getElementById("vs").innerHTML =
    '<thead><tr><th scope="col">Tiêu chí</th><th scope="col">Google Analytics<small>GA4, bản tiêu chuẩn</small></th><th scope="col">Rybbit<small>mã nguồn mở</small></th></tr></thead><tbody>' +
    VS.map(function (r) {
      return (
        '<tr><th scope="row">' +
        r[0] +
        "</th>" +
        vsCell(r[1], "Google Analytics") +
        vsCell(r[2], "Rybbit") +
        "</tr>"
      );
    }).join("") +
    "</tbody>";

  document.getElementById("capnote").textContent =
    'Rybbit là công cụ phân tích truy cập nên chỉ so được ở nhóm "Phân tích truy cập". Với OpenSEO, ảnh nặng chỉ thấy qua Lighthouse của tối đa 10 trang mẫu (không chọn được URL), và sitemap chỉ có cờ "có trong sitemap" của từng trang. Hàng cuối chỉ đếm ô "Có", không phản ánh chất lượng từng công cụ.';

  var BARS = [
    {
      n: "OpenSEO tự cài đặt",
      usd: 0,
      label: "0",
      vnd: "chưa kể dữ liệu theo mức dùng",
    },
    {
      n: "Google Analytics (GA4)",
      usd: 0,
      label: "0",
      vnd: "bản tiêu chuẩn",
      an: 1,
    },
    {
      n: "Rybbit tự lưu trữ",
      usd: 0,
      label: "0",
      vnd: "chưa kể máy chủ",
      an: 1,
    },
    {
      n: "Rybbit Cloud Standard",
      usd: 228,
      label: "$228",
      vnd: "≈ 5,9 triệu đ",
      an: 1,
    },
    {
      n: "Screaming Frog",
      usd: 259,
      label: "£199 (≈ $259)",
      vnd: "≈ 6,7 triệu đ",
    },
    {
      n: "SEO PowerSuite Professional",
      usd: 349,
      label: "$349",
      vnd: "≈ 9,1 triệu đ",
    },
    {
      n: "Ahrefs Lite",
      usd: 1548,
      label: "$1.548",
      vnd: "≈ 40,2 triệu đ",
    },
    {
      n: "Semrush Pro",
      usd: 1679,
      label: "$1.679",
      vnd: "≈ 43,7 triệu đ",
    },
  ];

  var max = Math.max.apply(
    null,
    BARS.map(function (b) {
      return b.usd;
    }),
  );

  document.getElementById("bars").innerHTML = BARS.map(function (b) {
    var w = (b.usd / max) * 100;
    return (
      '<div class="bar"><div>' +
      b.n +
      "</div>" +
      '<div class="track" role="img" aria-label="' +
      b.n +
      ": " +
      b.label +
      '"><div class="fill' +
      (b.an ? " an" : "") +
      '" style="width:' +
      w +
      '%"></div></div>' +
      '<div class="val"><b>' +
      b.label +
      "</b><br>" +
      b.vnd +
      "</div></div>"
    );
  }).join("");
})();
