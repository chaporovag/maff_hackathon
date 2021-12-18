import BaseEntity from "./base/baseEntity"
import * as utils from "@dcl/ecs-scene-utils"
import UpdateEvent, {EventMessage} from "./events/updateEvent";
import global from "./core/global";
import Global from "./core/global";

export class Capsule {
	private _withBattery = false

	constructor(transform: Transform, deltaPosition: number) {
		const startPos = transform.position;
		const endPos = new Vector3(startPos.x , startPos.y, startPos.z+ deltaPosition);
		const cocoon = new BaseEntity(new GLTFShape('models/cocoon.glb'), transform)
		const cocoonBase = new BaseEntity(new GLTFShape('models/cocoon_base.glb'), transform)
		cocoonBase.addComponent(new AudioSource(new AudioClip("audio/push_back_capsule.mp3")));

		cocoonBase.addComponent(
			new OnClick((): void => {
				const toggleComponent = cocoonBase.getComponent(utils.ToggleComponent)
				if (!this._withBattery || (this._withBattery && !global.HAS_BATTERY && !toggleComponent.isOn()) || (this._withBattery && global.HAS_BATTERY)||!Global.QUEST) {
					toggleComponent.toggle()
				}},
				{
					distance: 4
				}
			)
		)

		cocoonBase.addComponent(
			new utils.ToggleComponent(utils.ToggleState.Off, (value): void => {
				if (value === utils.ToggleState.On) {
					cocoonBase.getComponent(AudioSource).playOnce()

					cocoonBase.addComponentOrReplace(
						new utils.MoveTransformComponent(
							cocoonBase.getComponent(Transform).position,
							endPos,
							0.8,
							() => {
								if (this._withBattery) {
									global.events.fireEvent(new UpdateEvent(EventMessage.CAPSULE_OPEN))
								}
							}
						)
					)
				} else {
					cocoonBase.addComponentOrReplace(
						new utils.MoveTransformComponent(
							cocoonBase.getComponent(Transform).position,
							startPos,
							0.8
						)
					)
					cocoonBase.getComponent(AudioSource).playOnce()
				}
			})
		);
	}

	public init(): void {
		this._withBattery = true
	}
}

