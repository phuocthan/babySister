const { ccclass, property } = cc._decorator;

export enum DraggableItemState {
    Idle,
    Inactive,
    Holding,
    Active,
    Used
}

@ccclass
export default class DragableItem extends cc.Component {
    /**
     * Property Declaration
     */
    @property()
    itemType: string = "";

    public _currentState: DraggableItemState = DraggableItemState.Inactive;
    public stickToMode: boolean = false;

    protected _originalPosition: cc.Vec3 = null;
    spine: sp.Skeleton;

    onLoad() {
        this.initOriginalPosition();
        this.spine = this.node.children[0].getComponent(sp.Skeleton);
        this.setState(DraggableItemState.Idle);
    }

    start() {
        this.node.on(cc.Node.EventType.TOUCH_START, (touch: cc.Event.EventTouch) => {
            if(this.stickToMode) return;
            this.setState(DraggableItemState.Holding);
            const position = this.node.position.clone();
            this.node.setPosition(position.x, position.y + 20);
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, (touch: cc.Event.EventTouch) => {
            if(this.stickToMode) return;
            const position = this.node.position.clone();
            const delta = touch.getDelta();
            position.x += delta.x;
            position.y += delta.y;
            this.node.setPosition(position);
        }, this);
        const onTouchCancel = (touch: cc.Event.EventTouch) => {
            if(this.stickToMode) return;
            this.setState(DraggableItemState.Idle);
            this.restoreOriginalPosition();
        };
        this.node.on(cc.Node.EventType.TOUCH_END, onTouchCancel, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, onTouchCancel, this);
    }
    
    initOriginalPosition() {
        this._originalPosition = this.node.position.clone();
    }
    
    restoreOriginalPosition() {
        this.node.setPosition(this._originalPosition);
    }
    
    setState(state: DraggableItemState) {
        this._currentState = state;
        switch(state) {
            case DraggableItemState.Idle:
                this.spine.setAnimation(0, 'idle', true);
                break;
            case DraggableItemState.Holding: 
                this.spine.setAnimation(0, 'click', true);
                break;
            default: 
                this.spine.setAnimation(0, 'idle', true);
                break;
        }
    }
    
    // update(dt: number) {}
}
