class AcGamePlay {
    constructor(root) {
        this.root = root;
        this.$play = $(`
            <div>游戏界面</div>
        `);
        
        this.hide();
        this.root.$ac_game.append(this.$play);

        this.start();
    }

    start() {

    }

    show() {//open play
        this.$play.show();
    }

    hide() {//hide play
        this.$play.hide();
    }
}
