import * as utils from "@dcl/ecs-scene-utils"

export default class Squad extends Entity {
  constructor(transform: TransformConstructorArgs) {
    super();

    engine.addEntity(this);

    this.addComponent(new GLTFShape('models/squid.glb'));
    this.addComponent(new Transform(transform));
  }

  public move(targetPos: Vector3): void {
    let currentPos = this.getComponent(Transform).position

    this.addComponentOrReplace(
      new utils.MoveTransformComponent(
        currentPos,
        targetPos,
        Math.abs(targetPos.x - currentPos.x) * 0.3,
        () => {

        }
      )
    )
  }
}