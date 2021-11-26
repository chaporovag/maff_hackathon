import PhysicsEntity from "./base/physicsEntity";

export class Box extends PhysicsEntity {

  public isActive: boolean = false

  // @ts-ignore
  private _body: CANNON.Body
  // @ts-ignore
  private _world: CANNON.World

  constructor(transform: Transform) {
    super(new GLTFShape("models/crate.glb"), transform)
  }

  public init(cannonMaterial: CANNON.Material, world: CANNON.World): void {
    const transform = this.getComponent(Transform)

    // Create physics body for ball
    const body = new CANNON.Body({
      mass: 1, // kg
      position: new CANNON.Vec3(transform.position.x, transform.position.y, transform.position.z), // m
      shape: new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5)), // Create sphere shaped body with a diameter of 0.22m
    })

    // Add material and dampening to stop the ball rotating and moving continuously
    body.sleep()
    body.material = cannonMaterial
    body.linearDamping = 0.4
    body.angularDamping = 0.4
    world.addBody(body)

    this._world = world
    this._body = body

    this.addComponentOrReplace(
      new OnPointerDown(
        () => {
          this.playerPickup()
        },
        { hoverText: "Pick up", distance: 6, button: ActionButton.PRIMARY }
      )
    )
  }

  getBody(): CANNON.Body {
    return this._body
  }

  playerPickup(): void {
    this.isActive = true
    this._body.sleep()
    this._body.position.set(Camera.instance.position.x, Camera.instance.position.y, Camera.instance.position.z)
    this.setParent(Attachable.FIRST_PERSON_CAMERA)
    this.getComponent(Transform).position.set(0, -0.2, 1.4)
  }

  playerDrop(throwDirection: Vector3): void {
    this.isActive = false
    this.setParent(null)

    // Physics
    this._body.wakeUp()
    this._body.velocity.setZero()
    this._body.angularVelocity.setZero()

    this._body.position.set(
      Camera.instance.feetPosition.x + throwDirection.x,
      throwDirection.y + Camera.instance.position.y,
      Camera.instance.feetPosition.z + throwDirection.z
    )
  }
}