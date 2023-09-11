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
            : console.log(`btnTrigger => Couldn't find the element: ${btnID}`);
    };

    let fetchdt = (url) => {
        let responseStatus;
        let responseData;

        fetch(url)
            .then(response => {
                responseStatus = response.status;
                if (responseStatus === 200) {
                    // Status code is 200, do your job here
                    return true; // You can also parse the response body if needed
                } else {
                    // Handle non-200 status codes here if necessary
                    console.log('Request failed with status code:', responseStatus);
                }
            })
            .then(data => {
                responseData = data;
                // Use the data from the successful response here
                console.log('Data:', responseData);
            })
            .catch(error => {
                // Handle network errors or other exceptions here
                console.error('Fetch error:', error);
            });
    };

    let optionSelector = (id, txt) => {
        let el = document.querySelector(`#${id}`);
        let optionToSelect = [...el.options].find(option => option.innerHTML.toLowerCase().includes(txt.toLowerCase()));
        return optionToSelect
            ? (optionToSelect.selected = true, el.dispatchEvent(new Event('change', { bubbles: true, cancelable: true })),
                console.log(`optionSelector => ${id} ${txt} selected`), true)
            : (console.log(`optionSelector => ${id} ${txt} not found`), false);
    };

    let appCountLi = () => {
        let rtlinsert = [
            ["city", "teh", "https://it-ir-appointment.visametric.com/en/appointment-form/getcity"],
            ["office", "teh", "https://it-ir-appointment.visametric.com/en/appointment-form/getoffice"],
            ["officetype", "normal", ""],
            ["totalPerson", "1", ""],
        ];

        let [id, txt, url] = rtlinsert.shift();

        return !id
            ? (console.log("appCountLi => All actions completed successfully"), undefined)
            : console.logoptionSelector(id, txt)
                ? appCountLi()
                : console.log("appCountLi => fetch request under development")
                    ? appCountLi()
                    : console.log(`Action get${id} failed.`)
    };

    let findActiveNavTab = async () => {
        await document.querySelector('.appCountLi.active')
            ? (console.log("appointment_form => appCountLi is active"), appCountLi())
            : document.querySelector('.appPersonalInfoLi.active')
                ? 'appPersonalInfoLi'
                : document.querySelector('.appPreviewLi.active')
                    ? 'appPreviewLi'
                    : document.querySelector('.appCalendarLi.active')
                        ? 'appCalendarLi'
                        : document.querySelector('.appServicesLi.active')
                            ? 'appServicesLi'
                            : null;
    }


    let subdirList = {
        '/en|/en/|/en/home|/en/home/|/ir|/ir/|/ir/home|/ir/home/': {
            Func: () => { console.log('current page is: ', pathName); p_01(); }
        },
        '/en/NationalWorking|/en/NationalWorking/|/ir/NationalWorking|/ir/NationalWorking/': {
            Func: () => {
                console.log('current page is: ', pathName); p_02();
            }
        },
        '/en/appointment-form|/en/appointment-form/|/ir/appointment-form|/ir/appointment-form/': {
            Func: () => {
                console.log('current page is: ', pathName); findActiveNavTab();
            }
        }
    };

    let p_01 = () => { btnTrigger("#nationalWorkingBtn"); };
    let p_02 = () => { btnTrigger("#result1"); btnTrigger("#result3"); btnTrigger("#btnSubmit") }
    let p_03 = () => { }

    // Find the matching subdir
    let matchedSubdir = Object.keys(subdirList).find(key => key.split('|').find(path => path === pathName));

    matchedSubdir ? subdirList[matchedSubdir].Func() : console.log('No matching url:', pathName);

})();