import ScreenBase from './ScreenBase';
import ScreenManager from './ScreenManager';
import GameController from './GameController';
import AssetManager from './AssetManager';
import LevelData, { AttachBone } from './Levels/LevelData';
import PetController, { AnimalState } from './Characters/PetController';
import { RoomData } from './Levels/LevelData';
import ItemBoard from './Objects/ItemBoard';
import Utils from './Utils';
import HurtPoint from './InteractiveObjects/HurtPoint';
import BabyController from './Characters/BabyController';
import { BABY_ANIM } from './GameDefine';

const { ccclass, property } = cc._decorator;

@ccclass
export default class GamePlayManager extends ScreenBase {

    @property(sp.Skeleton) 
    ske: sp.Skeleton = null;

    @property(ItemBoard)
    private itemBoard: ItemBoard = null;

    private _spawnPos: cc.Vec2 = null;
    private _babyCtrl: BabyController = null;
    private _levelData: LevelData = null;
    private _rooms: RoomData[] = null;
    private _targetBones: Map<string, [{ data: AttachBone; node: cc.Node }]> = new Map();
    private _roomTargets: Map<string, { itemId: string; targetId: string; finish: boolean }> = new Map();

    private _curRoomIdx: number = -1;
    private _numberOfTargets: number = 0;
    private _finishedTargets: number = 0;

    @property(cc.Node) 
    bathNode: cc.Node = null;

    prepareToShow() {
        if (!this._spawnPos) {
            this._spawnPos = this.node.children[0].getChildByName('BabyNode')?.getPosition();
        }
    }



