import GameController from "./GameController";
import ScreenBase from "./ScreenBase";
import ScreenManager from "./ScreenManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LevelSelectionManager extends ScreenBase {

    isClickAble = true;
    show() {
        super.show();
        this.isClickAble = true;
    }

    hide() {
        super.hide();
    }

    onClickLevelItem(event, customEventData) {
        if ( !this.isClickAble) {
            return;
        }
        const levelSelection = parseInt(customEventData);
        GameController._inst.curLevel = levelSelection;
        // console.log('@@@ level ', GameController._inst.curLevel)
        ScreenManager._inst.gotoGamePlay();
        this.isClickAble = false;
    }

    onClickBackBtn() {
        ScreenManager._inst.gotoMainMenu();
    }
}
