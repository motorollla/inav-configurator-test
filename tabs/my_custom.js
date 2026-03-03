'use strict';

import { GUI, TABS } from './../js/gui.js';
import tabs from './../js/tabs.js';

// Подгружаем оригинальные скрипты (чтобы их initialize сработал внутри субтабов)
import './osd.js';
import './sensors.js';

TABS.my_custom = {
    initialize: function (callback) {
        import('./my_custom.html?raw').then(({ default: html }) => {
            GUI.load(html, function () {
                // ← Инициализируем горизонтальные субтабы (как в pid_tuning)
                tabs.init($('.tab_my_custom'));

                // Автоматически инициализируем содержимое OSD (первая вкладка)
                setTimeout(() => {
                    if (TABS.osd && TABS.osd.initialize) {
                        TABS.osd.initialize(() => {
                            console.log("OSD полностью инициализирован внутри субтаба");
                        });
                    }
                }, 100);

                // При переключении субтаба — инициализируем нужную вкладку
                $('.subtab__header_label').on('click', function () {
                    const target = $(this).attr('for');

                    if (target === 'subtab-osd') {
                        if (TABS.osd && TABS.osd.initialize && !TABS.osd._initialized) {
                            TABS.osd.initialize(() => {
                                TABS.osd._initialized = true;
                                console.log("OSD инициализирован при переключении");
                            });
                        }
                    } else if (target === 'subtab-sensors') {
                        if (TABS.sensors && TABS.sensors.initialize && !TABS.sensors._initialized) {
                            TABS.sensors.initialize(() => {
                                TABS.sensors._initialized = true;
                                console.log("SENSORS инициализирован при переключении");
                            });
                        }
                    }

                    GUI.handleResize?.();
                });

                GUI.content_ready(callback);
            });
        });
    },

    cleanup: function (callback) {
        // Очистка при выходе из вкладки
        if (TABS.osd && TABS.osd.cleanup) TABS.osd.cleanup();
        if (TABS.sensors && TABS.sensors.cleanup) TABS.sensors.cleanup();
        if (callback) callback();
    }
};