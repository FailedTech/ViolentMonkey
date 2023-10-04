let loadDexie = async () => {
    typeof Dexie === "undefined"
        ? await import('https://unpkg.com/dexie@4.0.1-alpha.22/dist/dexie.js')
            .catch((error) => { console.error("Error loading Dexie:", error); throw error; })
        : undefined;
}

let loadStore = async () => {
    let db = new Dexie('VisaMetric');
    await db.version(1).stores({ userdata: '++id,&username' });
    return db;
}

let Applicants = ["name", "surname", "birthday", "birthmonth", "birthyear",
    "passport", "phone", "phone2", "email", "alternativeemail"]

let pathNames = () => window.location.pathname.split('/').filter(Boolean);

//let objIncrementor = (name, length, obj) => Array.from({ length },
//   (_, i) => [`${name}${i + 1}`, {}]).forEach(([key]) => obj[key] = {});
let objIncrementor = (name, length, obj) => Array.from({ length },
    (_, i) => [`${name}${i + 1}`, {}]).forEach(([key]) => obj[key] = '');

let formAccessApplicationData = {
    subdir: pathNames()[1],
    jvnsAccess: $('input[name="jvnsAccess"]').val()
}

let personalForm = {
    applicationType: {},
    biofpval: {},
    city: {},
    card: {},
    cardDatepicker: {},
    ctval: {},
    mailConfirmCode: {},
    office: {},
    officetype: {},
    paytype: {},
    previewchk: {},
    qtallvert: {},
    setnewcalendarstatus: {},
    sheba_name: {},
    sheba_number: {},
    totalPerson: {},
    transactionDatePicker: {},
    transactionid: {},
    username: {},
    view_set_app_country: {},
    view_set_app_office: {},
    view_set_app_service_type: {}
}

let defaultProfile = {
    applicationType: '',
    biofpval: '',
    city: '',
    card: '',
    cardDatepicker: '',
    ctval: '',
    mailConfirmCode: '',
    office: '',
    officetype: '',
    paytype: '',
    previewchk: '',
    qtallvert: '',
    setnewcalendarstatus: '',
    sheba_name: '',
    sheba_number: '',
    totalPerson: '',
    transactionDatePicker: '',
    transactionid: '',
    username: '',
    view_set_app_country: '',
    view_set_app_office: '',
    view_set_app_service_type: ''

}





let sessiondb = {
    goAppointment: () => console.log("Habibi Come To Iran"),
    formAccessApplication: () => {
        Object.entries(formAccessApplicationData).forEach(([k, v]) => sessionStorage.setItem(k, v));
        $('input[name="nationality"]').on("click", (e) => sessionStorage.setItem('nationality', $(e.target).val()));
    },
    personalForm: () => {
        //Applicants.forEach(n => objIncrementor(n, 6, personalForm));
        //sessionStorage.setItem('applicationType', $('[name="applicationType"]').val());
        //sessionStorage.setItem('biofpval', $('[name="biofpval"]').val());
        $('[name=personalForm]').on("change", (e) => { sessionStorage.setItem($(e.target).attr('name'), $(e.target).val()); });
        $('#ajaxcity').on("change", (e) => { sessionStorage.setItem('ajaxcity', $('#ajaxcity').html()); });
        $('#ajaxoffice').on("change", (e) => { sessionStorage.setItem('ajaxoffice', $('#ajaxoffice').html()); });
        $('#ajaxofficetype').on("change", (e) => { sessionStorage.setItem('ajaxofficetype', $('#ajaxofficetype').html()); });
        $("#checkCardListDiv").on("change", (e) => {
            sessionStorage.setItem('cardDatepicker', $('#popupDatepicker2').val())
            sessionStorage.setItem('cardtransactionid', $(e.target).parent().next().html())
        });


        /*
        Object.keys(personalForm).forEach(key => $(`[name=${key}]`).on((personalForm[key].event || "change"),
            (e) => sessionStorage.setItem((personalForm[key].key || key),
                $((personalForm[key].val || e.target)).val())));
        */
    },
    search: () => { Object.entries(sessiondb).some(([key, func]) => $("#" + key).length && func()) }
};

(window.location.hostname === 'it-ir-appointment.visametric.com') ? sessiondb.search() : null;


let idx2ss = {
    get: (username) => {
        Applicants.forEach(n => objIncrementor(n, 6, defaultProfile));
        loadDexie()
        .then(() => loadStore())
        .then((db) => {

            console.log(db.userdata.get({ username: username }))
           // return db.userdata.get(defaultProfile);
        })
        .catch((error) => {
            console.error('Error:', error);
            if (error.name === 'ConstraintError') {
                throw new Error('Username already exists');
            }
        });
    },
    set: () => {
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
    },
    live: () => {

    },
    export: {},
    import: {}
}



.then(async (db) => {
    const targetUsername = 'YOUR_TARGET_USERNAME'; // Replace with the specific username you want to search for
    const sanitizedData = {};

    defaultProfileKeys.forEach(async (key) => {
        const userKeyValue = await db.userdata
            .where({ username: targetUsername, [key]: Dexie.exists })
            .first();

        if (userKeyValue) {
            sanitizedData[key] = userKeyValue[key];
        } else {
            sanitizedData[key] = defaultProfile[key];
        }
    });