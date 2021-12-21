import ActionSystem from "../systems/actionSystem";
import BaseEntity from "./base/baseEntity";
import Global from "../core/global";
import * as ui from "@dcl/ui-scene-utils";
import global from "../core/global";
import Battery from "./battery";
import PhysicsEntity from "./base/physicsEntity";
import resources from "../resources";
import {EventMessage, CapsuleStateChangedEvent} from "../events/customEvents";

export enum Move {
  FORWARD = 'FORWARD',
  BACK = 'BACK',
}

export enum Rotate {
  RIGHT = 'RIGHT',
  LEFT = 'LEFT',
}

export default class Robot extends PhysicsEntity {

  private readonly _actionSystem: ActionSystem
  private readonly _elements: BaseEntity[]

  // @ts-ignore
  _battery: Battery

  constructor(transform: Transform) {
    super(new GLTFShape(resources.MODEL_ROBOT), transform);
    this.addComponent(new OnPointerDown(()=> this._checkState(),
      {
        button: ActionButton.PRIMARY,
        distance: 4
      })
    )

    this._elements = [this]
    this._actionSystem = new ActionSystem(this._elements)
    engine.addSystem(this._actionSystem)

    this._battery = new Battery(new Transform({ position: new Vector3(global.POSITION.x + 27.6, -0.8, global.POSITION.z + 14.8), rotation: new Quaternion(-0.135, 0, 0) }))
    this._battery.setVisible(false)

    global.events.addListener(CapsuleStateChangedEvent, null, ({ message }) => {
      if (message === EventMessage.CAPSULE_OPEN && !this._battery.isVisible() && Global.IS_QUEST) {
        this._battery.setVisible(true)
      }
    })

    // Create physics body
    const body = new CANNON.Body({
      mass: 1, // kg
      position: new CANNON.Vec3(transform.position.x, transform.position.y, transform.position.z),
      quaternion: new CANNON.Quaternion(transform.rotation.x, transform.rotation.eulerAngles.y / 180 * Math.PI, transform.rotation.z),
      shape: new CANNON.Box(new CANNON.Vec3(2.3, 1.5, 2.4)),
    })
    this.setBody(body)

    const clip = new AudioClip(resources.SOUND_ROBOT_MOVE)
    const source = new AudioSource(clip)
    this.addComponent(source);
    source.loop = true
  }

  private _checkState(): void {
    if (Global.HAS_BATTERY && !Global.ROBOT_IS_ACTIVE) {
      Global.ROBOT_IS_ACTIVE = true
      this.removeComponent(OnPointerDown)
      if (this._battery.isVisible()) {
        this._battery.removeComponent(OnPointerDown)
        this._battery.getComponent(Transform).position = this.getComponent(Transform).position
        this._battery.getComponent(Transform).rotation = this.getComponent(Transform).rotation
        this._battery.getComponent(Transform).scale = Vector3.One()
        this._battery.setIconVisible(false)
        this._elements.push(this._battery)
      }
      const Start = new Entity()
      engine.addEntity(Start)
		Start.setParent(this._battery)
      Start.addComponent(new AudioSource(new AudioClip(resources.SOUND_GENERATOR_START)));

      Start.getComponent(AudioSource).playOnce();
    } else {
      ui.displayAnnouncement('Find the battery');
      const Err = new Entity()
      engine.addEntity(Err)
      Err.addComponent(new AudioSource(new AudioClip(resources.SOUND_ERROR_ROBOT)))

      Err.getComponent(AudioSource).playOnce();
    }
  }

  public setBatteryIconVisible(value: boolean) {
    if (this._battery.isVisible()) {
      this._battery.setIconVisible(value)
    }
  }

  public setBatteryVisible(value: boolean) {
    if (this._battery.isVisible()) {
      this._battery.setVisible(value)
    }
  }

  public move (dir?: Move):void {
    if (!Global.ROBOT_IS_ACTIVE) return
    switch (dir) {
      case Move.FORWARD:
        this.getComponent(AudioSource).playing = true;
        this._actionSystem.moveForward();
        break;
      case Move.BACK:
        this.getComponent(AudioSource).playing = true;
        this._actionSystem.moveBack()
        break;
      default:
        this.getComponent(AudioSource).playing = false;
        this._actionSystem.moveStop()
    }
  }

  public rotate (dir?: Rotate):void {
    if (!Global.ROBOT_IS_ACTIVE) return
    switch (dir) {
      case Rotate.RIGHT:
        this.getComponent(AudioSource).playing = true;
        this._actionSystem.turnRight()
        break;
      case Rotate.LEFT:
        this.getComponent(AudioSource).playing = true;
        this._actionSystem.turnLeft()
        break;
      default:
        this.getComponent(AudioSource).playing = false;
        this._actionSystem.turnStop()
    }
  }

  // @ts-ignore
  private _body: CANNON.Body
  // @ts-ignore
  private _world: CANNON.World

  protected setBody(body: CANNON.Body) {
    this._body = body
  }

  public getBody(): CANNON.Body {
    return this._body
  }

  public init(cannonMaterial: CANNON.Material, world: CANNON.World): void {
    this._world = world
    const body = this._body

    body.type = CANNON.Body.KINEMATIC
    body.material = cannonMaterial
    body.linearDamping = 0.4
    body.angularDamping = 0.4
    world.addBody(body)
  }
  public isActive: boolean = false
}
