var resModal = $("#myModal");
var nome;
var cognome;
var ind_nome;
var ind_civico;
var ind_citta;
var ind_cap;
var ind_prov;
var username;
var pwd;
var ripeti_pwd;
var indirizzo_email;
var ripeti_email;
var target;
var targetPrecedente;
var new_pwd;


$(document).ready(function () {





    // caching input form
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {

        target = $(e.target).attr("href");
        var tabPrecedente=$(e.relatedTarget);
        targetPrecedente=tabPrecedente.attr("href");

        if (tabPrecedente.length>0){
            //reset dei form utilizzati prima di un nuovo click del tab
            if (tabPrecedente[0].text.toLowerCase()==="create"){
                document.forms[0].reset();
            }else if (tabPrecedente[0].text.toLowerCase()==="read"){
                document.forms[1].reset();
                $("form"+targetPrecedente+"_res_form").css("visibility", "hidden");
                $("#user-data-title h3").css("visibility", "hidden");

            }else if (tabPrecedente[0].text.toLowerCase()==="update"){
                document.forms[3].reset();
                $("form"+targetPrecedente+"_form input.form-control").prop("disabled","disabled");
                $("form" + targetPrecedente + "_form " + targetPrecedente + "_username").removeAttr("disabled")
                $("form" + targetPrecedente + "_form " + targetPrecedente + "_pwd").removeAttr("disabled")
                $("form"+ targetPrecedente+ "_form input[type='checkbox']").prop("checked",false);
            } else if (tabPrecedente[0].text.toLowerCase()==="delete"){
                document.forms[4].reset();
            }

        }



        if (target === "#create") {
            nome = $("form" + target + "_form " + target + "_nome");
            cognome = $("form" + target + "_form " + target + "_cognome");

            ind_nome = $("form" + target + "_form " + target + "_ind_nome");
            ind_civico = $("form" + target + "_form " + target + "_ind_civico");
            ind_citta = $("form" + target + "_form " + target + "_ind_citta");
            ind_cap = $("form" + target + "_form " + target + "_ind_cap");
            ind_prov = $("form" + target + "_form " + target + "_ind_prov");
            indirizzo_email = $("form" + target + "_form " + target + "_indirizzo_email");
            ripeti_email = $("form" + target + "_form " + target + "_ripeti_email");
            username = $("form" + target + "_form " + target + "_username");
            pwd = $("form" + target + "_form " + target + "_pwd");
            ripeti_pwd = $("form" + target + "_form " + target + "_ripeti_pwd");


            //chrome: disabilito autocompletamento
            if (navigator.userAgent.indexOf("Chrome") != -1) {

                nome.attr('autocomplete', 'nope');
                cognome.attr('autocomplete', 'nope');
                ind_nome.attr('autocomplete', 'nope');
                ind_civico.attr('autocomplete', 'nope');
                ind_citta.attr('autocomplete', 'nope');
                ind_cap.attr('autocomplete', 'nope');
                ind_prov.attr('autocomplete', 'nope');
                indirizzo_email.attr('autocomplete', 'nope');
                ripeti_email.attr('autocomplete', 'nope');
                username.attr('autocomplete', 'nope');
                pwd.attr('autocomplete', 'nope');
                ripeti_pwd.attr('autocomplete', 'nope');
            }


            //impedisco right click input email
            indirizzo_email.bind("contextmenu", function (e) {
                e.preventDefault();
            });

            //impedisco cut copy paste input email e ripeti email
            indirizzo_email.on("cut copy paste", function (e) {
                e.preventDefault();
            });
            ripeti_email.on("cut copy paste", function (e) {
                e.preventDefault();
            });

            //impedisco right click input password
            pwd.bind("contextmenu", function (e) {
                e.preventDefault();
            });
            //impedisco cut copy paste
            pwd.on("cut copy paste", function (e) {
                e.preventDefault();
            });
            ripeti_pwd.on("cut copy paste", function (e) {
                e.preventDefault();
            });

        } else if (target === "#read") {
            username = $("form" + target + "_form " + target + "_username");
            pwd = $("form" + target + "_form " + target + "_pwd");

            //chrome disabilito autocompletamento in chrome
            if (navigator.userAgent.indexOf("Chrome") != -1) {

                username.attr('autocomplete', 'nope');
                pwd.attr('autocomplete', 'nope');

            }
        } else if (target === "#update") {

            nome = $("form" + target + "_form " + target + "_nome");
            cognome = $("form" + target + "_form " + target + "_cognome");
            ind_nome = $("form" + target + "_form " + target + "_ind_nome");
            ind_civico = $("form" + target + "_form " + target + "_ind_civico");
            ind_citta = $("form" + target + "_form " + target + "_ind_citta");
            ind_cap = $("form" + target + "_form " + target + "_ind_cap");
            ind_prov = $("form" + target + "_form " + target + "_ind_prov");
            indirizzo_email = $("form" + target + "_form " + target + "_indirizzo_email");
            username = $("form" + target + "_form " + target + "_username");
            pwd = $("form" + target + "_form " + target + "_pwd");
            new_pwd = $("form" + target + "_form " + target + "_new_pwd");


            if (navigator.userAgent.indexOf("Chrome") != -1) {

                nome.attr('autocomplete', 'nope');
                cognome.attr('autocomplete', 'nope');
                ind_nome.attr('autocomplete', 'nope');
                ind_civico.attr('autocomplete', 'nope');
                ind_citta.attr('autocomplete', 'nope');
                ind_cap.attr('autocomplete', 'nope');
                ind_prov.attr('autocomplete', 'nope');
                indirizzo_email.attr('autocomplete', 'nope');
                ripeti_email.attr('autocomplete', 'nope');
                username.attr('autocomplete', 'nope');
                pwd.attr('autocomplete', 'nope');
                new_pwd.attr('autocomplete', 'nope');
            }

            // per ciascuno dei checkbox collego lo stato del checkbox a quello dell'input relativo situato a dx
            $('#check_nome').change(function () {
                if ($(this).prop('checked')) {
                    nome.removeAttr("disabled");
                    nome.prop("required", true);
                    if ($("form" + target + "_form").hasClass("was-validated")) {
                        $('.custom-control-label[for="check_nome"]').removeClass("bg-grey").addClass("bg-red");
                    }
                } else {

                    nome.attr('disabled', 'disabled');
                    nome.prop("required", false);
                    $('.custom-control-label[for="check_nome"]').removeClass("bg-red").removeClass("bg-green").addClass("bg-grey");
                    nome.val("");
                }
            });

            $('#check_cognome').change(function () {
                if ($(this).prop('checked')) {
                    cognome.removeAttr("disabled");
                    cognome.prop("required", true);
                    if ($("form" + target + "_form").hasClass("was-validated")) {
                        $('.custom-control-label[for="check_cognome"]').removeClass("bg-grey").addClass("bg-red");
                    }
                } else {
                    cognome.attr('disabled', 'disabled');
                    cognome.prop("required", false);
                    $('.custom-control-label[for="check_cognome"]').removeClass("bg-red").removeClass("bg-green").addClass("bg-grey");
                    cognome.val("");
                }
            });


            $('#check_ind_nome').change(function () {
                if ($(this).prop('checked')) {
                    ind_nome.removeAttr("disabled");
                    ind_nome.prop("required", true);
                    if ($("form" + target + "_form").hasClass("was-validated")) {
                        $('.custom-control-label[for="check_ind_nome"]').removeClass("bg-grey").addClass("bg-red");
                    }

                } else {
                    ind_nome.attr('disabled', 'disabled');
                    ind_nome.prop("required", false);
                    $('.custom-control-label[for="check_ind_nome"]').removeClass("bg-red").removeClass("bg-green").addClass("bg-grey");
                    ind_nome.val("");
                }
            });


            $('#check_ind_civico').change(function () {
                if ($(this).prop('checked')) {
                    ind_civico.removeAttr("disabled");
                    ind_civico.prop("required", true);
                    if ($("form" + target + "_form").hasClass("was-validated")) {
                        $('.custom-control-label[for="check_ind_civico"]').removeClass("bg-grey").addClass("bg-red");
                    }
                } else {
                    ind_civico.attr('disabled', 'disabled');
                    ind_civico.prop("required", false);
                    $('.custom-control-label[for="check_ind_civico"]').removeClass("bg-red").removeClass("bg-green").addClass("bg-grey");
                    ind_civico.val("");
                }
            });
            $('#check_ind_cap').change(function () {
                if ($(this).prop('checked')) {
                    ind_cap.removeAttr("disabled");
                    ind_cap.prop("required", true);
                    if ($("form" + target + "_form").hasClass("was-validated")) {
                        $('.custom-control-label[for="check_ind_cap"]').removeClass("bg-grey").addClass("bg-red");
                    }
                } else {
                    ind_cap.attr('disabled', 'disabled');
                    ind_cap.prop("required", false);
                    $('.custom-control-label[for="check_ind_cap"]').removeClass("bg-red").removeClass("bg-green").addClass("bg-grey");
                    ind_cap.val("");
                }
            });

            $('#check_ind_citta').change(function () {
                if ($(this).prop('checked')) {
                    ind_citta.removeAttr("disabled");
                    ind_citta.prop("required", true);
                    if ($("form" + target + "_form").hasClass("was-validated")) {
                        $('.custom-control-label[for="check_ind_citta"]').removeClass("bg-grey").addClass("bg-red");
                    }
                } else {
                    ind_citta.attr('disabled', 'disabled');
                    ind_citta.prop("required", false);
                    $('.custom-control-label[for="check_ind_citta"]').removeClass("bg-red").removeClass("bg-green").addClass("bg-grey");
                    ind_citta.val("");
                }
            });

            $('#check_ind_prov').change(function () {
                if ($(this).prop('checked')) {
                    ind_prov.removeAttr("disabled");
                    ind_prov.prop("required", true);
                    if ($("form" + target + "_form").hasClass("was-validated")) {
                        $('.custom-control-label[for="check_ind_prov"]').removeClass("bg-grey").addClass("bg-red");
                    }
                } else {
                    ind_prov.attr('disabled', 'disabled');
                    ind_prov.prop("required", false);
                    $('.custom-control-label[for="check_ind_prov"]').removeClass("bg-red").removeClass("bg-green").addClass("bg-grey");
                    ind_prov.val("");
                }
            });

            $('#check_email').change(function () {
                if ($(this).prop('checked')) {
                    indirizzo_email.removeAttr("disabled");
                    indirizzo_email.prop("required", true);
                    if ($("form" + target + "_form").hasClass("was-validated")) {
                        $('.custom-control-label[for="check_email"]').removeClass("bg-grey").addClass("bg-red");
                    }
                } else {
                    indirizzo_email.attr('disabled', 'disabled');
                    indirizzo_email.prop("required", false);
                    $('.custom-control-label[for="check_email"]').removeClass("bg-red").removeClass("bg-green").addClass("bg-grey");
                    indirizzo_email.val("");
                }
            });

            $('#check_new_pwd').change(function () {
                if ($(this).prop('checked')) {
                    new_pwd.removeAttr("disabled");
                    new_pwd.prop("required", true);
                    if ($("form" + target + "_form").hasClass("was-validated")) {
                        $('.custom-control-label[for="check_new_pwd"]').removeClass("bg-grey").addClass("bg-red");
                    }
                } else {
                    new_pwd.attr('disabled', 'disabled');
                    new_pwd.prop("required", false);
                    $('.custom-control-label[for="check_new_pwd"]').removeClass("bg-red").removeClass("bg-green").addClass("bg-grey");
                    new_pwd.val("");
                }
            });


        } else if (target === "#delete") {
            username = $("form" + target + "_form " + target + "_username");
            pwd = $("form" + target + "_form " + target + "_pwd");

            //chrome disabilito autocompletamento in chrome
            if (navigator.userAgent.indexOf("Chrome") != -1) {

                username.attr('autocomplete', 'nope');
                pwd.attr('autocomplete', 'nope');

            }
        }


    });

    //visualizzo i tabs verticali attivando il primo
    $('#crud_menu a[href="#create"]').tab('show');

});

