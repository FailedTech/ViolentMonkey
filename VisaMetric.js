// ==UserScript==
// @name        VisaMetric
// @namespace   Violentmonkey Scripts
// @match       *://it-ir-appointment.visametric.com/*
// @grant       GM.registerMenuCommand
// @version     0.1.002
// @author      FailedTech
// @description 08/31/2023, 23:00:00 PM
// @icon        https://www.visametric.com/front/images/common/favicon.png
// @updateURL   https://raw.githubusercontent.com/FailedTech/ViolentMonkey/main/VisaMetric.js
// @downloadURL https://raw.githubusercontent.com/FailedTech/ViolentMonkey/main/VisaMetric.js
// @require     https://code.jquery.com/jquery-3.6.0.min.js
// @run-at      document-idle
// ==/UserScript==

(() => {
        let currentURL = window.location.href;
        let btnTrigger = (btnID) => {
            let btn = document.querySelector(btnID);
            btn ? btn.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))
                : console.log(`Couldn't find the element: ${btnID}`);
        };
        let subdir = {
            '/en': { Func: () => { console.log('current url is:', currentURL); btnTrigger("#nationalWorkingBtn"); } },
            '/en/': { Func: () => console.log('Performing Task A:', currentURL) },
            '/ir': { Func: () => console.log('Performing Task B:', currentURL) },
            '/ir/': { Func: () => console.log('Performing Task B:', currentURL) },
            '/en/NationalWorking': { Func: () => console.log('Performing Task C:', currentURL) },
            '/en/NationalWorking/': { Func: () => console.log('Performing Task C:', currentURL) },
            '/ir/NationalWorking': { Func: () => console.log('Performing Task D:', currentURL) },
            '/ir/NationalWorking/': { Func: () => console.log('Performing Task D:', currentURL) },
            '/en/appointment-form': { Func: () => console.log('Performing Task E:', currentURL) },
            '/en/appointment-form/': { Func: () => console.log('Performing Task E:', currentURL) },
            '/ir/appointment-form': { Func: () => console.log('Performing Task F:', currentURL) },
            '/ir/appointment-form/': { Func: () => console.log('Performing Task F:', currentURL) }
        };

        // Find the matching subdir
        let matchedSubdir = subdir[Object.keys(subdir).find(url => currentURL.includes(url))] || {
            Func: () => console.log('No matching url:', currentURL)
        };



        matchedSubdir.Func(); // Execute the corresponding task function
})();
