var personCount = $(".totalPerson").val()


    let addSelectedOption = (id, className, val, txt) => {
        $(`#${id}`).length && ($(`#${id}`).append($('<option>', { value: val, text: txt }).attr('selected', 'selected')), className && $(`#${id}`).addClass(className));
    };
	
	addSelectedOption("city","city","1","TEHRAN")
	addSelectedOption("office","office","1","TEHRAN")
	addSelectedOption("officetype","officetype","1","NORMAL")
$('.setnewcalendarstatus').val(2);
$('.parentTotalFee').show();
$('#paytype').show();
$("#atm").trigger("click");



    $.ajax({
  url: "https://it-ir-appointment.visametric.com/en/appointment-form/bankpayment-card-control",
  type: "POST",
  data: {
    card: 5022291310533185,
    date: "1402/04/26",
    totalPerson: 1,
    office: 1,
    serviceType: 1,
    consularID: 4
  },
  success: function (response) {
    console.log(response);
  },
  error: function (error) {
    // Handle any errors here
    console.error(error);
  },
  xhrFields: {
    withCredentials: true
  }
});


          $.ajax({
                    url: "https://it-ir-appointment.visametric.com/en/appointment-form/bankpayment-card-control",
                    method: 'POST',
                    data: {
    card: 5022291310533185,
    date: "1402/04/26",
    totalPerson: 1,
    office: 1,
    serviceType: 1,
    consularID: 4
                    },
                    async: false,
                    success: function (response) {
                        if (!response.view) {
                            $('#btnAppCountNext').fadeOut();
                            $('#checkCardListDiv').html(' ');
                            swal({
                                title: "Warning",
                                text: "Please check the accuracy of your payment information and try again.",
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: "OK",
                                type: 'warning'
                            });
                        } else {
                            $('#checkCardListDiv').html(response.view);
                            $('#btnAppCountNext').fadeIn();

                        }
                    },
                    error: function () {

                    }
                });


$.ajax({
  url: "https://it-ir-appointment.visametric.com/en/appointment-form/equaltransaction",
  type: "POST",
  data: {
    paymentType:"atm",
	card:5022291310533185,
paymentDate: "1402/06/20",
serviceType: 1,
totalPerson: 1,
getOfficeID: 1,
getConsular: 4
cardPaymentID: "eyJpdiI6ImRscG13T2k2TnV6aUdnTkp0VVZYVWc9PSIsInZhbHVlIjoiYWlTVHVEODF4clcyL2x3aFRqaVB1QT09IiwibWFjIjoiYjViNGJjMWRhM2Q4OGMwMzBjMTVkNDI0YTYyYWU0ODBmOTI2MmUyMTBlNmVlM2EyN2U3ZWI4ZjgyMzU1Y2E0MiJ9"
  },
  success: function (response) {
    console.log(response);
  },
  error: function (error) {
    console.error(error);
  }
});



card: 5022291310533185
date: 1402/04/26
totalPerson: 0
office: 1
serviceType: 1
consularID: 4

$.ajax({
  url: "https://it-ir-appointment.visametric.com/en/NationalWorking",
  type: "POST",
  data: {
    nationality:"Iran",
    _token:$('meta[name="csrf-token"]').attr('content'),
    jvnsAccess:"aT3g5o0i11"
  },
  success: function (response) {
    console.log(response);
  },
  error: function (error) {
    console.error(error);
  }
});


    let cityOptions = [
        { value: "0", text: "Place of Residence" },
        { value: "9", text: "AHWAZ" },
        { value: "6", text: "ARAK" },
        { value: "7", text: "ARDEBIL" },
        { value: "12", text: "BANDARABBAS" },
        { value: "14", text: "BIRJAND" },
        { value: "11", text: "BOJNORD" },
        { value: "13", text: "BUSHEHR" },
        { value: "2", text: "ESFEHAN" },
        { value: "28", text: "GORGAN" },
        { value: "29", text: "HAMEDAN" },
        { value: "10", text: "ILAM" },
        { value: "25", text: "KARAJ" },
        { value: "26", text: "KERMAN" },
        { value: "27", text: "KERMANSHAH" },
        { value: "15", text: "KHORAMABAD" },
        { value: "4", text: "MASHHAD" },
        { value: "23", text: "QAZVIN" },
        { value: "24", text: "QOM" },
        { value: "16", text: "RASHT" },
        { value: "21", text: "SANANDAJ" },
        { value: "19", text: "SARI" },
        { value: "20", text: "SEMNAN" },
        { value: "22", text: "SHAHREKORD" },
        { value: "5", text: "SHIRAZ" },
        { value: "3", text: "TABRIZ" },
        { value: "1", text: "TEHRAN" },
        { value: "8", text: "URUMIEH" },
        { value: "30", text: "YASUJ" },
        { value: "31", text: "YAZD" },
        { value: "17", text: "ZAHEDAN" },
        { value: "18", text: "ZANJAN" }
    ];


