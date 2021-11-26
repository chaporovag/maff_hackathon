
export class Battery extends Entity {
	isTake: boolean = false
 
	constructor( transform: Transform) {
	  super()
	  engine.addEntity(this)
	  this.addComponent(new BoxShape() )
	  this.addComponent(transform);
	 
	  this.addComponent(
		new OnPointerDown(
		  () => {
			this.isTake = true;
			this.getComponent(Transform).scale.setAll(0)
			
			
			
		}))
	}
	
}