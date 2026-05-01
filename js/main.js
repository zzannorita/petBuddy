(function () {
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".menu-toggle");
  var panel = document.getElementById("primary-nav");
  if (!header || !toggle || !panel) return;

  function setOpen(open) {
    header.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
  }

  toggle.addEventListener("click", function () {
    setOpen(!header.classList.contains("is-open"));
  });

  panel.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      setOpen(false);
    });
  });

  var mq = window.matchMedia("(min-width: 881px)");
  function onViewportChange() {
    if (mq.matches) setOpen(false);
  }
  if (mq.addEventListener) {
    mq.addEventListener("change", onViewportChange);
  } else {
    mq.addListener(onViewportChange);
  }
})();
