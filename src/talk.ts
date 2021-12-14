import { Dialog } from '@dcl/npc-scene-utils'

export let Talk: Dialog[] = [
  {
    text:
	  `    Hello user! Now you will find out how deep the rabbit hole is! Until you get the blue pill, you cannot leave this location!`,
   
	offsetX:30
  },
  {
    text: 
	`     In order to get it, you need to activate a mobile platform in the form of a Squid and fit it under the pill. Then, with the help of boxes that you can carry, climb onto one of the Squid's legs and jump to get the pill.`,
  
  },
  {
    text: 
	 `     A squid needs a battery to move. You can control the Squid using the control panel, which requires a key. Good luck.`,
    isEndOfDialog: true
  }
]