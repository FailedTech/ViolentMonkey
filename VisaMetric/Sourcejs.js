//---------- script --------
var payTypeVal = null;
var transactionID = null;
var paymentDateInput = null;
var all_general_calendar_status = '1';

var bfp = BioFP.load()
bfp
    .then(fp => fp.get())
    .then(result => $('.biofpval').val(result.bioFp))


var card = null;
$('[data-toggle="tooltip-image"]').hover(function () {
    $('.tooltip-image').addClass('visibledt');
    $('.tooltip-image > .tooltip-inner').addClass('visible-innerdt');
}, function () {
    $('.tooltip-image').removeClass("visibledt");
    $('.tooltip-image > .tooltip-inner').removeClass("visible-innerdt");
});
$(function () {
    $('#popupDatepicker').persianDatepicker({
        // inline:true,
        autoClose: true,
        format: 'YYYY/MM/DD',
        calendar: {
            persian: {
                locale: 'en',
            }
        }
    });
    $('#popupDatepicker2').persianDatepicker({
        // inline:true,
        autoClose: true,
        format: 'YYYY/MM/DD',
        calendar: {
            persian: {
                locale: 'en',
            }
        }
    });

    $('.pers1calendar').click(function () {
        $("#popupDatepicker").datepicker("show");
    });

    $('.pers2calendar').click(function () {
        $("#popupDatepicker2").datepicker("show");
    });

});


