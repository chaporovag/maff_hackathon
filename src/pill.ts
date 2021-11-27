import * as utils from '@dcl/ecs-scene-utils'
import * as ui from "@dcl/ui-scene-utils";
import Global from "./core/global";
import BaseEntity from "./base/baseEntity";

export default class Pill extends BaseEntity {
  // @ts-ignore
//   private _icon: ui.SmallIcon

  constructor(transform: Transform) {
    super(new GLTFShape("models/Pill.glb"), transform)

    this.addComponent(new utils.KeepRotatingComponent(Quaternion.Euler(0, 45, 0)))
	 this.addComponent(new AudioSource(new AudioClip("audio/tablet_take.mp3")))
    // Create trigger for key
    this.addComponent(
		 new OnPointerDown(()=>{
			this.getComponent(Transform).scale.setAll(0)
			         // this._icon = new ui.SmallIcon("images/key.png", -70, 355, 100, 100)
			         Global.HAS_PILL = true
						this.getComponent(AudioSource).playOnce()
		 })
   //    new utils.TriggerComponent(
   //      new utils.TriggerBoxShape(
   //        new Vector3(0.1, 0.1, 0.1)
   //      ),
   //      {
   //        onCameraEnter: () => {
   //          this.getComponent(Transform).scale.setAll(0)
   //          this._icon = new ui.SmallIcon("images/key.png", -70, 355, 100, 100)
   //          Global.HAS_KEY = true
   //        },
   //        onCameraExit: () => {
   //          engine.removeEntity(this)
   //        },
   //      }
   //    )
    )
  }

//   public hideIcon(): void {
//     this._icon.hide()
//   }
}