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
// <<<<<<< HEAD
//     let currentPos = this.getComponent(Transform).position
// 	 let path = []
// 	 path[0] = new Vector3(0, 0, 0)
// 	 path[1] = new Vector3(5, 0, 8)
// 	 path[2] = new Vector3(1, 0, 8)
// 	//  path[2] = new Vector3(1, 0, 12)
// 	//  path[3] = new Vector3(6, 0, 8)
	 
// 	 // Move entity
// 	 this.addComponentOrReplace(
// 	 new utils.FollowCurvedPathComponent(path, 5, 40,true))
//    //  this.addComponentOrReplace(
//    //    new utils.MoveTransformComponent(
//    //      currentPos,
//    //      targetPos,
//    //      Math.abs(targetPos.x - currentPos.x) * 0.3,
//    //      () => {
// =======
    let path = []
    path[0] = this._currentPos
    path[1] = new Vector3(7, 0, 15)
    path[2] = new Vector3(15, 0, 15)
    path[3] = new Vector3(15, 0, 1)
    path[4] = this._currentPos
// >>>>>>> 563e155b530216459f8ece4a58168104b7f565cc

    // Move entity
    this.addComponentOrReplace(new utils.FollowCurvedPathComponent(path, 10, 80, true, false,
      () => { this.getComponent(Transform).rotation = Quaternion.Euler(0, 0, 0) }))
  }
}