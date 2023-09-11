// ==UserScript==
// @name        VisaMetric
// @namespace   Violentmonkey Scripts
// @match       *://it-ir-appointment.visametric.com/*
// @grant       GM.registerMenuCommand
// @version     0.1.003
// @author      FailedTech
// @description 09/11/2023, 13:00:00 PM
// @icon        https://www.visametric.com/front/images/common/favicon.png
// @homepageURL https://github.com/FailedTech/ViolentMonkey
// @updateURL   https://github.com/FailedTech/ViolentMonkey/raw/main/VisaMetric.user.js
// @downloadURL https://github.com/FailedTech/ViolentMonkey/raw/main/VisaMetric.user.js
// @require     https://code.jquery.com/jquery-3.6.0.min.js
// @run-at      document-idle
// ==/UserScript==

(() => {
    let pathName = window.location.pathname;
    let home = () => { $("#nationalWorkingBtn").trigger("click"); }
    let nationalWorking = () => { $("#result1, #result3, #btnSubmit").trigger("click"); }
    let subdirList = {
        '/en|/en/|/en/home|/en/home/|/ir|/ir/|/ir/home|/ir/home/': {
            home: () => { console.log('subdirList => current page is: ', pathName); home(); }
        },
        '/en/NationalWorking|/en/NationalWorking/|/ir/NationalWorking|/ir/NationalWorking/': {
            nationalWorking: () => {
                console.log('subdirList => current page is: ', pathName); nationalWorking();
            }
        },
        '/en/appointment-form|/en/appointment-form/|/ir/appointment-form|/ir/appointment-form/': {
            appointmentForm: () => {
                console.log('subdirList => current page is: ', pathName); findActiveNavTab();
            }
        }
    };
})();