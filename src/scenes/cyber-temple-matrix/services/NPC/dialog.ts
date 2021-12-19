import { Dialog } from '@dcl/npc-scene-utils'
import { monk } from './monk'

export const MonkDialog: Dialog[] = [
  // #0
  {
    text: "Greetings dear guest of the Art Fest Maff Metaverse!"
  },
  // #1
  {
    text: "Would you like to learn more about this place?",
    isQuestion: true,
    buttons: [
      { label: 'Yes', goToDialog: 3 },
      { label: 'No', goToDialog: 2 },
    ],
  },
  // #2
  {
    text: "Okay, I'll be around if you get curious!",
    isEndOfDialog: true,
    triggeredByNext: () => monk.playAnimation('Goodbye', true, 2),
  },
  // #3
  {
    text: 'It is with the greatest pleasure that I invite you to visit the art object of the Inception team called "Cyber Temple".'
  },
  // #4
  {
    text: '"Cyber Temple" is an allusion to the Matrix series of films, symbolizing the duality of the real and digital world.'
  },
  // #5
  {
    text: "In the center of the installation is a unique platform in the form of a giant squid machine, which is self-sufficient in itself as an art object and serves as a cyber altar."
  },
  // #6
  {
    text: "So you won't get bored with the cyber prayer, we prepared for you a small interactive quest."
  },
  // #7
  {
    text: "You will need to carefully examine all the space, find all the secrets by following the clues, activate the machine in the form of a squid, and make your choice.",
    triggeredByNext: () => monk.playAnimation('Goodbye', true, 2),
    isEndOfDialog: true,
  }
]