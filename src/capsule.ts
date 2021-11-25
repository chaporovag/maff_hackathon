
export class Capsule extends Entity {
	isOutside: boolean = false
 
	constructor( transform: Transform) {
	  super()
	  engine.addEntity(this)
	  this.addComponent(new GLTFShape("models/capsule.glb") )
	  this.addComponent(transform);
	  this.addComponent(
		new OnPointerDown(
		  () => {
			  if(!this.isOutside) {
			  let transform = this.getComponent(Transform)
			let distance = Vector3.Up().scale(1)
			transform.translate(distance);
			this.isOutside = true;
			  } else {
				let transform = this.getComponent(Transform)
				let distance = Vector3.Up().scale(-1)
				transform.translate(distance);
				this.isOutside = false;
			  }
		}))
	}
	
}