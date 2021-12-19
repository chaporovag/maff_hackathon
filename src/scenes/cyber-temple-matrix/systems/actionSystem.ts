import BaseEntity from "../base/baseEntity";
import Robot from "../entities/robot";
import global from "../core/global";

export default class ActionSystem implements ISystem {

  private readonly _entity: BaseEntity[]
  private _turnDirection: number
  private _moveDirection: number

  private _squad: Robot

  constructor(entity: BaseEntity[]) {
    this._entity = entity
    this._turnDirection = 0
    this._moveDirection = 0
    this._squad = entity[0] as Robot
  }

  update () {
    if (this._moveDirection) {
      const direction = this._moveDirection
      if (direction != 0) {
        this._squad.isActive = true
        this._entity.forEach(item => {
          const transform = item.getComponent(Transform)
          const distance = Vector3.Forward().rotate(transform.rotation)
          const sign = direction < 0 ? -1 : 1
          const delta = distance.scale(sign * 0.05)
          const newPos = Vector3.Zero().copyFrom(transform.position).add(delta)
          if (!(newPos.x > global.POSITION.x + 24.5 || newPos.x < global.POSITION.x + 5.25 || newPos.z > global.POSITION.z + 10.5 || newPos.z < global.POSITION.z + 5.5)) {
            transform.translate(delta)
          }
        })
        const position = this._squad.getComponent(Transform).position
        this._squad.getBody().position = new CANNON.Vec3(position.x, position.y, position.z)
        this._squad.isActive = false
      }
    }

    if (this._turnDirection) {
      const direction = this._turnDirection
      const sign = direction < 0 ? -1 : 1
      this._squad.isActive = true
      this._entity.forEach(item => {
        this._squad.isActive = true
        const transform = item.getComponent(Transform)
        if (sign > 0)
          transform.rotate(Vector3.Up(), 2)
        else
          transform.rotate(Vector3.Down(), 2)
      })
      const rotation = this._squad.getComponent(Transform).rotation
      const angle = rotation.eulerAngles.y / 180 * Math.PI
      this._squad.getBody().quaternion.setFromAxisAngle(new CANNON.Vec3(0,1,0), angle);
      this._squad.isActive = false
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