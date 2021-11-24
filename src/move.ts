export class SimpleMove implements ISystem {

  private _entity: Entity
  public rotateDirection: number

  constructor(entity: Entity) {
    this._entity = entity
    this.rotateDirection = 0
  }

  update () {
    if (!this.rotateDirection) return

    let transform = this._entity.getComponent(Transform)
    // let distance = Vector3.Backward().scale(0.1)
    // transform.translate(distance)
    if (this.rotateDirection === 1) {
      let distance = Vector3.Forward().scale(0.1)
      transform.translate(distance)
      // transform.rotate(Vector3.Up(), 3)
    } else {
      let distance = Vector3.Backward().scale(0.1)
      transform.translate(distance)
      // transform.rotate(Vector3.Down(), 3)
    }
  }
}