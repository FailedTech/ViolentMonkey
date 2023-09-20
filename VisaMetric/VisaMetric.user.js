// ==UserScript==
// @name        VisaMetric
// @namespace   Violentmonkey Scripts
// @match       *://it-ir-appointment.visametric.com/*
// @grant       GM.registerMenuCommand
// @version     0.1.006
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

    /* xhr format bypass cors header
    let ipify = () => {
        let xhr = new XMLHttpRequest(); xhr.open("GET", "https://api.ipify.org?format=json", true);
        xhr.onreadystatechange = () => {
            xhr.readyState === 4 && xhr.status === 200
            ? console.log("ipify => current ip : " + JSON.parse(xhr.responseText).ip)
            : null;
        }; xhr.send();
    };
    */

    //ajax format bypass cors header with jsonp
    let ipify = () => { $.ajax({ url: "https://api.ipify.org?format=jsonp", dataType: "jsonp", success: data => console.log("ipify => current ip : " + data.ip) }) }

    let liveToken = () => { console.log(`liveToken => current Token : ${$('meta[name="csrf-token"]').attr('content')}`) }

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

    /* #navTab
    let navTab = (TabLi) => {
        ['appCountLi', 'appPersonalInfoLi', 'appPreviewLi', 'appCalendarLi', 'appServicesLi', 'appCreditCardLi'].forEach(item => {
            $('.' + item).removeClass('active'); $('#' + item.replace('Li', '')).removeClass('active in');
        });
        $('.' + TabLi).addClass('active');
        $('#' + TabLi.replace('Li', '')).addClass('active in');
        window.scrollTo(0, 0);
    };
    #navTab */

    let navTab = () => {
        $('.appCountLi, .appPersonalInfoLi, .appPreviewLi, .appCalendarLi, .appServicesLi, .appCreditCardLi').on("click", (e) => {
            $("#" + $(e.currentTarget).attr('class').replace("Li", '')).addClass('active in').siblings('.fade.active.in').removeClass('active in');
            $(e.currentTarget).addClass('active').siblings('li.active').removeClass('active');
        });
    }

    let PersonInfoForm = (FormCount) => {
        $(`.person${FormCount}`).prevAll().addBack().show();
        $(`.person${FormCount}`).nextAll().not(`.person${FormCount}`).hide();
        //console.log(`PersonInfoForm => Applicants changed to: ${FormCount}`);
    }

    let appointmentForm = () => {
        liveToken();
        $(".totalPerson").on("change", () => { PersonInfoForm($(".totalPerson").val()) });

        /* #navTab 
        $(".appCountLi, .appPersonalInfoLi, .appPreviewLi, .appCalendarLi, .appServicesLi, .appCreditCardLi").on("click", (e) => {
            navTab($(e.currentTarget).attr('class').replace('.', ''))
        })
        #navTab */
        navTab();

        //addSelectedOption("city", "city", "1", "TEHRAN")
        //addSelectedOption("office", "office", "1", "TEHRAN")
        //addSelectedOption("officetype", "officetype", "1", "NORMAL")
        //$(".totalPerson").prop("selectedIndex", 1);
        addSelectedOption();

        $(".city").val(1);
        $(".office").val(1);
        $(".officetype").val(1);
        $(".totalPerson").val(1);
        personCount = $(".totalPerson").val();
        $('.setnewcalendarstatus').val(2);
        $('.parentTotalFee').show();
        $('#paytype').show();
        $('#availableDayInfo').show();
        $("#atm").trigger("click");
        $("#paymentCardInput").val(6104338964005165);
        $("#popupDatepicker2").val("1402/06/11");
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
        PersonInfoForm($(".totalPerson").val());
        $('.preview').html($('.personalInfoDiv').clone()).find('input, select').attr('disabled', 'disabled').css('border', 'none');
        $('#previewchk').trigger("click");

    }

    let subdirList = {
        '|/ir|/ir/|/ir/home|/ir/home/|/it|/it/|/it/home|/it/home/':
            () => { window.location.pathname = "/en"; },
        '/en|/en/|/en/home|/en/home/':
            () => { console.log('subdirList => current page : ', pathName); home(); },
        '/en/NationalWorking|/en/NationalWorking/|/ir/NationalWorking|/ir/NationalWorking/|/it/NationalWorking|/it/NationalWorking/':
            () => { console.log('subdirList => current page : ', pathName); nationalWorking(); },
        '/en/appointment-form|/en/appointment-form/|/ir/appointment-form|/ir/appointment-form/|/it/appointment-form|/it/appointment-form/':
            () => { console.log('subdirList => current page : ', pathName); appointmentForm() }
    };
    let matchedSubdir = Object.keys(subdirList).find(key => key.split('|').find(path => path === pathName));

    matchedSubdir ? (ipify(), subdirList[matchedSubdir]()) : console.log('No matching url:', pathName);

    //----------------Custom JD MOD------------------------

    // execute the script with the id ==> eval(document.querySelector("#scriptId").textContent)
    let scriptModifier = {
        txtReplace: (oldTxt, newTxt, scriptId) => {
            document.querySelectorAll('script').forEach(s => {
                s.textContent.includes(oldTxt) ?
                    s.parentNode.replaceChild(Object.assign(document.createElement('script'), {
                        textContent: s.textContent.replace(oldTxt, newTxt), id: scriptId
                    }), s)
                    : console.log("scriptModifier => no matching txt found");
            });
        },
        scriptReplace: (oldTxt, newTxt, scriptId) => {
            document.querySelectorAll('script').forEach(s => {
                s.textContent.includes(oldTxt)
                    ? s.parentNode.replaceChild(Object.assign(document.createElement('script'), {
                        textContent: newTxt, id: scriptId
                    }), s)
                    : console.log("scriptModifier => no matching txt found");
            });
        }
    }

    let personalinfo = () => {
        return [...document.querySelectorAll('script')].map(scriptTag => {
            let data = scriptTag.textContent.split('\n')
                .find(line => line.includes('personalinfo:'))
                ?.split('personalinfo:')[1]?.trim() || '';
            return data.replace(/[^a-zA-Z0-9]/g, '');
        }).filter(Boolean);
    }

    let JD_getdate = () => {
        $.ajax({
            url: "https://it-ir-appointment.visametric.com/en/appointment-form/personal/getdate",
            type: "POST",
            async: false,
            data: {
                consularid: 4,
                exitid: $('.office').val(),
                servicetypeid: $('.officetype').val(),
                calendarType: $('.setnewcalendarstatus').val(),
                totalperson: $(".totalPerson").val(),

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
                console.log("JD_getdate => valid dates :\n", getvaliddates)

            },
            error: function (jqXHR, textStatus, errorThrown) {
                // console.log(textStatus, errorThrown);
            }
        });
    }

    let JD_senddate = () => {
        $.ajax({
            url: "https://it-ir-appointment.visametric.com/en/appointment-form/senddate",
            type: "POST",
            async: false,
            data: {
                fulldate: $('.calendarinput').val(),
                totalperson: $(".totalPerson").val(),
                set_new_consular_id: 4,
                set_new_exit_office_id: $('.office').val(),
                calendarType: $('.setnewcalendarstatus').val(),
                set_new_service_type_id: $('.officetype').val(),
                personalinfo: personalinfo()[1],
            },
            success: function (response) {
                $('.dateresult').html('');
                $('.dateresult').show('slow');
                $('.dateresult').html(response);
                console.log(`JD_senddate =>\n ${response}`);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // console.log(textStatus, errorThrown);
            }
        });
    }

    let addBtn = () => {
        $('.boardc').append(
            $('<div class="JD-MOD-button-container"></div>').append(
                '<button id="getDate" class="btn btn-warning green" style="float: left;">Get Dates<span class="fa" style="margin-left: 10px;"></span></button>',
                '<button id="sendDate" class="btn btn-warning green" style="float: left;">Send Dates<span class="fa" style="margin-left: 10px;"></span></button>',
                '<button id="calenderNext" class="btn btn-warning green" style="float: right;">Calender Next<span class="fa" style="margin-left: 10px;"></span></button>',
                '<button id="sTimer" class="btn btn-warning green" style="float: right;">Stop Timer<span class="fa" style="margin-left: 10px;"></span></button>'
            ))
    }

    let JD_Mod_Main = () => {
        addBtn();
        $("#getDate").on("click", () => {
            JD_getdate();
            //scriptModifier.txtReplace(`totalperson: personCount`, `totalperson: \$(".totalPerson").val()`, "daterqfixed")
        });
        $("#sendDate").on("click", () => { JD_senddate(); });
        $("#sTimer").on("click", () => {
            scriptModifier.scriptReplace(`document.getElementById("watch").innerHTML = "<b>" + minutes + "m " + seconds + "s </b>";`, `clearInterval(x);`, 'sTimer_script');
        });
        $("#calenderNext").on("click", () => { $('#btnAppCalendarNext').trigger("click") });
    }


    JD_Mod_Main();

    //----------------END OF JD MOD------------------------

})();