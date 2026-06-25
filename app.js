(function () {
    var PREF_CONTRASTE = 'pref-alto-contraste';
    var PREF_ESPACO    = 'pref-espacamento';
    var PREF_FONTE     = 'pref-escala-fonte';

    var escala = parseFloat(localStorage.getItem(PREF_FONTE)) || 1;

    function aplicarContraste(ativo) {
        document.body.classList.toggle('alto-contraste', ativo);
        var btn = document.getElementById('btn-alto-contraste');
        if (btn) btn.setAttribute('aria-pressed', String(ativo));
    }

    function aplicarEspacamento(ativo) {
        document.body.classList.toggle('espacamento-ampliado', ativo);
        var btn = document.getElementById('btn-aumentar-espaco');
        if (btn) btn.setAttribute('aria-pressed', String(ativo));
    }

    function aplicarEscala() {
        document.documentElement.style.setProperty('--escala-fonte', escala);
        localStorage.setItem(PREF_FONTE, String(escala));
    }

    aplicarContraste(localStorage.getItem(PREF_CONTRASTE) === 'true');
    aplicarEspacamento(localStorage.getItem(PREF_ESPACO) === 'true');
    aplicarEscala();

    document.addEventListener('DOMContentLoaded', function () {
        aplicarContraste(localStorage.getItem(PREF_CONTRASTE) === 'true');
        aplicarEspacamento(localStorage.getItem(PREF_ESPACO) === 'true');

        var btnContraste    = document.getElementById('btn-alto-contraste');
        var btnEspaco       = document.getElementById('btn-aumentar-espaco');
        var btnEspacoPadrao = document.getElementById('btn-espaco-padrao');
        var btnAumentar     = document.getElementById('btn-aumentar-fonte');
        var btnDiminuir     = document.getElementById('btn-diminuir-fonte');

        if (btnContraste) {
            btnContraste.addEventListener('click', function () {
                var ativo = !document.body.classList.contains('alto-contraste');
                aplicarContraste(ativo);
                localStorage.setItem(PREF_CONTRASTE, String(ativo));
            });
        }

        if (btnEspaco) {
            btnEspaco.addEventListener('click', function () {
                aplicarEspacamento(true);
                localStorage.setItem(PREF_ESPACO, 'true');
            });
        }

        if (btnEspacoPadrao) {
            btnEspacoPadrao.addEventListener('click', function () {
                aplicarEspacamento(false);
                localStorage.setItem(PREF_ESPACO, 'false');
            });
        }

        if (btnAumentar) {
            btnAumentar.addEventListener('click', function () {
                escala = Math.min(+(escala + 0.1).toFixed(1), 2);
                aplicarEscala();
            });
        }

        if (btnDiminuir) {
            btnDiminuir.addEventListener('click', function () {
                escala = Math.max(+(escala - 0.1).toFixed(1), 1);
                aplicarEscala();
            });
        }

        /* Validação acessível (5.11.1 — erro não indicado só por cor) */
        var formularios = document.querySelectorAll('form');
        formularios.forEach(function (form) {
            form.addEventListener('submit', function (e) {
                var valido = true;
                form.querySelectorAll('[required]').forEach(function (campo) {
                    var spanErro = document.getElementById(campo.id + '-erro');
                    if (!campo.value.trim()) {
                        campo.setAttribute('aria-invalid', 'true');
                        if (spanErro) spanErro.textContent = 'Este campo é obrigatório.';
                        valido = false;
                    } else {
                        campo.removeAttribute('aria-invalid');
                        if (spanErro) spanErro.textContent = '';
                    }
                });
                if (!valido) e.preventDefault();
            });

            form.querySelectorAll('[required]').forEach(function (campo) {
                campo.addEventListener('input', function () {
                    var spanErro = document.getElementById(campo.id + '-erro');
                    if (campo.value.trim()) {
                        campo.removeAttribute('aria-invalid');
                        if (spanErro) spanErro.textContent = '';
                    }
                });
            });
        });
    });
})();
