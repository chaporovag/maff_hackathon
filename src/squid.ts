import ActionSystem from "./systems/actionSystem";
import BaseEntity from "./base/baseEntity";
import Global from "./core/global";
import * as ui from "@dcl/ui-scene-utils";
export enum Move {
  FORWARD = 'FORWARD',
  BACK = 'BACK',
}

export enum Rotate {
  RIGHT = 'RIGHT',
  LEFT = 'LEFT',
}

export default class Squid extends BaseEntity {

  private readonly _actionSystem: ActionSystem
  private readonly _elements: BaseEntity[]
  private _isActive: boolean = false
  private readonly _battery: BaseEntity

  constructor(shape: GLTFShape, transform: TransformConstructorArgs) {
    super(shape, transform);
    this.addComponent(new OnPointerDown(()=> this._checkState()))
    this._elements = [this]
    this._actionSystem = new ActionSystem(this._elements)
    engine.addSystem(this._actionSystem)

    this._battery = new BaseEntity(new GLTFShape('models/squid_battery.glb'), { position: new Vector3(15.5, -0.8, 10.5) })
  }

  private _checkState() {
    if (Global.HAS_BATTERY && !this._isActive) {
      this._isActive = true
      this.removeComponent(OnPointerDown)

      this._battery.getComponent(Transform).position = this.getComponent(Transform).position
      this._battery.getComponent(Transform).rotation = this.getComponent(Transform).rotation
      this._elements.push(this._battery)

      this.addComponent(new AudioSource(new AudioClip("audio/Tractor.mp3")))
      this.getComponent(AudioSource).playOnce()
    } else {
      ui.displayAnnouncement('Not enough energy');
    }
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
