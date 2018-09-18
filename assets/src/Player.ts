// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends cc.Component {

    @property
    jumpHeight:number = 0;
    @property
    jumoDuration:number = 0;
    @property 
    maxMoveSpeed:number = 0;
    @property
    accel:number = 0;
    @property(cc.AudioClip)
    jumpAudio:cc.AudioClip = null;

    private _accLeft:boolean = false;
    private _accRight:boolean = false;
    private _xSpeed:number = 0;
    // LIFE-CYCLE CALLBACKS:
    setJumpAction(){
        var jumpUp = cc.moveBy(this.jumoDuration,cc.v2(0,this.jumpHeight)).easing(cc.easeCircleActionOut());
        var jumpDown = cc.moveBy(this.jumoDuration,cc.v2(0,-this.jumpHeight)).easing(cc.easeCubicActionIn());
        var callback = cc.callFunc(this.playJumpSound,this);
        return cc.repeatForever(cc.sequence(jumpUp,jumpDown,callback));
    }
    playJumpSound(){
        cc.audioEngine.playEffect(this.jumpAudio,false);
    }
    onKeyDown(evt){
        switch(evt.keyCode){
            case cc.macro.KEY.a:
                this._accLeft = true;
            break;
            case cc.macro.KEY.d:
                this._accRight = true;
            break;
        }
    }
    onKeyUp(evt){
        switch(evt.keyCode){
            case cc.macro.KEY.a:
                this._accLeft = false;
            break;
            case cc.macro.KEY.d:
                this._accRight = false;
            break;
        }
    }
    onLoad () {
        this.node.runAction(this.setJumpAction());
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this);
    }

    onDestroy(){
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this);
    }

    start () {

    }


    update (dt) {
        if(this._accLeft){
            this._xSpeed -= this.accel * dt;
        }else if(this._accRight){
            this._xSpeed += this.accel * dt;
        }
        if(Math.abs(this._xSpeed) > this.maxMoveSpeed){
            this._xSpeed = this.maxMoveSpeed * this._xSpeed / Math.abs(this._xSpeed);
        }
        console.log("width2:" + cc.view.getVisibleSize().width);
        console.log("height2:" + cc.view.getCanvasSize().height);
        this.node.x += this._xSpeed * dt;
        if(this.node.x > cc.view.getVisibleSize().width / 2){
            this.node.x = -cc.view.getVisibleSize().width / 2;
        }
        if(this.node.x < -cc.view.getVisibleSize().width / 2){
            this.node.x = cc.view.getVisibleSize().width / 2;
        }
    }
}
