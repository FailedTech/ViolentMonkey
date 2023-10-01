let pathNames = () => window.location.pathname.split('/').filter(Boolean);


let formAccessApplicationData = {
    subdir: pathNames()[1],
    jvnsAccess: $('input[name="jvnsAccess"]').val()
}

let personalForm = {
    alternativeemail1: { },
    alternativeemail2:{ },
    alternativeemail3: { },
    alternativeemail4: { },
    alternativeemail5: { },
    alternativeemail6: { },
    { "key":"applicationType", "elementID":"#applicationType"},
    { "key":"biofpval", "elementID":"#biofpval"},
    birthday1:{},
    birthday2:{},
    birthday3:{},
    birthday4:{},
    birthday5:{},
    birthday6:{},
    birthmonth1:{},
    birthmonth2:{},
    birthmonth3:{},
    birthmonth4:{},
    birthmonth5:{},
    birthmonth6:{},
    birthyear1:{},
    birthyear2:{},
    birthyear3:{},
    birthyear4:{},
    birthyear5:{},
    birthyear6:{},
    paymentCardInput:{key:"card"},
    popupDatepicker2:{key:"cardDatepicker"},
    { "key":"city", "elementID":"#city"},
    { "key":"ctval", "elementID":"#ctval"},
    email1:{},
    email2:{},
    email3:{},
    email4:{},
    email5:{},
    email6:{},
    { "key":"mailConfirmCode", "elementID":"#mailConfirmCode"},
    name1:{},
    name2:{},
    name3:{},
    name4:{},
    name5:{},
    name6:{},
    { "key":"office", "elementID":"#office"},
    { "key":"officetype", "elementID":"#officetype"},
    passport1:{},
    passport2:{},
    passport3:{},
    passport4:{},
    passport5:{},
    passport6:{},
    { "key":"paytype", "elementID":"#paytype"},
    phone1:{},
    phone2:{},
    phone3:{},
    phone4:{},
    phone5:{},
    phone6:{},
    phone21:{},
    phone22:{},
    phone23:{},
    phone24:{},
    phone25:{},
    phone26:{},
    { "key":"previewchk", "elementID":"#previewchk"},
    { "key":"qtallvert", "elementID":"#qtallvert"},
    { "key":"setnewcalendarstatus", "elementID":"#setnewcalendarstatus"},
    sheba_name:{},
    sheba_number:{},
    surname1:{},
    surname2:{},
    surname3:{},
    surname4:{},
    surname5:{},
    surname6:{},
    totalPerson:{},
    popupDatepicker:{key:"transactionDatePicker"},
    transactionid:{},
    { "key":"view_set_app_country", "elementID":"#view_set_app_country"},
    { "key":"view_set_app_office", "elementID":"#view_set_app_office"},
    { "key":"view_set_app_service_type", "elementID":"#view_set_app_service_type"},
}

