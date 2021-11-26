import * as utils from '@dcl/ecs-scene-utils'
import * as ui from "@dcl/ui-scene-utils";

export default class Key extends Entity {
  constructor(model: GLTFShape, transform: Transform) {
    super()

    engine.addEntity(this)
    this.addComponent(model)
    this.addComponent(transform)

    // Create trigger for key
    this.addComponent(
      new utils.TriggerComponent(
        new utils.TriggerBoxShape(
          new Vector3(1, 5, 1),
          new Vector3(0, 0.75, 0)
        ),
        {
          onCameraEnter: () => {
            this.getComponent(Transform).scale.setAll(0)
            new ui.SmallIcon("images/key.png", -70, 355, 100, 100)
          },
          onCameraExit: () => {
            engine.removeEntity(this)
          },
        }
      )
    )
  }
}
