import BaseEntity from "./base/baseEntity"
import * as utils from "@dcl/ecs-scene-utils"
export class Capsule extends BaseEntity {

 
	constructor(shape: GLTFShape, transform: Transform, deltaPosition: number) {
		super(shape,transform);
	
		const startPos = transform.position;
		const endPos = new Vector3(startPos.x + deltaPosition,startPos.y,startPos.z);
	
		this.addComponent(
		  new utils.ToggleComponent(utils.ToggleState.Off, (value): void => {
			  if(value === utils.ToggleState.On) {
				 this.addComponentOrReplace(
					 new utils.MoveTransformComponent(
						 this.getComponent(Transform).position,
						 endPos,
						 0.5
					 )
				 )
			  } else {
				 this.addComponentOrReplace(
					 new utils.MoveTransformComponent(
						 this.getComponent(Transform).position,
						 startPos,
						 0.5
					 )
				 )
			  }
 
		  })
		);
	}
	
}
