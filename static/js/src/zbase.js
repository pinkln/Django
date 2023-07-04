export class AcGame {
    constructor(id, AcWingOS) {
        this.id = id;
        this.$ac_game = $('#' + id);
        this.AcWingOS = AcWingOS;
        
        this.setting = new Setting(this);
        this.menu = new AcGameMenu(this);
        this.play = new AcGamePlayground(this);

        this.start();
    }

    start() {
    }
}
