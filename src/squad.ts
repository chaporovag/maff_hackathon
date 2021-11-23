import * as utils from "@dcl/ecs-scene-utils"
let b=0
export default class Squad extends Entity {
  constructor(transform: TransformConstructorArgs) {
    super();

    engine.addEntity(this);

    this.addComponent(new GLTFShape('models/squid.glb'));
    this.addComponent(new Transform(transform));
  }

  public move(targetPos: Vector3): void {
    let currentPos = this.getComponent(Transform).position
	 let path = []
	 path[0] = new Vector3(0, 0, 0)
	 path[1] = new Vector3(5, 0, 8)
	 path[2] = new Vector3(1, 0, 8)
	//  path[2] = new Vector3(1, 0, 12)
	//  path[3] = new Vector3(6, 0, 8)
	 
	 // Move entity
	 this.addComponentOrReplace(
	 new utils.FollowCurvedPathComponent(path, 5, 40,true))
   //  this.addComponentOrReplace(
   //    new utils.MoveTransformComponent(
   //      currentPos,
   //      targetPos,
   //      Math.abs(targetPos.x - currentPos.x) * 0.3,
   //      () => {

   //      }
   //    )
   //  )
  }
}