    show() {
        super.show();
        const curLevel = GameController._inst.curLevel;
        const rawLevelData = AssetManager._inst.getLevelData(curLevel);
        console.log('@@@ curLevel ', GameController._inst.curLevel)
        console.log('@@@ rawLevelData ', rawLevelData)
        const levelData = LevelData.parseFrom(rawLevelData);
        console.log('@@ level data', levelData)

        // spawn pet
        const babyPrefab = AssetManager._inst.getPrefab('BABY_1');
        const babyNode = cc.instantiate(babyPrefab);
        babyNode.setPosition(this._spawnPos);
        this.node.children[0].getChildByName('BabyNode').addChild(babyNode);
        this._babyCtrl = babyNode.getComponent(BabyController);

        for (let i = 0; i < 10; i++) {
            // console.log('@@@ boneName ', boneName)
            const bath = cc.instantiate(this.bathNode);
            bath.scale = Utils.randomRange(0.9, 1.1, false)
            bath.active = true;
            const boneName = i === 0 ? 'lv1/vet_do' : 'lv1/vet_do' + (i + 1);
            // bath.getComponent(sp.Skeleton).setAnimation(0, 'vet_do/vet_do_idle', true)
            // console.log('@@@ boneName ', boneName)
            Utils.attachNodeToSpineBone(this._babyCtrl.skeleton, boneName, bath);
            bath.getComponent(sp.Skeleton).setAnimation(0, 'vet_do/vet_do_idle', true)
            bath.setPosition(0, 0)
        }

        // const bat = cc.instantiate(babyPrefab);

        
        // this._babyCtrl.loadAnimations(levelData.animations);

        console.log('@@@ level data ', levelData);

        this._levelData = levelData;
        this._rooms = levelData.rooms;
        // this._loadRooms(0);
        this.ske = this._babyCtrl.skeleton
        this.ske.setAnimation(0, BABY_ANIM.BABY_IDLE, true);
        this.ske.setAnimation(1, BABY_ANIM.DUCK_SWIM, true);

        // this.voi_nuoc_bone = this.voiNuoc.findBone("voi_sen_new");
        // this.voi_nuoc_bone2 = this.voiNuoc.findBone("voi_sen_new2");
        // console.log('@@ ', this.voi_nuoc_bone)
        // this.voi_nuoc_bone. 

        this.node.on(cc.Node.EventType.TOUCH_START, (touch: cc.Event.EventTouch) => {
            // if(this.stickToMode) return;
            // this.setState(DraggableItemState.Holding);
            // console.log('move')
            // const touchNode = touch.getLocationInView();

            // this.voi_nuoc_bone.worldX =  this.voi_nuoc_bone.worldX + 100;
            // this.voi_nuoc_bone.worldY =  this.voi_nuoc_bone.worldY + 100;
            // // this.voi_nuoc_bone.worldX = touchNode.y;

            // // this.voi_nuoc_bone.worldX = touchNode.x;
            // // this.voi_nuoc_bone.worldX = touchNode.y;
            // // this.voi_nuoc_bone.ax = touchNode.x;
            // // this.voi_nuoc_bone.ay = touchNode.y;

            // // this.voi_nuoc_bone.updateWorldTransform();
            // // this.voi_nuoc_bone.updateAppliedTransform();
            // // // this.voi_nuoc_bone
            // // this.voi_nuoc_bone.ashearX = touchNode.x;
            // // this.voi_nuoc_bone.ashearY = touchNode.y;

            
            // this.voi_nuoc_bone.updateWorldTransform();
            // // this.voi_nuoc_bone.updateAppliedTransform();
            // // this.voi_nuoc_bone.updateWorldTransformWith(touchNode.x, touchNode.y, 90, 1, 1, touchNode.x, touchNode.y)

            // this.voi_nuoc_bone2.worldX = touchNode.x;
            // this.voi_nuoc_bone2.worldX = touchNode.y;
            // this.voi_nuoc_bone2.ax = touchNode.x;
            // this.voi_nuoc_bone2.ay = touchNode.y;

            // // this.voi_nuoc_bone.updateWorldTransform();
            // // this.voi_nuoc_bone.updateAppliedTransform();
            // // // this.voi_nuoc_bone
            // this.voi_nuoc_bone2.ashearX = touchNode.x;
            // this.voi_nuoc_bone2.ashearY = touchNode.y;

            
            // this.voi_nuoc_bone2.updateWorldTransform();
            // this.voi_nuoc_bone2.updateAppliedTransform();
            // this.voi_nuoc_bone2.updateWorldTransformWith(touchNode.x, touchNode.y, 90, 1, 1, touchNode.x, touchNode.y)
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, (touch: cc.Event.EventTouch) => {
            // const touchNode = touch.getLocationInView();
            // this.voi_nuoc_bone.worldX = touchNode.x;
            // this.voi_nuoc_bone.worldX = touchNode.y;
            // this.voi_nuoc_bone.ax = touchNode.x;
            // this.voi_nuoc_bone.ay = touchNode.y;

            // // this.voi_nuoc_bone.updateWorldTransform();
            // // this.voi_nuoc_bone.updateAppliedTransform();
            // // this.voi_nuoc_bone
            // this.voi_nuoc_bone.ashearX = touchNode.x;
            // this.voi_nuoc_bone.ashearY = touchNode.y;
            // this.voi_nuoc_bone.updateWorldTransformWith(touchNode.x, touchNode.y, 180, 1, 1, touchNode.x, touchNode.y);
            //      this.voi_nuoc_bone.updateWorldTransform();
            // this.voi_nuoc_bone.updateAppliedTransform();
            // console.log('@@@ move ',touchNode);
            // if(this.stickToMode) return;
            // const position = this.node.position.clone();
            // const delta = touch.getDelta();
            // position.x += delta.x;
            // position.y += delta.y;
            // this.node.setPosition(position);
        }, this);
    }

    hide() {
        super.hide();
    }

    onClickSelectLevelBtn() {
        ScreenManager._inst.gotoLevelSelection();
    }

    private _loadRooms(roomIdx: number) {
        this._curRoomIdx = roomIdx;
        const data = this._rooms[roomIdx];

        this._babyCtrl.State = <AnimalState>data.state;
        this._babyCtrl.updateAnim();

        this._loadTargets(data);

        // load items
        const useItemType = data.useType;
        this.itemBoard.loadItems(data.targets);
        this._babyCtrl.node.setSiblingIndex(1);
    }

    private _loadTargets(data: RoomData) {
        this._numberOfTargets = 0;
        this._roomTargets.clear();
        const setupTarget = (item: string, bone: AttachBone, nodeU: cc.Node) => {
            const hurtPoint = nodeU.getComponent(HurtPoint);
            this._numberOfTargets++;
            hurtPoint.onFinish = () => {
                if (++this._finishedTargets >= this._numberOfTargets) {
                    cc.warn('End room!');
                    this._onFinishRoom();
                }
                cc.warn(`Room state: ${this._finishedTargets}/${this._numberOfTargets}`);
            };

            if (this._targetBones.has(item)) {
                this._targetBones.get(item).push({
                    data: bone,
                    node: nodeU,
                });
            } else {
                this._targetBones.set(item, [
                    {
                        data: bone,
                        node: nodeU,
                    },
                ]);
            }
        };
        data.targets.forEach((target) => {
            console.log(target);
            const item = target.item;
            const bones = target.bones;
            const prefabId = `${item}_T`;
            const prefab = AssetManager._inst.getItemPrefab(prefabId);
            let nodeU: cc.Node = null;
            if (bones && bones.length > 0 && prefab) {
                for (let i = 0; i < bones.length; i++) {
                    nodeU = cc.instantiate(prefab);
                    nodeU.angle = bones[i]?.angle || 0;
                    Utils.attachNodeToSpineBone(this._babyCtrl.skeleton.node, bones[i].name, nodeU);
                    setupTarget(item, bones[i], nodeU);
                }
            }
        });
    }

    private _onFinishRoom(): void {
        const animTime = this._babyCtrl.playAnimFunny();
        this.scheduleOnce(() => {
            this.itemBoard.clear();
            this._targetBones.clear();
            if (this._curRoomIdx < this._rooms.length - 1) {
                this._loadRooms(this._curRoomIdx + 1);
            } else {
                cc.warn('>>> Back to level selection');
            }
        }, animTime * 0.9);
    }
}
