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

    this._turnLeftBtn = new TerminalButton({ position: new Vector3(2.5, 0.8, 2.05) })
    this._moveFwdBtn = new TerminalButton({ position: new Vector3(2.88, 0.8, 2), scale: new Vector3(0.75, 1, 0.75) })
    this._moveBackBtn = new TerminalButton({ position: new Vector3(3.17, 0.8, 2), scale: new Vector3(0.75, 1, 0.75) })
    this._turnRightBtn = new TerminalButton({ position: new Vector3(3.5, 0.8, 2.05) })

    this.addComponent(new OnClick(
      () => this._checkState(),
      { hoverText: "Insert the key", distance: 6, button: ActionButton.PRIMARY }
      )
    )
  }

  public init(squid: Squid, key: Key):void {
    this._squid = squid
    this._key = key
  }

  private _checkState(): void {
    if (Global.HAS_KEY && !this._isActive) {
      new TerminalCard(this.getComponent(Transform))
      this._activeButtons()

      this._key.hideIcon()
      this.removeComponent(OnClick)
      this.addComponent(new OnClick(
        () => ui.displayAnnouncement('Use terminal button for action'),
        { hoverText: "Use buttons" }
        )
      )

      this._isActive = true
    } else {
      ui.displayAnnouncement('You need to find the key at first')
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