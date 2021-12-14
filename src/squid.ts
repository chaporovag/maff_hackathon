import ActionSystem from "./systems/actionSystem";
import BaseEntity from "./base/baseEntity";
import Global from "./core/global";
import * as ui from "@dcl/ui-scene-utils";
import UpdateEvent, {EventMessage} from "./events/updateEvent";
import global from "./core/global";
import Battery from "./battery";
import PhysicsEntity from "./base/physicsEntity";
export enum Move {
  FORWARD = 'FORWARD',
  BACK = 'BACK',
}

export enum Rotate {
  RIGHT = 'RIGHT',
  LEFT = 'LEFT',
}

export default class Squid extends PhysicsEntity {

  private readonly _actionSystem: ActionSystem
  private readonly _elements: BaseEntity[]

  // @ts-ignore
  private _battery: Battery
  private _isActive: boolean = false

  constructor(transform: Transform) {
    super(new GLTFShape('models/squid.glb'), transform);
	//  this.addComponent(new AudioSource(new AudioClip("audio/generator_start.mp3")))
    this.addComponent(new OnPointerDown(()=> this._checkState(),
      {
        button: ActionButton.PRIMARY,
        distance: 4
      })
    )

    this._elements = [this]
    this._actionSystem = new ActionSystem(this._elements)
    engine.addSystem(this._actionSystem)
    global.events.addListener(UpdateEvent, null, ({ message }) => {
      if (message === EventMessage.CAPSULE_OPEN && !this._battery) {
        this._battery = new Battery(new Transform({ position: new Vector3(15, -0.8, 10.5), rotation: new Quaternion(-0.135, 0, 0) }))
      }
    })

    // this._battery = new Battery(new Transform({ position: new Vector3(10, -0.8, 10.5), rotation: new Quaternion(-0.135, 0, 0) }))

    // Create physics body
    const body = new CANNON.Body({
      mass: 1, // kg
      position: new CANNON.Vec3(transform.position.x, transform.position.y, transform.position.z),
      quaternion: new CANNON.Quaternion(transform.rotation.x, transform.rotation.eulerAngles.y / 180 * Math.PI, transform.rotation.z),
      shape: new CANNON.Box(new CANNON.Vec3(2.3, 1.5, 2.4)),
    })
    this.setBody(body)

    const clip = new AudioClip("audio/tractor_move.mp3")
    const source = new AudioSource(clip)
    this.addComponent(source);
    source.loop = true
  }

  private _checkState(): void {
    if (Global.HAS_BATTERY && !this._isActive) {
      this._isActive = true
      this.removeComponent(OnPointerDown)
      this._battery.removeComponent(OnPointerDown)
      this._battery.getComponent(Transform).position = this.getComponent(Transform).position
      this._battery.getComponent(Transform).rotation = this.getComponent(Transform).rotation
      this._battery.getComponent(Transform).scale = Vector3.One()
      this._battery.hideIcon()
      this._elements.push(this._battery)
		const Start = new Entity()
		engine.addEntity(Start)
		Start.addComponent(new AudioSource(new AudioClip("audio/generator_start.mp3")))
     
		Start.getComponent(AudioSource).playOnce();
    } else {
      ui.displayAnnouncement('Not enough energy');
		const Err = new Entity()
		engine.addEntity(Err)
		Err.addComponent(new AudioSource(new AudioClip("audio/error_version1_stereo.mp3")))
		
		Err.getComponent(AudioSource).playOnce();
    }
  }

  public move (dir?: Move):void {
    if (!this._isActive) return
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
    if (!this._isActive) return
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