//---------- /script --------
//---------- script --------
$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $.ajax({
        url: "https://it-ir-appointment.visametric.com/en/appointment-form/getcity",
        method: 'POST',
        data: {
            'applicationType': '4'
        },
        async: false,
        success: function (response) {
            $('#ajaxcity').html(response);
            $(".city").prop("selectedIndex", 0);
            $(".office").prop("selectedIndex", 0);
            $(".officetype").prop("selectedIndex", 0);
            $(".service_type").prop("selectedIndex", 0);
            $(".totalPerson").prop("selectedIndex", 0);
            // $('html, body').animate({
            //     scrollTop: 350
            // }, 750);
        },
        error: function () {

        }
    });


    $(document).on('change', ".city", function (evt) {
        $('.paymentAlert').hide();
        $('.paymentDateAlert').hide();
        $('#drs').html('');
        $('#availableDayInfo').hide();
        $('.parentTotalFee').hide();
        $('#transactionDiv').hide();
        $('#paytype').hide();
        $('#paymentCardDiv').hide();
        $('#totalFEE').html('');
        var getCityID = $(this).val();
        $('#btnAppCountNext').fadeOut();

        $.ajax({
            url: "https://it-ir-appointment.visametric.com/en/appointment-form/getoffice",
            type: "POST",
            async: false,
            data: {
                getCityID: getCityID,
                getConsular: '4'
            },
            success: function (response) {
                $('#ajaxoffice').html(response);
                $(".officetype").prop("selectedIndex", 0);
                $(".service_type").prop("selectedIndex", 0);
                $(".totalPerson").prop("selectedIndex", 0);

            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });
    });


    $(document).on('change', ".office", function (evt) {
        $('.paymentAlert').hide();
        $('.paymentDateAlert').hide();
        $('#availableDayInfo').hide();
        $('.parentTotalFee').hide();
        $('#transactionDiv').hide();
        $('#paytype').hide();
        $('#paymentCardDiv').hide();
        $('#drs').html('');
        $('#totalFEE').html('');
        var getOfficeID = $('.office').val();
        $('#btnAppCountNext').fadeOut();

        $.ajax({
            url: "https://it-ir-appointment.visametric.com/en/appointment-form/getofficetype",
            type: "POST",
            async: false,
            data: {
                getOfficeID: getOfficeID,
                getConsular: '4'
            },
            success: function (response) {
                $('#ajaxofficetype').html(response);

                $(".officetype").prop("selectedIndex", 0);
                $(".totalPerson").prop("selectedIndex", 0);

            },
            error: function (jqXHR, textStatus, errorThrown) {
                // console.log(textStatus, errorThrown);
            }
        });
    });


    $(document).on('change', ".totalPerson", function (evt) {
        $('#paytype').hide();
        $('#btnAppCountNext').fadeOut();
        $('.paymentAlert').hide();
        $('.paymentDateAlert').hide();
        $('#transactionDiv').hide();
        $('#paymentCardDiv').hide();
        var getOfficeID = $('.office').val();
        var totalPerson = $(this).val();
        var serviceType = $('.officetype').val();
        var available_day_info_hide_control = -1;

        if ($('.office').val() !== "0" && $('.officetype').val() !== "0" && $('.city').val() !== "0" && totalPerson > 0) {
            $.ajax({
                url: "https://it-ir-appointment.visametric.com/en/appointment-form/getcalendarstatus",
                type: "POST",
                async: false,
                data: {
                    getvisaofficeid: getOfficeID,
                    getservicetypeid: serviceType,
                    getvisacountryid: '4'
                },
                success: function (response) {
                    $('.setnewcalendarstatus').val(response);
                    available_day_info_hide_control = response;

                    if (response == 0) {
                        $('#paytype').show();
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    // console.log(textStatus, errorThrown);
                }
            });
            var set_new_calendar_type = $('.setnewcalendarstatus').val();

            $.ajax({
                url: "https://it-ir-appointment.visametric.com/en/appointment-form/getprice",
                type: "POST",
                async: false,
                data: {
                    serviceType: serviceType,
                    totalPerson: totalPerson,
                    getOfficeID: getOfficeID,
                    calendarType: set_new_calendar_type,
                    getConsular: '4'
                },
                success: function (response) {
                    $('#totalFEE').html('<b>Total Price:</b> ' + response.data + ' IRR');

                    $('.parentTotalFee').show();
                    $('#paytype').show();


                },
                error: function (jqXHR, textStatus, errorThrown) {
                    let err = $.parseJSON(jqXHR.responseText).firstAvailableDate;
                    console.log(err);
                    // $('#availableDayInfo').html(err);
                    //  $('#availableDayInfo').show(1000);
                }
            });

        } else {
            $('#availableDayInfo').hide();
            $('.parentTotalFee').hide();
        }

    });




    $(document).on('change', ".officetype", function (evt) {
        $('#btnAppCountNext').fadeOut();
        $('.paymentAlert').hide();
        $('.paymentDateAlert').hide();
        $(".totalPerson").prop("selectedIndex", 0);
        $('#drs').html('');
        $('#availableDayInfo').hide();
        $('.parentTotalFee').hide();
        $('#paytype').hide();
        $('#transactionDiv').hide();
        $('#paymentCardDiv').hide();
        $('#totalFEE').html('');
        if ($(this).val() == "1") {
            $('.leftmaincontent_old').html(`NORMAL`);
        } else if ($(this).val() == "2") {
            $('.leftmaincontent_old').html(`VIP`);
        } else if ($(this).val() == "3") {
            $('.leftmaincontent_old').html(`Mobile İçerik - EN`);
        } else {
            $('.leftmaincontent').html(`TEST - EN`);
        }
    });



    $('input[name="paytype"]').change(function () {
        $('.paymentAlert').hide();
        $('.paymentDateAlert').hide();
        payTypeVal = $(this).val();
        switch (payTypeVal) {
            case "transfer":
                $('#paymentCardDiv').css({ "animation": "fadeOutDown", "animation-duration": "1s" });
                $('#checkCardListBtnDiv').css({ "animation": "fadeOutDown", "animation-duration": "1s" });

                setTimeout(function () {
                    $("#paymentCardDiv").css('display', 'none');
                    $("#checkCardListBtnDiv").css('display', 'none');
                    //$('#transactionDiv').css({"animation": "fadeInDown", "animation-duration": "1s"});
                    // $('#btnAppCountNext').css({"animation": "fadeInDown", "animation-duration": "1s"});
                    $('#transactionDiv').show();
                    $('#btnAppCountNext').fadeIn(0);
                });
                $('#paymentCardInput').val('');
                $('#checkCardListDiv').html('');

                break;
            case "atm":
                $('#transactionDiv').css({ "animation": "fadeOutDown", "animation-duration": "1s" });
                $('#btnAppCountNext').fadeOut();
                setTimeout(function () {
                    $("#transactionDiv").css('display', 'none');
                    $("#btnAppCountNext").css('display', 'none');
                    $('#paymentCardDiv').css('display', 'none');
                    $('#checkCardListBtnDiv').css('display', 'none');
                    $('#paymentCardDiv').show();
                    $('#checkCardListBtnDiv').show();
                });
                $('#transactionid').val('');
                $('#checkCardListDiv').html('');
                break;

        }
    });
    //   $('#paymentCardInput').inputmask("9999999999999999");
    //  $('#paymentCardInput').bind('paste', function () { $(this).val(''); });

    $('#checkCardListBtn').click(function () {
        let card = $('#paymentCardInput').val();
        let date = $('#popupDatepicker2').val();
        let totalPerson = $('#totalPerson').val();
        let serviceType = $('#officetype').val();
        let office = $('#office').val();
        let consularID = '4';

        var cardx = $('#paymentCardInput').val();
        if (cardx.length != 16) {
            swal({
                title: "Warning",
                text: "Please enter a valid Card number.",
                confirmButtonColor: '#3085d6',
                confirmButtonText: "OK",
                type: 'warning'
            });
            return false;
        }

        $.ajax({
            url: "https://it-ir-appointment.visametric.com/en/appointment-form/bankpayment-card-control",
            method: 'POST',
            data: {
                card: card,
                date: date,
                totalPerson: totalPerson,
                office: office,
                serviceType: serviceType,
                consularID: consularID
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
    });
});
//---------- /script --------

//---------- script --------
var personCount = 0;
var ct = 0;
var qtallvertval = 0;
var set_price_for_cc = 0;
var responseMail = 0;
var responseConfirmCode = 0;
var btnAppServicesNextClick = 0;
var timerBtnActive = 0;

$(document).ready(function () {


    passiveTab('appCountLi', 'appCount');

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });


    function passiveTab(valLi, valTab) {
        $('.appCountLi').removeClass('active');
        $('.appPersonalInfoLi').removeClass('active');
        $('.appServicesLi').removeClass('active');
        $('.appPreviewLi').removeClass('active');
        $('.appCalendarLi').removeClass('active');
        $('.appCreditCardLi').removeClass('active');

        $('#appCount').removeClass('active in');
        $('#appPersonalInfo').removeClass('active in');
        $('#appServices').removeClass('active in');
        $('#appPreview').removeClass('active in');
        $('#appCalendar').removeClass('active in');
        $('#appCreditCard').removeClass('active in');

        $('.' + valLi + '').addClass('active');
        $('#' + valTab + '').addClass('active in');

        window.scrollTo(0, 0);
    }

    $('#btnAppCountNext').click(function () {
        if ($('#city').val() == 0) {
            swal({
                title: "Warning",
                text: "Lütfen ikametagh ettiğiniz ili seçiniz! - EN",
                confirmButtonColor: '#3085d6',
                confirmButtonText: "OK",
                type: 'warning'
            });
            return false;
        } else if ($('#office').val() == 0) {
            swal({
                title: "Warning",
                text: "Lütfen gitmek istediğiniz iDATA ofisini seçiniz! - EN",
                confirmButtonColor: '#3085d6',
                confirmButtonText: "OK",
                type: 'warning'
            });
            return false;
        } else if ($('#officetype').val() == 0) {
            swal({
                title: "Warning",
                text: "Lütfen hizmet türünü seçiniz! - EN",
                confirmButtonColor: '#3085d6',
                confirmButtonText: "OK",
                type: 'warning'
            });
            return false;
        } else if ($('#totalPerson').val() == 0) {
            swal({
                title: "Warning",
                text: "Kişi Sayısı Seçiniz - EN",
                confirmButtonColor: '#3085d6',
                confirmButtonText: "OK",
                type: 'warning'
            });
            return false;
        } else if ($('#transactionid').val() != '' && $('#paymentCardInput').val() != '') {
            swal({
                title: "Warning",
                text: "Kişi Sayısı Seçiniz - EN",
                confirmButtonColor: '#3085d6',
                confirmButtonText: "OK",
                type: 'warning'
            });
            return false;
        } else {
            personCount = $('#totalPerson').val();
            hidePersonInfo();
            showPersonInfo(personCount);


            let getOfficeID = $('.office').val();
            let totalPerson = $('.totalPerson').val();
            let serviceType = $('.officetype').val();
            var cardPaymentID = -1;
            switch (payTypeVal) {
                case "transfer":
                    var transactionID = $('#transactionid').val();
                    var paymentDateInput = $('#popupDatepicker').val();
                    break;
                case "atm":
                    serviceTypeVal = "transfer";
                    cardPaymentID = $('input[name="bankpayment"]:checked').val()
                    var card = $('#paymentCardInput').val();

                    var paymentDateInput = $('#popupDatepicker2').val();
                    break;
            }
            if (payTypeVal == 'atm' && (cardPaymentID == -1 || cardPaymentID == '' || cardPaymentID == null || cardPaymentID === undefined)) {
                swal({
                    title: "Warning",
                    text: "Please select a payment with correct amount.",
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: "OK",
                    type: 'warning'
                });
                return false;
            }
            $('.paymentAlert').hide();
            $('.paymentDateAlert').hide();
            $.ajax({
                url: "https://it-ir-appointment.visametric.com/en/appointment-form/equaltransaction",
                type: "POST",
                async: false,
                data: {
                    paymentType: payTypeVal,
                    transactionID: transactionID,
                    card: card,
                    paymentDate: paymentDateInput,
                    serviceType: serviceType,
                    totalPerson: totalPerson,
                    getOfficeID: getOfficeID,
                    getConsular: '4',
                    cardPaymentID: '' + cardPaymentID + ''
                },
                success: function (response) {

                    if (response.error) {

                        $('.paymentDateAlert').fadeOut("slow");
                        $('.paymentDateAlert').fadeIn("slow");
                    } else if (!response.data) {


                        $('.paymentAlert').fadeOut("slow");
                        $('.paymentAlert').fadeIn("slow");
                    } else {
                        passiveTab('appPersonalInfoLi', 'appPersonalInfo');
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {

                }
            });

        }
    });

    function hidePersonInfo() {
        for (var i = 1; i <= 6; i++) {
            $('.person' + i + '').css('display', 'none');
        }
    }

    function showPersonInfo(personCountVal) {
        for (var i = 1; i <= personCountVal; i++) {
            $('.person' + i + '').css('display', 'block');
        }
    }


    function getUnique(array) {
        var uniqueArray = [];

        for (i = 0; i < array.length; i++) {
            if (uniqueArray.indexOf(array[i]) === -1) {
                uniqueArray.push(array[i]);
            }
        }
        return (uniqueArray.length);
    }

    function appPersonalNextPassportControl() {
        var passportArray = [];
        for (var i = 1; i <= personCount; i++) {
            passportArray.push($('#passport' + i).val());
        }

        var count_pass_array = getUnique(passportArray);

        if (count_pass_array < passportArray.length) {
            return ['x', 'x', 'x']
            return false;
        }
        var passportControlStatus = null;
        var sira = null;
        var passportResponse = null;
        var set_country_for_passport = '4';

        $.ajax({
            url: "https://it-ir-appointment.visametric.com/en/appointment-form/personal/passport-control",
            type: "POST",
            async: false,
            dataType: "json",
            data: {
                passport: passportArray,
                country_id: set_country_for_passport
            },
            success: function (response) {
                passportControlStatus = response.status;
                sira = response.sira;
                passportResponse = response.passport;

            },
            error: function (jqXHR, textStatus, errorThrown) {
                // console.log(textStatus, errorThrown);
            }
        });
        return [passportControlStatus, sira, passportResponse];
    }

    function appPersonalEmailControl() {
        var emailArray = [];

        for (var i = 1; i <= personCount; i++) {
            emailArray.push($('#email' + i).val());
        }
        // var count_pass_array = getUnique(emailArray);
        //
        // if (count_pass_array < emailArray.length) {
        //     return ['x', 'x', 'x']
        //     return false;
        // }
        var emailControlStatus = null;
        var sira = null;
        var emailResponse = null;
        var set_country_for_email = '4';

        $.ajax({
            url: "https://it-ir-appointment.visametric.com/en/appointment-form/personal/email-control",
            type: "POST",
            async: false,
            dataType: "json",
            data: {
                email: emailArray,
                country_id: set_country_for_email
            },
            success: function (response) {
                emailControlStatus = response.status;
                sira = response.sira;
                emailResponse = response.email;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // console.log(textStatus, errorThrown);
            },
        });

        return [emailControlStatus, sira, emailResponse];

    }

    function appPersonalPhoneControl() {
        var phoneArray = [];

        for (var i = 1; i <= personCount; i++) {
            phoneArray.push($('#phone' + i).val());
        }
        // var count_pass_array = getUnique(phoneArray);
        //
        // if (count_pass_array < phoneArray.length) {
        //     return ['x', 'x', 'x']
        //     return false;
        // }
        var emailControlStatus = null;
        var sira = null;
        var emailResponse = null;
        var set_country_for_phone = '4';

        $.ajax({
            url: "https://it-ir-appointment.visametric.com/en/appointment-form/personal/phone-control",
            type: "POST",
            async: false,
            dataType: "json",
            data: {
                phone: phoneArray,
                country_id: set_country_for_phone
            },
            success: function (response) {
                phoneControlStatus = response.status;
                sira = response.sira;
                phoneResponse = response.phone;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // console.log(textStatus, errorThrown);
            },
        });

        return [phoneControlStatus, sira, phoneResponse];

    }


    $('#btnAppPersonalNext').click(function () {


        if ($('#scheba_name').val().length < 3) {
            swal({
                title: "Warning",
                text: "Please enter a valid Owner of Sheba Number!",
                confirmButtonColor: '#3085d6',
                confirmButtonText: "OK",
                type: 'warning'
            });
            return false;

        } else if ($('#scheba_number').val().substring(5, 8) == '560' || $('#scheba_number').val().substring(5, 8) == '730' || $('#scheba_number').val().substring(5, 8) == '520' || $('#scheba_number').val().substring(5, 8) == '790' || $('#scheba_number').val().substring(5, 8) == '630' || $('#scheba_number').val().substring(5, 8) == '650') {

            swal({
                title: "Warning",
                text: "The Sheba number is not valid.",
                confirmButtonColor: '#3085d6',
                confirmButtonText: "OK",
                type: 'warning'
            });
            return false;
        } else if (!IBAN.isValid($('#scheba_number').val())) {
            swal({
                title: "Warning",
                text: "Please enter a valid Sheba Number!",
                confirmButtonColor: '#3085d6',
                confirmButtonText: "OK",
                type: 'warning'
            });
            return false;
        }

        var appPersonalNextResult = inputControl();

        if (appPersonalNextResult) {
            var passportControl = appPersonalNextPassportControl();
            if (passportControl[0] == "x") {

                swal({
                    title: "Warning",
                    text: "Bir veya birden fazla aynı pasaport numarası girdiniz. - EN",
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: "OK",
                    type: 'warning'
                });

                return false;
            }
            var emailDublicateControl = appPersonalEmailControl();

            if (emailDublicateControl[0] == "x") {

                swal({
                    title: "Warning",
                    text: "Bir veya birden fazla aynı pasaport numarası girdiniz. - EN",
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: "OK",
                    type: 'warning'
                });

                return false;
            }
            var phoneDublicateControl = appPersonalPhoneControl();

            if (phoneDublicateControl[0] == "x") {

                swal({
                    title: "Warning",
                    text: "Bir veya birden fazla aynı pasaport numarası girdiniz. - EN",
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: "OK",
                    type: 'warning'
                });

                return false;
            }





            if (!passportControl[0]) {
                if (!phoneDublicateControl[0]) {
                    if (!emailDublicateControl[0]) {


                    } else {
                        /**
                         *
                         * Mail Conf Kapatma Başlangıç
                         */
                        // btnAppPersonalNextClick = 0;
                        // timer.stop();
                        /**
                         *
                         * Mail Conf Kapatma Bitiş
                         */
                        swal({
                            title: "Warning",
                            text: emailDublicateControl[2] + " \n " + " Email address has been used. Please check again. - EN",
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: "OK",
                            type: 'warning'
                        });
                        return false;

                    }
                } else {
                    /**
                     *
                     * Mail Conf Kapatma Başlangıç
                     */
                    // btnAppPersonalNextClick = 0;
                    // timer.stop();
                    /**
                     *
                     * Mail Conf Kapatma Bitiş
                     */
                    swal({
                        title: "Warning",
                        text: phoneDublicateControl[2] + " \n " + " Phone number has been used. Please check again. - EN",
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: "OK",
                        type: 'warning'
                    });
                    return false;
                }
            } else {
                /**
                 *
                 * Mail Conf Kapatma Başlangıç
                 */
                // btnAppPersonalNextClick = 0;
                // timer.stop();
                /**
                 *
                 * Mail Conf Kapatma Bitiş
                 */
                swal({
                    title: "Warning",
                    text: passportControl[2] + " \n " + " Passport number has been used. Please check again.",
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: "OK",
                    type: 'warning'
                });
                return false;
            }
            /**
             *
             * Mail Conf Kapatma Başlangıç
             */
            // if (responseConfirmCode == 2) {

            /**
             *
             * Mail Conf Kapatma Bitiş
             */
            $('.preview').html('');
            $('.preview').html($('.personalInfoDiv').clone());
            $('.preview input').attr('disabled', 'disabled');
            $('.preview select').attr('disabled', 'disabled');
            $('.preview input').css('border', 'none');
            $('.preview select').css('border', 'none');

            var set_app_country_view = '4';
            var set_app_city_view = $(".city option:selected").html();
            var set_app_office_view = $(".office option:selected").html();
            var set_app_service_type_view = $(".officetype option:selected").html();
            var set_app_person_count_view = $(".totalPerson option:selected").html();

            if (set_app_country_view == "1") {
                set_app_country_view = "National";
            } else if (set_app_country_view == "2") {
                set_app_country_view = "Schengen";
            } else if (set_app_country_view == "3") {
                set_app_country_view = "Legalization";
            } else if (set_app_country_view == "4") {
                set_app_country_view = "Study";
            } else if (set_app_country_view == "5") {
                set_app_country_view = "Other";
            }

            $(".set_app_country_view").html("<b>Application Type:</b> " + set_app_country_view + "");
            $(".set_app_city_view").html("<b>Place of Residence:</b> " + set_app_city_view + "");
            $(".set_app_office_view").html("<b>Application Center:</b> " + set_app_office_view + '');
            $(".set_app_service_type_view").html("<b>Service Type:</b> " + set_app_service_type_view + '');
            $(".set_app_person_count_view").html("<b>Number of Applicant(s):</b> " + set_app_person_count_view + '');

            passiveTab('appPreviewLi', 'appPreview');
            /**
             *
             * Mail Conf Kapatma Başlangıç
             */
            // }
            /**
             *
             * Mail Conf Kapatma Bitiş
             */

        }
    });


    $('#btnAppPersonalPrev').click(function () {
        $('.paymentAlert').hide();
        $('.paymentDateAlert').hide();

        /**
*
* Mail Conf Kapatma Başlangıç
*/
        // responseMail = 0;
        // btnAppPersonalNextClick = 0;
        // responseConfirmCode = 0;

        // $('#stopTimer').val('0');
        // setTimeout(function () {
        //     $('#email1').removeAttr("readonly");
        //     $('#mailConfirmCodeControlDiv').css({
        //         "animation": "fadeInUp",
        //         "animation-duration": "1s"
        //     });
        //     $('#mailConfirmCodeControlDiv').hide();
        // }, 100);
        // timer.reset(120);
        /**
         *
         * Mail Conf Kapatma Bitiş
         */

        passiveTab('appCountLi', 'appCount');
    });

    $('#btnAppPreviewPrev').click(function () {

        /**
*
* Mail Conf Kapatma Başlangıç
*/
        // responseMail = 0;
        // btnAppPersonalNextClick = 0;
        // responseConfirmCode = 0;

        // $('#stopTimer').val('0');
        // setTimeout(function () {
        //     $('#email1').removeAttr("readonly");
        //     $('#mailConfirmCodeControlDiv').css({
        //         "animation": "fadeInUp",
        //         "animation-duration": "1s"
        //     });
        //     $('#mailConfirmCodeControlDiv').hide();
        // }, 100);
        // timer.reset(120);
        /**
         *
         * Mail Conf Kapatma Bitiş
         */


        passiveTab('appPersonalInfoLi', 'appPersonalInfo');
    });


    $('#btnAppPreviewNext').click(function () {
        var isapprovedprevchk = $('#previewchk');

        if (!isapprovedprevchk.is(':checked')) {
            swal({
                title: "Warning",
                text: "Please select the checkbox!",
                confirmButtonColor: '#3085d6',
                confirmButtonText: "OK",
                type: 'warning'
            });
            return false;
        } else {

            var getcalendaractive = '1';
            if (2 > 1) {
                var set_new_consular_id = '4';
                var set_new_exit_office_id = $('.office').val();
                var set_new_service_type_id = $('.officetype').val();
                var set_new_calendar_type = $('.setnewcalendarstatus').val();


                if (($('.setnewcalendarstatus').val() == "1" || $('.setnewcalendarstatus').val() == "2" || $('.setnewcalendarstatus').val() == "3") && (getcalendaractive == "1")) {
                    $.ajax({
                        url: "https://it-ir-appointment.visametric.com/en/appointment-form/personal/getdate",
                        type: "POST",
                        async: false,
                        data: {
                            consularid: set_new_consular_id,
                            exitid: set_new_exit_office_id,
                            servicetypeid: set_new_service_type_id,
                            calendarType: set_new_calendar_type,
                            totalperson: personCount,
                            /**
*
* Mail Conf Kapatma Başlangıç Bitiş
*/

                            // ,mailConfirmCode: $('#mailConfirmCodeControl').val()
                            /**
                             *
                             * Mail Conf Kapatma Bitiş
                             */

                        },
                        success: function (getvaliddates) {

                            var enableDays = getvaliddates;
                            $("#datepicker").datepicker({
                                maxViewMode: 2,
                                weekStart: 1,
                                beforeShowDay: function (date) {
                                    if (enableDays.indexOf(formatDate(date)) < 0)
                                        return {
                                            enabled: false
                                        }
                                    else
                                        return {
                                            enabled: true
                                        }
                                },
                                startDate: "+1d",
                                endDate: "+2m",
                                todayHighlight: true,
                                format: "dd-mm-yyyy",
                                clearBtn: true,
                                autoclose: true
                            });

                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            // console.log(textStatus, errorThrown);
                        }
                    });

                }
                var get_office_calendar_status = ($('.setnewcalendarstatus').val());

                if ((get_office_calendar_status == "1" || get_office_calendar_status == "2" || get_office_calendar_status == "3") && getcalendaractive == "1") {
                    $('.calendar_office_open').show();
                    $('.calendar_office_close').hide();
                } else {
                    $('.calendar_office_open').hide();
                    $('.calendar_office_close').show();
                    $('.setcalendarinfo').hide();
                }


                var set_app_country = '4';
                var set_app_city = $(".city option:selected").html();
                var set_app_office = $(".office option:selected").html();
                var set_app_service_type = $(".officetype option:selected").html();
                var set_app_person_count = $(".totalPerson option:selected").html();

                if (set_app_country == "1") {
                    set_app_country = "National";
                } else if (set_app_country == "2") {
                    set_app_country = "Schengen";
                } else if (set_app_country == "3") {
                    set_app_country = "Legalization";
                } else if (set_app_country == "4") {
                    set_app_country = "Study";
                } else if (set_app_country == "5") {
                    set_app_country = "Other";
                }

                $(".set_app_country").html("<b>Application Type:</b> " + set_app_country + '');
                $(".set_app_city").html("<b>Place of Residence:</b> " + set_app_city + '');
                $(".set_app_office").html("<b>Application Center:</b> " + set_app_office + '');
                $(".set_app_service_type").html("<b>Service Type:</b> " + set_app_service_type + '');
                $(".set_app_person_count").html("<b>Number of Applicant(s):</b> " + set_app_person_count + '');

                $(".set_app_date").html("<b>Date:</b>");
                $(".set_app_time").html("<b>Time:</b>");

                var country_id_service = '4';
                var office_id_service = $('.office').val();
                var service_type_id_service = $('.officetype').val();

                $.ajax({
                    url: "https://it-ir-appointment.visametric.com/en/appointment-form/personal/getservices",
                    type: "POST",
                    async: false,
                    data: {
                        country_id: country_id_service,
                        service_type_id: service_type_id_service,
                        office_id: office_id_service,
                        languageID: '2'
                    },
                    success: function (response) {
                        if (response) {
                            $('.getajaxservice').html(response);
                        }

                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // console.log(textStatus, errorThrown);
                    }
                });
                passiveTab('appCalendarLi', 'appCalendar');
            }
        }

    });

    $('#btnAppServicesNext').click(function () {

        // var country_id_for_price = $('.country').val();
        // var service_type_id_for_price = $('.officetype').val();
        // var service_type_id_for_price = $('.officetype').val();
        // var office_id_for_price = $('.office').val();

        var serviceArray = new Array();
        $.each($("input[name='additionalservices[]']:checked"), function () {
            serviceArray.push($(this).val());
            // or you can do something to the actual checked checkboxes by working directly with  'this'
            // something like $(this).hide() (only something useful, probably) :P
        });


        $('.view_set_app_country').val('4');
        $('.view_set_app_office').val($('.office option:selected').html());
        $('.view_set_app_service_type').val($('.officetype option:selected').html());

        // if (grecaptcha.getResponse().length < 1) {
        //     swal({
        //         title: "Warning",
        //         text: "Please select the checkbox!",
        //         confirmButtonColor: '#3085d6',
        //         confirmButtonText: "OK",
        //         type: 'warning'
        //     });
        //     return false;
        // } else {

        if (btnAppServicesNextClick == 1) {
            if ($('#mailConfirmCodeControl').val().length == "8") {
                mailConfirmCodeControlVal = $('#mailConfirmCodeControl').val();
                confirmCodeSendMail(mailConfirmCodeControlVal);
            } else {
                swal({
                    title: "Warning",
                    text: " Please enter the correct confirmation code sent to your e-mail.",
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: "OK",
                    type: 'warning'
                });
                return false;
            }
        } else {

            timer.start(1000);

            $('#mailConfirmCodeControl').val('');
            var mailConfirmCodeControlVal = 0;
            $.ajax({
                url: "https://it-ir-appointment.visametric.com/en/appointment-form/jky45fgd",
                type: "POST",
                async: false,
                data: {
                    emailCheck: $('#email1').val(),
                    personalinfo: 'eyJpdiI6InpnY0NuYXFNdlk1UXBXSVRSL2oyZGc9PSIsInZhbHVlIjoiUFVFcEw3QkkxaDhpT2w1bytyakhjdz09IiwibWFjIjoiMTI4ZTk0NWYyYTZmNDgxMWFjZjUzMDNhYmI1M2VlYTc0MjZhNWMwNDFmODkxMzgxNTI4MjA1YWE0M2RmNTlmOCJ9'
                },
                success: function (response) {
                    responseMail = response;
                    if (responseMail == "1") {
                        confirmCodeSendMail(mailConfirmCodeControlVal);
                    }

                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(textStatus, errorThrown);
                }
            });


        }
        /**
        * Confirmation Code Finish
        */
        // }
        // passiveTab('appCreditCardLi', 'appCreditCard');



    });



    /**
     * Confirmation Code Function Start
     */
    function confirmCodeSendMail(mailConfirmCodeControlVal) {
        $.ajax({
            url: "https://it-ir-appointment.visametric.com/en/appointment-form/confirmCodeSendMail",
            type: "POST",
            async: false,
            data: {
                confirmCode: mailConfirmCodeControlVal,
                emailValControl: 'eyJpdiI6IlJselpZeGhnM0tJWXBET1VVR2JvSGc9PSIsInZhbHVlIjoibVlHcHc2K0lvR0tFOVprYjV4dFE1QklFVzN2Rm9lcStoZzJSdlRkL1dDTT0iLCJtYWMiOiJlZDA4NGZkODYwYjJlOTNiMzQ4NzUwYzMxMjEzNGU5OWU5OGU0NTZkMThhNTdmZDg4ZDkwMzM1MzNmOTE5NTgxIn0=',
                biofpval: $('#biofpval').val()

            },
            success: function (response) {
                if (response == 3) {
                    btnAppServicesNextClick = 0;

                    $('#stopTimer').val('0');

                    setTimeout(function () {
                        $('#email1').removeAttr("readonly");
                        $('#mailConfirmCodeControlDiv').css({
                            "animation": "fadeInUp",
                            "animation-duration": "1s"
                        });
                        $('#mailConfirmCodeControlDiv').hide();
                    }, 100);

                    swal({
                        title: "Warning",
                        text: "Size verilen süre içerisinde giriş yapmadınız. Lütfen işleminizi yeniden yapınız. - EN",
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: "OK",
                        type: 'warning'
                    });
                    return false;
                } else if (response == 2) {
                    $('#personalForm').submit();
                    $('#btnAppServicesNext').hide();
                    // $('#stopTimer').val('1');
                    // responseConfirmCode = response;
                } else if (response == 1) {

                    btnAppServicesNextClick = 1;

                    $('#stopTimer').val('0');

                    setTimeout(function () {
                        $('#email1').attr("readonly", "true");
                        $('#mailConfirmCodeControlDiv').css({
                            "animation": "fadeInDown",
                            "animation-duration": "1s"
                        });
                        $('#mailConfirmCodeControlDiv').show();
                    }, 100);

                } else if (response == 5) {




                    $('#stopTimer').val('0');

                    setTimeout(function () {
                        $('#email1').attr("readonly", "true");
                        $('#mailConfirmCodeControlDiv').css({
                            "animation": "fadeInDown",
                            "animation-duration": "1s"
                        });
                        $('#mailConfirmCodeControlDiv').show();
                    }, 100);
                    var currentLang = 'en';

                    setTimeout(function () {
                        location.href = '/' + currentLang + '/error';
                    }, 115000);


                } else if (response == 0) {

                    btnAppServicesNextClick = 1;

                    $('#stopTimer').val('0');

                    setTimeout(function () {
                        $('#email1').attr("readonly", "true");
                        $('#mailConfirmCodeControlDiv').css({
                            "animation": "fadeInDown",
                            "animation-duration": "1s"
                        });
                        $('#mailConfirmCodeControlDiv').show();
                    }, 100);


                    swal({
                        title: "Warning",
                        text: "The code you entered is incorrect. Please check.",
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: "OK",
                        type: 'warning'
                    });
                    return false;

                } else {
                    btnAppServicesNextClick = 0;

                    $('#stopTimer').val('0');

                    swal({
                        title: "Warning",
                        text: "Due to a technical glitch, the confirmation mail could not be sent. Please try again.",
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: "OK",
                        type: 'warning'
                    });
                    return false;
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });
    }

    /**
     * Confirmation Code Function Finish
     */

    $('#btnAppCalendarNext').click(function () {
        $('#btnAppCalendarNext').css("display", "none");

        var getcalendaractive2 = '1';

        if (($('.setnewcalendarstatus').val() == "1" || $('.setnewcalendarstatus').val() == "2" || $('.setnewcalendarstatus').val() == "3") && (ct == "0")) {
            $('#btnAppCalendarNext').css("display", "block");
            swal({
                title: "Warning",
                text: "Please select a Date!",
                confirmButtonColor: '#3085d6',
                confirmButtonText: "OK",
                type: 'warning'
            });
            return false;
        }


        if (($('.setnewcalendarstatus').val() == "1" || $('.setnewcalendarstatus').val() == "2" || $('.setnewcalendarstatus').val() == "3") && (getcalendaractive2 == "1")) {
            if (ct.length > 25 && qtallvertval.length > 25) {
                $.ajax({
                    url: "https://it-ir-appointment.visametric.com/en/appointment-form/controldate",
                    type: "POST",
                    async: false,
                    data: {
                        dateall: qtallvertval,
                        personCountTotal: personCount,
                        mailConfirmCode: $('#mailConfirmCodeControl').val()
                    },
                    success: function (response) {
                        if (response == "1") {
                            $('#btnAppCalendarNext').css("display", "none");
                            passiveTab('appServicesLi', 'appServices');
                        } else {
                            ct = 0;
                            qtallvertval = 0;
                            $('.xt5dk3ce').hide('slow');
                            $('#btnAppCalendarNext').css("display", "block");
                            swal({
                                title: "Warning",
                                text: "Please select a new date!",
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: "OK",
                                type: 'warning'
                            });
                            return false;
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // console.log(textStatus, errorThrown);
                    }
                });

            } else {
                $('#btnAppCalendarNext').css("display", "block");
                swal({
                    title: "Warning4",
                    text: "Please select a Date!",
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: "OK",
                    type: 'warning'
                });
            }
        } else if ($('.setnewcalendarstatus').val() !== "1" || $('.setnewcalendarstatus').val() !== "2" || $('.setnewcalendarstatus').val() !== "3" || getcalendaractive2 !== "1") {
            $.ajax({
                url: "https://it-ir-appointment.visametric.com/en/appointment-form/withoutcalendarquota",
                type: "POST",
                async: false,
                data: { dateall: 0, personCountTotal: personCount },
                success: function (response) {
                    if (response == "1") {
                        passiveTab('appServicesLi', 'appServices');
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    // console.log(textStatus, errorThrown);
                }
            });
        }

    });


    $("#phone1").keyup(function (event) {
        $("#phone2").val($("#phone1").val());
        $("#phone3").val($("#phone1").val());
        $("#phone4").val($("#phone1").val());
        $("#phone5").val($("#phone1").val());
        $("#phone6").val($("#phone1").val());
    });

    $("#email1").keyup(function (event) {
        $("#email2").val($("#email1").val());
        $("#email3").val($("#email1").val());
        $("#email4").val($("#email1").val());
        $("#email5").val($("#email1").val());
        $("#email6").val($("#email1").val());
    });

    function inputControl() {
        for (i = 1; i <= personCount; i++) {
            var bgun = $('#birthday' + i).val();
            var bay = $('#birthmonth' + i).val();
            var byil = $('#birthyear' + i).val();

            if (byil % 4 === 0) {
                var dayCheck = 29;
            } else {
                var dayCheck = 28;
            }


            if (bgun > dayCheck & bay == 2) {
                swal({
                    title: "Warning",
                    text: i + "." + "Please enter a valid birthday.",
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: "OK",
                    type: 'warning'
                });
                return false;
            } else if (bgun > 30 & (bay == 4 || bay == 6 || bay == 9 || bay == 11)) {
                swal({
                    title: "Warning",
                    text: i + "." + "Please enter a valid birthday.",
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: "OK",
                    type: 'warning'
                });
                return false;
            }
        }
        var fieldArray = ['', 'name', 'surname', 'birthday', 'birthmonth', 'birthyear', 'passport', 'phone', 'email'];
        var fieldArrayDetail = {
            name_min: 2,
            name_max: 50,
            name_type: 'text',
            surname_min: 2,
            surname_max: 50,
            surname_type: 'text',
            birthday_min: 2,
            birthday_max: 5,
            birthday_type: 'text',
            birthmonth_min: 2,
            birthmonth_max: 5,
            birthmonth_type: 'text',
            birthyear_min: 2,
            birthyear_max: 5,
            birthyear_type: 'text',
            passport_min: 7,
            passport_max: 10,
            passport_type: 'passport',
            phone_min: 10,
            phone_max: 20,
            phone_type: 'text',
            email_min: 5,
            email_max: 100,
            email_type: 'email',
        };
        var i, k;
        loop1:
        for (i = 1; i <= personCount; i++) {

            if ($('#name' + i + '').val().match(/[^a-zA-Z iİıI]/g)) {
                swal({
                    title: "Warning",
                    text: i + ".Please enter a Name!",
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: "OK",
                    type: 'warning'
                });
                return false;
                break loop1;
            }


            loop2:
            for (k = 1; k <= fieldArray.length - 1; k++) {
                if ($('#' + fieldArray[k] + '' + i + '').val() != undefined) {
                    var detailMin = fieldArray[k] + '_min';
                    var detailMax = fieldArray[k] + '_max';
                    var detailType = fieldArray[k] + '_type';

                    if (fieldArray[k] == 'birthyear') {
                        var bgun = $('#birthday' + i).val();
                        var bay = $('#birthmonth' + i).val();
                        var byil = $('#birthyear' + i).val();
                        var bfullbirthdate = (byil) + '' + (bay) + '' + (bgun);

                        var nowDate = new Date();
                        var nGun = nowDate.getDate();
                        var nAy = nowDate.getMonth() + 1;
                        var nYil = nowDate.getFullYear();
                        var nFullYear = (nYil + '' + (nAy < 10 ? 0 : '') + '' + nAy + '' + nGun);
                        // alert(nFullYear + ' - ' + bfullbirthdate);
                        if (nFullYear <= bfullbirthdate) {
                            swal({
                                title: "Warning",
                                text: i + ".Kişinin doğum tarihi bugünden büyük olamaz! - EN",
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: "OK",
                                type: 'warning'
                            });
                            return false;
                            break loop1;
                            break loop2;
                        }

                    }

                    if ($('#' + fieldArray[k] + i).val().length < fieldArrayDetail[detailMin]) {
                        var fieldnameforemail1 = "" + fieldArray[k] + "";

                        var fieldControl = fieldArray[k];
                        var alertContent = null;
                        switch (fieldControl) {
                            case 'name':
                                alertContent = 'Please enter a Name!'
                                break;
                            case 'surname':
                                alertContent = 'Please enter a Surname!'
                                break;
                            case 'birthday':
                                alertContent = 'Please enter Day of Birth!'
                                break;
                            case 'birthmonth':
                                alertContent = 'Please enter Month of Birth!'
                                break;
                            case 'birthyear':
                                alertContent = 'Please enter Year of Birth!'
                                break;
                            case 'passport':
                                alertContent = 'Please enter a valid Passport Number!'
                                break;
                            case 'phone':
                                alertContent = 'Please enter a valid Phone Number!'
                                break;
                            case 'email':
                                alertContent = 'Please enter an Email address!'
                                break;
                        }

                        if (fieldnameforemail1 !== "email") {
                            $('#' + fieldArray[k] + '' + i + '').focus();
                            swal({
                                title: "Warning",
                                text: "" + i + ". " + alertContent + "",
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: "OK",
                                type: 'warning'
                            });

                            return false;
                            break loop1;
                            break loop2;
                        }
                    }
                    if ($('#' + fieldArray[k] + i).val().length > fieldArrayDetail[detailMax]) {
                        var fieldnameforemail2 = "" + fieldArray[k] + "";
                        var fieldControl2 = fieldArray[k];
                        var alertContent2 = null;
                        switch (fieldControl2) {
                            case 'name':
                                alertContent2 = 'Please enter a Name!'
                                break;
                            case 'surname':
                                alertContent2 = 'Please enter a Surname!'
                                break;
                            case 'birthday':
                                alertContent2 = 'Please enter Day of Birth!'
                                break;
                            case 'birthmonth':
                                alertContent2 = 'Please enter Month of Birth!'
                                break;
                            case 'birthyear':
                                alertContent2 = 'Please enter Year of Birth!'
                                break;
                            case 'passport':
                                alertContent2 = 'Please enter a valid Passport Number!'
                                break;
                            case 'phone':
                                alertContent2 = 'Please enter a valid Phone Number!'
                                break;
                            case 'email':
                                alertContent2 = 'Please enter an Email address!'
                                break;
                        }
                        if (fieldnameforemail2 !== "email") {
                            $('#' + fieldArray[k] + '' + i + '').focus();
                            swal({
                                title: "Warning",
                                text: "" + i + ". " + alertContent2 + "",
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: "OK",
                                type: 'warning'
                            });
                            return false;
                            break loop1;
                            break loop2;
                        }
                    }

                    // Email ve Pasaport için type kontrol yapılıyor.
                    if (fieldArrayDetail[detailType] == 'email') {
                        var emailControlResult = emailControl($('#' + fieldArray[k] + i).val());

                        if (!emailControlResult) {
                            $('#' + fieldArray[k] + '' + i + '').focus();
                            swal({
                                title: "Warning",
                                text: "" + i + ". " + "Please enter an Email address!" + "",
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: "OK",
                                type: 'warning'
                            });
                            return false;
                            break loop1;
                            break loop2;
                        }
                    }

                    if (fieldArrayDetail[detailType] == 'passport') {
                        var passportControlResult = passportControl($('#' + fieldArray[k] + i).val());

                        if (!passportControlResult) {
                            $('#' + fieldArray[k] + '' + i + '').focus();
                            swal({
                                title: "Warning",
                                text: "" + i + ". " + "Please enter a valid Passport Number!" + "",
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: "OK",
                                type: 'warning'
                            });
                            return false;
                            break loop1;
                            break loop2;
                        }
                    }


                }
            }
        }
        return true;
    }

    function phoneControl(phone) {
        var regex = /^\d+$/;
        return regex.test(phone);
    }

    function emailControl(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }

    function passportControl(passport) {
        var regex = /^([A-Za-z])([a-zA-Z0-9])+$/;

        return regex.test(passport);
    }

    $('.phoneNumberPath').on('keydown keyup', function (e) {
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9]/g, '');
        }

        var itemUp = this.value.turkishToUpper();

        $(this).val(itemUp);
    });


});
//---------- /script --------
//---------- script --------
function _timer(callback) {

    var time = 120;     //  The default time of the timer
    var timer_id;    //    This is used by setInterval function

    this.start = function (interval) {

        interval = 1000;
        time = 120;
        clearInterval(timer_id);
        timer_id = setInterval(function () {
            if (time) {
                time--;
                generateTime();
                if (typeof (callback) === 'function') callback(time);
            }
        }, interval);

    }

    this.reset = function (sec) {
        sec = 120;
        time = sec;
        generateTime(time);
    }

    this.stop = function () {
        clearInterval(timer_id);
        btnAppServicesNextClick = 0;

        $('#email1').removeAttr("readonly");
        $('#mailConfirmCodeControlDiv').hide();

    }


    function generateTime() {
        var second = time % 60;
        var minute = Math.floor(time / 60) % 60;

        second = (second < 10) ? '0' + second : second;
        minute = (minute < 10) ? '0' + minute : minute;

        document.getElementById("watchSendMail").innerHTML = "<b>" + minute + "m " + second + "s </b>";


    }
}

var timer;

$(document).ready(function (e) {
    timer = new _timer
        (function (time) {
            if (time == 0) {
                timer.stop();
                btnAppServicesNextClick = 0;
                $('#email1').removeAttr("readonly");
                $('#mailConfirmCodeControlDiv').hide();
                var stopTimer = $('#stopTimer').val();


                if (stopTimer == 0) {

                    swal({
                        title: "Warning",
                        text: "Size verilen süre içerisinde giriş yapmadınız. Lütfen işleminizi yeniden yapınız. - EN",
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: "OK",
                        type: 'warning'
                    });
                    return false;
                } else {
                    $('#email1').removeAttr("readonly");
                    $('#mailConfirmCodeControlDiv').hide();
                    return false;
                }
            }
        });
    timer.reset(0);

});

//---------- /script --------
//---------- script --------

var oldDateObj = new Date();
var newDateObj = new Date();
newDateObj.setTime(oldDateObj.getTime() + (10 * 60 * 1000));

var countDownDate = new Date(newDateObj).getTime();

var x = setInterval(function () {

    var now = new Date().getTime();

    var distance = countDownDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("watch").innerHTML = "<b>" + minutes + "m " + seconds + "s </b>";

    if (distance < 0) {
        clearInterval(x);
        document.getElementById("watch").innerHTML = "EXPIRED";
        document.location.href = "https://it-ir-appointment.visametric.com/";
    }
}, 1000);
//---------- /script --------

//---------- script --------
function formatDate(d) {
    var day = String(d.getDate())
    //add leading zero if day is is single digit
    if (day.length == 1)
        day = '0' + day
    var month = String((d.getMonth() + 1))
    //add leading zero if month is is single digit
    if (month.length == 1)
        month = '0' + month
    return day + "-" + month + "-" + d.getFullYear()
}

$(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    function senddate(fulldate) {
        var set_new_consular_id = '4';
        var set_new_exit_office_id = $('.office').val();
        var set_new_service_type_id = $('.officetype').val();
        var set_new_calendar_type = $('.setnewcalendarstatus').val();

        if (fulldate.length > 7) {
            $.ajax({
                url: "https://it-ir-appointment.visametric.com/en/appointment-form/senddate",
                type: "POST",
                async: false,
                data: {
                    fulldate: fulldate,
                    totalperson: personCount,
                    set_new_consular_id: set_new_consular_id,
                    set_new_exit_office_id: set_new_exit_office_id,
                    calendarType: set_new_calendar_type,
                    set_new_service_type_id: set_new_service_type_id,
                    personalinfo: 'eyJpdiI6IkdDc3pPMk9yS1RPRDg3Z0dsL1RScWc9PSIsInZhbHVlIjoialZNWWVnRFJ1RmRuSS9YUUkvNDB3dz09IiwibWFjIjoiZjRhNjcyOTI5ODMwMjNhMTU2YjUwODViYmIzYWY0YzIwZDkyNTJmNWRlNjFlNDA1OGI4YjNkMTE4YWZiZTlkNSJ9',
                    /**
                    *
                    * Mail Conf Kapatma Başlangıç Bitiş
                    */

                    // ,mailConfirmCode: $('#mailConfirmCodeControl').val()
                    /**
                     *
                     * Mail Conf Kapatma Bitiş
                     */
                },
                success: function (response) {
                    $('.dateresult').html('');
                    $('.dateresult').show('slow');
                    $('.dateresult').html(response);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    // console.log(textStatus, errorThrown);
                }
            });
        }
    }

    $('#datepicker').on('changeDate', function (ev) {
        var fulldate = $('.calendarinput').val();
        ct = 0;
        qtallvertval = 0;
        $('.dateresult').hide('slow');
        setTimeout(function () {
            senddate(fulldate);
        }, 100);
        $(".set_app_time").html('');
        $(".set_app_date").html("<b>Date:</b> " + fulldate + '');

    });

});

$(document).ready(function () {

    $('body').on('click', '.getdatebtnhour', function () {
        $('.noPrime').css('background-color', '#f0ad4e');
        $('.yesPrime').css('background-color', '#337ab7');

        $(this).css('background-color', '#000');

        $(this).addClass("xt5dk3ce");

        ct = $(this).attr('data-id');
        $('#ctval').val(ct);

        qtallvertval = $(this).attr('data-all');
        $('#qtallvert').val(qtallvertval);

        var set_app_time = $(this).text();
        $(".set_app_time").html("<b>Time:</b>" + set_app_time + '');
    });
});
//---------- /script --------

//---------- script --------
$(document).ready(function () {

    String.prototype.turkishToUpper = function () {
        var string = this;
        var letters = { "i": "İ", "ş": "Ş", "ğ": "Ğ", "ü": "Ü", "ö": "Ö", "ç": "Ç", "ı": "I" };
        string = string.replace(/(([iışğüçö]))/g, function (letter) {
            return letters[letter];
        })
        return string.toUpperCase();
    }

    String.prototype.turkishReplace = function () {
        var string = this;
        var letters = {
            "i": "I",
            "ş": "S",
            "ğ": "G",
            "ü": "U",
            "ö": "O",
            "ç": "C",
            "ı": "I",
            "İ": "I",
            "Ş": "S",
            "Ğ": "G",
            "Ü": "U",
            "Ö": "O",
            "Ç": "C",
        };
        string = string.replace(/(([iışğüçöİŞĞÜÇÖ]))/g, function (letter) {
            return letters[letter];
        })
        return string.toUpperCase();
    }
    String.prototype.turkishToLower = function () {
        var string = this;
        var letters = { "İ": "i", "I": "ı", "Ş": "ş", "Ğ": "ğ", "Ü": "ü", "Ö": "ö", "Ç": "ç" };
        string = string.replace(/(([İIŞĞÜÇÖ]))/g, function (letter) {
            return letters[letter];
        })
        return string.toLowerCase();
    };

    String.prototype.turkishToLowerMail = function () {
        var string = this;
        var letters = {
            "İ": "i",
            "I": "i",
            "Ş": "s",
            "Ğ": "g",
            "Ü": "u",
            "Ö": "o",
            "Ç": "c",
            "ı": "i",
            "ş": "s",
            "ğ": "g",
            "ü": "u",
            "ö": "o",
            "ç": "c"
        };
        string = string.replace(/(([İIŞĞÜÇÖışğüöç]))/g, function (letter) {
            return letters[letter];
        });
        return string.toLowerCase();
    };

    $('.upperCasePassport').on('keydown keyup', function (e) {
        var itemUp = $(this).val().turkishToUpper();
        $(this).val(itemUp);
    });

    // $('.jvnsPassportRegex').on('keydown keyup', function (e) {
    //     if (this.value.match(/[^a-zA-Z0-9]/g)) {
    //         this.value = this.value.replace(/[^a-zA-Z0-9]/g, '');
    //     }
    //
    //     var itemUp = this.value.turkishToUpper();
    //
    //     $(this).val(itemUp);
    // });
    $('.jvnsEmailRegex').on('keydown keyup', function (e) {
        if (this.value.match(/[^a-zA-Z0-9 iİıIşŞçÇğĞöÖüÜ._@-]/g)) {
            this.value = this.value.replace(/[^a-zA-Z0-9 iİıIşŞçÇğĞöÖüÜ._@-]/g, '');
        }

        var itemUp = this.value.turkishToLowerMail();

        $(this).val(itemUp);
    });

    $('.upperCaseJvns').on('keydown keyup', function (e) {
        var itemUp = this.value.turkishToUpper();

        $(this).val(itemUp);
    });
    $('.turkishReplaceJvns').on('keydown keyup', function (e) {
        var itemUp = $(this).val().turkishReplace();
        $(this).val(itemUp);
    });

    $('.upperCaseForName').on('keydown keyup', function (e) {
        if (this.value.match(/[^a-zA-Z iİıI]/g)) {
            this.value = this.value.replace(/[^a-zA-Z iİıI]/g, '');
        }

        var itemUp = this.value.turkishToUpper();

        $(this).val(itemUp);
    });


    $('.upperCaseMailJvns').on('keydown keyup', function (e) {
        var itemUp = $(this).val().turkishToLowerMail();
        $(this).val(itemUp);
    });

    var regExp = /[0-9\.\,]/;
    $('#paymentCardInput, #billtaxnumber').add('.phoneNumberPath').on('keydown keyup', function (e) {
        var value = String.fromCharCode(e.which) || e.key;
        if (!regExp.test(value)
            && e.which != 9   // backspace
            && e.which != 8   // backspace
            && e.which != 37  // left
            && e.which != 39   // right
            && (e.which < 95  // arrow keys
                || e.which > 106)) {
            e.preventDefault();
            return false;
        }
    });
}
)
    ;
//---------- /script --------

//---------- script --------
var $ = jQuery.noConflict();
jQuery(document).ready(function () {

    var set_lang_control = "";
    set_lang_control = 'en'

    if (set_lang_control == "ir") {
        $('div').addClass('rtlinsert');
        $('th').addClass('rtlinsert');
        $('td').addClass('rtlinsert');
        $('body').addClass('rtlinsert');
        $('input').addClass('rtlinsert');
        $('h3').addClass('rtlinsert');

        $('.datepicker-container').removeClass('rtlinsert');

    }

    $(".fancybox").fancybox();

    var visited = $.cookie('visited');
    if (visited == 'yes') {
        return false;
    } else {

        $("#hidden_popup_link").fancybox(
            {
                fitToView: false,
                autoSize: false,
                scrolling: false
            }
        ).trigger('click');
        $.cookie('visited', 'yes', {
            expires: 1
        });
    }
});

$(".language").change(function () {
    location.href = "https://it-ir-appointment.visametric.com/" + $(this).val() + "";
});


function fontinc(getfsize) {
    var fontSize = parseInt($("body").css("font-size"));

    if (getfsize == 1) {
        fontSize = fontSize + 1;
    }
    if (getfsize == 2) {
        fontSize = fontSize - 1;
    }

    lastfontsize = "" + fontSize + "px";

    if (fontSize <= 20 && fontSize >= 10) {
        $("body").css({ 'font-size': lastfontsize });
    }
}

var getLanguageFlag = function () {
    var getFlagCode = $('.language').find('option:selected').val();
    $('.flag').attr("src", "https://it-ir-appointment.visametric.com/front/images/common/" + getFlagCode + "-flag.gif");
}
getLanguageFlag();

let errorMessage = '<ul class="error_list_message">';
errorMessage += "<ul>"



//---------- /script --------
//---------- script --------
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }

var getLanguageFlag = function () {
    var getFlagCode = $('.language').find('option:selected').val();
    $('.flag').attr("src", "https://it-ir-appointment.visametric.com/front/images/common/" + getFlagCode + "-flag.gif");
}

getLanguageFlag();

gtag('js', new Date());

gtag('config', 'G-XS9FKW3JQ1');
//---------- /script --------
