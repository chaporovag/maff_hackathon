import PhysicsEntity from "../base/physicsEntity";
import resources from "../resources";

export class Box extends PhysicsEntity {

  public isActive: boolean = false

  // @ts-ignore
  private _body: CANNON.Body
  // @ts-ignore
  private _world: CANNON.World

  constructor(shape: GLTFShape, transform: Transform) {
    super(shape, transform);
	  this.addComponent(new AudioSource(new AudioClip(resources.SOUND_DROP_CUBE)));
  }

  protected setBody(body: CANNON.Body) {
    this._body = body
  }

  public getBody(): CANNON.Body {
    return this._body
  }

  public init(cannonMaterial: CANNON.Material, world: CANNON.World): void {
    this._world = world
    const body = this._body
	 
    body.sleep()
    body.material = cannonMaterial
    body.linearDamping = 0.4
    body.angularDamping = 0.4
    world.addBody(body);
	
  }

  public playerPickup(): void {
    this.isActive = true
    this._body.sleep()
    this._body.position.set(Camera.instance.position.x, Camera.instance.position.y, Camera.instance.position.z)
    this.setParent(Attachable.FIRST_PERSON_CAMERA)
    this.getComponent(Transform).position.set(0, 0.75, 1.5);
	 const cube = new Entity()
	 engine.addEntity(cube)
	 cube.addComponent(new AudioSource(new AudioClip(resources.SOUND_TAKE_BOX)))
	 cube.getComponent(AudioSource).playOnce()
  }

  public playerDrop(dropDirection: Vector3): void {
    if (Camera.instance.position.equals(Vector3.Zero()))
      return

    this.isActive = false
    this.setParent(null)
	 
	 this.getComponent(AudioSource).playOnce();
    // Physics
    this._body.wakeUp()
    this._body.velocity.setZero()
    this._body.angularVelocity.setZero()

    const newPosition = new Vector3(
      Camera.instance.feetPosition.x + dropDirection.x * 1.4,
      Camera.instance.position.y + 0.6,
      Camera.instance.feetPosition.z + dropDirection.z * 1.4
    )

    if (newPosition.x >= 15) {
      newPosition.x = 13
      newPosition.y = 3
    }
    if (newPosition.x <= 1) {
      newPosition.x = 3
      newPosition.y = 3
    }
    if (newPosition.z >= 15) {
      newPosition.z = 13
      newPosition.y = 3
    }
    if (newPosition.z <= 1) {
      newPosition.z = 3
      newPosition.y = 3
    }

    this._body.position.set(
      newPosition.x,
      newPosition.y,
      newPosition.z,
    )
  }
}