import BaseEntity from "./base/baseEntity"
import * as utils from "@dcl/ecs-scene-utils"
import Global from "./core/global";
import Key from "./key";

import * as ui from "@dcl/ui-scene-utils";

export class Capsule extends Entity {
	
 
	constructor( transform: Transform, deltaPosition: number) {
		super();

		const startPos = transform.position;
		const endPos = new Vector3(startPos.x + deltaPosition,startPos.y,startPos.z);
		const cocon = new BaseEntity(new GLTFShape('models/cocon.glb'), transform)
		const coconBase = new BaseEntity(new GLTFShape('models/cocon_base.glb'), transform)
		coconBase.addComponent(new AudioSource(new AudioClip("audio/push_back_capsule.mp3")));
		coconBase.addComponent(
			new OnClick(():void=>{

				coconBase.getComponent(AudioSource).playOnce()
				coconBase.getComponent(utils.ToggleComponent).toggle()
			})
		)
		coconBase.addComponent(
		  new utils.ToggleComponent(utils.ToggleState.Off, (value): void => {
			  if(value === utils.ToggleState.On) {
				 coconBase.addComponentOrReplace(
					 new utils.MoveTransformComponent(
						 coconBase.getComponent(Transform).position,
						 endPos,
						 0.5
					 )
				 )
				//  Global.pushed_back = true
				//  const key= new Key(new Transform({ position: new Vector3(14, 2, 12) }));
				 
			  } else {
				coconBase.addComponentOrReplace(
					 new utils.MoveTransformComponent(
						 coconBase.getComponent(Transform).position,
						 startPos,
						 0.5
					 )
				 )
			  }
 
		  })
		);
		cocon.addComponent(
			new utils.ToggleComponent(
			  utils.ToggleState.Off,
			  (value1: utils.ToggleState) => {
				 if (value1 == utils.ToggleState.On) {
					this.addComponentOrReplace(
					  new utils.MoveTransformComponent(startPos, endPos, 2, () => {
						 this.getComponent(utils.ToggleComponent).toggle()
					  })
					)
				 } else {
					this.addComponentOrReplace(
					  new utils.MoveTransformComponent(endPos, startPos, 2, () => {
						 this.getComponent(utils.ToggleComponent).toggle()
					  })
					)
				 }
			  }
			)
		 )
		 cocon.getComponent(utils.ToggleComponent).toggle()
	  }
		// const origin: Vector3 = Vector3.Zero()
		// const target: Vector3 = Vector3.Zero()
		// const fraction: number = 0;
		// // let UpCheck = startPos.y+0.5
		// let Up = new Vector3(startPos.x,startPos.y+.5,startPos.z)
		// let Down = new Vector3(startPos.x,startPos.y,startPos.z)
		// // if(cocon.getComponent(Transform).position.y==0) {
		// // cocon.addComponent(
		// // 	new utils.MoveTransformComponent(Down, Up, 2))}
		// // if(cocon.getComponent(Transform).position==Up) {
		// // cocon.addComponent(new utils.MoveTransformComponent(Up, Down, 2))}
		// while(true)
		// {cocon.addComponent( new utils.MoveTransformComponent(Up, Down, 2) )}
	}
	
	

