// ==UserScript==
// @name        VisaMetric_nav-tabs
// @namespace   Violentmonkey Scripts
// @match       *://it-ir-appointment.visametric.com/*
// @grant       GM.registerMenuCommand
// @version     0.1
// @author      FailedTech
// @description 09/11/2023, 16:00:00 PM
// @icon        https://www.visametric.com/front/images/common/favicon.png
// @homepageURL https://github.com/FailedTech/ViolentMonkey/tree/main/VisaMetric
// @updateURL   
// @downloadURL 
// @require     https://code.jquery.com/jquery-3.6.0.min.js
// @run-at      document-idle
// ==/UserScript==

(() => {
    let passiveTab = (valLi, valTab) => {
        ['appCountLi',
            'appPersonalInfoLi',
            'appServicesLi', 'appPreviewLi',
            'appCalendarLi',
            'appCreditCardLi',
            'appCount',
            'appPersonalInfo',
            'appServices',
            'appPreview',
            'appCalendar',
            'appCreditCard'].forEach(item => item.endsWith('Li')
                ? $('.' + item).removeClass('active')
                : $('#' + item).removeClass('active in'));
        $('.' + valLi).addClass('active');
        $('#' + valTab).addClass('active in');
        window.scrollTo(0, 0);
    };

    $(".appCountLi").on("click", () => { passiveTab('appCountLi', 'appCount') });
    $(".appPersonalInfoLi").on("click", () => { passiveTab('appPersonalInfoLi', 'appPersonalInfo') });
    $(".appPreviewLi").on("click", () => { passiveTab('appPreviewLi', 'appPreview') });
    $(".appCalendarLi").on("click", () => { passiveTab('appCalendarLi', 'appCalendar') });
    $(".appServicesLi").on("click", () => { passiveTab('appServicesLi', 'appServices') });
})();