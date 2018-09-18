import Game from "./Game";

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
export default class Star extends cc.Component {

    @property
    pickRadius:number = 0;
    // LIFE-CYCLE CALLBACKS:
    public game:Game = null;

    // onLoad () {}

    start () {

    }

    getPlayerDistance(){
        var playerPos = this.game.player.getPosition();
        var dist = this.node.position.sub(playerPos).mag();
        return dist;
    }
    onPicked(){
        this.game.spawNewStar();
        this.game.gainScore();
        this.node.destroy();
    }

    update (dt) {
        if(this.getPlayerDistance() < this.pickRadius){
            this.onPicked();
            return;
        }
        var opacityRatio = 1- this.game.Timer / this.game.StarDuration;
        var minOpacity = 50;
        this.node.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity));
    }
}
