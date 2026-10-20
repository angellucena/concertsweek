/* ==========================================================================
   main.js - Interacciones de Concerts Week (JavaScript vanilla)
   Header con scroll, volver arriba, filtros, "ver más", cuenta regresiva
   y formulario de contacto.
   ========================================================================== */
(function () {
  "use strict";

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  /* ---------- Header con sombra + barra de progreso + volver arriba ---------- */
  var header = $(".site-header");
  var progress = $(".scroll-progress");
  var toTop = $(".back-to-top");

  function onScroll() {
    var y = window.pageYOffset || document.documentElement.scrollTop;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    if (header) { header.classList.toggle("is-scrolled", y > 24); }
    if (progress) { progress.style.width = (max > 0 ? (y / max) * 100 : 0) + "%"; }
    if (toTop) { toTop.classList.toggle("is-visible", y > 600); }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Filtro por chips (agenda y galería) ---------- */
  function setActive(group, chip) {
    $$(".chip", group).forEach(function (c) {
      var on = c === chip;
      c.classList.toggle("is-active", on);
      c.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  // Agenda de conciertos: género + ciudad + búsqueda de texto
  var agenda = $("#agenda-list");
  if (agenda) {
    var rows = $$(".agenda-row", agenda);
    var state = { genre: "all", city: "all", text: "" };
    var counter = $("#agenda-count-number");
    var empty = $("#agenda-empty");

    var applyAgenda = function () {
      var visible = 0;
      rows.forEach(function (row) {
        var okGenre = state.genre === "all" || row.dataset.genre === state.genre;
        var okCity = state.city === "all" || row.dataset.city === state.city;
        var okText = !state.text || row.textContent.toLowerCase().indexOf(state.text) !== -1;
        var show = okGenre && okCity && okText;
        row.hidden = !show;
        if (show) { visible++; }
      });
      if (counter) { counter.textContent = visible; }
      if (empty) { empty.classList.toggle("is-visible", visible === 0); }
    };

    $$("[data-filter-group]").forEach(function (group) {
      group.addEventListener("click", function (e) {
        var chip = e.target.closest(".chip");
        if (!chip) { return; }
        state[group.dataset.filterGroup] = chip.dataset.value;
        setActive(group, chip);
        applyAgenda();
      });
    });

    var search = $("#agenda-search");
    if (search) {
      search.addEventListener("input", function () {
        state.text = search.value.trim().toLowerCase();
        applyAgenda();
      });
    }
    applyAgenda();
  }

  // Galería: filtro por género de las tarjetas de shows
  var showGrid = $("#show-grid");
  var genreGroup = $("#genre-filter");
  if (showGrid && genreGroup) {
    genreGroup.addEventListener("click", function (e) {
      var chip = e.target.closest(".chip");
      if (!chip) { return; }
      setActive(genreGroup, chip);
      var value = chip.dataset.value;
      $$(".show-card", showGrid).forEach(function (card) {
        var match = value === "all" || card.dataset.genre === value;
        card.hidden = !match;
        // Si se filtra, se muestran también las tarjetas que estaban plegadas
        if (match && value !== "all") { card.classList.remove("is-hidden"); }
      });
    });
  }

  /* ---------- Botón "Ver más" ---------- */
  $$("[data-load-more]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var target = $(btn.dataset.loadMore);
      if (!target) { return; }
      $$(".is-hidden", target).forEach(function (el, i) {
        el.classList.remove("is-hidden");
        el.style.animation = "captionRise 0.6s ease " + (i * 0.1) + "s both";
      });
      btn.hidden = true;
    });
  });

  /* ---------- Cuenta regresiva ---------- */
  var countdown = $("[data-countdown]");
  if (countdown) {
    var target = new Date(countdown.dataset.countdown).getTime();
    var cells = {
      d: $("[data-unit='d']", countdown),
      h: $("[data-unit='h']", countdown),
      m: $("[data-unit='m']", countdown),
      s: $("[data-unit='s']", countdown)
    };
    var pad = function (n) { return n < 10 ? "0" + n : String(n); };
    var tick = function () {
      var diff = Math.max(0, target - Date.now());
      cells.d.textContent = Math.floor(diff / 86400000);
      cells.h.textContent = pad(Math.floor(diff / 3600000) % 24);
      cells.m.textContent = pad(Math.floor(diff / 60000) % 60);
      cells.s.textContent = pad(Math.floor(diff / 1000) % 60);
    };
    tick();
    setInterval(tick, 1000);
  }

  /* ---------- Formulario de contacto ---------- */
  var form = $("#contact-form");
  if (form) {
    var topic = $("#motivo", form);
    var techFields = $("#tech-fields", form);
    var success = $("#form-success");

    // Campos extra solo para soporte técnico
    var toggleTech = function () {
      var isTech = topic.value === "soporte";
      techFields.hidden = !isTech;
      $$("input, select", techFields).forEach(function (f) { f.disabled = !isTech; });
    };
    topic.addEventListener("change", toggleTech);
    toggleTech();

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      // Sitio estático: se simula el envío y se confirma con una animación
      form.hidden = true;
      success.classList.add("is-visible");
      success.focus();
    });

    var again = $("#form-reset");
    if (again) {
      again.addEventListener("click", function () {
        form.reset();
        toggleTech();
        success.classList.remove("is-visible");
        form.hidden = false;
      });
    }
  }

  /* ---------- AOS (librería externa de animaciones al hacer scroll) ---------- */
  if (window.AOS) {
    window.AOS.init({ once: true, duration: 800, easing: "ease-out-cubic", offset: 60 });
  }
})();
