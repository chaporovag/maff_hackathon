import * as utils from '@dcl/ecs-scene-utils'
import * as ui from "@dcl/ui-scene-utils";
import Global from "../core/global";
import BaseEntity from "../base/baseEntity";
import resources from "../resources";

export default class Key extends BaseEntity {
  // @ts-ignore
  private _icon: ui.SmallIcon

  constructor(transform: Transform) {
    super(new GLTFShape(resources.MODEL_KEY_CARD), transform)

    this.addComponent(new utils.KeepRotatingComponent(Quaternion.Euler(0, 255, 0)))
	  this.addComponent(new AudioSource(new AudioClip(resources.SOUND_TAKE_CARD)))

	  this.addComponent(
      new utils.TriggerComponent(
        new utils.TriggerBoxShape(
          new Vector3(0.3, 0.3, 0.3)
        ),
        {
          onCameraEnter: () => {
            if (Global.HAS_KEY) return
            Global.HAS_KEY = true
            this.getComponent(AudioSource).playOnce()
            this.getComponent(Transform).scale.setAll(0)
            this._icon = new ui.SmallIcon(resources.IMAGE_KEY, -50, 355, 100, 100)
          }
        }
      )
    )
  }

  public hideIcon(): void {
    if (this._icon) this._icon.hide()
  }

  public showIcon(): void {
    if (this._icon) this._icon.show()
  }
}
