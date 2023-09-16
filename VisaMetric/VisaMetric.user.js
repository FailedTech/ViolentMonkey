// ==UserScript==
// @name        VisaMetric
// @namespace   Violentmonkey Scripts
// @match       *://it-ir-appointment.visametric.com/*
// @grant       GM.registerMenuCommand
// @version     0.1.004
// @author      FailedTech
// @description 09/11/2023, 13:00:00 PM
// @icon        https://www.visametric.com/front/images/common/favicon.png
// @homepageURL https://github.com/FailedTech/ViolentMonkey/tree/main/VisaMetric
// @updateURL   https://github.com/FailedTech/ViolentMonkey/raw/main/VisaMetric/VisaMetric.user.js
// @downloadURL https://github.com/FailedTech/ViolentMonkey/raw/main/VisaMetric/VisaMetric.user.js
// @run-at      document-idle
// ==/UserScript==

(() => {
    let pathName = window.location.pathname;

    //let home = () => { $("#nationalWorkingBtn").trigger("click"); }
    let home = () => { $('#goAppointment').attr('action', 'https://it-ir-appointment.visametric.com/en/NationalWorking').submit(); }

    //let nationalWorking = () => { $("#result1, #result3").trigger("click"); $("#btnSubmit").trigger("click"); };
    let nationalWorking = () => { $("#formAccessApplication").prepend('<input type="hidden" name="nationality" value="Iran">').submit(); }

    //let addSelectedOption = (id, className, val, txt) => {
    //    $(`#${id}`).length && ($(`#${id}`).append($('<option>', { value: val, text: txt }).attr('selected', 'selected')), className && $(`#${id}`).addClass(className));
    //};

    let addSelectedOption = () => {
        $('#ajaxcity').html(`
        <select name="city" id="city" class="form-control jvnsMt20 city">
        <option value="0" selected="selected">Place of Residence</option>
        <option value="9">AHWAZ</option>
        <option value="6">ARAK</option>
        <option value="7">ARDEBIL</option>
        <option value="12">BANDARABBAS</option>
        <option value="14">BIRJAND</option>
        <option value="11">BOJNORD</option>
        <option value="13">BUSHEHR</option>
        <option value="2">ESFEHAN</option>
        <option value="28">GORGAN</option>
        <option value="29">HAMEDAN</option>
        <option value="10">ILAM</option>
        <option value="25">KARAJ</option>
        <option value="26">KERMAN</option>
        <option value="27">KERMANSHAH</option>
        <option value="15">KHORAMABAD</option>
        <option value="4">MASHHAD</option>
        <option value="23">QAZVIN</option>
        <option value="24">QOM</option>
        <option value="16">RASHT</option>
        <option value="21">SANANDAJ</option>
        <option value="19">SARI</option>
        <option value="20">SEMNAN</option>
        <option value="22">SHAHREKORD</option>
        <option value="5">SHIRAZ</option>
        <option value="3">TABRIZ</option>
        <option value="1">TEHRAN</option>
        <option value="8">URUMIEH</option>
        <option value="30">YASUJ</option>
        <option value="31">YAZD</option>
        <option value="17">ZAHEDAN</option>
        <option value="18">ZANJAN</option>
        </select>`)

        $('#ajaxoffice').html(`
        <select name="office" id="office" class="form-control jvnsMt20 office">
        <option value="0" selected="selected">Application Center</option>
        <option value="1">TEHRAN</option>
        </select>`)

        $('#ajaxofficetype').html(`
        <select name="officetype" id="officetype" class="form-control jvnsMt20 officetype">
        <option value="0" selected="selected">Service Type</option>
        <option value="1">NORMAL</option>
        <option value="2">PREMIUM LOUNGE</option>
        </select>
        `)
    }

    let navTab = (TabLi) => {
        ['appCountLi', 'appPersonalInfoLi', 'appPreviewLi', 'appCalendarLi', 'appServicesLi', 'appCreditCardLi'].forEach(item => {
            $('.' + item).removeClass('active'); $('#' + item.replace('Li', '')).removeClass('active in');
        });
        $('.' + TabLi).addClass('active');
        $('#' + TabLi.replace('Li', '')).addClass('active in');
        window.scrollTo(0, 0);
    };

    let PersonInfoForm = (FormCount) => {
        $(`.person${FormCount}`).prevAll().addBack().show();
        $(`.person${FormCount}`).nextAll().not(`.person${FormCount}`).hide();
        console.log(`PersonInfoForm => Applicants changed to: ${FormCount}`);
    }

    let appointmentForm = () => {
        $(".totalPerson").on("change", () => { PersonInfoForm($(".totalPerson").val()) });
        $(".appCountLi, .appPersonalInfoLi, .appPreviewLi, .appCalendarLi, .appServicesLi, .appCreditCardLi").on("click", (e) => {
            navTab($(e.currentTarget).attr('class').replace('.', ''))
        })
        //addSelectedOption("city", "city", "1", "TEHRAN")
        //addSelectedOption("office", "office", "1", "TEHRAN")
        //addSelectedOption("officetype", "officetype", "1", "NORMAL")
        //$(".totalPerson").prop("selectedIndex", 1);
        addSelectedOption();
        $(".city").val(1);
        $(".office").val(1);
        $(".officetype").val(1);
        $(".totalPerson").val(1);
        $('.setnewcalendarstatus').val(2);
        $('.parentTotalFee').show();
        $('#paytype').show();
        $('#availableDayInfo').show();
        $("#atm").trigger("click");
        $("#paymentCardInput").val(6104338964005165);
        $("#popupDatepicker2").val("1402/06/11");
        PersonInfoForm($(".totalPerson").val())
        $("#scheba_number").val("IR540120000000009663850619");
        $("#scheba_name").val("ABEDIN FALLAHI");
        $("#name1").val("ELAHE");
        $("#surname1").val("FALLAHI");
        $("#birthyear1").val("1991");
        $("#birthmonth1").val("05");
        $("#birthday1").val("05");
        $("#passport1").val("X60422129");
        $("#phone1").val("09127391660");
        $("#email1").val("elahefallahi.91@yahoo.com");
        $('.preview').html($('.personalInfoDiv').clone()).find('input, select').attr('disabled', 'disabled').css('border', 'none');
        $('#previewchk').trigger("click");

    }

    let subdirList = {
        '|/ir|/ir/|/ir/home|/ir/home/|/it|/it/|/it/home|/it/home/':
            () => { window.location.pathname = "/en"; },
        '/en|/en/|/en/home|/en/home/':
            () => { console.log('subdirList => current page is: ', pathName); home(); },
        '/en/NationalWorking|/en/NationalWorking/|/ir/NationalWorking|/ir/NationalWorking/|/it/NationalWorking|/it/NationalWorking/':
            () => { console.log('subdirList => current page is: ', pathName); nationalWorking(); },
        '/en/appointment-form|/en/appointment-form/|/ir/appointment-form|/ir/appointment-form/|/it/appointment-form|/it/appointment-form/':
            () => { console.log('subdirList => current page is: ', pathName); appointmentForm() }
    };
    let matchedSubdir = Object.keys(subdirList).find(key => key.split('|').find(path => path === pathName));

    //----------------Custom JD MOD------------------------
    let JD_getdate = () => {
        $.ajax({
            url: "https://it-ir-appointment.visametric.com/en/appointment-form/personal/getdate",
            type: "POST",
            async: false,
            data: {
                consularid: 4,
                exitid: 1,
                servicetypeid: 1,
                calendarType: 2,
                totalperson: 1,

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
                $("#datepicker").datepicker('update', enableDays)

            },
            error: function (jqXHR, textStatus, errorThrown) {
                // console.log(textStatus, errorThrown);
            }
        });
    }

    let addBtn = () => {
        $('.boardc').append(
            $('<div class="JD-MOD-button-container"></div>').append(
                '<button id="getDate" class="btn green" style="float: left;">Get Dates<span class="fa" style="margin-left: 10px;"></span></button>',
                '<button id="sendDate" class="btn green" style="float: right;">Send Dates<span class="fa" style="margin-left: 10px;"></span></button>'
            ))
    }

    let JD_Mod_Main = ()=>{
        addBtn();
        $("#getDate").on("click",()=>{JD_getdate();});
        $("#sendDate").on("click",()=>{JD_getdate();});
    }


    JD_Mod_Main();
    //----------------END OF JD MOD------------------------
    matchedSubdir ? subdirList[matchedSubdir]() : console.log('No matching url:', pathName);

})();