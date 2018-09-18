import Player from "./Player";

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
export default class Game extends cc.Component {

    @property(cc.Prefab)
    starPrefab:cc.Prefab = null;
    @property
    maxStarDuration:number = 0;
    @property
    minStarDuration:number = 0;
    @property(cc.Node)
    ground:cc.Node = null;
    @property(cc.Node)
    player:cc.Node = null;
    @property(cc.Label)
    scoreDisplay:cc.Label = null;
    @property(cc.AudioClip)
    scoreAudio:cc.AudioClip = null;

    private _groupY:number = 0;
    private _score:number = 0;
    private _timer:number = 0;
    private _starDuration:number = 0;
    // LIFE-CYCLE CALLBACKS:
    get Timer():number{
        return this._timer;
    }
    get StarDuration():number{
        return this._starDuration;
    }
    onLoad () {
        this._groupY = this.ground.y + this.ground.height/2;
        this.spawNewStar();
        this._score = 0;
    }
    spawNewStar(){
        var newStar = cc.instantiate(this.starPrefab);
        this.node.addChild(newStar);
        newStar.setPosition(this.getNewStarPosition());
        newStar.getComponent("Star").game = this;
        this._starDuration = this.minStarDuration + Math.random() * (this.maxStarDuration - this.minStarDuration);
        this._timer = 0;
    }
    getNewStarPosition(){
        var randX = 0;
        var randY = this._groupY + Math.random() * this.player.getComponent('Player').jumpHeight +50;
        var maxX = this.node.width /2;
        randX = (Math.random() - 0.5) * 2 * maxX;
        return cc.v2(randX,randY);
    }
    gainScore(){
        this._score += 1;
        this.scoreDisplay.string = 'Score:' + this._score;
        cc.audioEngine.playEffect(this.scoreAudio,false);
    }
    start () {

    }
    gameOver(){
        this.player.stopAllActions();
        cc.director.loadScene('game');
    }
    update (dt) {
        if(this._timer > this._starDuration){
            this.gameOver();
            return;
        }
        this._timer += dt;
    }
}
