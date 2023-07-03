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

                </div>
                <div class="ac-game-setting-register">

                </div>
            </div>
            `);
        this.$login = this.$setting.find(".ac-game-setting-login");
        this.$login.hide();
        this.$register = this.$setting.find(".ac-game-setting-register");
        this.$register.hide();
        this.root.$ac_game.append(this.$setting);

        this.start();
    }

    start() {
        this.getinfo();
    }
    
    register() {
        this.$login.hide();
        this.$register.show();
    }

    login(){
        this.$register.hide();
        this.$login.show();
    }

    getinfo() {
        let outer = this;
        $.ajax({
            url:"http://8.130.66.193:8000/setting/getinfo/",
            type:"GET",
            data: {
                platform: outer.platform,
            },
            success:function(resp) {
                console.log(resp);
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
