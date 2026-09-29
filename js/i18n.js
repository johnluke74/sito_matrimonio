/* =========================================================
   Cambio lingua IT / RO
   - Il testo italiano resta scritto normalmente nell'HTML.
   - Dove serve una traduzione si aggiunge un attributo data-ro
     (per il testo) o data-ro-placeholder (per i placeholder).
   - La scelta della lingua è condivisa tra le pagine tramite
     localStorage, quindi vale sia sulla landing sia sul sito.
   ========================================================= */
(function () {
    var STORAGE_KEY = 'wedding-lang';

    function applyLang(lang) {
        // Testi
        document.querySelectorAll('[data-ro]').forEach(function (el) {
            if (!el.dataset.itCache) el.dataset.itCache = el.textContent;
            el.textContent = lang === 'ro' ? el.getAttribute('data-ro') : el.dataset.itCache;
        });

        // Placeholder dei campi
        document.querySelectorAll('[data-ro-placeholder]').forEach(function (el) {
            if (!el.dataset.itPlaceholder) el.dataset.itPlaceholder = el.getAttribute('placeholder') || '';
            el.setAttribute('placeholder', lang === 'ro' ? el.getAttribute('data-ro-placeholder') : el.dataset.itPlaceholder);
        });

        document.documentElement.lang = lang;

        document.querySelectorAll('.lang-switch [data-lang]').forEach(function (btn) {
            btn.classList.toggle('is-active', btn.getAttribute('data-lang') === lang);
        });

        try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* privacy mode: pazienza */ }
    }

    window.setSiteLang = applyLang;

    function linguaPreferita() {
        // 1) Se la persona ha già scelto una lingua in una visita precedente, si usa quella.
        try {
            var salvata = localStorage.getItem(STORAGE_KEY);
            if (salvata) return salvata;
        } catch (e) {}

        // 2) Prima visita: si guarda la lingua impostata sul telefono/browser.
        var lingueBrowser = navigator.languages && navigator.languages.length
            ? navigator.languages
            : [navigator.language || 'it'];
        var hoRumeno = lingueBrowser.some(function (l) { return l.toLowerCase().indexOf('ro') === 0; });

        return hoRumeno ? 'ro' : 'it';
    }

    document.addEventListener('DOMContentLoaded', function () {
        applyLang(linguaPreferita());
    });
})();
