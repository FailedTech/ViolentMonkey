let Applicants = ["name", "surname", "birthday", "birthmonth", "birthyear",
    "passport", "phone", "phone2", "email", "alternativeemail"]

let pathNames = () => window.location.pathname.split('/').filter(Boolean);

let objIncrementor = (name, length, obj) => Array.from({ length },
    (_, i) => [`${name}${i + 1}`, {}]).forEach(([key]) => obj[key] = {});

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
    view_set_app_country: {},
    view_set_app_office: {},
    view_set_app_service_type: {}
}

let setData = {
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
            sessionStorage.setItem('cardDatepicker',$('#popupDatepicker2').val())
            sessionStorage.setItem('cardtransactionid',$(e.target).parent().next().html())
          });
          

        /*
        Object.keys(personalForm).forEach(key => $(`[name=${key}]`).on((personalForm[key].event || "change"),
            (e) => sessionStorage.setItem((personalForm[key].key || key),
                $((personalForm[key].val || e.target)).val())));
        */
    },
    search: () => { Object.entries(setData).some(([key, func]) => $("#" + key).length && func()) }
};
(window.location.hostname === 'it-ir-appointment.visametric.com') ? setData.search() : null;
