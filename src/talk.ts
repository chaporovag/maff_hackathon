import { Dialog } from '@dcl/npc-scene-utils'
import { dialogWindow } from './game'
import { pill } from './game';
import { wallCollider } from './game';
import Global from './core/global';
import { squid } from './game';

const morf = new UICanvas()

const morfImage = new UIImage(morf, new Texture("images/morf7.png"))
morfImage.name = "clickable-image"
morfImage.hAlign = 'right'
// morfImage.positionX=100
morfImage.positionY = 200
morfImage.width = "100px"
morfImage.height = "90px"
morfImage.sourceWidth = 200
morfImage.sourceHeight = 173
morfImage.isPointerBlocker = true
morfImage.visible = true

morfImage.onClick = new OnClick(() => {
	dialogWindow.openDialogWindow(Talk, 0);

})
const ru = new UICanvas()

const ruImage = new UIImage(ru, new Texture("images/ru.jpg"))
ruImage.name = "clickable-image"
ruImage.hAlign = 'right'
// ru.positionX=100
ruImage.positionY = 280
ruImage.width = "73px"
ruImage.height = "40px"
ruImage.sourceWidth = 73
ruImage.sourceHeight = 40
ruImage.isPointerBlocker = true
ruImage.visible = true

ruImage.onClick = new OnClick(() => {
	// dialogWindow.openDialogWindow(Talk, 0);
	RUdesc.visible = true
})

const canvas1 = new UICanvas()
const RUdesc = new UIImage(canvas1, new Texture("images/RUdesc.png"));
RUdesc.width = "0px"
RUdesc.name = "clickable-image"
RUdesc.width = "890px"
RUdesc.height = "447px"
RUdesc.sourceWidth = 890
RUdesc.sourceHeight = 447
RUdesc.isPointerBlocker = true
RUdesc.visible = false
canvas1.visible = false
RUdesc.onClick = new OnClick(() => {
	// canvas1.visible=false
	RUdesc.visible = false
})

export let Talk: Dialog[] = [
	{

		text:
			`Welcome, adventurer! Choose a mode: complete the quest or just watch the scene `,
		isQuestion: true,
		buttons: [
			{
				label: `Just watch`, goToDialog: 1,
				triggeredActions: () => {
					dialogWindow.closeDialogWindow();
					// Global.HAS_PILL=true
					// Global.HAS_KEY=true
					// Global.HAS_BATTERY=true
					Global.QUEST = false
					wallCollider.getComponent(Transform).scale.setAll(0);
					// pill.getComponent(Transform).scale.setAll(0);
					// pill.removeComponent(pill)
					// engine.removeEntity(pill);
					pill.removeAll()
					// Global._isActive = true

					// Terminal.
					// Global.events.

					// Squid._battery
					// pill.removeComponent;
					// engine.removeEntity(pill);
					// canvas1.visible=true
					// RUdesc.visible=true

				}
			}, {
				label: ` Quest `, goToDialog: 1, triggeredActions: () => {
					// Global._isActive = false
					// Global.HAS_PILL=false
					// Global.HAS_KEY=false
					// Global.HAS_BATTERY=false
					Global.QUEST = true
					wallCollider.getComponent(Transform).scale.setAll(1);
					pill.getComponent(Transform).scale.setAll(1);
					// let _key = new Key(new Transform({ position: new Vector3(11, 6.5, 14) }));
					// squid.getComponent(Transform).position = new Vector3(6,0.1,10)
					// squid.getComponent(Transform).rotation = Quaternion.Euler(0, 270, 0);
					// pill.removeComponent;
					// engine.removeEntity(pill);
					// global.HAS_PILL=true
					// global.HAS_KEY=true
					// global.HAS_BATTERY=true
					// pill.getComponent(Transform).position.scale.setAll(0)
					// set(12, 7.5, 6)
					// const pill = new Pill(new Transform({ position: new Vector3(12, 7.5, 6) }));
					pill.init(wallCollider)
				}
			}],

		offsetX: 30,
		portrait: {
			path: 'images/morf7.png',
			height: 173,
			width: 200,
			offsetX: 50,
			section: {
				sourceHeight: 173,
				sourceWidth: 200,

			},
		},
	},

	{
		text:
			`At first, you need to look around to get control panel key and find energy block for mechanical creatureNow I show you how deep the rabbit-hole goes! To leave this place, you need to find the blue pill`,
		// isQuestion:true,
		// buttons : [ 
		//    {  label : ` RU ` ,  goToDialog : 5   ,
		// 	triggeredActions :  ( )  =>  { 
		// 		dialogWindow.closeDialogWindow()
		// 		// canvas1.visible=true
		// 		RUdesc.visible=true

		// 	}}, {  label : `Next` ,  goToDialog : 2  }  ],

		offsetX: 30,
		portrait: {
			path: 'images/morf7.png',
			height: 173,
			width: 200,
			offsetX: 50,
			section: {
				sourceHeight: 173,
				sourceWidth: 200,

			},
		},
	},
	{
		text:
			`Then use the key to activate control panel and move creature under the pill. Use boxes to jump higher!
	                 Good luck!`,
		isEndOfDialog: true,
		//  isQuestion:true,
		//  buttons : [ 
		//    {  label : ` RU ` ,  goToDialog : 2    ,
		// 	triggeredActions :  ( )  =>  { 
		// 		dialogWindow.closeDialogWindow()
		// 		// canvas1.visible=true
		// 		RUdesc.visible=true

		// 	}}, {  label : `Close` ,  goToDialog : 5 ,triggeredActions :  ( )  =>  { 
		// 		dialogWindow.closeDialogWindow()} }  ],

		offsetX: 30,
		portrait: {
			path: 'images/morf7.png',
			height: 173,
			width: 200,
			offsetX: 50,
			section: {
				sourceHeight: 173,
				sourceWidth: 200,
			},
		},
	}
]
