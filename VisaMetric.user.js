// ==UserScript==
// @name        VisaMetric
// @namespace   Violentmonkey Scripts
// @match       *://it-ir-appointment.visametric.com/*
// @grant       GM.registerMenuCommand
// @version     0.1.002
// @author      FailedTech
// @description 08/31/2023, 23:00:00 PM
// @icon        https://www.visametric.com/front/images/common/favicon.png
// @homepageURL https://github.com/FailedTech/ViolentMonkey
// @updateURL   https://github.com/FailedTech/ViolentMonkey/raw/main/VisaMetric.user.js
// @downloadURL https://github.com/FailedTech/ViolentMonkey/raw/main/VisaMetric.user.js
// @require     https://code.jquery.com/jquery-3.6.0.min.js
// @run-at      document-idle
// ==/UserScript==

(() => {
    let pathName = window.location.pathname;
    let btnTrigger = (btnID) => {
        let btn = document.querySelector(btnID);
        btn ? btn.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))
            : console.log(`Couldn't find the element: ${btnID}`);
    };
    let subdirList = {
        '/en|/en/|/ir|/ir/': { Func: () => { console.log('current page is: ', pathName); p_01(); } },
        '/en/NationalWorking|/en/NationalWorking/|/ir/NationalWorking|/ir/NationalWorking/': { Func: () => { console.log('current page is: ', pathName); p_02(); } },
        '/en/appointment-form|/en/appointment-form/|/ir/appointment-form|/ir/appointment-form/': { Func: () => console.log('current page is: ', pathName) }
    };
    let p_01 = () => { observeNetworkChanges(); btnTrigger("#nationalWorkingBtn");};
    let p_02 = () => { btnTrigger("#result1"); btnTrigger("#result3"); btnTrigger("#btnSubmit") }
    // Find the matching subdir
    let matchedSubdir = Object.keys(subdirList).find(key => key.split('|').find(path => path === pathName));
    matchedSubdir ? subdirList[matchedSubdir].Func() : console.log('No matching url:', pathName);
  
})();