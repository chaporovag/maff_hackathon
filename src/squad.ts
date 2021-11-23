import * as utils from "@dcl/ecs-scene-utils"

export default class Squad extends Entity {

  private _currentPos: Vector3
  constructor(transform: TransformConstructorArgs) {
    super();

    engine.addEntity(this);

    this.addComponent(new GLTFShape('models/squid.glb'))
    this.addComponent(new Transform(transform))

    this._currentPos = this.getComponent(Transform).position
  }

  public move(targetPos: Vector3): void {
    let path = []
    path[0] = this._currentPos
    path[1] = new Vector3(7, 0, 15)
    path[2] = new Vector3(15, 0, 15)
    path[3] = new Vector3(15, 0, 1)
    path[4] = this._currentPos

    // Move entity
    this.addComponentOrReplace(new utils.FollowCurvedPathComponent(path, 10, 80, true, false,
      () => { this.getComponent(Transform).rotation = Quaternion.Euler(0, 0, 0) }))
  }
}