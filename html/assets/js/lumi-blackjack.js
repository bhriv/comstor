// Lumi Blackjack

// var E_LEARNING = {

//   'course_uuid'  : 'VGBJ928H4013',
//   'course_iri'   : 'http://t2000inc.com/demos/lumijsbj/',

//   // 'student_name' : 'Jack Dealer',
//   // 'student_email': 'jack.d@t2000inc.com',
  
//   'student_name' : 'Gary Tester',
//   'student_email': 'gary.t@t2000inc.com',

//   'lrs_iri'      : 'https://ll.learningconsole.com/public/data/xAPI/',
//   'lrs_uid'      : 'f60b3c464e9fb807020e00d57bc0ba2854a2f84e',
//   'lrs_pwd'      : '71c3a27ff8909d7fc9f450dcb0d3dd425c49e4d9'

// };

// function Setup_Lumi()
//   {
//     Lumi.init(
//       E_LEARNING.course_uuid,
//       E_LEARNING.course_iri
//       );

//     Lumi.setLocker(
//       E_LEARNING.lrs_iri,
//       E_LEARNING.lrs_uid,
//       E_LEARNING.lrs_pwd,
//       null
//       );

//     Lumi.setLearner(
//       E_LEARNING.student_name,
//       E_LEARNING.student_email,
//       null
//       );

//     Lumi.cue(Lumi.VERB.LAUNCHED, 'Blackjack demo');
//   }

// Lumi.addVerb('DEAL');
// Lumi.addVerb('HIT');
// Lumi.addVerb('STAND');
// Lumi.addVerb('DOUBLEDOWN');
// Lumi.addVerb('INSURANCE');
// Lumi.addVerb('RESULT');

// // At game launch
 
// Setup_Lumi();
// Post a verb (in this case, the custom DEAL verb we added to Lumi above)
  // Playing the game...
// Lumi.broadcast(Lumi.VERB.DEAL, game_state);

// Sample game state object

// var game_state = {
//   "actor_id": '3p40paa87x90',
//   "verb": 'deal',
//   "player": {
//               "cards": ['AD', '4D'],
//               "card_value": 14
//             },
//   "dealer": {
//               "cards": ['10S'],
//               "card_value": 10
//             },
//   "bankroll": 500,
//   "wager": 100
// };


// // Game state object - user Action

// var game_state = {  
//   "actor": [
//     {
//       "actor_email": "john@test.com",
//       "actor_name": "John Smith",
//       "game_id": "dn7ik8n"
//     }
//   ],
//   "dealer_hand": [
//     {
//       "0": [
//         {
//           "deck": 1,
//           "rank": "2",
//           "suit": "CLUBS",
//           "value": 2  
//         }
//       ],
//       "1":[
//         {
//           "deck": 3,
//           "rank": "6",
//           "suit": "DIAMONDS",
//           "value": 6 
//         }
//       ]
//     }
//   ],
//   "player_hand": [
//     {
//       "0": [
//         {
//           "deck": 5,
//           "rank": "9",
//           "suit": "CLUBS",
//           "value": 9   
//         }
//       ],
//       "1":[
//         {
//           "deck": 0,
//           "rank": "3",
//           "suit": "CLUBS",
//           "value": 3 
//         }
//       ]
//     }
//   ],
//   "dealer_shows": 0,
//   "number_of_cards_face_up": 3,
//   "verb": "deal"
// }

// // Game state object - Game RESULT

// var game_state = {  
//   "actor": [
//     {
//       "actor_email": "john@test.com",
//       "actor_name": "John Smith",
//       "game_id": "dn7ik8n"
//     }
//   ],
//   "bankroll": "900.00",
//   "dealer_final_score": 18,
//   "player_final_score": 13,
//   "result": "You lose",
//   "wager": 100
// }