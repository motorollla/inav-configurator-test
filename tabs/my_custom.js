'use strict';

TABS.my_custom = {};
TABS.my_custom.initialize = function (callback) {
    GUI.load(getTabHtml('my_custom'), function () {
        // Это ключевая строка — включает обработку вертикальных субтабов
        tabs.init($('.tab_my_custom'));

        // Пока просто placeholder, потом добавишь логику
        GUI.handleResize();
        GUI.content_ready(callback);
    });
};

TABS.my_custom.cleanup = function (callback) {
    PortUsage.reset();
    if (callback) callback();
};