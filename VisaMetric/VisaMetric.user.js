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
        ['appCountLi', 'appPersonalInfoLi', 'appPreviewLi', 'appCalendarLi', 'appServicesLi', 'appCreditCardLi'].forEach(item => {
            $('.' + item).removeClass('active'); $('#' + item.replace('Li', '')).removeClass('active in');
        });
        $('.' + valLi).addClass('active');
        $('#' + valTab).addClass('active in');
        window.scrollTo(0, 0);
    };

    let appointmentForm = () => {
        $(".totalPerson").on("change", (e) => {
            $(`.person${parseInt(e.currentTarget.value)}`).prevAll().addBack().show();
            $(`.person${parseInt(e.currentTarget.value)}`).nextAll().not(`.person${parseInt(e.currentTarget.value)}`).hide();
        });
        $(".appCountLi, .appPersonalInfoLi, .appPreviewLi, .appCalendarLi, .appServicesLi, .appCreditCardLi").on("click", (e) => {
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
        $("#paymentCardInput").val(6104338964005165);
        $("#popupDatepicker2").val("1402/06/11");
        $("#scheba_number").val("IR540120000000009663850619");
        $("#scheba_name").val("ABEDIN FALLAHI");
        $("#name1").val("ELAHE");
        $("#surname1").val("FALLAHI");
        $("#birthyear1").val("1991");
        $("#birthmonth1").val("05");
        $("#birthday1").val("05");
        $("#passport1").val("X60422129");
        $("#phone1").val("09127391660");
        $("#email1").val("elahefallahi.91@yahoo.com");
    }

    let subdirList = {
        '|/ir|/ir/|/ir/home|/ir/home/|/it|/it/|/it/home|/it/home/':
            () => { window.location.pathname = "/en"; },
        '/en|/en/|/en/home|/en/home/':
            () => { console.log('subdirList => current page is: ', pathName); home(); },
        '/en/NationalWorking|/en/NationalWorking/|/ir/NationalWorking|/ir/NationalWorking/|/it/NationalWorking|/it/NationalWorking/':
            () => { console.log('subdirList => current page is: ', pathName); nationalWorking(); },
        '/en/appointment-form|/en/appointment-form/|/ir/appointment-form|/ir/appointment-form/|/it/appointment-form|/it/appointment-form/':
            () => { console.log('subdirList => current page is: ', pathName); appointmentForm() }
    };
    let matchedSubdir = Object.keys(subdirList).find(key => key.split('|').find(path => path === pathName));
    matchedSubdir ? subdirList[matchedSubdir]() : console.log('No matching url:', pathName);

})();