$(document).ready(function () {

    $('.share-open').on('click', function (e) {
        $('.share-socials').css('display', 'block');
    });

    $('.share-socials-close').on('click', function () {
        $('.share-socials').css('display', 'none');
    });

    var height = $(window).scrollTop();
    if (height > 70) {
        $('.plate_app').css('position', 'fixed');
    }
    $(document).scroll(function (event) {
        height = $(window).scrollTop();
        if (height > 70) {
            $('.plate_app').css('position', 'fixed');
        } else {
            $('.plate_app').css('position', 'relative');
        }
    });

    $('.plate_app-close').click(function (e) {
        e.preventDefault();
        var now = new Date();
        console.log(Math.round(now.getTime() / 1000));
        let timestamp = Math.round(now.getTime() / 1000);

    });

    $("body").on('click', function (e) {
        hideSuggest(e);
    });

    function hideSuggest(e) {
        var div1 = $(".searched-numbers");
        var div2 = $("#propusk");
        if (div1.is(':visible') && !div1.is(e.target) && div1.has(e.target).length === 0 && !div2.is(e.target) && div2.has(e.target).length === 0) {
            div1.hide();
        }
    }


    $("header").removeClass('active');
    $("#nav-trigger").on("click", function (event) {
        hideSuggest(event);
        event.stopPropagation();
        $("header").addClass('active');
    });
    $("#menu").on("click", function (event) {
        hideSuggest(event);
        event.stopPropagation();
    });
    $("body, #close-menu").on("click", function () {
        hideSuggest(event);
        $("header").removeClass('active');
    });

    $(".openSignUp").on("click", function (event) {
        hideSuggest(event);
        event.stopPropagation();
        $(".signUp").addClass('active');
        $("body").addClass('lock');
    });
    $(".signUp .fa-close, .popClose").on("click", function (event) {
        hideSuggest(event);
        event.stopPropagation();
        $(".signUp").removeClass('active');
        $("body").removeClass('lock');
    });

    $(".openSignUpShort").on("click", function (event) {
        hideSuggest(event);
        event.stopPropagation();
        $(".signUpShort").addClass('active');
        $("body").addClass('lock');
    });
    $(".signUpShort .fa-close, .popClose").on("click", function (event) {
        hideSuggest(event);
        event.stopPropagation();
        $(".signUpShort").removeClass('active');
        $("body").removeClass('lock');
    });

    $(".openSignUpNumbers").on("click", function (event) {
        hideSuggest(event);
        event.stopPropagation();
        $(".signUpNumbers").addClass('active');
        $("body").addClass('lock');
    });
    $(".popClose").on("click", function (event) {
        hideSuggest(event);
        event.stopPropagation();
        $(".signUpNumbers").removeClass('active');
        $("body").removeClass('lock');
    });

    $("body").on("click", ".js-close-allok", function (event) {
        hideSuggest(event);
        event.stopPropagation();
        $(".allOk").removeClass('active');
        $("body").removeClass('lock');
    });

    $("body").on('click', ".js-set-old-number", function (event) {
        var clickedClass = event.target.className;
        if (!clickedClass.match(/js-clear-number-from-cookie/i)) {
            $("#propusk").val($(this).find(".js-self-number").text());
            $(".searched-numbers").hide();
            $(".js-clear-main-number").show();
            $(this).closest('form').trigger('submit');
        }
        return false;
    });

    $("body").on('click', ".js-clear-number-from-cookie", function () {
        var number = $(this).parent().find(".js-self-number").text();

        var newarrNumbers = new Array();

        var oldNumbers = $.cookie('prov_prop_checked_numbers');
        var arrNumbers = jQuery.parseJSON(oldNumbers);
        if (arrNumbers) {
            for (i in arrNumbers) {
                if (number != arrNumbers[i]) {
                    newarrNumbers.push(arrNumbers[i]);
                }
            }
        }
        $.cookie('prov_prop_checked_numbers', JSON.stringify(newarrNumbers), {expires: 60 * 60 * 24 * 365, path: '/'});

        $(this).parent().remove();
    });

    var inputmask_123 = {

        "mask": "ommmoommm",

        onKeyValidation: function (key, result) {
            if (!result) {
                $('.number_hint').show();
            } else {
                // $('.number_hint').hide();
            }
        },

        onBeforeWrite: function (value, buffer, caretPos, opts) {

            if (value.type == 'keydown') {
                if (value.keyCode == 8) {
                    $('.number_hint').hide();
                }
            }

            if (value.type == 'keypress') {

                var valid_symbols = "1234567890уУкКеЕнНхХвВаАрРоОсСмМтТ";
                var c = String.fromCharCode(value.which);

                if (valid_symbols.indexOf(c) > -1) {
                    $('.number_hint').hide();
                } else {
                    $('.number_hint').show();
                }

                var processedValue = c.toUpperCase();
                var array = {
                    "A": "А",
                    "B": "В",
                    'C': 'С',
                    'E': 'У',
                    'H': 'Р',
                    'K': 'К',
                    'M': 'М',
                    'O': 'О',
                    'P': 'Р',
                    'T': 'Е',
                    'X': 'Х',
                    'Y': 'Н',
                    'F': 'А',
                    'D': 'В',
                    'R': 'К',
                    'V': 'М',
                    'J': 'О',
                    'N': 'Т',
                    '[': 'Х',
                    'З': '3'
                }
                var text = processedValue;

                for (var val in array) {
                    text = text.replace(val, array[val]);
                }
                // console.log({'insert':{c:text, pos:caretPos}})
                var a = buffer
                // a[caretPos-1]=text
                // return {refreshFromBuffer: true, buffer:a}
                return {insert: {caretPos, text}}
            }
        }
    };

    var inputmask_123_1 = {

        "mask": "ommmoo",

        onKeyValidation: function (key, result) {
            if (!result) {
                $('.number_hint').show();
            } else {
                // $('.number_hint').hide();
            }
        },

        onBeforeWrite: function (value, buffer, caretPos, opts) {
            if (value.type == 'keydown') {
                if (value.keyCode == 8) {
                    $('.number_hint').hide();
                }
            }
        }
    };

    var inputmask_123_2 = {

        "mask": "mmm",

        onKeyValidation: function (key, result) {
            if (!result) {
                $('.number_hint').show();
            } else {
                // $('.number_hint').hide();
            }
        },

        onBeforeWrite: function (value, buffer, caretPos, opts) {
            if (value.type == 'keydown') {
                if (value.keyCode == 8) {
                    $('.number_hint').hide();
                }
            }
        }
    };

    Inputmask.extendDefinitions({
        "m": {"validator": "[0-9]", "casing": "upper", "cardinality": 1, "placeholder": ""},
        "n": {
            "validator": "[0-9ABCEHKMOPTYXabcehkmoptyxАВЕЗКМНОРСТУХDавезкмнорстухd]",
            "casing": "upper",
            "cardinality": 1,
            "placeholder": ""
        },
        "o": {
            "validator": "[YyАВЕЗКМНОРСТУХDавезкмнорстухdABCEHKMOPTYXabcehkmoptyxFfRrVvJjNn\[]",
            "casing": "upper",
            "cardinality": 1,
            "placeholder": ""
        }
    });

    //Маска номера телефона
    if ($("#registerform-phone").length) $("#registerform-phone").inputmask({"mask": "+7 (999) 999-99-99"});
    if ($("#registerform-phone2").length) $("#registerform-phone2").inputmask({"mask": "+7 (999) 999-99-99"});
    if ($("#registerform-phone3").length) $("#registerform-phone3").inputmask({"mask": "+7 (999) 999-99-99"});

    if ($("#propusk1").length) {
        $("#propusk1").inputmask(inputmask_123_1);

        $("#propusk1").on('keyup touchend', function () {
            var val = $(this).val();
            var array = {
                "A": "А",
                "B": "В",
                'C': 'С',
                'E': 'Е',
                'H': 'Н',
                'K': 'К',
                'M': 'М',
                'O': 'О',
                'P': 'Р',
                'T': 'Т',
                'X': 'Х',
                'Y': 'У',
                'З': '3'
            }

            for (var key in array) {
                val = val.replace(key, array[key]);
            }
            $(this).val(val);

            val = $(this).val();

            if (val.length == 6) $("#propusk2").focus();
        });
    }

    $(document).on('click', '#check', function () {
        $('.table').html('');
        let avtoNumber = $('#propusk').val();
        if (avtoNumber.length) {
            $('.loader').removeClass('hidden');
            $.ajax({
                url: "/api/calculate?avtoNumber=" + avtoNumber,
                method: "GET"
            }).done(function (data) {
                console.log(data);
                $('.loader').addClass('hidden');
                if(data.statusCode == 200){
                    parseData(data);
                } else {
                    $('.table').html('');
                }
            }).fail(function (err) {
                $('.table').html(err.responseJSON.message);
                $('.loader').addClass('hidden');
            });
        }
    })

    function parseData(obj) {

        if (obj.lenght!=0) {
            var tabl =  '<h4>Текущие пропуска</h4><div class="title-items">'+
                '<div class="result-item-piece col-01">Пропуск</div>'+
                '<div class="result-item-piece col-02">Статус</div>'+
                '<div class="result-item-piece col-03">Дата окончания</div>'+
                '<div class="result-item-piece col-04">Осталось дней</div>'+
                '</div>';

            var counter = 0;
            var isCache = 0;
            var timeCache = '';
            let currentPass = obj['data']['current_pass'];
            for(a in currentPass) {
                // if (currentPass[a]['data']['isnotfound'] == 500 || currentPass[a]['data']['isnotfound'] == 1 || currentPass[a]['data']['isnotfound'] == 404) {
                //     console.log(obj);
                //     window.messageForShares.push('Пропуск в базе департамента не найден');
                //     $(".vow").find('.js-vow-text').html(window.messageForShares[window.messageForShares.length-1]);
                //     $(".vow").show();
                //     $(".ser").hide();
                //     $(".table").hide();
                //     $(".js-block-btn").show();
                //     $(".js-block-btn-more").hide();
                //     $(".js-block-btn-2-more").hide();
                //     $(".js-hide-after-result").hide();
                //     $(".js-hide-after-result-always").hide();
                // }
                // else {
                //     if (currentPass[a]['data']['cache'] == 1) {
                //         isCache = 1;
                //         timeCache = currentPass[a]['data']['lastchecktime'];
                //     }
                let passType = currentPass[a]['pass_type'];
                switch (passType) {
                    case 'BB_DAY' : passType = 'Временный дневной'
                        break;
                    case 'BB_NIGHT' : passType = 'Временный ночной'
                        break;
                    case 'BA_DAY' : passType = 'Годовой дневной'
                        break;
                    case 'BA_NIGHT' : passType = 'Годовой ночной'
                        break;
                }
                if(currentPass[a]['data'].hasOwnProperty('lastchecktime')){
                    var date1 = currentPass[a]['data'].lastchecktime;
                    var date1date = date1.split(' ')[0];
                    var date1time = date1.split(' ')[1];
                    var date2 = currentPass[a]['data'].dateend;
                    var date2date = date2.split(' ')[0];
                    var date2time = date2.split(' ')[1];

                    date1 = new Date(date1date.split('.').reverse().join('-') );
                    // date2 = new Date(date2date.split('.').reverse().join('-') );

                    var r = typeof(currentPass[a]['data']['info']) === 'number' ? "Осталось "+ currentPass[a]['data']['info'] +' дней'  : '-'  ;//Math.round((date2.getTime() - date1.getTime())/1000/60/60/24);

                    if (currentPass[a]['data']['colorstatus']=="CANCELED") {
                        var color = " -canceled";
                        // window.messageForShares.push('К сожалению пропуск для авто '+currentPass[a]['data']['number']+' аннулирован '+currentPass[a]['data']['cancelationdate']+'\n' +
                        //     'Сервис проверки пропусков\n' +
                        //     'proverit-propusk.info');
                    }
                    if (currentPass[a]['data']['colorstatus']=="EXPIRED") {
                        var color = " -expired";
                        // window.messageForShares.push('Пропуск для авто '+currentPass[a]['data']['number']+' на '+obj[0]['propusktype']+' закончился '+obj[0]['dateend']+'\n' +
                        //     'Сервис проверки пропусков\n' +
                        //     'proverit-propusk.info');
                    }
                    if (currentPass[a]['data']['colorstatus']=="EXPIRING") {
                        var color = " -expiring";
                        // window.messageForShares.push('Пропуск для авто '+currentPass[a]['data']['number']+' на '+obj[0]['propusktype']+' заканчивается '+obj[0]['dateend']+'\n' +
                        //     'Сервис проверки пропусков\n' +
                        //     'proverit-propusk.info');
                    }
                    if (currentPass[a]['data']['colorstatus']=="ACTIVE") {
                        var color;
                        if (r <= 14) color = " -expiring-active";
                        else color = " -active";
                        // window.messageForShares.push('Пропуск для авто '+obj[0]['number']+' на '+obj[0]['propusktype']+' действует по '+obj[0]['dateend']+' осталось еще '+obj[0]['daysleft']+' дней.\n' +
                        //     'Сервис проверки пропусков\n' +
                        //     'proverit-propusk.info');

                    }
                    tabl += '<div class="result-item '+(counter < 8 ? ' -desktop-show' : '')+(counter < 4 ? ' -mobile-show' : '')+color+'">'+
                        '<div class="result-item-piece -number">'+
                        passType +
                        '</div>'+
                        '<div class="result-item-piece -type">';
                    if (currentPass[a]['data']['colorstatus'] == "EXPIRED")
                        tabl += "Закончен";
                    else if(currentPass[a]['data']['colorstatus'] == "ACTIVE")
                        tabl += "Действует";
                    else if(currentPass[a]['data']['colorstatus'] == "EXPIRING")
                        tabl += 'Заканчивается сегодня';
                    else
                        tabl += "Аннулирован ";
                    tabl += '</div>'+
                        '<div class="result-item-piece -dateend">'+ date2date +'</div>'+
                        '<div class="result-item-piece -dateend">'+ r +'</div>'+
                        '</div>';
                } else {
                    tabl += '<div class="result-item '+(counter < 8 ? ' -desktop-show' : '')+(counter < 4 ? ' -mobile-show' : '')+'">'+
                        '<div class="result-item-piece -number">'+
                        passType +
                        '</div>'+
                        '<div class="result-item-piece -type">-';

                    tabl += '</div>'+
                        '<div class="result-item-piece -dateend">-</div>'+
                        '<div class="result-item-piece -dateend">-</div>'+
                        '</div>';
                }




                    counter ++;
            }

            $(".table-current-pass").html(tabl);

            /* Возможная дата подачи на пропуск */
            let preLastPass = obj['data']['pre_last_pass'][0], preLastDate = '', isPreLastDouble = '-';

            if(preLastPass.hasOwnProperty('date')){
                preLastDate = preLastPass.date.split(' ')[0];
                isPreLastDouble = preLastPass.isDouble;
            }

            var tabl =  '<div class="title-items">'+
                '<div class="result-item-piece col-01">Дата окончания предпоследнего ББ</div>'+
                '<div class="result-item-piece col-01">'+ preLastDate +'</div>'+
                '</div>';
            tabl += '<div class="result-item">'+
                '<div class="result-item-piece -number">2 ББ подряд</div>' +
                '<div class="result-item-piece -number">'+
                isPreLastDouble +
                '</div>' +
                '</div>';
            $(".table-pre-pass").html(tabl);
            /* end */


            /* Возможная дата подачи на пропуск */
            let possiblePass = obj['data']['possible_date_pass'];

            var tabl =  '<div class="title-items  -desktop-show -mobile-show -expired">'+
                '<div class="result-item-piece col-6">Пропуск</div>'+
                '<div class="result-item-piece col-6">Возможная дата подачи</div>'+
                '</div>';
            tabl += '<div class="result-item  -desktop-show -mobile-show -expired">'+
                '<div class="result-item-piece -possible">Дневной временный</div>' +
                '<div class="result-item-piece -possible">'+
                possiblePass.BA_DAY +
                '</div>' +
                '</div>';
            tabl += '<div class="result-item  -desktop-show -mobile-show -expired">'+
                '<div class="result-item-piece -possible">Дневной годовой</div>' +
                '<div class="result-item-piece -possible">'+
                possiblePass.BA_NIGHT +
                '</div>' +
                '</div>';
            tabl += '<div class="result-item  -desktop-show -mobile-show -expired">'+
                '<div class="result-item-piece -possible">Ночной временный</div>' +
                '<div class="result-item-piece -possible">'+
                possiblePass.BB_DAY +
                '</div>' +
                '</div>';
            tabl += '<div class="result-item  -desktop-show -mobile-show -expired">'+
                '<div class="result-item-piece -possible">Ночной годовой</div>' +
                '<div class="result-item-piece -possible">'+
                possiblePass.BB_NIGHT +
                '</div>' +
                '</div>';
            $(".table-possible-pass").html(tabl);
            /* end */

        }

        $(".js-loader").hide();
        $(".table").show();
        $(".js-block-btn").show();
        $(".js-block-btn-more").show();

        $(".js-hide-after-result").hide();
        $(".js-hide-after-result-always").hide();

    }

    if ($("#propusk2").length) $("#propusk2").inputmask(inputmask_123_2);


    if ($("#propusk").length) {
        $("#propusk").inputmask(inputmask_123);

        $('#propusk').blur(function () {
            $('.number_hint').hide();
        });


        $("#propusk").on('keyup touchend', function () {
            var val = $(this).val();
            var array = {
                "A": "А",
                "B": "В",
                'C': 'С',
                'E': 'У',
                'H': 'Р',
                'K': 'К',
                'M': 'М',
                'O': 'О',
                'P': 'Р',
                'T': 'Е',
                'X': 'Х',
                'Y': 'Н',
                'F': 'А',
                'D': 'В',
                'R': 'К',
                'V': 'М',
                'J': 'О',
                'N': 'Т',
                '[': 'Х',
                'З': '3'
            }

            console.log('old: ' + val);
            for (var key in array) {
                val = val.replace(key, array[key]);
            }
            $(this).val(val);

            val = $(this).val();
            console.log('new: ' + val);


            if ($("#propusk").val()) {
                $(".js-clear-main-number").show();
            } else {
                $(".js-clear-main-number").hide();
                $(".js-clear-main-number").removeClass('show');
            }
        });
    }

    if ($(".js-clear-main-number").length) {
        $(".js-clear-main-number").on('click', function () {
            $(this).parent().find('input').val('');
            $(this).hide();
            $(this).removeClass('show');
            $('.number_hint').hide();

        });
    }

    /**
     * Изменение хеша
     */
    window.addEventListener("hashchange", function () {
        hashRoute(window.location.hash.replace('#', ''));
    });

    /**
     * Роутер по хешу из урла
     * @param route
     */
    function hashRoute(route) {
        switch (route) {
            case 'registration':
                $('.openSignUp').click(); // показать форму регистрации
                $('.popClose').one('click', function () { // при закрытии формы регистрации перейти на главную
                    window.location = 'https://proverit-propusk.net/#';
                });
        }
    }

    hashRoute(window.location.hash.replace('#', ''));
});
