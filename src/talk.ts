import { Dialog } from '@dcl/npc-scene-utils'
import { NPC, NPCState } from '@dcl/npc-scene-utils'
export let Talk: Dialog[] = [
  {
	// audio:"audio/Click.mp3",
    text:
	  `Welcome, adventurer! Now I show you how deep the rabbit-hole goes! To leave this place, you need to find the blue pill`,
	  isQuestion:true,
	  buttons : [ 
      {  label : ` RU ` ,  goToDialog : 1    ,
		triggeredActions :  ( )  =>  { 
			myNPC.dialog.closeDialogWindow()
			const canvas1 = new UICanvas()
			const RUdesc = new UIImage(canvas1, new Texture("images/RUdesc.png"))
			RUdesc.name = "clickable-image"
			RUdesc.width = "890px"
			RUdesc.height = "447px"
			RUdesc.sourceWidth = 890
			RUdesc.sourceHeight = 447
			RUdesc.isPointerBlocker = true
			RUdesc.visible = true
			RUdesc.onClick=new OnClick(()=>{
			RUdesc.height=0
})
		}}, {  label : `Next` ,  goToDialog : 1  }  ],
		
	offsetX:30,
	
  },

  {
    text: 
	`At first, you need to look around to get control panel key and find energy block for mechanical creature`,
	isQuestion:true,
	buttons : [ 
      {  label : ` RU ` ,  goToDialog : 5   ,
		triggeredActions :  ( )  =>  { 
			myNPC.dialog.closeDialogWindow()
			const canvas1 = new UICanvas()
			const RUdesc = new UIImage(canvas1, new Texture("images/RUdesc.png"))
			RUdesc.name = "clickable-image"
			RUdesc.width = "890px"
			RUdesc.height = "447px"
			RUdesc.sourceWidth = 890
			RUdesc.sourceHeight = 447
			RUdesc.isPointerBlocker = true
			RUdesc.visible = true
			RUdesc.onClick=new OnClick(()=>{
			RUdesc.height=0
})
		}}, {  label : `Next` ,  goToDialog : 2  }  ],
		
	offsetX:30,
  },
  {
    text: 
	 `Then use the key to activate control panel and move creature under the pill. Use boxes to jump higher!
	                 Good luck!`,
    isEndOfDialog: true,
	 isQuestion:true,
	 buttons : [ 
      {  label : ` RU ` ,  goToDialog : 2    ,
		triggeredActions :  ( )  =>  { 
			myNPC.dialog.closeDialogWindow()
			const canvas1 = new UICanvas()
			const RUdesc = new UIImage(canvas1, new Texture("images/RUdesc.png"))
			RUdesc.name = "clickable-image"
			RUdesc.width = "890px"
			RUdesc.height = "447px"
			RUdesc.sourceWidth = 890
			RUdesc.sourceHeight = 447
			RUdesc.isPointerBlocker = true
			RUdesc.visible = true
			RUdesc.onClick=new OnClick(()=>{
			RUdesc.height=0
})
		}}, {  label : `Close` ,  goToDialog : 5 ,triggeredActions :  ( )  =>  { 
			myNPC.dialog.closeDialogWindow()} }  ],
		
	offsetX:30,
  }
]
export let myNPC = new NPC({ position: new Vector3(10, 1, 10) }, 'models/box_big.glb', () => {
	myNPC.talk(Talk, 0);
// 	const canvas1 = new UICanvas()
// 		const clickableImage = new UIImage(canvas1, new Texture("images/ru.jpg"))
// 	clickableImage.name = "clickable-image"
// clickableImage.positionX=330
// clickableImage.positionY=-110
// clickableImage.width = "73px"

// clickableImage.height = "40px"
// clickableImage.sourceWidth = 73
// clickableImage.sourceHeight = 40
// clickableImage.isPointerBlocker = true
// clickableImage.visible = true
	
// clickableImage.onClick = new OnClick(() => {
// 	myNPC.dialog.closeDialogWindow()
// 	clickableImage.height=0
// 	myNPC.talk(Talk, 0,.01);
// 	const canvas2 = new UICanvas()

// const RUdesc = new UIImage(canvas1, new Texture("images/RUdesc.png"))
// RUdesc.name = "clickable-image"
// // RUdesc.positionX=330
// // RUdesc.positionY=-110
// RUdesc.width = "890px"
// RUdesc.height = "447px"
// RUdesc.sourceWidth = 890
// RUdesc.sourceHeight = 447
// RUdesc.isPointerBlocker = true
// RUdesc.visible = true
// RUdesc.onClick=new OnClick(()=>{
// 	RUdesc.height=0
// })
	
// })
	


 },{
	onlyClickTrigger: true,
	// onWalkAway: ( () => canvas1.height=1000),
	// darkUI:true,d
	portrait: { path: 'images/morf7.png',offsetX:80,offsetY:-20 },
 })