$('.setnewcalendarstatus').val(2);
$('.parentTotalFee').show();
$('#paytype').show();
$("#atm").trigger("click");


let button = document.createElement("button");
button.textContent = "Calender";
button.addEventListener("click", function() {
  console.log("clicked");
});
document.querySelector(".col-sm-6.text-center").appendChild(button);




$.ajaxSetup({
  headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
  }
});

//advance navigator
// $().serialize() to show sending data
$('#goAppointment').attr('action', 'https://it-ir-appointment.visametric.com/en/NationalWorking').submit();
$("#formAccessApplication").prepend('<input type="hidden" name="nationality" value="Iran">').submit();
// get serialize in json format personalForm is form id
$('#personalForm').serializeArray().reduce((obj, item) => (obj[item.name] = item.value, obj), {});

$.redirect(
  'https://it-ir-appointment.visametric.com/en/appointment-form/personal/create',
  $('#personalForm').serializeArray().reduce((obj, item) => (obj[item.name] = item.value, obj), {}),
  'POST', "_blank", false, false
);



/* senddate response

<div class="row">
    <div class="col-md-2" style="margin-top:10px">
        <button type="button" data-prime="0" class="btn btn-warning getdatebtnhour form-control noPrime" aria-hidden="true" style="height: 42px" data-all="" data-id="">
            <i class="fa fa-clock-o" aria-hidden="true" title=""></i>
            11:30
 
        </button>
    </div>
    <div class="col-md-2" style="margin-top:10px">
        <button type="button" data-prime="0" class="btn btn-warning getdatebtnhour form-control noPrime" aria-hidden="true" style="height: 42px" data-all="" data-id="">
            <i class="fa fa-clock-o" aria-hidden="true" title=""></i>
            15:30
 
        </button>
    </div>
</div>
<div class="row"></div>

*/

/*

_token: 8BoxnVsXqhXhAxpN4sNzD1lZJ1sBrnE7dQzBlGP9
applicationType: 4
city: 1
office: 1
officetype: 1
totalPerson: 1
paytype: atm
transactionid: 
transactionDatePicker: 1402/06/26
card: 6104338964005165
cardDatepicker: 1402/06/11
sheba_number: IR540120000000009663850619
sheba_name: ABEDIN FALLAHI
name1: ELAHE
surname1: FALLAHI
birthday1: 05
birthmonth1: 05
birthyear1: 1991
passport1: X60422129
phone1: 09127391660
phone21: 
email1: elahefallahi.91@yahoo.com
alternativeemail1: 
name2: 
surname2: 
birthday2: 0
birthmonth2: 0
birthyear2: 0
passport2: 
phone2: 
phone22: 
email2: 
alternativeemail2: 
name3: 
surname3: 
birthday3: 0
birthmonth3: 0
birthyear3: 0
passport3: 
phone3: 
phone23: 
email3: 
alternativeemail3: 
name4: 
surname4: 
birthday4: 0
birthmonth4: 0
birthyear4: 0
passport4: 
phone4: 
phone24: 
email4: 
alternativeemail4: 
name5: 
surname5: 
birthday5: 0
birthmonth5: 0
birthyear5: 0
passport5: 
phone5: 
phone25: 
email5: 
alternativeemail5: 
name6: 
surname6: 
birthday6: 0
birthmonth6: 0
birthyear6: 0
passport6: 
phone6: 
phone26: 
email6: 
alternativeemail6: 
previewchk: 1
mailConfirmCode: 
ctval: 
qtallvert: 
view_set_app_country: 
biofpval: 6351656687fa8ffe135d980ebfdf62ba1817dd76
view_set_app_office: 
view_set_app_service_type: 
setnewcalendarstatus: 2

*/


/* block outgoing request xhr
(function () {

    var blockedURL = "https://it-ir-appointment.visametric.com/en/appointment-form/getoffice";

    // Intercept requests
    var originalOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function (method, url) {
        if (url === blockedURL) {
            console.warn("Blocked request to " + blockedURL);
            return;
        }
        originalOpen.apply(this, arguments);
    };
})();
*/


