// ==UserScript==
// @name        VisaMetric
// @namespace   Violentmonkey Scripts
// @match       *://it-ir-appointment.visametric.com/*
// @grant       GM.registerMenuCommand
// @version     0.1.000
// @author      FailedTech
// @description 09/24/2023, 20:00:00 PM
// @icon        https://www.visametric.com/front/images/common/favicon.png
// @homepageURL https://github.com/FailedTech/ViolentMonkey/tree/main/VisaMetric
// @updateURL   https://github.com/FailedTech/ViolentMonkey/raw/main/VisaMetric/VisaMetric.user.js
// @downloadURL https://github.com/FailedTech/ViolentMonkey/raw/main/VisaMetric/VisaMetric.user.js
// @run-at      document-idle
// ==/UserScript==

let loadDexie = async () => {
    typeof Dexie === "undefined"
        ? await import('https://unpkg.com/dexie@4.0.1-alpha.22/dist/dexie.js')
            .catch((error) => { console.error("Error loading Dexie:", error); throw error; })
        : undefined;
}

let loadStore = async () => {
    let db = new Dexie('VisaMetric');
    await db.version(1).stores({ userdata: '++id,username' });
    return db;
}

let defaultUserInfo = {
    _token: "",
    alternativeemail1: "",
    alternativeemail2: "",
    alternativeemail3: "",
    alternativeemail4: "",
    alternativeemail5: "",
    alternativeemail6: "",
    applicationType: "",
    biofpval: "",
    birthday1: "",
    birthday2: "",
    birthday3: "",
    birthday4: "",
    birthday5: "",
    birthday6: "",
    birthmonth1: "",
    birthmonth2: "",
    birthmonth3: "",
    birthmonth4: "",
    birthmonth5: "",
    birthmonth6: "",
    birthyear1: "",
    birthyear2: "",
    birthyear3: "",
    birthyear4: "",
    birthyear5: "",
    birthyear6: "",
    card: "",
    cardDatepicker: "",
    city: "",
    ctval: "",
    email1: "",
    email2: "",
    email3: "",
    email4: "",
    email5: "",
    email6: "",
    mailConfirmCode: "",
    name1: "",
    name2: "",
    name3: "",
    name4: "",
    name5: "",
    name6: "",
    office: "",
    officetype: "",
    passport1: "",
    passport2: "",
    passport3: "",
    passport4: "",
    passport5: "",
    passport6: "",
    paytype: "",
    phone1: "",
    phone2: "",
    phone21: "",
    phone22: "",
    phone23: "",
    phone24: "",
    phone25: "",
    phone26: "",
    phone3: "",
    phone4: "",
    phone5: "",
    phone6: "",
    previewchk: "",
    qtallvert: "",
    setnewcalendarstatus: "",
    sheba_name: "",
    sheba_number: "",
    surname1: "",
    surname2: "",
    surname3: "",
    surname4: "",
    surname5: "",
    surname6: "",
    totalPerson: "",
    transactionDatePicker: "",
    transactionid: "",
    username: "",
    view_set_app_country: "",
    view_set_app_office: "",
    view_set_app_service_type: "",
};

let currentUserInfo = { ...defaultUserInfo };

let resetCurrentUserInfo = () => { currentUserInfo = { ...defaultUserInfo }; }

let applicationType = {
    getItem: JSON.parse(sessionStorage.getItem("applicationType")) || [],
    setItem: () => { sessionStorage.setItem("applicationType", JSON.stringify(applicationType.getItem)); },
    a: () => {
        $("#nationalBtn, #nationalWorkingBtn, #schengenBtn, #legalizationBtn, #otherBtn").on("click", (e) => {
            applicationType.getItem[0] = $(e.target).attr("id"); applicationType.setItem();
        })
    },
    b: () => { applicationType.getItem[1] = window.location.pathname; applicationType.setItem(); },
    c: () => { applicationType.getItem[2] = $("input[name='applicationType']").val(); applicationType.setItem(); }
}


loadDexie()
    .then(() => loadStore())
    .then((db) => {
        return db.userdata.put(currentUserInfo);
    })
    .then(() => {
        console.log('Data added/updated successfully.');
    })
    .catch((error) => {
        console.error('Error:', error);
    });