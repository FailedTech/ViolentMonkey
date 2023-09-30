let pathNames = () => window.location.pathname.split('/').filter(Boolean);


let formAccessApplicationData = {
    subdir: pathNames()[1],
    jvnsAccess: $('input[name="jvnsAccess"]').val()
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
        $('#transactionid').on("change",(e) => sessionStorage.setItem('transactionid', $('#transactionid').val()));
        $('#popupDatepicker').on("change",(e) => sessionStorage.setItem('transactionDatePicker', $('#popupDatepicker').val()));
        $('#paymentCardInput').on("change",(e) => sessionStorage.setItem('card', $('#paymentCardInput').val()));
        $('#popupDatepicker2').on("change",(e) => sessionStorage.setItem('cardDatepicker', $('#popupDatepicker2').val()));
    },
    search: () => { Object.entries(setData).some(([key, func]) => $("#" + key).length && func()) }
};
(window.location.hostname === 'it-ir-appointment.visametric.com') ? setData.search() : null;
