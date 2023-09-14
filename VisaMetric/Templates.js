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