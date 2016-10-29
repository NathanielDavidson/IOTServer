/**
 * Created by Nathaniel on 10/28/2016.
 */
function logout(){
    call(
        'logout_exec',
        {},
        function(data){
            hideLoader();
            if(data.code==1){
                $(".loggedIn-hide").show();
                $(".loggedIn-show").hide();
                socket.emit('status_page');
            }
        }
    );
    showLoader();
}
function login(user, pass){
    call(
        'login_exec',
        {
            user:user,
            pass:pass
        },
        function(data){
            hideLoader();
            if(data.code==1){
                socket.emit('index');
                $(".loggedIn-show").show();
                $(".loggedIn-hide").hide();
            }
        }
    );
    showLoader();
}
function register(user, pass, passv){
    if(pass!=passv){
        return alert("passwords do not match");
    }
    call(
        'register_exec',
        {
            user:user,
            pass:pass
        },
        function(data){
            hideLoader();
            if(data.code==1){
                socket.emit('index');
                $(".loggedIn-show").show();
                $(".loggedIn-hide").hide();
            }
        }
    );
    showLoader();
}