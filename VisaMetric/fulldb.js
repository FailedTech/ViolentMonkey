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


let DexieDB = {
    import: async () => (typeof !!Dexie
        ? await import('https://unpkg.com/dexie@4.0.1-alpha.22/dist/dexie.js').catch((error) => { throw error })
        : null),
    db: async () => await new Dexie('VisaMetric'),
    store: async (db) => await db.version(1).stores({ userdata: '++id,&username' }),
    init: async () => Object.keys(DexieDB).forEach((key) => (key !== 'init') ? DexieDB[key]() : null)
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

let defaultProfile = {
    applicationType: '',
    biofpval: '',
    city: '',
    card: '',
    cardDatepicker: '',
    ctval: '',
    jvnsAccess: '',
    mailConfirmCode: '',
    nationality: '',
    office: '',
    officetype: '',
    paytype: '',
    previewchk: '',
    qtallvert: '',
    setnewcalendarstatus: '',
    sheba_name: '',
    sheba_number: '',
    subdir: '',
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
    },
    //search: () => { Object.entries(sessiondb).some(([key, func]) => $("#" + key).length && func()) }
    search: () => { Object.keys(sessiondb).forEach((key) => (key !== 'search') ? $("#" + key).length && sessiondb[key]() : null) }
};

(window.location.hostname === 'it-ir-appointment.visametric.com') ? sessiondb.search() : null;


let idx2ss = {
    get: (username, key) => {
        loadDexie()
            .then(() => loadStore())
            .then((db) => db.userdata.get({ username: username }))
            .then((user) => user && user[key] !== undefined ? sessionStorage.setItem(user, user[key]) && db.close() : null)
            .catch((error) => { console.error('Error:', error) });
    },
    set: (username, key) => {
        loadDexie()
            .then(() => loadStore())
            .then((db) => !!db.userdata.get({ username: username }) ? console.log("user exist") : db.userdata.put({ username: username }))
            //.then((user) => { user.put(key, sessionStorage.getItem(key)) })
            .catch((error) => { console.error('Error:', error); });
    },
    live: () => {

    },
    export: {},
    import: {}
}


let test = () => {
    Applicants.forEach(n => objIncrementor(n, 6, defaultProfile));
    Object.keys(defaultProfile).forEach((key) => {
        console.log(sessionStorage.getItem(defaultProfile[key]))
    });
}


$('body').append(
    $('<button>', {
        text: 'ADD',
        id: 'ADD'
    }));

$('#ADD').click(() =>
    idx2ss.set("Ali", "city")
)