//gestione della sottomissione dei form associati alle quattro operazioni, prevenendo il comportamento di default del form
(function () {
    'use strict';
    window.addEventListener('load', function () {

        var forms = document.getElementsByClassName('needs-validation');

        var validation = Array.prototype.filter.call(forms, function (form) {


            form.addEventListener('submit', function (event) {

                //rimozione dal DOM dei componenti visualizzati nel modal alla sottomissione precedente del form
                $('#myModal .d-block').removeClass('d-block');


                if (target === "#create") {



                    //controllo email e ripeti email
                    var email = indirizzo_email.val();
                    var ripeti = ripeti_email.val();
                    if (email === ripeti && email !== "") {

                        document.getElementById(target.replace("#", '') + "_indirizzo_email").setCustomValidity("");
                        $('input' + target + '_ripeti_email.form-control').css({'border-color': "#E5E5E5"});

                    } else {

                        $('input' + target + '_ripeti_email.form-control').css({'border-color': "#E5E5E5"});
                        var email = target + '_email_wrapper input' + target + '_indirizzo_email';
                        if (document.querySelector(email).matches(':valid')) {
                            document.getElementById(target.replace("#", '') + "_indirizzo_email").setCustomValidity("no");
                        }
                    }

                    //email listener
                    $('input' + target + '_indirizzo_email').on('input', function () {

                        var value = $(this).val();
                        var ripeti = $(target + '_ripeti_email').val();
                        if (value === ripeti && value !== "") {

                            document.getElementById(target.replace("#", '') + "_indirizzo_email").setCustomValidity("");
                            $('input' + target + '_ripeti_email.form-control').css({'border-color': "#E5E5E5"});

                        } else {

                            $(target + '_re_email_wrapper input' + target + '_ripeti_email.form-control').css({'border-color': "#E5E5E5"});
                            var email = target + '_email_wrapper input' + target + '_indirizzo_email';
                            if (document.querySelector(email).matches(':valid')) {
                                document.getElementById(target.replace("#", '') + "_indirizzo_email").setCustomValidity("no");

                            }

                        }

                    });
                    //listener input ripeti email
                    $('input' + target + '_ripeti_email').on('input', function () {

                        var ripeti = $(this).val();
                        var email = $(target + '_indirizzo_email').val();

                        if (ripeti === email && ripeti !== "") {

                            //forzo la validità dell'input email
                            document.getElementById(target.replace("#", '') + "_indirizzo_email").setCustomValidity("");
                            $('input' + target + '_ripeti_email.form-control').css({'border-color': "#E5E5E5"});

                        } else {


                            $(target + '_re_email_wrapper input' + target + '_ripeti_email.form-control').css({'border-color': "#E5E5E5"});
                            var ripeti = target + '_email_wrapper ' + target + '_indirizzo_email';
                            if (document.querySelector(ripeti).matches(':valid')) {

                                document.getElementById(target.replace("#", '') + "_indirizzo_email").setCustomValidity("no");

                            }
                        }

                    });


                    //controllo password e ripeti password
                    var pass = pwd.val();
                    var ripeti = ripeti_pwd.val();
                    if (pass === ripeti && pass !== "") {

                        document.getElementById(target.replace("#", '') + "_pwd").setCustomValidity("");

                        $('input' + target + '_ripeti_pwd.form-control').css({'border-color': "#E5E5E5"});

                    } else {


                        $('input' + target + '_ripeti_pwd.form-control').css({'border-color': "#E5E5E5"});

                        var pass = target + '_pwd_wrapper input' + target + '_pwd';
                        if (document.querySelector(pass).matches(':valid')) {
                            document.getElementById(target.replace('#', '') + "_pwd").setCustomValidity("no");

                        }
                    }

                    //password listener
                    $('input' + target + '_pwd').on('input', function () {

                        var value = $(this).val();
                        var ripeti = $(target + '_ripeti_pwd').val();
                        if (value === ripeti && value !== "") {
                            //forzo la validità dell'input password
                            document.getElementById(target.replace('#', '') + "_pwd").setCustomValidity("");
                            $('input' + target + '_ripeti_pwd.form-control').css({'border-color': "#E5E5E5"});


                        } else {

                            $(target + '_re_pwd_wrapper input' + target + '_ripeti_pwd.form-control').css({'border-color': "#E5E5E5"});

                            var pass = target + '_pwd_wrapper input' + target + '_pwd';
                            if (document.querySelector(pass).matches(':valid')) {
                                document.getElementById(target.replace('#', '') + "_pwd").setCustomValidity("no");

                            }

                        }

                    });
                    $('input' + target + '_ripeti_pwd').on('input', function () {
                        var ripeti = $(this).val();
                        var pass = $(target + '_pwd').val();

                        if (ripeti === pass && ripeti !== "") {
                            //forzo la validità dell'input password
                            document.getElementById(target.replace('#', '') + "_pwd").setCustomValidity("");
                            $('input' + target + '_ripeti_pwd.form-control').css({'border-color': "#E5E5E5"});

                        } else {


                            $(target + '_re_pwd_wrapper input' + target + '_ripeti_pwd.form-control').css({'border-color': "#E5E5E5"});
                            var ripeti = target + '_pwd_wrapper ' + target + '_pwd';
                            if (document.querySelector(ripeti).matches(':valid')) {

                                document.getElementById(target.replace('#', '') + "_pwd").setCustomValidity("no");

                            }
                        }

                    });


                    if (form.checkValidity() === false) {
                        event.preventDefault();
                        event.stopPropagation();


                    } else {
                        event.preventDefault();
                        event.stopPropagation();


                        //recupero valore corrente input del form
                        var elements = document.forms[0].elements;
                        var val_nome = encodeURIComponent(trimSpecial(elements.nome.value));
                        var val_cognome = encodeURIComponent(trimSpecial(elements.cognome.value));
                        var val_ind_nome = encodeURIComponent(trimSpecial(elements.ind_nome.value));
                        var val_ind_civico = elements.ind_civico.value;
                        var val_ind_citta = encodeURIComponent(trimSpecial(elements.ind_citta.value));
                        var val_ind_cap = encodeURIComponent(trimSpecial(elements.ind_cap.value));
                        var val_ind_prov = encodeURIComponent(trimSpecial(elements.ind_prov.value));
                        var val_email = encodeURIComponent(trimSpecial(elements.indirizzo_email.value));
                        var val_username = encodeURIComponent(trimSpecial(elements.username.value));
                        var val_password = elements.pwd.value;


                        var json_data = {};

                        json_data.nome = val_nome;
                        json_data.cognome = val_cognome;
                        json_data.strada = val_ind_nome;
                        json_data.civico = val_ind_civico;
                        json_data.citta = val_ind_citta;
                        json_data.cap = val_ind_cap;
                        json_data.prov = val_ind_prov;
                        json_data.email = val_email;
                        json_data.username = val_username;
                        json_data.password = val_password;


                        //invio richiesta http POST  contenente oggetto json

                        $.ajax({
                            type: "POST",
                            url: "http://localhost:3333",
                            data: JSON.stringify(json_data),
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            cache: false,
                            //in questo modo ottengo un obj da cui poi estraggo le keys
                            processData: false,
                            success: function (data, textStatus, jqXHR) {

                                //configurazione modal da visualizzare in caso di successo
                                $("#modal_icon_ok").addClass("d-block");
                                $("#modal_title_ok").addClass("d-block");
                                $("#modal_content_ok").text("L'utente " + elements.nome.value + " " + elements.cognome.value + " è stato " +
                                    "inserito nel database.").addClass("d-block")
                                resModal.on('hidden.bs.modal', function (e) {
                                    elements.nome.value = "";
                                    elements.cognome.value = "";
                                    elements.ind_nome.value = "";
                                    elements.ind_civico.value = "";
                                    elements.ind_citta.value = "";
                                    elements.ind_cap.value = "";
                                    elements.ind_prov.value = "";
                                    elements.indirizzo_email.value = "";
                                    elements.ripeti_email.value = "";
                                    elements.username.value = "";
                                    elements.pwd.value = "";
                                    elements.ripeti_pwd.value = "";
                                    form.classList.remove("was-validated");

                                    $('#myModal .d-block').removeClass('d-block');
                                });
                                resModal.modal('show');

                            },
                            error: function (jqXHR, textStatus, errorThrown) {

                                //configurazione modal in caso la componente backend risponde con status code di
                                //class 400 o 500
                                $("#modal_icon_ko").addClass("d-block");
                                $("#modal_title_ko").addClass("d-block");
                                $("#error_http_code").text(jqXHR.status);
                                $("#error_message").text(jqXHR.responseJSON.error);
                                $("#modal_content_ko").addClass("d-block")
                                resModal.on('hidden.bs.modal', function (e) {
                                    $('#myModal .d-block').removeClass('d-block');
                                });
                                resModal.modal('show');

                            },
                            complete: function () {


                            }
                        });


                    }


                } else if (target === "#read") {

                    //nascondo le informazioni visualizzate relative ad una precedente richiesta
                    $("form#read_res_form").css("visibility", "hidden");
                    $("#user-data-title h3").css("visibility", "hidden");

                    if (form.checkValidity() === false) {
                        event.preventDefault();
                        event.stopPropagation();

                    } else {
                        event.preventDefault();
                        event.stopPropagation();


                        var elements = document.forms[1].elements;


                        var val_username = elements.username.value;
                        var val_password = elements.pwd.value;


                        var json_data = {};

                        json_data.action = "read";

                        //preparazione password da inviare mediante applicazione
                        //funzione hash crittografica sha-256
                        //la password è inviata nell'header della richiesta, associata alla chiave user-auth
                        var bitArray = sjcl.hash.sha256.hash(val_password);
                        var digest_sha256 = sjcl.codec.hex.fromBits(bitArray);
                        $.ajax({
                            type: "GET",
                            url: "http://localhost:3333/" + val_username,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            cache: false,
                            beforeSend: function (xhr) {
                                xhr.setRequestHeader("user-auth", digest_sha256)
                            },

                            processData: false,
                            success: function (data, textStatus, jqXHR) {

                                //configurazione modal in caso di successo
                                $("#modal_icon_ok").addClass("d-block");
                                $("#modal_title_ok").addClass("d-block");
                                $("#modal_content_ok").text("Sono state recuperate le informazioni " +
                                    "relative all'utente  " + data.nome.toUpperCase() + " " + data.cognome.toUpperCase() + ".").addClass("d-block")
                                resModal.on('hidden.bs.modal', function (e) {

                                    //preparazione del form (con input disabilitati) contenente le info utente recuperate
                                    $("form#read_res_form").css("visibility", "visible");
                                    $("#user-data-title h3").css("visibility", "visible");
                                    var elements = document.forms[2].elements;
                                    elements.nome.value = data.nome;
                                    elements.cognome.value = data.cognome;
                                    elements.ind_nome.value = data.strada;
                                    elements.ind_civico.value = data.civico;
                                    elements.ind_citta.value = data.citta;
                                    elements.ind_cap.value = data.cap;
                                    elements.ind_prov.value = data.prov;
                                    elements.indirizzo_email.value = data.email;
                                    elements.data_creazione.value=data.data_creazione;
                                    form.classList.remove("was-validated");

                                    $('#myModal .d-block').removeClass('d-block');
                                });


                                resModal.modal('show');

                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                //configurazione modal in caso la componente backend risponde con status code di
                                //class 400 o 500
                                $("#modal_icon_ko").addClass("d-block");
                                $("#modal_title_ko").addClass("d-block");
                                $("#error_http_code").text(jqXHR.status);
                                $("#error_message").text(jqXHR.responseJSON.error);
                                $("#modal_content_ko").addClass("d-block")
                                resModal.on('hidden.bs.modal', function (e) {
                                    $('#myModal .d-block').removeClass('d-block');
                                    $("form#read_res_form").css("visibility", "hidden");
                                    $("#user-data-title h3").css("visibility", "hidden");
                                });
                                resModal.modal('show');

                            },
                            complete: function () {


                            }
                        });


                    }


                } else if (target === "#update") {


                    //gestione stile checkbox in relazione allo stato checked o unchecked
                    //gestione stile input associato al checkbox in relazione allo stato valid o invalid
                    if ($("input#check_nome").is(":checked")) {
                        if (nome.val() === "") {

                            $('.custom-control-label[for="check_nome"]').removeClass("bg-grey").addClass("bg-red");
                        } else {

                            $('.custom-control-label[for="check_nome"]').removeClass("bg-grey").addClass("bg-green");
                        }

                    } else {

                        $('.custom-control-label[for="check_nome"]').removeClass("bg-red").removeClass("bg-green").addClass("bg-grey");
                    }
                    nome.on("keyup", function () {
                        if ($("form" + target + "_form").hasClass("was-validated")) {
                            if ($(this).is(":valid")) {
                                $('.custom-control-label[for="check_nome"]').removeClass("bg-red").removeClass("bg-grey").addClass("bg-green")
                            } else {
                                $('.custom-control-label[for="check_nome"]').removeClass("bg-green").removeClass("bg-grey").addClass("bg-red")
                            }
                        }
                    });
                    //gestione stile checkbox in relazione allo stato checked o unchecked
                    //gestione stile input associato al checkbox in relazione allo stato valid o invalid
                    if ($("input#check_cognome").is(":checked")) {

                        if (cognome.val() === "") {

                            $('.custom-control-label[for="check_cognome"]').removeClass("bg-grey").addClass("bg-red");
                        } else {
                            $('.custom-control-label[for="check_cognome"]').removeClass("bg-grey").addClass("bg-green");
                        }

                    } else {

                        $('.custom-control-label[for="check_cognome"]').removeClass("bg-red").removeClass("bg-green").addClass("bg-grey");

                    }
                    cognome.on("keyup", function () {
                        if ($("form" + target + "_form").hasClass("was-validated")) {
                            if ($(this).is(":valid")) {
                                $('.custom-control-label[for="check_cognome"]').removeClass("bg-red").removeClass("bg-grey").addClass("bg-green")
                            } else {
                                $('.custom-control-label[for="check_cognome"]').removeClass("bg-green").removeClass("bg-grey").addClass("bg-red")
                            }
                        }
                    });
                    //gestione stile checkbox in relazione allo stato checked o unchecked
                    //gestione stile input associato al checkbox in relazione allo stato valid o invalid
                    if ($("input#check_ind_nome").is(":checked")) {

                        if (ind_nome.val() === "") {

                            $('.custom-control-label[for="check_ind_nome"]').removeClass("bg-grey").addClass("bg-red");

                        } else {
                            $('.custom-control-label[for="check_ind_nome"]').removeClass("bg-grey").addClass("bg-green");
                        }

                    } else {

                        $('.custom-control-label[for="check_ind_nome"]').removeClass("bg-red").removeClass("bg-green").addClass("bg-grey");


                    }
                    ind_nome.on("keyup", function () {
                        if ($("form" + target + "_form").hasClass("was-validated")) {
                            if ($(this).is(":valid")) {
                                $('.custom-control-label[for="check_ind_nome"]').removeClass("bg-red").removeClass("bg-grey").addClass("bg-green")
                            } else {
                                $('.custom-control-label[for="check_ind_nome"]').removeClass("bg-green").removeClass("bg-grey").addClass("bg-red")
                            }
                        }
                    });
//gestione stile checkbox in relazione allo stato checked o unchecked
                    //gestione stile input associato al checkbox in relazione allo stato valid o invalid
                    if ($("input#check_ind_civico").is(":checked")) {

                        if (ind_civico.val() === "") {

                            $('.custom-control-label[for="check_ind_civico"]').removeClass("bg-grey").addClass("bg-red");

                        } else {
                            $('.custom-control-label[for="check_ind_civico"]').removeClass("bg-grey").addClass("bg-green");
                        }

                    } else {

                        $('.custom-control-label[for="check_ind_civico"]').removeClass("bg-red").removeClass("bg-green").addClass("bg-grey");

                    }
                    ind_civico.on("keyup", function () {
                        if ($("form" + target + "_form").hasClass("was-validated")) {
                            if ($(this).is(":valid")) {
                                $('.custom-control-label[for="check_ind_civico"]').removeClass("bg-red").removeClass("bg-grey").addClass("bg-green")
                            } else {
                                $('.custom-control-label[for="check_ind_civico"]').removeClass("bg-green").removeClass("bg-grey").addClass("bg-red")
                            }
                        }
                    });
//gestione stile checkbox in relazione allo stato checked o unchecked
                    //gestione stile input associato al checkbox in relazione allo stato valid o invalid
                    if ($("input#check_ind_cap").is(":checked")) {

                        if (ind_cap.val() === "") {

                            $('.custom-control-label[for="check_ind_cap"]').removeClass("bg-grey").addClass("bg-red");

                        } else {
                            $('.custom-control-label[for="check_ind_cap"]').removeClass("bg-grey").addClass("bg-green");
                        }

                    } else {

                        $('.custom-control-label[for="check_ind_cap"]').removeClass("bg-red").removeClass("bg-green").addClass("bg-grey");

                    }
                    ind_cap.on("keyup", function () {
                        if ($("form" + target + "_form").hasClass("was-validated")) {
                            if ($(this).is(":valid")) {
                                $('.custom-control-label[for="check_ind_cap"]').removeClass("bg-red").removeClass("bg-grey").addClass("bg-green")
                            } else {
                                $('.custom-control-label[for="check_ind_cap"]').removeClass("bg-green").removeClass("bg-grey").addClass("bg-red")
                            }
                        }
                    });
//gestione stile checkbox in relazione allo stato checked o unchecked
                    //gestione stile input associato al checkbox in relazione allo stato valid o invalid

                    if ($("input#check_ind_citta").is(":checked")) {

                        if (ind_citta.val() === "") {

                            $('.custom-control-label[for="check_ind_citta"]').removeClass("bg-grey").addClass("bg-red");

                        } else {
                            $('.custom-control-label[for="check_ind_citta"]').removeClass("bg-grey").addClass("bg-green");
                        }
                    } else {
                        $('.custom-control-label[for="check_ind_citta"]').removeClass("bg-red").removeClass("bg-green").addClass("bg-grey");
                    }
                    ind_citta.on("keyup", function () {
                        if ($("form" + target + "_form").hasClass("was-validated")) {
                            if ($(this).is(":valid")) {
                                $('.custom-control-label[for="check_ind_citta"]').removeClass("bg-red").removeClass("bg-grey").addClass("bg-green")
                            } else {
                                $('.custom-control-label[for="check_ind_citta"]').removeClass("bg-green").removeClass("bg-grey").addClass("bg-red")
                            }
                        }
                    });

//gestione stile checkbox in relazione allo stato checked o unchecked
                    //gestione stile input associato al checkbox in relazione allo stato valid o invalid
                    if ($("input#check_ind_prov").is(":checked")) {

                        if (ind_prov.val() === "") {

                            $('.custom-control-label[for="check_ind_prov"]').removeClass("bg-grey").addClass("bg-red");

                        } else {
                            $('.custom-control-label[for="check_ind_prov"]').removeClass("bg-grey").addClass("bg-green");
                        }

                    } else {

                        $('.custom-control-label[for="check_ind_prov"]').removeClass("bg-red").removeClass("bg-green").addClass("bg-grey");

                    }
                    ind_prov.on("keyup", function () {
                        if ($("form" + target + "_form").hasClass("was-validated")) {
                            if ($(this).is(":valid")) {
                                $('.custom-control-label[for="check_ind_prov"]').removeClass("bg-red").removeClass("bg-grey").addClass("bg-green")
                            } else {
                                $('.custom-control-label[for="check_ind_prov"]').removeClass("bg-green").removeClass("bg-grey").addClass("bg-red")
                            }
                        }
                    });

//gestione stile checkbox in relazione allo stato checked o unchecked
                    //gestione stile input associato al checkbox in relazione allo stato valid o invalid
                    if ($("input#check_email").is(":checked")) {

                        if (indirizzo_email.val() === "") {

                            $('.custom-control-label[for="check_email"]').removeClass("bg-grey").addClass("bg-red");

                        } else {
                            $('.custom-control-label[for="check_email"]').removeClass("bg-grey").addClass("bg-green");
                        }

                    } else {

                        $('.custom-control-label[for="check_email"]').removeClass("bg-red").removeClass("bg-green").addClass("bg-grey");

                    }
                    indirizzo_email.on("keyup", function () {
                        if ($("form" + target + "_form").hasClass("was-validated")) {
                            if ($(this).is(":valid")) {
                                $('.custom-control-label[for="check_email"]').removeClass("bg-red").removeClass("bg-grey").addClass("bg-green")
                            } else {
                                $('.custom-control-label[for="check_email"]').removeClass("bg-green").removeClass("bg-grey").addClass("bg-red")
                            }
                        }
                    });
//gestione stile checkbox in relazione allo stato checked o unchecked
                    //gestione stile input associato al checkbox in relazione allo stato valid o invalid
                    if ($("input#check_new_pwd").is(":checked")) {

                        if (new_pwd.val() === "") {

                            $('.custom-control-label[for="check_new_pwd"]').removeClass("bg-grey").addClass("bg-red");

                        } else {
                            $('.custom-control-label[for="check_new_pwd"]').removeClass("bg-grey").addClass("bg-green");
                        }

                    } else {

                        $('.custom-control-label[for="check_new_pwd"]').removeClass("bg-red").removeClass("bg-green").addClass("bg-grey");

                    }
                    new_pwd.on("keyup", function () {
                        if ($("form" + target + "_form").hasClass("was-validated")) {
                            if ($(this).is(":valid")) {
                                $('.custom-control-label[for="check_new_pwd"]').removeClass("bg-red").removeClass("bg-grey").addClass("bg-green")
                            } else {
                                $('.custom-control-label[for="check_new_pwd"]').removeClass("bg-green").removeClass("bg-grey").addClass("bg-red")
                            }
                        }
                    });


                    if (form.checkValidity() === false) {
                        event.preventDefault();
                        event.stopPropagation();


                    } else {
                        event.preventDefault();
                        event.stopPropagation();


                        //recupero informazioni dal form
                        var elements = document.forms[3].elements;
                        var val_nome = encodeURIComponent(trimSpecial(elements.nome.value));
                        var val_cognome = encodeURIComponent(trimSpecial(elements.cognome.value));
                        var val_ind_nome = encodeURIComponent(trimSpecial(elements.ind_nome.value));
                        var val_ind_civico = elements.ind_civico.value;
                        var val_ind_citta = encodeURIComponent(trimSpecial(elements.ind_citta.value));
                        var val_ind_cap = encodeURIComponent(trimSpecial(elements.ind_cap.value));
                        var val_ind_prov = encodeURIComponent(trimSpecial(elements.ind_prov.value));
                        var val_email = trimSpecial(elements.indirizzo_email.value);
                        var val_username = encodeURIComponent(trimSpecial(elements.username.value));
                        var val_nuova_password = elements.new_pwd.value;
                        var val_password = elements.pwd.value;


                        //preparazione oggetto json contenente le nuove info da inviare
                        var json_data = {};
                        if (nome.val() !== "") {
                            json_data.nome = val_nome;
                        }

                        if (cognome.val() !== "") {
                            json_data.cognome = val_cognome;
                        }


                        if (ind_nome.val() !== "") {
                            json_data.strada = val_ind_nome;
                        }
                        if (ind_civico.val() !== "") {
                            json_data.civico = val_ind_civico;
                        }
                        if (ind_citta.val() !== "") {
                            json_data.citta = val_ind_citta;
                        }
                        if (ind_cap.val() !== "") {
                            json_data.cap = val_ind_cap;
                        }
                        if (ind_prov.val() !== "") {
                            json_data.prov = val_ind_prov;
                        }
                        if (indirizzo_email.val() !== "") {
                            json_data.email = val_email;
                        }
                        if (new_pwd.val() !== "") {
                            json_data.password = val_nuova_password;
                        }

                        //preparazione password da inviare mediante applicazione
                        //funzione hash crittografica sha-256
                        //la password è inviata nell'header della richiesta, associata alla chiave user-auth
                        var bitArray = sjcl.hash.sha256.hash(val_password);
                        var digest_sha256 = sjcl.codec.hex.fromBits(bitArray);

                        $.ajax({
                            type: "PUT",
                            url: "http://localhost:3333/" + val_username, //TEST
                            data: JSON.stringify(json_data),
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            processData: false,
                            beforeSend: function (xhr) {
                                xhr.setRequestHeader("user-auth", digest_sha256)
                            },
                            success: function (data, textStatus, jqXHR) {

                            //configurazione modal in caso di successo
                                $("#modal_icon_ok").addClass("d-block");
                                $("#modal_title_ok").addClass("d-block");
                                $("#modal_content_ok").text("Le informazioni relative all'utente " +
                                    data.nome + " " + data.cognome + " sono state aggiornate.").addClass("d-block")
                                resModal.on('hidden.bs.modal', function (e) {

                                    window.open("./index.html", "_self");

                                    $('#myModal .d-block').removeClass('d-block');
                                });
                                resModal.modal('show');

                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                //configurazione modal in caso la componente backend risponde con status code di
                                //class 400 o 500
                                $("#modal_icon_ko").addClass("d-block");
                                $("#modal_title_ko").addClass("d-block");
                                $("#error_http_code").text(jqXHR.status);
                                $("#error_message").text(jqXHR.responseJSON.error);
                                $("#modal_content_ko").addClass("d-block")
                                resModal.on('hidden.bs.modal', function (e) {
                                    $('#myModal .d-block').removeClass('d-block');
                                });
                                resModal.modal('show');

                            },
                            complete: function () {


                            }
                        });


                    }


                } else if (target === "#delete") {

                    if (form.checkValidity() === false) {
                        event.preventDefault();
                        event.stopPropagation();


                    } else {
                        event.preventDefault();
                        event.stopPropagation();


                        var elements = document.forms[4].elements;


                        var val_username = elements.username.value;
                        var val_password = elements.pwd.value;
                        //preparazione password da inviare mediante applicazione
                        //funzione hash crittografica sha-256
                        //la password è inviata nell'header della richiesta, associata alla chiave user-auth
                        var bitArray = sjcl.hash.sha256.hash(val_password);
                        var digest_sha256 = sjcl.codec.hex.fromBits(bitArray);
                        var json_data = {};

                        json_data.action = "delete";


                        $.ajax({
                            type: "DELETE",
                            url: "http://localhost:3333/" + val_username,
                            data: JSON.stringify(json_data),
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            cache: false,

                            beforeSend: function (xhr) {
                                xhr.setRequestHeader("user-auth", digest_sha256)
                            },

                            //in questo modo ottengo un obj da cui poi estraggo le keys
                            processData: false,
                            success: function (data, textStatus, jqXHR) {

                               //configurazione modal in caso di successo
                                $("#modal_icon_ok").addClass("d-block");
                                $("#modal_title_ok").addClass("d-block");
                                $("#modal_content_ok").text("Le informazioni relative all'utente " +
                                    data.nome + " " + data.cognome + " sono state eliminate dal database.").addClass("d-block")
                                resModal.on('hidden.bs.modal', function (e) {

                                    window.open("./index.html", "_self");

                                    $('#myModal .d-block').removeClass('d-block');
                                });
                                resModal.modal('show');

                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                //configurazione modal in caso la componente backend risponde con status code di
                                //class 400 o 500
                                $("#modal_icon_ko").addClass("d-block");
                                $("#modal_title_ko").addClass("d-block");
                                $("#error_http_code").text(jqXHR.status);
                                $("#error_message").text(jqXHR.responseJSON.error);
                                $("#modal_content_ko").addClass("d-block");
                                resModal.on('hidden.bs.modal', function (e) {
                                    $('#myModal .d-block').removeClass('d-block');
                                });
                                resModal.modal('show');

                            },
                            complete: function () {


                            }
                        });


                    }


                }


                form.classList.add('was-validated');

            }, false);
        });
    }, false);
})();


var trimSpecial = function (str) {

    if (typeof String.prototype.trim !== "function") {
        // safe to use the function
        String.prototype.trim = function () {
            return this.replace(/^\s+|\s+$/g, '');
        };
    }

    //eliminazione dei seguenti caratteri " \ < > se presenti nei campi editabili, ed anche i trailing e leading spaces
    var sanitized = str.replace(/[\x22\x5c\x00-\x1F\x3C\x3E]/g, '').trim();

    return sanitized;

};












