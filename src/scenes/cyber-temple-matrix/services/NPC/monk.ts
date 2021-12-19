import {NPC, NPCDelay } from '@dcl/npc-scene-utils'
import { config } from './config'
import { MonkDialog } from './dialog'
import resources from "../../resources";

export const monk = new NPC(
  {position: config.position,rotation: config.rotation},
  resources.MODEL_MONK,
  
  () => {
    // animations
    monk.playAnimation('Hello', true, 2)

    let dummyent = new Entity()
    dummyent.addComponent(
      new NPCDelay(2, () => {
        monk.playAnimation('Talk')
      })
    )
    engine.addEntity(dummyent)

    // sound
    monk.addComponentOrReplace(new AudioSource(new AudioClip(resources.SOUND_MONK)))
    monk.getComponent(AudioSource).playOnce()

    // dialog UI
    monk.talk(MonkDialog)
  },
  {
	onlyClickTrigger: true,
    faceUser: true,
    hoverText: config.hovertext,
    reactDistance: config.reactDistance,
    portrait: {
      path: resources.IMAGE_MONK,
      height: 256,
      width: 256,
      section: {
        sourceHeight: 512,
        sourceWidth: 512,
      },
    },
    onWalkAway: () => {
      monk.playAnimation('Goodbye', true, 2)
    },
  }
)