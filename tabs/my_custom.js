'use strict';

import { GUI, TABS } from './../js/gui.js';  // ← ESM-импорт (расширение .js обязательно в Vite!)
import tabs from './../js/tabs.js';          // если используешь tabs.init

console.log(">>> my_custom.js успешно импортирован (ESM) <<<");

TABS.my_custom = {
    initialize: function (callback) {
        console.log(">>> my_custom initialize вызвана <<<");

        // Raw import HTML как строка (как в pid_tuning)
        import('./my_custom.html?raw').then(({ default: html }) => {
            console.log(">>> my_custom.html импортирован как raw-строка <<<");

            GUI.load(html, function () {
                console.log(">>> GUI.load(html) выполнен <<<");

                // Автоматическая обработка субтабов — как в других табах, где есть .subtabs
                tabs.init($('.tab_my_custom'));

                // Если tabs.init не переключает — добавь fallback-клик (но сначала проверь)
                // $('.tab_my_custom .subtab_header_label').on('click', ... ) — можно убрать, если tabs.init работает

                GUI.content_ready(callback);
            });
        }).catch(err => {
            console.error("Ошибка импорта raw HTML:", err);
        });
    },

    cleanup: function (callback) {
        console.log(">>> my_custom cleanup <<<");
        if (callback) callback();
    }
};