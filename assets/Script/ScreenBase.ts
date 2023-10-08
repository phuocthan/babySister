const {ccclass, property} = cc._decorator;
export enum SCREEN_ID {
    MAINMENU,
    LEVEL_SELECTION,
    GAMEPLAY,
    COUNT
}

@ccclass
export default class ScreenBase extends cc.Component {

    prepareToShow() {
        // do something later
    }

    show() {
        // do something later
    }

    hide() {
        // do something later
    }
}
