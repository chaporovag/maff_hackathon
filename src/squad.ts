import * as utils from "@dcl/ecs-scene-utils"
import { SimpleMove } from "./move";
import BaseEntity from "./baseEntity";

export default class Squad extends BaseEntity {

  private _currentPos: Vector3
  private _simpleMove: SimpleMove

  constructor(shape: GLTFShape, transform: TransformConstructorArgs) {
    super(shape, transform);

    this._currentPos = this.getComponent(Transform).position

    this._simpleMove = new SimpleMove(this)
    engine.addSystem(this._simpleMove)
  }


  public forward(): void {
	  
	this.getComponent(Transform).translate(Vector3.Forward().scale(1))
  }
  public turnR(): void {
	this.addComponentOrReplace(new utils.KeepRotatingComponent(Quaternion.Euler(0, 10, 0)))
  }
  public turnL(): void { 
	this.addComponent(new utils.KeepRotatingComponent(Quaternion.Euler(0, -10, 0)))
  }
  public turnStop(): void {
	this.getComponent(utils.KeepRotatingComponent).stop()
	
  }
  
//   public move(): void {
// // >>>>>>> 5a1c499d91a9240a24972de6100ccfa7e7e698eb
// //     let path = []
// //     path[0] = this._currentPos
// //     path[1] = new Vector3(7, 0, 15)
// //     path[2] = new Vector3(15, 0, 15)
// //     path[3] = new Vector3(15, 0, 1)
// //     path[4] = this._currentPos
// // // >>>>>>> 563e155b530216459f8ece4a58168104b7f565cc

// //     // Move entity
// //     this.addComponentOrReplace(new utils.FollowCurvedPathComponent(path, 10, 80, true, false))
// //       // () => { this.getComponent(Transform).rotation = Quaternion.Euler(0, 0, 0) }))
//   }

  public startMove (dir: number) {
    this._simpleMove.rotateDirection = dir
  }

  public stopMove () {
    this._simpleMove.rotateDirection = 0
  }
}