/*

alternativeemail1:
alternativeemail2:
alternativeemail3:
alternativeemail4:
alternativeemail5:
alternativeemail6:
applicationType: 4
biofpval: 6351656687fa8ffe135d980ebfdf62ba1817dd76
birthday1: 05
birthday2: 0
birthday3: 0
birthday4: 0
birthday5: 0
birthday6: 0
birthmonth1: 05
birthmonth2: 0
birthmonth3: 0
birthmonth4: 0
birthmonth5: 0
birthmonth6: 0
birthyear1: 1991
birthyear2: 0
birthyear3: 0
birthyear4: 0
birthyear5: 0
birthyear6: 0
card: 6104338964005165
cardDatepicker: 1402/06/11
city: 1
ctval:
email1: elahefallahi.91@yahoo.com
email2:
email3:
email4:
email5:
email6:
mailConfirmCode:
name1: ELAHE
name2:
name3:
name4:
name5:
name6:
office: 1
officetype: 1
passport1: X60422129
passport2:
passport3:
passport4:
passport5:
passport6:
paytype: atm
phone1: 09127391660
phone2:
phone3:
phone4:
phone5:
phone6:
phone21:
phone22:
phone23:
phone24:
phone25:
phone26:
previewchk: 1
qtallvert:
setnewcalendarstatus: 2
sheba_name: ABEDIN FALLAHI
sheba_number: IR540120000000009663850619
surname1: FALLAHI
surname2:
surname3:
surname4:
surname5:
surname6:
totalPerson: 1
transactionDatePicker: 1402/06/26
transactionid:
view_set_app_country:
view_set_app_office:
view_set_app_service_type:
*/



/* disable eventlistener for any class or id
$().off('change')
$().off('click')

***** add eventlistener to dynamically created class or id
$(document).on('change', "#id  or .class", function() {
    do something when created and this will trigger change to document
    can change document with any element 
    Note that the dynamically created element must be inside the parent node 
});

*/



/*
_token: w5kXtEdK6XOo7FKZg1FdCO406IiIcxiukigG6Hs4
applicationType: 2
city: 1
office: 1
officetype: 1
totalPerson: 1
paytype: atm
transactionid: 
transactionDatePicker: 1402/07/13
card: 6037997497952615
cardDatepicker: 1402/06/21
bankpayment: eyJpdiI6ImFaUkNEc1lXNHkxRDBoM09nTStVaWc9PSIsInZhbHVlIjoiRllhYVVEbTNoRzlnb2hjWkRXK1B3dz09IiwibWFjIjoiYmZmMGJiMjg1M2NjODZlMjI4MDUzMGRjZTBlNjVkMmJlZmFiMzdmYmE4ZjBlZGJlZjgyOGY4YzkxMjZmYmJlNiJ9
sheba_number: IR610170000000217179478007
sheba_name: محمد حسن جهاندیده
name1: MOHAMMADHASSAN
surname1: JAHANDIDEH
birthday1: 21
birthmonth1: 03
birthyear1: 1986
passport1: N53843322
phone1: 09904526521
phone21: 
email1: JAHANDIDEH1986@outlook.com
alternativeemail1: 
name2: 
surname2: 
birthday2: 0
birthmonth2: 0
birthyear2: 0
passport2: 
phone2: 
phone22: 
email2: 
alternativeemail2: 
name3: 
surname3: 
birthday3: 0
birthmonth3: 0
birthyear3: 0
passport3: 
phone3: 
phone23: 
email3: 
alternativeemail3: 
name4: 
surname4: 
birthday4: 0
birthmonth4: 0
birthyear4: 0
passport4: 
phone4: 
phone24: 
email4: 
alternativeemail4: 
name5: 
surname5: 
birthday5: 0
birthmonth5: 0
birthyear5: 0
passport5: 
phone5: 
phone25: 
email5: 
alternativeemail5: 
name6: 
surname6: 
birthday6: 0
birthmonth6: 0
birthyear6: 0
passport6: 
phone6: 
phone26: 
email6: 
alternativeemail6: 
previewchk: 1
mailConfirmCode: E479DFA9
ctval: eyJpdiI6IlFlanBjUGxId3ZqOXlhcWFkb3JsMnc9PSIsInZhbHVlIjoiRlB1a0NNRm1PbkwxK1VhQjBxQWlsdy9nV0NiR3FTVXNBdnZNUnQ2WVpncz0iLCJtYWMiOiI0ZjBlYzVmNDE4NTI2Y2QzYmM5OGViY2VhOWJkNDFkMzczM2FhOTk3ZGUwZTU4N2UwM2I5NDczYzRlZWM1YzMyIn0=
qtallvert: eyJpdiI6Iks1bFdzVEJnSHcxOWcySWJ1L21hYkE9PSIsInZhbHVlIjoiNWQ2RWE5RFZGOWFCMmhTQnlHUUxLdDlLRzQ3Nk9OTytUOEx0aUtSbDREZz0iLCJtYWMiOiJiMzQxYzhiYTNlNDA4ODM2N2UzMTMxZjk3NWE5OGFkNDNlNzA0MGE4NTM5ZmVmNzZjMGVmZWZjMTNmZWJkMmI4In0=
view_set_app_country: 2
biofpval: b807fc976ecf5ecefe7cc82a498ad6c14d556b67
view_set_app_office: TEHRAN
view_set_app_service_type: NORMAL
setnewcalendarstatus: 2

*/