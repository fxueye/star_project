"use strict";
cc._RF.push(module, '09e5cN5ZmlA4qxLSbL1BsqY', 'Player');
// src/Player.ts

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.jumpHeight = 0;
        _this.jumoDuration = 0;
        _this.maxMoveSpeed = 0;
        _this.accel = 0;
        _this.jumpAudio = null;
        _this._accLeft = false;
        _this._accRight = false;
        _this._xSpeed = 0;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    Player.prototype.setJumpAction = function () {
        var jumpUp = cc.moveBy(this.jumoDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCircleActionOut());
        var jumpDown = cc.moveBy(this.jumoDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
        var callback = cc.callFunc(this.playJumpSound, this);
        return cc.repeatForever(cc.sequence(jumpUp, jumpDown, callback));
    };
    Player.prototype.playJumpSound = function () {
        cc.audioEngine.playEffect(this.jumpAudio, false);
    };
    Player.prototype.onKeyDown = function (evt) {
        switch (evt.keyCode) {
            case cc.macro.KEY.a:
                this._accLeft = true;
                break;
            case cc.macro.KEY.d:
                this._accRight = true;
                break;
        }
    };
    Player.prototype.onKeyUp = function (evt) {
        switch (evt.keyCode) {
            case cc.macro.KEY.a:
                this._accLeft = false;
                break;
            case cc.macro.KEY.d:
                this._accRight = false;
                break;
        }
    };
    Player.prototype.onLoad = function () {
        this.node.runAction(this.setJumpAction());
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    };
    Player.prototype.onDestroy = function () {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    };
    Player.prototype.start = function () {
    };
    Player.prototype.update = function (dt) {
        if (this._accLeft) {
            this._xSpeed -= this.accel * dt;
        }
        else if (this._accRight) {
            this._xSpeed += this.accel * dt;
        }
        if (Math.abs(this._xSpeed) > this.maxMoveSpeed) {
            this._xSpeed = this.maxMoveSpeed * this._xSpeed / Math.abs(this._xSpeed);
        }
        console.log("width2:" + cc.view.getVisibleSize().width);
        console.log("height2:" + cc.view.getCanvasSize().height);
        this.node.x += this._xSpeed * dt;
        if (this.node.x > cc.view.getVisibleSize().width / 2) {
            this.node.x = -cc.view.getVisibleSize().width / 2;
        }
        if (this.node.x < -cc.view.getVisibleSize().width / 2) {
            this.node.x = cc.view.getVisibleSize().width / 2;
        }
    };
    __decorate([
        property
    ], Player.prototype, "jumpHeight", void 0);
    __decorate([
        property
    ], Player.prototype, "jumoDuration", void 0);
    __decorate([
        property
    ], Player.prototype, "maxMoveSpeed", void 0);
    __decorate([
        property
    ], Player.prototype, "accel", void 0);
    __decorate([
        property(cc.AudioClip)
    ], Player.prototype, "jumpAudio", void 0);
    Player = __decorate([
        ccclass
    ], Player);
    return Player;
}(cc.Component));
exports.default = Player;

cc._RF.pop();