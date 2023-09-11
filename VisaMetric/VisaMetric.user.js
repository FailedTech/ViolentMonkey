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
// @require     https://code.jquery.com/jquery-3.7.1.min.js
// @run-at      document-idle
// ==/UserScript==

(() => {
    let pathName = window.location.pathname;
    let home = () => { $("#nationalWorkingBtn").trigger("click"); }
    let nationalWorking = () => { $("#result1, #result3, #btnSubmit").trigger("click"); }
    let subdirList = {
        '/en|/en/|/en/home|/en/home/|/ir|/ir/|/ir/home|/ir/home/|/it|/it/|/it/home|/it/home/':
            () => { console.log('subdirList => current page is: ', pathName); home(); },
        '/en/NationalWorking|/en/NationalWorking/|/ir/NationalWorking|/ir/NationalWorking/|/it/NationalWorking|/it/NationalWorking/':
            () => { console.log('subdirList => current page is: ', pathName); nationalWorking(); },
        '/en/appointment-form|/en/appointment-form/|/ir/appointment-form|/ir/appointment-form/|/it/appointment-form|/it/appointment-form/':
            () => { console.log('subdirList => current page is: ', pathName) }
    };
    let matchedSubdir = Object.keys(subdirList).find(key => key.split('|').find(path => path === pathName));
    matchedSubdir ? subdirList[matchedSubdir]() : console.log('No matching url:', pathName);
    
})();