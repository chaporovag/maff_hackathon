import BaseEntity from "./base/baseEntity";
import Global from "./core/global";
import * as ui from "@dcl/ui-scene-utils";
import Squid, {Move, Rotate} from "./squid";
import Key from "./key";

class TerminalButton extends BaseEntity {
  constructor(transform: TransformConstructorArgs) {
    super(new GLTFShape('models/terminal_btn.glb'), transform);
  }
}

class TerminalButton2 extends BaseEntity {
  constructor(transform: TransformConstructorArgs) {
    super(new GLTFShape('models/terminal_btn2.glb'), transform);
  }
}

class TerminalCard extends BaseEntity {
  constructor(transform: TransformConstructorArgs) {
    super(new GLTFShape('models/terminal_card.glb'), transform);
  }
}

export default class Terminal extends BaseEntity {
  private readonly _moveFwdBtn: TerminalButton
  private readonly _moveBackBtn: TerminalButton
  private readonly _turnLeftBtn: TerminalButton
  private readonly _turnRightBtn: TerminalButton

  private _isActive: boolean = false
  // @ts-ignore
  private _squid: Squid
  // @ts-ignore
  private _key: Key

  constructor(transform: TransformConstructorArgs) {
    super(new GLTFShape('models/terminal.glb'), transform);
    new BaseEntity(new GLTFShape('models/terminal_screen.glb'), new Transform({ position: new Vector3(3,1.3,3), rotation: new Quaternion(0, 180, 0) }) )
    this.addComponent(new AudioSource(new AudioClip("audio/Error_terminal_tractor.mp3")));

    this._key = new Key(new Transform({ position: new Vector3(11, 6.2, 2) }));

    this._turnLeftBtn = new TerminalButton2({ position: new Vector3(2.56, 1.5, 3), rotation: new Quaternion(0, 0, 180) })
    this._moveFwdBtn = new TerminalButton({ position: new Vector3(2.88, 1.5, 3), rotation: new Quaternion(0, 0, 180) })
    this._moveBackBtn = new TerminalButton({ position: new Vector3(3.17, 1.5, 3), rotation: new Quaternion(0, 0, 0) })
    this._turnRightBtn = new TerminalButton2({ position: new Vector3(3.45, 1.5, 3), rotation: new Quaternion(0, 0, 0) })

    this.addComponent(new OnClick(
      () => {
        this._checkState();
        // this.getComponent(AudioSource).playOnce();
      },
      { hoverText: "Insert the key", distance: 6, button: ActionButton.PRIMARY }
      )
    )
  }

  public init(squid: Squid):void {
    this._squid = squid
  }

  private _checkState(): void {
    if (Global.HAS_KEY && !this._isActive) {
      this._activeButtons();
      this._key.hideIcon()

      const Sound = new Entity();
      engine.addEntity(Sound);
      Sound.addComponent(new AudioSource(new AudioClip("audio/insert_disc.mp3")))
      Sound.getComponent(AudioSource).playOnce();
      // 	const Disk = new AudioClip("audio/insert_disc.mp3");
      //  const sources = new AudioSource(Disk)
      // 	sources.playing = true

      const transform = this.getComponent(Transform)
      const transformCopy = { position: { ...transform.position }, rotation: { ...transform.rotation } }
      transformCopy.position.y -= 0.33
      // @ts-ignore
      const card = new TerminalCard(transformCopy)

      this.removeComponent(OnClick)
      this.addComponent(new OnClick(
        () => ui.displayAnnouncement('Use terminal buttons for action'),
        { hoverText: "Use buttons" }
        )
      )

      this._isActive = true
    } else {
      ui.displayAnnouncement('You need to find the key at first');
		  this.getComponent(AudioSource).playOnce();
    }
  }

  private _activeButtons(): void {
    const squid = this._squid
    this._moveFwdBtn.addComponent(
      new OnPointerDown((): void => {
        squid.move(Move.FORWARD)
      },
        { hoverText: "Move forward" })
    )
    this._moveFwdBtn.addComponent(
      new OnPointerUp((): void => {
        squid.move()
      })
    )

    this._moveBackBtn.addComponent(
      new OnPointerDown((): void => {
        squid.move(Move.BACK)
      },
        { hoverText: "Move back" })
    )
    this._moveBackBtn.addComponent(
      new OnPointerUp((): void => {
        squid.move()
      })
    )

    this._turnRightBtn.addComponent(
      new OnPointerDown((): void => {
        squid.rotate(Rotate.RIGHT)
      },
        { hoverText: "Turn right" })
    )
    this._turnRightBtn.addComponent(
      new OnPointerUp((): void => {
        squid.rotate();
      })
    )

    this._turnLeftBtn.addComponent(
      new OnPointerDown((): void => {
        squid.rotate(Rotate.LEFT)
      },
        { hoverText: "Turn left" })
    )
    this._turnLeftBtn.addComponent(
      new OnPointerUp((): void => {
        squid.rotate();
      })
    )
  }
}