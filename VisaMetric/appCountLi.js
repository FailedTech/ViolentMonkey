$('.office').val(1);
$('.officetype').val(1);
$(".totalPerson").val(1);
$('.setnewcalendarstatus').val(2);






let passiveTab = (valLi, valTab) => {
  ['appCountLi', 'appPersonalInfoLi', 'appServicesLi', 'appPreviewLi', 'appCalendarLi', 'appCreditCardLi'].forEach(className => {
    $('.' + className).removeClass('active');
  });

  ['appCount', 'appPersonalInfo', 'appServices', 'appPreview', 'appCalendar', 'appCreditCard'].forEach(id => {
    $('#' + id).removeClass('active in');
  });

  $('.' + valLi).addClass('active');
  $('#' + valTab).addClass('active in');

  window.scrollTo(0, 0);
};

passiveTab('appCountLi', 'appCount');
passiveTab('appPersonalInfoLi', 'appPersonalInfo');
passiveTab('appPreviewLi', 'appPreview');
passiveTab('appCalendarLi', 'appCalendar');
passiveTab('appServicesLi', 'appServices');


let addSelectedOption = (id, className, val, txt) => {
  $(`#${id}`).length && ($(`#${id}`).append($('<option>', { value: val, text: txt }).attr('selected', 'selected')), className && $(`#${id}`).addClass(className));
};

addSelectedOption("city","city","1","TEHRAN")
addSelectedOption("office","office","1","TEHRAN")
addSelectedOption("officetype","officetype","1","NORMAL")
$(".totalPerson").prop("selectedIndex", 1);
$('.setnewcalendarstatus').val(2);
$('.parentTotalFee').show();
$('#paytype').show();
$("#atm").trigger("click");

$.ajax({
  url: "https://it-ir-appointment.visametric.com/en/appointment-form/equaltransaction",
  type: "POST",
  async: false,
  data: {
    paymentType: "atm",
    card: 5022291310533185,
    paymentDate: "1402/06/20",
    serviceType: 1,
    totalPerson: 1,
    getOfficeID: 1,
    getConsular: 4,
    cardPaymentID: "eyJpdiI6ImRscG13T2k2TnV6aUdnTkp0VVZYVWc9PSIsInZhbHVlIjoiYWlTVHVEODF4clcyL2x3aFRqaVB1QT09IiwibWFjIjoiYjViNGJjMWRhM2Q4OGMwMzBjMTVkNDI0YTYyYWU0ODBmOTI2MmUyMTBlNmVlM2EyN2U3ZWI4ZjgyMzU1Y2E0MiJ9"

  },
  success: function (response) {
    response.error ?
      $('.paymentDateAlert, .paymentAlert').fadeOut("slow").fadeIn("slow") :
      response.data ?
        passiveTab('appPersonalInfoLi', 'appPersonalInfo') :
        $('.paymentAlert').fadeOut("slow").fadeIn("slow");
  },
  error: function (jqXHR, textStatus, errorThrown) { }
});

passiveTab('appCountLi', 'appCount');
passiveTab('appPersonalInfoLi', 'appPersonalInfo');
passiveTab('appPreviewLi', 'appPreview');
passiveTab('appCalendarLi', 'appCalendar');
passiveTab('appServicesLi', 'appServices');