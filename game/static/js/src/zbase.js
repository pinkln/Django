class AcGame {
    constructor(id) {
        this.id = id;
        this.$ac_game = $('#' + id);
        this.menu = new AcGameMenu(this);
        this.play = new AcGamePlay(this);

        this.start();
    }

    start() {
    }
}