let setData = {
    goAppointment: () => console.log("Habibi Come To Iran"),
    formAccessApplication: () => {
        Object.entries(formAccessApplicationData).forEach(([k, v]) => sessionStorage.setItem(k, v));
        $('input[name="nationality"]').on("click", (e) => sessionStorage.setItem('nationality', $(e.target).val()));
    },
    personalForm: () => {
        $('#ajaxcity').on("change", (e) => {
            sessionStorage.setItem('ajaxcity', $('#ajaxcity').html());
            sessionStorage.setItem('city', $(".city").val());
        });
        $('#ajaxoffice').on("change", (e) => {
            sessionStorage.setItem('ajaxoffice', $('#ajaxoffice').html());
            sessionStorage.setItem('office', $(".office").val());
        });
        $('#ajaxofficetype').on("change", (e) => {
            sessionStorage.setItem('ajaxofficetype', $('#ajaxofficetype').html());
            sessionStorage.setItem('officetype', $(".officetype").val());
        });
        $('#totalPerson').on("change", (e) => sessionStorage.setItem('totalPerson', $('#totalPerson').val()));
        $('input[name="paytype"]').on("click", (e) => sessionStorage.setItem('paytype', $(e.target).val()));
        $('#transactionid').on("change", (e) => sessionStorage.setItem('transactionid', $('#transactionid').val()));
        $('#popupDatepicker').on("change", (e) => sessionStorage.setItem('transactionDatePicker', $('#popupDatepicker').val()));
        $('#paymentCardInput').on("change", (e) => sessionStorage.setItem('card', $('#paymentCardInput').val()));
        $('#popupDatepicker2').on("change", (e) => sessionStorage.setItem('cardDatepicker', $('#popupDatepicker2').val()));
        $("#scheba_number").on("change", (e) => sessionStorage.setItem('scheba_number', $('#scheba_number').val()));
        $("#scheba_name").on("change", (e) => sessionStorage.setItem('scheba_name', $('#scheba_name').val()));
        $("#name1").on("change", (e) => sessionStorage.setItem('name1', $('#name1').val()));
        $("#name2").on("change", (e) => sessionStorage.setItem('name2', $('#name2').val()));
        $("#name3").on("change", (e) => sessionStorage.setItem('name3', $('#name3').val()));
        $("#name4").on("change", (e) => sessionStorage.setItem('name4', $('#name4').val()));
        $("#name5").on("change", (e) => sessionStorage.setItem('name5', $('#name5').val()));
        $("#name6").on("change", (e) => sessionStorage.setItem('name6', $('#name6').val()));
        $("#surname1").on("change", (e) => sessionStorage.setItem('surname1', $('#surname1').val()));
        $("#surname2").on("change", (e) => sessionStorage.setItem('surname2', $('#surname2').val()));
        $("#surname3").on("change", (e) => sessionStorage.setItem('surname3', $('#surname3').val()));
        $("#surname4").on("change", (e) => sessionStorage.setItem('surname4', $('#surname4').val()));
        $("#surname5").on("change", (e) => sessionStorage.setItem('surname5', $('#surname5').val()));
        $("#surname6").on("change", (e) => sessionStorage.setItem('surname5', $('#surname6').val()));
        $("#birthday1").on("change", (e) => sessionStorage.setItem('birthday1', $('#birthday1').val()));
        $("#birthday2").on("change", (e) => sessionStorage.setItem('birthday2', $('#birthday2').val()));
        $("#birthday3").on("change", (e) => sessionStorage.setItem('birthday3', $('#birthday3').val()));
        $("#birthday4").on("change", (e) => sessionStorage.setItem('birthday4', $('#birthday4').val()));
        $("#birthday5").on("change", (e) => sessionStorage.setItem('birthday5', $('#birthday5').val()));
        $("#birthday6").on("change", (e) => sessionStorage.setItem('birthday6', $('#birthday6').val()));
        $("#birthmonth1").on("change", (e) => sessionStorage.setItem('birthmonth1', $('#birthmonth1').val()));
        $("#birthmonth2").on("change", (e) => sessionStorage.setItem('birthmonth2', $('#birthmonth2').val()));
        $("#birthmonth3").on("change", (e) => sessionStorage.setItem('birthmonth3', $('#birthmonth3').val()));
        $("#birthmonth4").on("change", (e) => sessionStorage.setItem('birthmonth4', $('#birthmonth4').val()));
        $("#birthmonth5").on("change", (e) => sessionStorage.setItem('birthmonth5', $('#birthmonth5').val()));
        $("#birthmonth6").on("change", (e) => sessionStorage.setItem('birthmonth6', $('#birthmonth6').val()));
        $("#birthyear1").on("change", (e) => sessionStorage.setItem('birthyear1', $('#birthyear1').val()));
        $("#birthyear2").on("change", (e) => sessionStorage.setItem('birthyear2', $('#birthyear2').val()));
        $("#birthyear3").on("change", (e) => sessionStorage.setItem('birthyear3', $('#birthyear3').val()));
        $("#birthyear4").on("change", (e) => sessionStorage.setItem('birthyear4', $('#birthyear4').val()));
        $("#birthyear5").on("change", (e) => sessionStorage.setItem('birthyear5', $('#birthyear5').val()));
        $("#birthyear6").on("change", (e) => sessionStorage.setItem('birthyear6', $('#birthyear6').val()));
        $("#passport1").on("change", (e) => sessionStorage.setItem('passport1', $('#passport1').val()));
        $("#passport2").on("change", (e) => sessionStorage.setItem('passport2', $('#passport2').val()));
        $("#passport3").on("change", (e) => sessionStorage.setItem('passport3', $('#passport3').val()));
        $("#passport4").on("change", (e) => sessionStorage.setItem('passport4', $('#passport4').val()));
        $("#passport5").on("change", (e) => sessionStorage.setItem('passport5', $('#passport5').val()));
        $("#passport6").on("change", (e) => sessionStorage.setItem('passport6', $('#passport6').val()));
        $("#phone1").on("change", (e) => sessionStorage.setItem('phone1', $('#phone1').val()));
        $("#phone2").on("change", (e) => sessionStorage.setItem('phone2', $('#phone2').val()));
        $("#phone3").on("change", (e) => sessionStorage.setItem('phone3', $('#phone3').val()));
        $("#phone4").on("change", (e) => sessionStorage.setItem('phone4', $('#phone4').val()));
        $("#phone5").on("change", (e) => sessionStorage.setItem('phone5', $('#phone5').val()));
        $("#phone6").on("change", (e) => sessionStorage.setItem('phone6', $('#phone6').val()));
        $("#phone21").on("change", (e) => sessionStorage.setItem('phone21', $('#phone21').val()));
        $("#phone22").on("change", (e) => sessionStorage.setItem('phone22', $('#phone22').val()));
        $("#phone23").on("change", (e) => sessionStorage.setItem('phone23', $('#phone23').val()));
        $("#phone24").on("change", (e) => sessionStorage.setItem('phone24', $('#phone24').val()));
        $("#phone25").on("change", (e) => sessionStorage.setItem('phone25', $('#phone25').val()));
        $("#phone26").on("change", (e) => sessionStorage.setItem('phone26', $('#phone26').val()));
        $("#email1").on("change", (e) => sessionStorage.setItem('email1', $('#email1').val()));
        $("#email2").on("change", (e) => sessionStorage.setItem('email2', $('#email1').val()));
        $("#email3").on("change", (e) => sessionStorage.setItem('email3', $('#email1').val()));
        $("#email4").on("change", (e) => sessionStorage.setItem('email4', $('#email1').val()));
        $("#email5").on("change", (e) => sessionStorage.setItem('email5', $('#email1').val()));
        $("#email6").on("change", (e) => sessionStorage.setItem('email6', $('#email1').val()));


        Object.keys(personalForm).forEach(key => $("#" + key).on((personalForm[key].event || "change"),
            (e) => sessionStorage.setItem((personalForm[key].key || key),
                $('#' + (personalForm[key].val || key)).val())));



        /* 
        let personalFormArr = Object.entries(personalForm).map(([key, subObj]) => [
             key,
             ...Object.entries(subObj).map(([subKey, subValue]) => subKey === '' ? key : subKey),
         ]);
         */
    },
    search: () => { Object.entries(setData).some(([key, func]) => $("#" + key).length && func()) }
};
(window.location.hostname === 'it-ir-appointment.visametric.com') ? setData.search() : null;
