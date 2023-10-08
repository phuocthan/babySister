import ScreenBase from "./ScreenBase";
import ScreenManager from "./ScreenManager";
import Utils from "./Utils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MainMenuManager extends ScreenBase {
    // @property(cc.Graphics)
    _graphic: cc.Graphics = null;

    show() {
        super.show();

    }

    hide() {
        super.hide();

    }

    onLoad() {
        this._graphic = this.node.getChildByName('paint').getComponent(cc.Graphics);
        this._graphic.circle(500, 500);
        this._graphic.circle(600, 600);
        this.node.on(cc.Node.EventType.TOUCH_START, (touch: cc.Event.EventTouch) => {
            const delta = touch.getLocationInView();
            console.log('@@@ paint ', delta.x , ' ', delta.y)
            this._graphic.circle(delta.x, delta.y);
            this._graphic.fill();
        }, this);

        // this.ske.setAnimation(0, 'character_sad', true);
        // this.ske.setAnimation(1, 'con_vit_nuoc', true);

        // for (let i = 0; i < 10; i++) {
        //     // console.log('@@@ boneName ', boneName)
        //     const bath = cc.instantiate(this.bathNode);
        //     // bath.scale = Utils.randomRange(0.9, 1.1, false)
        //     bath.active = true;
        //     const boneName = i === 0 ? 'lv1/vet_do' : 'lv1/vet_do' + (i + 1);
        //     // console.log('@@@ boneName ', boneName)
        //     bath.setPosition(0,0)
        //     Utils.attachNodeToSpineBone(this.ske, boneName, bath);
        //     // bath.getComponent(sp.Skeleton).setAnimation(0, 'vet_do/bot_xabong_idle', true)
        //     // bath.getComponent(sp.Skeleton).setAnimation(0, 'vet_do/vet_do_idle', true)
        //     // this._babyCtrl.node.addChild
        // }
    }

    onClickPlayBtn() {
        ScreenManager._inst.gotoLevelSelection();
    }
}
