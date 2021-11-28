import * as utils from '@dcl/ecs-scene-utils'
import * as ui from "@dcl/ui-scene-utils";
import Global from "./core/global";
import BaseEntity from "./base/baseEntity";

export default class Pill extends BaseEntity {
  // @ts-ignore
  private _icon: ui.SmallIcon

  constructor(transform: Transform) {
    super(new GLTFShape("models/pill_blue.glb"), transform)

    this.addComponent(new utils.KeepRotatingComponent(Quaternion.Euler(0, 45, 0)))
	  this.addComponent(new AudioSource(new AudioClip("audio/tablet_take.mp3")))
	 this.addComponent(
      new utils.TriggerComponent(
        new utils.TriggerBoxShape(
          new Vector3(.1, .1, .1)
        ),
        {
			  
          onCameraEnter: () => {
				this.getComponent(AudioSource).playOnce()
            this.getComponent(Transform).scale.setAll(0)
            Global.HAS_PILL = true;
          },
          onCameraExit: () => {
          
          },
        }
      ))
	
  }


}