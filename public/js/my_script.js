$(document).ready(function(){

    
    var cookie = getCookie('user_register');
    if (cookie == 1) {
        var cook_email = getCookie('user_email');
        $(".logout-btn").show();
        $(".login-btn").hide();
        $(".registration_page").attr("disabled", true);
    }else{
        $(".logout-btn").hide();
        $(".login-btn").show();
        $(".registration_page").attr("disabled", false);

    }

    $(".logout-btn").on("click",function(){
        setCookie("user_register", 0, 5);
        setCookie("user_email",null, 5);
        $(".logout-btn").hide();
        $(".login-btn").show();
        $(".registration_page").attr("disabled", false);
        window.location="./logout"

    })


    $(".product ,.img_logo,.company_name").click(function(){
        window.location="/"
    })

    $('.subscribe_btn').on('click', function (e) {

        e.preventDefault();
        var error = false;
        var email = $('#email').val();
        var filter = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

        $('.error').remove();

        if (email == "") {
            error = true
            $('#email').after('<span class="error" style="color:red">Please Enter Email</span>');
        } else if (!filter.test(email)) {
            error = true;
            $('#email').after('<span class="error" style="color:red">Please Enter Valid Email</span>');
          
        }

        if (error == true) {
            e.preventDefault();
        } else {

            window.location = "/";
        }

    });

    $(".registration_page").on('click',function(){
        window.location="/registration"
    }); 
    
    $(".login-btn").on('click',function(){
        window.location="/login"
    });
    
    $(".cancel").on('click',function(){
        window.location="/"
    });

    $(document).on("click", ".btn-register", function (e) {
        e.preventDefault()
        $(".btn-register").attr("disabled", true);
        var Email = $("#Email").val();
        var Password1 = $("#Password1").val();
        var Password2 = $("#Password2").val();
        var FirstName = $("#FirstName").val();
        var LastName = $("#LastName").val();
        var PostalCode = $("#PostalCode").val();
        var Phone = $("#Phone").val();

        var filter = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        var phone_filter = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        var error = 0;

        $(".error1").remove();
     
        if (Email == "") {
            error = 1;
            $('#Email').parent().find(".form-label").after('<span class="error1" style="color:red">Enter valid email</span>');

        } else {
            if (!filter.test(Email)) {
                error = 1;
                $('#Email').parent().find(".form-label").after('<span class="error1" style="color:red">Enter valid email</span>');
            }
        }

        if (Password1 == "") {
            error = 1;
            $('#Password1').parent().find(".form-label").after('<span class="error1" style="color:red">Please Enter Password</span>');

        }else{
            if(Password1.length > 32 || Password1.length<8){
                error = 1;
                $('#Password1').parent().find(".form-label").after('<span class="error1" style="color:red"> Min length: 8, Max-length:32</span>');
    
            }
        }

        if (FirstName == "") {
            error = 1;
            $('#FirstName').parent().find(".form-label").after('<span class="error1" style="color:red">Please Enter First Name</span>');

        }

        if (LastName == "") {
            error = 1;
            $('#LastName').parent().find(".form-label").after('<span class="error1" style="color:red">Please Enter Last Name</span>');

        }

        if (Phone != "") {

            if (!phone_filter.test(Phone)) {
                error = 1;
                $('#Phone').parent().find(".form-label").after('<span class="error1" style="color:red">Enter Phone Number</span>');
            }
        }

        if (Password2 == "") {
            error = 1;
            $('#Password2').parent().find(".form-label").after('<span class="error1" style="color:red">Please Confirm you password</span>');

        } else {
            if (Password1 != Password2) {
                error = 1;
                $('#Password2').parent().find(".form-label").after('<span class="error1" style="color:red">Password Does Not Match</span>');
            }
        }

        if (error == 0) {
            $.ajax({
                url: "check-email",
                method: "GET",
                data: {Email: Email},
                async: false,
                success: function (result) {
                    debugger;
                    if (result == 0) {
                     
                        $("#Register").submit();
                        setCookie("user_register", 1, 5);
                        setCookie("user_email", Email, 5);
                    }

                    if (result == 1) {
                        $('#Email').parent().find(".form-label").after('<span class="error1" style="color:red">Email already registered</span>');
                        $(".btn-register").attr("disabled", false);

        
                    }
                }
            });




        } else {
            $(".btn-register").attr("disabled", false);
        }

    });
    
    $(document).on("click", ".login_user", function (e) {
        e.preventDefault()
        $(".login_user").attr("disabled", true);
        var EmailLogin = $("#EmailLogin").val();
        var PasswordLogin = $("#PasswordLogin").val();
        var filter = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

        error=0;
        $(".error1").remove();
     
        if (EmailLogin == "") {
            error = 1;
            $('#EmailLogin').parent().find(".form-label").after('<span class="error1" style="color:red">Enter valid email</span>');

        } else {
            if (!filter.test(EmailLogin)) {
                error = 1;
                $('#EmailLogin').parent().find(".form-label").after('<span class="error1" style="color:red">Enter valid email</span>');
            }
        }

        if (PasswordLogin == "") {
            error = 1;
            $('#PasswordLogin').parent().find(".form-label").after('<span class="error1" style="color:red">Please Enter Password</span>');

        }

        if(error==0){

            var userlogin = $("#LoginForm")[0];
            var formData = new FormData(userlogin);

            $.ajax({
                type: "GET",
                url: "loginPost",
                data: {email:EmailLogin,password:PasswordLogin},
                async: false,
                success: function (result) {
                    debugger;
                    if(result==1){
                        $('.error1').remove();
                        $('#msg').html("<span>Login SuccessFully !!</span>").fadeIn('slow');
                        $('#msg').delay(100000).fadeOut('slow');
                        setCookie("user_register", 1, 5);
                        setCookie("user_email", EmailLogin, 5);
                        window.location="/"
                        

                    }else{
                        $('#LoginForm').after('<span class="error1" style="color:red">Wrong Credential</span>');
                        $(".login_user").attr("disabled", false);
                        
                        // window.location="/login"
                    }
                    
                   
                }
            });
        }

       

     
    });




    const stateCodes = [
        "AL",
        "AK",
        "AS",
        "AZ",
        "AR",
        "CA",
        "CO",
        "CT",
        "DE",
        "DC",
        "FM",
        "FL",
        "GA",
        "GU",
        "HI",
        "ID",
        "IL",
        "IN",
        "IA",
        "KS",
        "KY",
        "LA",
        "ME",
        "MH",
        "MD",
        "MA",
        "MI",
        "MN",
        "MS",
        "MO",
        "MT",
        "NE",
        "NV",
        "NH",
        "NJ",
        "NM",
        "NY",
        "NC",
        "ND",
        "MP",
        "OH",
        "OK",
        "OR",
        "PW",
        "PA",
        "PR",
        "RI",
        "SC",
        "SD",
        "TN",
        "TX",
        "UT",
        "VT",
        "VI",
        "VA",
        "WA",
        "WV",
        "WI",
        "WY",
    ];

    var sel = document.getElementById('State');
    var fragment = document.createDocumentFragment();
    stateCodes.forEach(function(state, index) {
        var opt = document.createElement('option');
        opt.innerHTML = state;
        opt.value = state;
        fragment.appendChild(opt);
    });
    sel.appendChild(fragment);
});

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}