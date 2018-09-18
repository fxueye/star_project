"use strict";
cc._RF.push(module, 'e0d0eTOsm5JNaqGTPbv2V/O', 'Game');
// src/Game.ts

Object.defineProperty(exports, "__esModule", { value: true });
// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.starPrefab = null;
        _this.maxStarDuration = 0;
        _this.minStarDuration = 0;
        _this.ground = null;
        _this.player = null;
        _this.scoreDisplay = null;
        _this.scoreAudio = null;
        _this._groupY = 0;
        _this._score = 0;
        _this._timer = 0;
        _this._starDuration = 0;
        return _this;
    }
    Object.defineProperty(Game.prototype, "Timer", {
        // LIFE-CYCLE CALLBACKS:
        get: function () {
            return this._timer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "StarDuration", {
        get: function () {
            return this._starDuration;
        },
        enumerable: true,
        configurable: true
    });
    Game.prototype.onLoad = function () {
        this._groupY = this.ground.y + this.ground.height / 2;
        this.spawNewStar();
        this._score = 0;
    };
    Game.prototype.spawNewStar = function () {
        var newStar = cc.instantiate(this.starPrefab);
        this.node.addChild(newStar);
        newStar.setPosition(this.getNewStarPosition());
        newStar.getComponent("Star").game = this;
        this._starDuration = this.minStarDuration + Math.random() * (this.maxStarDuration - this.minStarDuration);
        this._timer = 0;
    };
    Game.prototype.getNewStarPosition = function () {
        var randX = 0;
        var randY = this._groupY + Math.random() * this.player.getComponent('Player').jumpHeight + 50;
        var maxX = this.node.width / 2;
        randX = (Math.random() - 0.5) * 2 * maxX;
        return cc.v2(randX, randY);
    };
    Game.prototype.gainScore = function () {
        this._score += 1;
        this.scoreDisplay.string = 'Score:' + this._score;
        cc.audioEngine.playEffect(this.scoreAudio, false);
    };
    Game.prototype.start = function () {
    };
    Game.prototype.gameOver = function () {
        this.player.stopAllActions();
        cc.director.loadScene('game');
    };
    Game.prototype.update = function (dt) {
        if (this._timer > this._starDuration) {
            this.gameOver();
            return;
        }
        this._timer += dt;
    };
    __decorate([
        property(cc.Prefab)
    ], Game.prototype, "starPrefab", void 0);
    __decorate([
        property
    ], Game.prototype, "maxStarDuration", void 0);
    __decorate([
        property
    ], Game.prototype, "minStarDuration", void 0);
    __decorate([
        property(cc.Node)
    ], Game.prototype, "ground", void 0);
    __decorate([
        property(cc.Node)
    ], Game.prototype, "player", void 0);
    __decorate([
        property(cc.Label)
    ], Game.prototype, "scoreDisplay", void 0);
    __decorate([
        property(cc.AudioClip)
    ], Game.prototype, "scoreAudio", void 0);
    Game = __decorate([
        ccclass
    ], Game);
    return Game;
}(cc.Component));
exports.default = Game;

cc._RF.pop();