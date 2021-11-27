export default class ActionSystem implements ISystem {

  private readonly _entity: Entity
  private readonly _transform: Transform
  private _turnDirection: number
  private _moveDirection: number

  constructor(entity: Entity) {
    this._entity = entity
    this._transform = this._entity.getComponent(Transform)
    this._turnDirection = 0
    this._moveDirection = 0
  }

  update () {
    if (this._moveDirection) {
      const direction = this._moveDirection
      if (direction != 0) {
        const distance = Vector3.Forward().rotate(this._transform.rotation)
        const sign = direction < 0 ? -1 : 1
        this._transform.translate(distance.scale(sign * 0.1))
      }
    }

    if (this._turnDirection) {
      const direction = this._turnDirection
      const sign = direction < 0 ? -1 : 1
      if (sign > 0)
        this._transform.rotate(Vector3.Up(), 2)
      else
        this._transform.rotate(Vector3.Down(), 2)
    }
  }

  public moveForward (): void {
    this._moveDirection = 1
  }

  public moveBack (): void {
    this._moveDirection = -1
  }

  public moveStop (): void {
    this._moveDirection = 0
  }

  public turnRight (): void {
    this._turnDirection = 1
  }

  public turnLeft (): void {
    this._turnDirection = -1
  }

  public turnStop (): void {
    this._turnDirection = 0
  }
}