(function () {
  var button = document.querySelector(".nav-toggle");
  var nav = document.querySelector("#site-nav");
  if (button && nav) {
    function setOpen(open) {
      button.setAttribute("aria-expanded", open ? "true" : "false");
      nav.classList.toggle("is-open", open);
    }

    button.addEventListener("click", function () {
      setOpen(button.getAttribute("aria-expanded") !== "true");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.matchMedia("(max-width: 1079px)").matches) setOpen(false);
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") setOpen(false);
    });
  }

  var motion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function hash(x, t) {
    var n = Math.imul(x + 1, 374761393) + Math.imul(t + 17, 668265263);
    n = (n ^ (n >>> 13)) >>> 0;
    n = Math.imul(n, 1274126177);
    return ((n ^ (n >>> 16)) >>> 0) / 4294967295;
  }

  function initStars(canvas) {
    var ctx = canvas.getContext("2d");
    if (!ctx) return;
    var stars = [];
    var dpr = 1;
    var raf = 0;
    var running = true;

    function layout() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      var w = window.innerWidth;
      var h = window.innerHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var target = Math.max(48, Math.min(120, Math.round((w * h) / 16000)));
      if (stars.length > target) stars.length = target;
      while (stars.length < target) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() < 0.88 ? 0.6 : 1.25,
          a: 0.2 + Math.random() * 0.75,
          p: Math.random() * Math.PI * 2,
          s: 0.35 + Math.random() * 1.1
        });
      }
    }

    function draw(now) {
      var w = window.innerWidth;
      var h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < stars.length; i++) {
        var st = stars[i];
        if (st.x > w || st.y > h) continue;
        var alpha = motion.matches ? st.a : st.a * (0.45 + 0.55 * Math.sin(now * 0.001 * st.s + st.p));
        ctx.fillStyle = "rgba(226, 236, 248, " + alpha.toFixed(3) + ")";
        ctx.fillRect(st.x, st.y, st.r, st.r);
      }
      if (!motion.matches && running) raf = window.requestAnimationFrame(draw);
    }

    layout();
    if (motion.matches) draw(0);
    else raf = window.requestAnimationFrame(draw);

    window.addEventListener("resize", function () {
      layout();
      if (motion.matches) draw(0);
    });
    document.addEventListener("visibilitychange", function () {
      var hidden = document.hidden;
      if (hidden) {
        running = false;
        if (raf) window.cancelAnimationFrame(raf);
      } else if (!motion.matches) {
        running = true;
        raf = window.requestAnimationFrame(draw);
      }
    });
    if (motion.addEventListener) {
      motion.addEventListener("change", function () {
        if (motion.matches) {
          running = false;
          if (raf) window.cancelAnimationFrame(raf);
          draw(0);
        } else if (!document.hidden) {
          running = true;
          raf = window.requestAnimationFrame(draw);
        }
      });
    }
  }

  function initWaterfall(canvas) {
    var ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;
    var IW = 360;
    var IH = 220;
    canvas.width = IW;
    canvas.height = IH;
    var t0 = 0;
    var timer = 0;
    var onscreen = true;

    function paintRow(y, t) {
      var img = ctx.getImageData(0, y, IW, 1);
      var data = img.data;
      var drift = (IW * 0.08 + t * 0.72) % (IW + 40) - 20;
      var burst = (t % 280) > 36 && (t % 280) < 44;
      for (var x = 0; x < IW; x++) {
        var n = hash(x, t);
        var ds = x - drift;
        var sig = Math.exp(-(ds * ds) / 1.35);
        var halo = Math.exp(-(ds * ds) / 14) * 0.4;
        var rfi = Math.exp(-((x - IW * 0.8) * (x - IW * 0.8)) / 0.85);
        var rfiWide = Math.exp(-((x - IW * 0.3) * (x - IW * 0.3)) / 4.2) * 0.38;
        var flash = burst ? 0.55 + n * 0.3 : 0;
        var noise = 0.18 + n * 0.62;
        var r = 4 + noise * 36 + rfi * 210 + rfiWide * 80 + flash * 150;
        var g = 12 + noise * 48 + sig * 205 + halo * 60 + rfi * 155 + rfiWide * 70 + flash * 78;
        var b = 22 + noise * 62 + sig * 230 + halo * 120 + rfi * 40 + flash * 36;
        var i = x * 4;
        data[i] = r > 255 ? 255 : r;
        data[i + 1] = g > 255 ? 255 : g;
        data[i + 2] = b > 255 ? 255 : b;
        data[i + 3] = 255;
      }
      ctx.putImageData(img, 0, y);
    }

    function fillAll() {
      for (var y = 0; y < IH; y++) paintRow(y, t0 + y);
      t0 += IH;
    }

    function tick() {
      var slice = ctx.getImageData(0, 1, IW, IH - 1);
      ctx.putImageData(slice, 0, 0);
      paintRow(IH - 1, t0);
      t0 += 1;
    }

    fillAll();
    if (motion.matches) return;

    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(function (entries) {
        onscreen = entries[0].isIntersecting;
      }, { threshold: 0.05 });
      observer.observe(canvas);
    }

    timer = window.setInterval(function () {
      if (onscreen && !document.hidden && !motion.matches) tick();
    }, 48);

    if (motion.addEventListener) {
      motion.addEventListener("change", function () {
        if (motion.matches && timer) {
          window.clearInterval(timer);
          timer = 0;
        }
      });
    }
  }

  var stars = document.querySelector(".starfield");
  if (stars) initStars(stars);
  var waterfall = document.querySelector(".waterfall-canvas");
  if (waterfall) initWaterfall(waterfall);
})();
