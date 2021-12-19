import * as ui from "@dcl/ui-scene-utils";
import Global from "../core/global";
import BaseEntity from "./base/baseEntity";
import resources from "../resources";

export default class Battery extends BaseEntity {
  // @ts-ignore
  private _icon: ui.SmallIcon

  constructor(transform: Transform) {
    super(new GLTFShape(resources.MODEL_ROBOT_BATTERY), transform)
	  this.addComponent(new AudioSource(new AudioClip(resources.SOUND_TAKE_CARD)))
    // Create trigger for key
    this.addComponent(
      new OnPointerDown(()=>{
        this.getComponent(Transform).scale.setAll(0)
			  this._icon = new ui.SmallIcon(resources.IMAGE_BATTERY, -50, 200, 100, 100)
        this.getComponent(AudioSource).playOnce()
        Global.HAS_BATTERY = true
		 },
        { hoverText: "Puck up", distance: 8 })
    )
  }

  public hideIcon(): void {
    if (this._icon) this._icon.hide()
  }

  public showIcon(): void {
    if (this._icon) this._icon.show()
  }
}