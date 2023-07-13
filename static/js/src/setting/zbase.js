class Setting {
    constructor(root) {
        this.root = root;
        this.platform = "WEB";
        if (this.root.AcWingOS) this.platform = "ACAPP";
        this.username = "";
        this.photo = "";

        this.$setting = $(`
            <div class="ac-game-setting">
                <div class="ac-game-setting-login">
                    <div class="ac-game-setting-title">
                        登录
                    </div>
                    <div class="ac-game-setting-username">
                        <div class="ac-game-setting-item">
                            <input type="text" placeholder="用户名">
                        </div>
                    </div>
                    <div class="ac-game-setting-password">
                        <div class="ac-game-setting-item">
                            <input type="password" placeholder="密码">
                        </div>
                    </div>
                    <div class="ac-game-setting-submit">
                        <div class="ac-game-setting-item">
                            <button>登录</button>
                        </div>
                    </div>
                    <div class="ac-game-setting-error-message">

                    </div>
                    <div class="ac-game-setting-option">
                         注册
                    </div>
                    <br>
                    <div class="ac-game-setting-acwing">
                        <img width="30" src="http://8.130.66.193:8000/static/image/setting/acwing.png">
                        <br>
                        <div>
                            AcWing一键登录
                        </div>
                    </div>
                </div>

                <div class="ac-game-setting-register">
                    <div class="ac-game-setting-title">
                            注册
                    </div>
                    <div class="ac-game-setting-username">
                        <div class="ac-game-setting-item">
                            <input type="text" placeholder="用户名">
                        </div>
                    </div>
                    <div class="ac-game-setting-password ac-game-setting-password-first">
                        <div class="ac-game-setting-item">
                            <input type="password" placeholder="密码">
                        </div>
                    </div>
                    <div class="ac-game-setting-password ac-game-setting-password-second">
                        <div class="ac-game-setting-item">
                            <input type="password" placeholder="确认密码">
                        </div>
                    </div>
                    <div class="ac-game-setting-submit">
                        <div class="ac-game-setting-item">
                            <button>注册</button>
                        </div>
                    </div>
                    <div class="ac-game-setting-error-message">

                    </div>
                    <div class="ac-game-setting-option">
                        登录
                    </div>
                    <br>
                    <div class="ac-game-setting-acwing">
                        <img width="30" src="http://8.130.66.193:8000/static/image/setting/acwing.png">
                        <br>
                        <div>
                            AcWing一键登录
                        </div>
                    </div>
                </div>
            </div>
            `);
        this.$login = this.$setting.find(".ac-game-setting-login");
        this.$login_username = this.$login.find(".ac-game-setting-username input");
        this.$login_password = this.$login.find(".ac-game-setting-password input");
        this.$login_submit = this.$login.find(".ac-game-setting-submit button");
        this.$login_error_message = this.$login.find(".ac-game-setting-error-message");
        this.$login_register = this.$login.find(".ac-game-setting-option");

        this.$login.hide();

        this.$register = this.$setting.find(".ac-game-setting-register");
        this.$register_username = this.$register.find(".ac-game-setting-username input");
        this.$register_password = this.$register.find(".ac-game-setting-password-first input");
        this.$register_password_confirm = this.$register.find(".ac-game-setting-password-second input");
        this.$register_submit = this.$register.find(".ac-game-setting-submit button");
        this.$register_error_message = this.$register.find(".ac-game-setting-error-message");
        this.$register_login = this.$register.find(".ac-game-setting-option");

        this.$register.hide();

        this.$acwing_login = this.$setting.find(".ac-game-setting-acwing");

        this.root.$ac_game.append(this.$setting);

        this.start();
    }

    start() {
        if (this.platform === "ACAPP") {
            this.getinfo_acapp();
        } else {
            this.getinfo_web();
            this.add_listening_events();
        }
    }

    add_listening_events() {
        let outer = this;

        this.to_login();
        this.to_register();

        this.$acwing_login.click(function() {
            outer.acwing_login();
        });
    }

    to_login() {
        let outer = this;

        this.$login_register.click(function() {
            outer.register();
        });
        this.$login_submit.click(function() {
            outer.login_on_remote();
        });
    }

    to_register() {
        let outer = this;

        this.$register_login.click(function() {
            outer.login();
        });

        this.$register_submit.click(function() {
            outer.register_on_remote();
        });
    }

    acwing_login() {
        $.ajax({
            url: "http://8.130.66.193:8000/setting/acwing/web/apply_code/",
            type: "GET",
            success: function(resp){
                if(resp.result === "success") {
                    window.location.replace(resp.apply_code_url);
                }
            }
        });
    }

    login_on_remote() { //登录
        let outer = this;
        let username = this.$login_username.val();
        let password = this.$login_password.val();
        this.$login_error_message.empty();

        $.ajax({
            url: "http://8.130.66.193:8000/setting/login/",
            type: "GET",
            data: {
                username: username,
                password: password
            },
            success: function(resp) {
                if (resp.result === "success") {
                    location.reload();
                } else {
                    outer.$login_error_message.html(resp.result);
                }
            }
        });
    }

    register_on_remote() { //注册
        let outer = this;
        let username = this.$register_username.val();
        let password = this.$register_password.val();
        let password_confirm = this.$register_password_confirm.val();
        this.$register_error_message.empty();

        $.ajax({
            url: "http://8.130.66.193:8000/setting/register/",
            type: "GET",
            data: {
                username: username,
                password: password,
                password_confirm: password_confirm,
            },
            success: function(resp) {
                if (resp.result === "success") {
                    location.reload();  // 刷新
                } else {
                    outer.$register_error_message.html(resp.result);
                }
            }
        });
    }

    logout_on_remote() {  //登出
        if (this.platform === "ACAPP") {
            this.root.AcWingOS.api.window.close();
            return false;
        }

        $.ajax({
            url: "http://8.130.66.193:8000/setting/logout/",
            type: "GET",
            success: function(resp) {
                if (resp.result === "success") {
                    location.reload();
                }
            }
        });
    }

    register() {
        this.$login.hide();
        this.$register.show();
    }

    login(){
        this.$register.hide();
        this.$login.show();
    }

    acapp_login(appid, redirect_uri, scope, state) {
        let outer = this;

        this.root.AcWingOS.api.oauth2.authorize(appid, redirect_uri, scope, state, function(resp) {
            if (resp.result === "success") {
                outer.username = resp.username;
                outer.photo = resp.photo;
                outer.hide();
                outer.root.menu.show();
            }
        });
    }

    getinfo_acapp() {
        let outer = this;

        $.ajax({
            url: "http://8.130.66.193:8000/settings/acwing/acapp/apply_code/",
            type: "GET",
            success: function(resp) {
                if (resp.result === "success") {
                    outer.acapp_login(resp.appid, resp.redirect_uri, resp.scope, resp.state);
                }
            }
        });
    }

    getinfo_web() {
        let outer = this;
        $.ajax({
            url:"http://8.130.66.193:8000/setting/getinfo/",
            type:"GET",
            data: {
                platform: outer.platform,
            },
            success:function(resp) {
                if(resp.result === "success") {
                    outer.username = resp.username
                    outer.photo = resp.photo
                    outer.hide();
                    outer.root.menu.show();
                } else {
                    outer.login();
                }
            }
        });
    }

    hide() {
        this.$setting.hide();
    }

    show() {
        this.$setting.show();
    }
}
