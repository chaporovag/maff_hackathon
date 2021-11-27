import ActionSystem from "./systems/actionSystem";
import BaseEntity from "./base/baseEntity";
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
  private readonly _actionSystem: ActionSystem

  constructor(shape: GLTFShape, transform: TransformConstructorArgs) {
    super(shape, transform);
	  //  this.addComponent(new AudioSource(new AudioClip("audio/Tractor.mp3")))
    this._currentPos = this.getComponent(Transform).position
    this.addComponent(new OnPointerDown(()=>{
      // this.getComponent(AudioSource).playOnce()
    }))
    this._actionSystem = new ActionSystem(this)
    engine.addSystem(this._actionSystem)
  }

  public move (dir?: Move) {
	// this.getComponent(AudioSource).playOnce()
    switch (dir) {
      case Move.FORWARD:
        this._actionSystem.moveForward();
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
