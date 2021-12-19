import * as utils from '@dcl/ecs-scene-utils'
import BaseEntity from "../base/baseEntity";
import * as ui from "@dcl/ui-scene-utils";
import Global from "../core/global";
import global from "../core/global";
import resources from "../resources";
import {EventMessage, QuestStateChangedEvent} from "../events/CustomEvents";

export default class Pill extends BaseEntity {

  constructor(transform: Transform) {
    super(new GLTFShape(resources.MODEL_PILL_RED), transform)

    this.addComponent(new utils.KeepRotatingComponent(Quaternion.Euler(0, 45, 0)))
	  this.addComponent(new AudioSource(new AudioClip(resources.SOUND_TAKE_TABLET)))

    const rings = new BaseEntity(new GLTFShape(resources.MODEL_RINGS), { position: new Vector3(0, -0.2, 0), scale: new Vector3(1.5,3, 1.5) })
    rings.setParent(this)
    this.addComponent(
      new utils.TriggerComponent(
        new utils.TriggerBoxShape(
          new Vector3(.2, .65, .2)
        ),
        {
          onCameraEnter: () => {
            if (global.HAS_PILL) return

            Global.HAS_PILL = true
            this.getComponent(AudioSource).playOnce()
            this.getComponent(Transform).scale.setAll(0)

            if (Global.IS_QUEST) {
              ui.displayAnnouncement('Wake up, Neo', 6, Color4.Green());
              global.events.fireEvent(new QuestStateChangedEvent(EventMessage.QUEST_END))
            }
          }
        }
      )
    )
  }
}