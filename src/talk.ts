import { Dialog } from '@dcl/npc-scene-utils'

export let Talk: Dialog[] = [
  {
	// audio:"audio/Click.mp3",
    text:
	  `Welcome, adventurer! Now I show you how deep the rabbit-hole goes! To leave this place, you need to find the blue pill`,
   
	offsetX:30,
	
  },
  {
    text: 
	`At first, you need to look around to get control panel key and find energy block for mechanical creature`,
	// audio:"audio/Click.mp3"
  },
  {
    text: 
	 `Then use the key to activate control panel and move creature under the pill. Use boxes to jump higher!
	                 Good luck!`,
    isEndOfDialog: true,
	//  audio:"audio/Click.mp3"
  }
]