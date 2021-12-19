import BaseEntity from "../base/baseEntity"
import * as utils from "@dcl/ecs-scene-utils"
import global from "../core/global";
import Global from "../core/global";
import resources from "../resources";
import {EventMessage, CustomEvents} from "../events/CustomEvents";

export class Capsule {
	private _withBattery = false

	constructor(transform: Transform, deltaPosition: number) {
		const startPos = transform.position;
		const endPos = new Vector3(startPos.x , startPos.y, startPos.z+ deltaPosition);
		const capsule = new BaseEntity(new GLTFShape(resources.MODEL_CAPSULE), transform)
		const capsuleBase = new BaseEntity(new GLTFShape(resources.MODEL_CAPSULE_BASE), transform)
		capsuleBase.addComponent(new AudioSource(new AudioClip(resources.SOUND_PUSH_CAPSULE)));

		capsuleBase.addComponent(
			new OnClick((): void => {
				const toggleComponent = capsuleBase.getComponent(utils.ToggleComponent)
				if (!this._withBattery || (this._withBattery && !global.HAS_BATTERY && !toggleComponent.isOn()) || (this._withBattery && global.HAS_BATTERY) || !Global.IS_QUEST) {
					toggleComponent.toggle()
				}},
				{
					distance: 4
				}
			)
		)

		capsuleBase.addComponent(
			new utils.ToggleComponent(utils.ToggleState.Off, (value): void => {
				if (value === utils.ToggleState.On) {
					capsuleBase.getComponent(AudioSource).playOnce()

					capsuleBase.addComponentOrReplace(
						new utils.MoveTransformComponent(
							capsuleBase.getComponent(Transform).position,
							endPos,
							0.8,
							() => {
								if (this._withBattery) {
									global.events.fireEvent(new CustomEvents(EventMessage.CAPSULE_OPEN))
								}
							}
						)
					)
				} else {
					capsuleBase.addComponentOrReplace(
						new utils.MoveTransformComponent(
							capsuleBase.getComponent(Transform).position,
							startPos,
							0.8
						)
					)
					capsuleBase.getComponent(AudioSource).playOnce()
				}
			})
		);
	}

	public init(): void {
		this._withBattery = true
	}
}

