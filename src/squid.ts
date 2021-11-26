import * as utils from "@dcl/ecs-scene-utils"
import ActionSystem from "./systems/actionSystem";
import BaseEntity from "./base/baseEntity";
import { Battery } from "./battery";
export enum Move {
  FORWARD = 'FORWARD',
  BACK = 'BACK',
}

export enum Rotate {
  RIGHT = 'RIGHT',
  LEFT = 'LEFT',
}

export default class Squid extends BaseEntity {

  private _currentPos: Vector3
  private _actionSystem: ActionSystem

  constructor(shape: GLTFShape, transform: TransformConstructorArgs) {
    super(shape, transform);

    this._currentPos = this.getComponent(Transform).position

    this._actionSystem = new ActionSystem(this)
    engine.addSystem(this._actionSystem)
  }
/*
  public turnR(): void {
	  this.addComponentOrReplace(new utils.KeepRotatingComponent(Quaternion.Euler(0, 10, 0)))
  }
  public turnL(): void { 
	  this.addComponent(new utils.KeepRotatingComponent(Quaternion.Euler(0, -10, 0)))
  }
  public turnStop(): void {
	  this.getComponent(utils.KeepRotatingComponent).stop()
  }
*/
  public move (dir?: Move) {
	  
    switch (dir) {
      case Move.FORWARD:
        this._actionSystem.moveForward()
        break;
      case Move.BACK:
        this._actionSystem.moveBack()
        break;
      default:
        this._actionSystem.moveStop()
    }
  }

  public rotate (dir?: Rotate) {
    switch (dir) {
      case Rotate.RIGHT:
        this._actionSystem.turnRight()
        break;
      case Rotate.LEFT:
        this._actionSystem.turnLeft()
        break;
      default:
        this._actionSystem.turnStop()
    }
  }
}
