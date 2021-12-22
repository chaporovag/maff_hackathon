import * as utils from '@dcl/ecs-scene-utils'
import BaseEntity from "./base/baseEntity";
import * as ui from "@dcl/ui-scene-utils";
import Global from "../core/global";
import global from "../core/global";
import resources from "../resources";
import {EventMessage, QuestStateChangedEvent} from "../events/customEvents";

export default class Pill extends BaseEntity {

  private _isActive: boolean = true

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
            if (!this._isActive || global.HAS_PILL || !global.IS_QUEST) return
            this.getComponent(AudioSource).playOnce()
            if (Global.IS_QUEST) {
              ui.displayAnnouncement('Wake up, Neo', 6, Color4.Green());
              global.events.fireEvent(new QuestStateChangedEvent(EventMessage.QUEST_END))
            }
            Global.HAS_PILL = true
          }
        }
      )
    )
  }

  public setActive(value: boolean) {
    if (!Global.HAS_PILL) {
      this._isActive = value
      this.getComponent(Transform).scale.setAll(value ? 1 : 0)
    }
  }
}