export class AcGame {
    constructor(id) {
        this.id = id;
        this.$ac_game = $('#' + id);
        //this.menu = new AcGameMenu(this);
        this.play = new AcGamePlayground(this);

        this.start();
    }

    start() {
    }
}
