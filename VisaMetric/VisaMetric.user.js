// ==UserScript==
// @name        VisaMetric
// @namespace   Violentmonkey Scripts
// @match       *://it-ir-appointment.visametric.com/*
// @grant       GM.registerMenuCommand
// @version     0.1.003
// @author      FailedTech
// @description 09/11/2023, 13:00:00 PM
// @icon        https://www.visametric.com/front/images/common/favicon.png
// @homepageURL https://github.com/FailedTech/ViolentMonkey/tree/main/VisaMetric
// @updateURL   https://github.com/FailedTech/ViolentMonkey/raw/main/VisaMetric/VisaMetric.user.js
// @downloadURL https://github.com/FailedTech/ViolentMonkey/raw/main/VisaMetric/VisaMetric.user.js
// @run-at      document-idle
// ==/UserScript==

(() => {
    let pathName = window.location.pathname;

    let home = () => { $("#nationalWorkingBtn").trigger("click"); }

    let nationalWorking = () => { $("#result1, #result3").trigger("click"); $("#btnSubmit").trigger("click"); };

    let addSelectedOption = (id, className, val, txt) => {
        $(`#${id}`).length && ($(`#${id}`).append($('<option>', { value: val, text: txt }).attr('selected', 'selected')), className && $(`#${id}`).addClass(className));
    };

    let passiveTab = (valLi, valTab) => {
        ['appCountLi', 'appPersonalInfoLi', 'appServicesLi', 'appPreviewLi', 'appCalendarLi', 'appCreditCardLi', 'appCount', 'appPersonalInfo',
            'appServices', 'appPreview', 'appCalendar', 'appServices'].forEach(item => item.endsWith('Li')
                ? $('.' + item).removeClass('active')
                : $('#' + item).removeClass('active in'));
        $('.' + valLi).addClass('active');
        $('#' + valTab).addClass('active in');
        window.scrollTo(0, 0);
    };

    let appointmentForm = () => {
        $(".totalPerson").on("change", (e) => {
            $(`.person${parseInt(e.currentTarget.value)}`).prevAll().show();
            $(`.person${parseInt(e.currentTarget.value)}`).nextAll().hide();
        });
        $(".appCountLi, .appPersonalInfoLi, .appPreviewLi, .appCalendarLi, .appServicesLi").on("click", (e) => {
            passiveTab($(e.currentTarget).attr("class"), $(e.currentTarget).attr("class").replace("Li", ""));
        });
        addSelectedOption("city", "city", "1", "TEHRAN")
        addSelectedOption("office", "office", "1", "TEHRAN")
        addSelectedOption("officetype", "officetype", "1", "NORMAL")
        $(".totalPerson").prop("selectedIndex", 1);
        $('.setnewcalendarstatus').val(2);
        $('.parentTotalFee').show();
        $('#paytype').show();
        $('#availableDayInfo').show();
        $("#atm").trigger("click");
        $("#paymentCardInput").val(5022291310533185);
        $("#popupDatepicker2").val("1402/06/20");
    }

    let subdirList = {
        '/en|/en/|/en/home|/en/home/|/ir|/ir/|/ir/home|/ir/home/|/it|/it/|/it/home|/it/home/':
            () => { console.log('subdirList => current page is: ', pathName); home(); },
        '/en/NationalWorking|/en/NationalWorking/|/ir/NationalWorking|/ir/NationalWorking/|/it/NationalWorking|/it/NationalWorking/':
            () => { console.log('subdirList => current page is: ', pathName); nationalWorking(); },
        '/en/appointment-form|/en/appointment-form/|/ir/appointment-form|/ir/appointment-form/|/it/appointment-form|/it/appointment-form/':
            () => { console.log('subdirList => current page is: ', pathName); appointmentForm() }
    };
    let matchedSubdir = Object.keys(subdirList).find(key => key.split('|').find(path => path === pathName));
    matchedSubdir ? subdirList[matchedSubdir]() : console.log('No matching url:', pathName);

})();