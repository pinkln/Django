class AcGameMenu {
    constructor(root) {
        this.root = root;
        this.$menu = $(`
<div class="ac-game-menu">
    <div class="ac-game-menu-feature">
        <div class="ac-game-menu-feature-item ac-game-menu-feature-item-one">
            单人模式
        </div>
        <div class="ac-game-menu-feature-item ac-game-menu-feature-item-many">
            多人模式
        </div>
        <div class="ac-game-menu-feature-item ac-game-menu-feature-item-setting">
            设置
        </div>
    </div>
</div>
`);
        this.root.$ac_game.append(this.$menu);
        this.$single = this.$menu.find('.ac-game-menu-feature-item-one')
    }
}
