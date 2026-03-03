'use strict';

import { GUI, TABS } from './../js/gui.js';
import tabs from './../js/tabs.js';

import './osd.js';
import './sensors.js';

TABS.my_custom = {
    initialize: function (callback) {
        import('./my_custom.html?raw').then(({ default: html }) => {
            GUI.load(html, function () {
                tabs.init($('.tab_my_custom'));

                const updateSubtab = (target) => {
                    const containerId = target === 'subtab-osd' ? '#subtab-osd' : '#subtab-sensors';
                    const tabName = target === 'subtab-osd' ? 'osd' : 'sensors';

                    $('#subtab-osd, #subtab-sensors').empty();
                    $(containerId).html(`<div class="tab_${tabName}"></div>`);

                    const originalLoad = GUI.load;
                    GUI.load = function (content, cb) {
                        $(containerId + ' .tab_' + tabName).html(content);
                        if (cb) cb();
                    };

                    const tabObj = TABS[tabName];

                    if (tabObj && tabObj.initialize) {
                        tabObj.initialize(() => {
                            GUI.load = originalLoad;
                            window.dispatchEvent(new Event('resize'));
                        });
                    } else {
                        GUI.load = originalLoad;
                    }
                };

                $('.subtab__header_label').on('click', function () {
                    const target = $(this).attr('for');
                    updateSubtab(target);
                });

                setTimeout(() => {
                    $('.subtab__header_label[for="subtab-osd"]').trigger('click');
                }, 50);

                GUI.content_ready(callback);
            });
        });
    },

    cleanup: function (callback) {
        if (callback) callback();
    }
};