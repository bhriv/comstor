// Main.js non-minified

var E_LEARNING = {
  'course_id'   : 'VGBJIIQO4883VA3',
  'course_iri'  : 'http://t2000inc.com/technologies/lumijs4/',
  'locker_id'   : '641ffecc2a18a87cab42ebd8fadb4bf9'
};

// ===========================
// Force Login for some Links
// ===========================

function you_must_login(){
  alert('Please Log In.')
}

/*
- JavaScript Blackjack based on js by Chris Clower (clowerweb.com). 
- Deck class loosely based on a tutorial at: http://www.codecademy.com/courses/blackjack-part-1
- API card http://deckofcardsapi.com/
*/



/*

A JavaScript Blackjack game created June 2013 by Chris Clower 
(clowerweb.com). Deck class loosely based on a tutorial at:
http://www.codecademy.com/courses/blackjack-part-1

All graphics and code were designed/written by me except for the
chip box on the table, which was taken from the image at:
http://www.marketwallpapers.com/wallpapers/9/wallpaper-52946.jpg

Uses Twitter Bootstrap and jQuery, which also were not created by
me :)

Fonts used:
* "Blackjack" logo: Exmouth
* Symbol/floral graphics: Dingleberries
* All other fonts: Adobe Garamond Pro

All graphics designed in Adobe Fireworks CS6

You are free to use or modify this code for any purpose, but I ask
that you leave this comment intact. Please understand that this is
still very much a work in progress, and is not feature complete nor
without bugs.

I will also try to comment the code better for future updates :D

*/

/*global $, confirm, Game, Player, renderCard, Card, setActions, 
resetBoard, showBoard, showAlert, getWinner, jQuery, wager */


/***********************************************************************************/
/*************************** Deck of Cards API Dealing *****************************/
/***********************************************************************************/

// set variable to switch API version on/off
var use_DeckOfCardsAPI = false;

// if (use_DeckOfCardsAPI) {
//   function get_card_data(){
//       console.log('===XXXXXX    BEGIN  get_card_data   XXXXX====');
//       // ajax URLs
//       var stored_DeckOfCards_id = localStorage.getItem( 'DeckOfCards_id');
//       var url_draw_card_DeckOfCards = base_url_DeckOfCards + stored_DeckOfCards_id +'/draw/?count=1';
//       // store results from these static URLs as objects to use with promises
//       var draw_card_DeckOfCards = $.getJSON(url_draw_card_DeckOfCards);
//       if (draw_card_DeckOfCards != '') {
//         return { // return array of data including labels for access
//           draw_card_DeckOfCards: draw_card_DeckOfCards
//         } 
//       }else{
//         console.log('get_card_data failed');
//       }
//       console.log('===XXXXXX    END  get_card_data   XXXXX====');
//   }
// };



/***********************************************************************************/
/*************************** Blackjack Game ****************************************/
/***********************************************************************************/

(function () {

  /*****************************************************************/
  /*************************** Globals *****************************/
  /*****************************************************************/

  var game      = new Game(),
      player    = new Player(),
      dealer    = new Player(),
      running   = false,
      blackjack = false,
      insured   = 0,
      deal;

  /*****************************************************************/
  /*************************** Classes *****************************/
  /*****************************************************************/

  function Player() {

    var hand  = [],
        wager = 0,
        cash  = 1000,
        bank  = 0,
        ele   = '',
        score = '';

    this.getElements = function() {
      if(this === player) {
        ele   = '#phand';
        score = '#pcard-0 .popover-content';
      } else {
        ele   = '#dhand';
        score = '#dcard-0 .popover-content';
      }
      return {'ele': ele, 'score': score};
    };

    this.getHand = function() {
      return hand;
    };

    this.setHand = function(card) {
      hand.push(card);
    };

    this.resetHand = function() {
      hand = [];
      console.log('resetHand');
    };

    // Wager ---------------------------------

    this.getWager = function() {
      return wager;
    };

    this.setWager = function(money) {
      wager += parseInt(money, 0);
    };

    this.resetWager = function() {
      wager = 0;
    };

    this.checkWager = function() {
      return wager <= cash ? true : false;
      console.log('checkWager');
    };

    // Cash ---------------------------------

    this.getCash = function() {
      console.log('getCash');
      return cash.formatMoney(2, '.', ',');
    };

    this.setCash = function(money) {
      console.log('setCash');
      cash += money;
      this.updateBoard();
    };

    this.getBank = function() {
      console.log('getBank');
      $('#bank').html('Winnings: $' + bank.formatMoney(2, '.', ','));

      if(bank < 0) {
        $('#bank').html('Winnings: <span style="color: #D90000">-$' + 
        bank.formatMoney(2, '.', ',').toString().replace('-', '') + '</span>');
      }
    };

    this.setBank = function(money) {
      console.log('setBank');
      bank += money;
      this.updateBoard();
    };

    this.flipCards = function() {
      console.log('flipCards');
      $('.down').each(function() {
        $(this).removeClass('down').addClass('up');
        renderCard(false, false, false, $(this));
        console.log('flipCards');
      });

      $('#dcard-0 .popover-content').html(dealer.getScore());
    };
  
  } // END Player()

  /*****************************************************************/
  /*************************** Build the Deck **********************/
  /*****************************************************************/

  function Deck() {
    var ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'],
  // TEST DECKS 
    // var ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'],
    // var ranks = ['A', '2', '3', '4', '5'],
    // var ranks = ['A', '10', 'J', 'Q', 'K'],
        // suits = ['&#9824;', '&#9827;', '&#9829;', '&#9670;'],
        suits = ['SPADES', 'CLUBS', 'HEARTS', 'DIAMONDS'],
        deck  = [],
        i, x, card;

    this.getDeck = function() {
      return this.setDeck();
      console.log('getDeck');
    };

    var deck_stack = 6;

    this.setDeck = function() {
      for(i = 0; i < ranks.length; i++) {
        for(x = 0; x < suits.length; x++) {
          // Set the number of Decks
          // @TODO - pull from user selection
          for(d = 0; d < deck_stack; d++) {
            card = new Card({'rank': ranks[i]});
            deck.push({
              'deck' : d,
              'rank' : ranks[i],
              'suit' : suits[x],
              'value': card.getValue()
            });

          }
        }
      }
      // Cut the Deck 
      var total_cards = getDeckSize(deck);
      console.log('total_cards: '+total_cards);
      var deck_penetration = 5;
      var deck_cut_ratio = deck_penetration/deck_stack;
      console.log('deck_cut_ratio: '+deck_cut_ratio);
      var cut_deck_total_cards = Math.round(total_cards*deck_cut_ratio);
      console.log('DECK HAS BEEN CUT to '+cut_deck_total_cards+' cards');
      var cut_deck = _.first(deck, [cut_deck_total_cards]);
      var cut_deck_size = getDeckSize(cut_deck);
      // Shuffle the Deck
      var shuffled_cut_deck = _.shuffle(cut_deck);
      console.log('Cut Deck has been shuffled');
      // Play with a cut stack of 6 decks
      deck = shuffled_cut_deck;
      return deck;
    };
  }// Deck() is redundant when using API version

  function getDeckSize(shuffled) {
    var deck_size = _.size(shuffled);
    return deck_size;
  };

  /*****************************************************************/
  /*************************** Shuffle the Deck ********************/
  /*****************************************************************/

  function Shuffle(deck) {
    // deck = cut_shuffled_deck replaces this function
    var set      = deck.getDeck(),
        shuffled = [],
        card;

    this.setShuffle = function() {
      while(set.length > 0) {
        card = Math.floor(Math.random() * set.length);

        shuffled.push(set[card]);
        set.splice(card, 1);
      }
      return shuffled;
    };

    this.getShuffle = function() {  
      return this.setShuffle();
    };
  }
  // redundant with API version, replace with New Deck / shuffle 

  /*****************************************************************/
  /*************************** Construct a Card ********************/
  /*****************************************************************/

  function Card(card) {

    this.getRank = function() {
      return card.rank;
      var card_rank = card.rank;
      // if (use_DeckOfCardsAPI) {
      //   var api_card = card[0].value;
      //   var static_card = card.value;
      //   console.log('card_rank('+card_rank+') api_card('+api_card+') static_card('+static_card+')');
      // };
    };

    this.getSuit = function() {
      return card.suit;
    };

    this.getValue = function() {
      var rank  = this.getRank(),
          value = 0;

      if(rank === 'A') {
        value = 11;
      } else if(rank === 'K') {
        value = 10;
      } else if(rank === 'Q') {
        value = 10;
      } else if(rank === 'J') {
        value = 10;
      } else {
        value = parseInt(rank, 0);
      }
      return value;
    };

  }

  /*****************************************************************/
  /*************************** Deal a Card *************************/
  /*****************************************************************/

  function Deal() {
    console.log('Dealing...');
    localStorage.setItem( 'dealer_up_card','' );
    // set game ID to new ID evertime we deal
    setGameID();
    checkGameID();
    checkPlayerName();
    // Original
    var deck     = new Deck(),
        shuffle  = new Shuffle(deck),
        shuffled = shuffle.getShuffle(),
        card;
    // getDeckSize(shuffled);
    this.getCard = function(sender) {
      this.setCard(sender);
      return card;
    };

    var both_cards = [];
    var cards_dealt_to_table = 0;

    this.setCard = function(sender) {
      console.log('setCard');
      cards_dealt_to_table++;
      // Get API Deck
      // var url_draw_card_DeckOfCards = null;
      card = shuffled[0];
      shuffled.splice(card, 1);
      // original static card values
      // if (!use_DeckOfCardsAPI) {
      sender.setHand(card);
      // if (use_DeckOfCardsAPI) {
      //   var this_card_data = getApiCard();
      //   // var this_draw_card = card_data.draw_card_DeckOfCards;
      //   $.when(this_card_data).done(function(this_card_data_json) {
        
      //     console.log('INTERNAL this_card_data DONE');
      //     console.log(both_cards);
      //     sender.setHand(card);
      //   }); 
      // };
      var player_Score = player.getScore();
      var dealer_Score = dealer.getScore();
      var player_current_hand = player.getHand();
      // console.log('player_current_hand: ');
      // console.log(player_current_hand);
      if (cards_dealt_to_table > 2) {
        var c1 = player_current_hand[0].rank;
        var c2 = player_current_hand[1].rank;
        console.log('c1: '+c1);
        console.log('c2: '+c2);
        localStorage.setItem('player_card_1_rank', c1);
        localStorage.setItem('player_card_2_rank', c2);
      };
      // if (cards_dealt_to_table > 4) {
      //   var c3 = player_current_hand[2].rank;
      //   console.log('c3: '+c3);
      //   localStorage.setItem('player_card_3_rank', c1);
      // };

      trackHandTotal(player_Score,dealer_Score,cards_dealt_to_table,player_current_hand);
    }; // end setCard

    /* if (use_DeckOfCardsAPI) {

      function getApiCard(){
        // Get AJAX call data
        var card_data = get_card_data();
        var draw_card = card_data.draw_card_DeckOfCards;
        // Set new card array variables
        var card_from_deck = [];
        var new_card = [];

        $.when(draw_card).done(function(draw_card_DeckOfCards_json) {
          console.log('------------ draw_card DONE, continue ... ------------');
          console.log(draw_card_DeckOfCards_json);
          
          // Check for API response before progressing
          if (draw_card_DeckOfCards_json['success']) {

            console.log('success: '+draw_card_DeckOfCards_json['success']);
            console.log('remaining:' +draw_card_DeckOfCards_json['remaining']);
            
            var card_from_deck = draw_card_DeckOfCards_json['cards'];
            // console.log(card_from_deck);
            console.log('NEW CARD OBJECT both_cards:');
            // _.extend(destination, *sources) 
            new_card = card;
            both_cards = _.extend(new_card, card_from_deck);
            console.log(both_cards);

            var api_card_value = both_cards[0].value;
            var static_card_value = both_cards.value;
            console.log('api_card('+api_card_value+') static_card('+static_card_value+')');

            return both_cards;
            // send array with both card values for testing
          }
          else{ // show error message if there are no cards left to draw, prompt to shuffle / get new deck 
            var error_msg = draw_card_DeckOfCards_json['error'];
            alert(error_msg);
          }; // end check for API response
          console.log('------------ END draw_card_from_DeckOfCards ------------');
        }); // Call the callback
      }
    }; // END use API
    */
    
    this.dealCard = function(num, i, obj) {
      if(i >= num) { return false; }

      var sender   = obj[i],
          elements = obj[i].getElements(),
          score    = elements.score,
          ele      = elements.ele,
          dhand    = dealer.getHand();

      deal.getCard(sender);
      // deal 3 cards to start the game
      if(i < 3) {
        renderCard(ele, sender, 'up');
        $(score).html(sender.getScore());
      } else {
        // deal the 4th card (to dealer) face down
        renderCard(ele, sender, 'down');
      }

      if(player.getHand().length < 3) {
        if(dhand.length > 0 && dhand[0].rank === 'A') {
          console.log('insurance triggered');
          localStorage.setItem( 'dealer_up_card','11' );
          setActions('insurance');
        }
        if(player.getScore() === 21) {

          if(!blackjack) {
            blackjack = true;
            // set Badge for Blackjack
            getWinner();
          } else {
            dealer.flipCards();
            $('#dscore span').html(dealer.getScore());
          }
        } 
        else {
          if(dhand.length > 1) {
            setActions('run');
          }
        }
      }

      function showCards() {
        setTimeout(function() {
          deal.dealCard(num, i + 1, obj);
        }, 500);
      }

      clearTimeout(showCards());
    };
  }
  
  /*****************************************************************/
  /*************************** Run the Game ********************/
  /*****************************************************************/

  function Game() {
    this.newGame = function() {

      var wager = $.trim($('#wager').val());

      player.resetWager();
      player.setWager(wager);

      if(player.checkWager()) {
        $('#deal').prop('disabled', true);
        resetBoard();
        player.setCash(-wager);

        deal      = new Deal();
        running   = true;
        blackjack = false;
        insured   = false;

        player.resetHand();
        dealer.resetHand();
        showBoard();
      } 
      else {
        player.setWager(-wager);
        $('#alert').removeClass('alert-info alert-success').addClass('alert-error');
        showAlert('Wager cannot exceed available cash!');
      }
    };
  }

  /*****************************************************************/
  /************************* Extensions ****************************/
  /*****************************************************************/

  Player.prototype.hit = function(dbl) {
    var pscore;
    deal.dealCard(1, 0, [this]);
    pscore = player.getScore();
    if(dbl || pscore > 21) {
      running = false;
      setTimeout(function() {player.stand();}, 500);
    } 
    else {
      this.getHand();
    }
    setActions();
    player.updateBoard();
  };

  Player.prototype.stand = function() {
    // localStorage.setItem('hand_is_ended','true');
    var timeout = 0;

    running = false;
    dealer.flipCards();

    function checkDScore() {
      if(dealer.getScore() < 17 && player.getScore() <= 21) {
        timeout += 200;

        setTimeout(function() {
          
          // dealer stands on all 17's
          dealer.hit();
          checkDScore();
        }, 500);
      } 
      else {
        setTimeout(function() {
          getWinner();
        }, timeout);
      }
    }
    checkDScore();
  };

  Player.prototype.dbl = function() {
    var wager = this.getWager();

    if(this.checkWager(wager * 2)) {
      $('#double').prop('disabled', true);
      this.setWager(wager);
      this.setCash(-wager);
      
      this.hit(true);
    } else {
      $('#alert').removeClass('alert-info alert-success').addClass('alert-error');
      showAlert('You don\'t have enough cash to double down!');
    }
  };

  Player.prototype.split = function() {
    $('#alert').removeClass('alert-info alert-success').addClass('alert-error');
    showAlert('Split function is not yet working.');
  };

  Player.prototype.insure = function() {
    var wager    = this.getWager() / 2,
        newWager = 0;

    $('#insurance').prop('disabled', true);
    this.setWager(wager);

    if(this.checkWager()) {
      newWager -= wager;
      this.setCash(newWager);
      insured = wager;
    } else {
      this.setWager(-wager);
      $('#alert').removeClass('alert-info alert-success').addClass('alert-error');
      showAlert('You don\'t have enough for insurance!');
    }
  };

  Player.prototype.getScore = function() {
    var hand  = this.getHand(),
        score = 0,
        aces  = 0,
        i;

    for(i = 0; i < hand.length; i++) {
      score += hand[i].value;

      if(hand[i].value === 11) { aces += 1; }

      if(score > 21 && aces > 0) {
        score -= 10;
        aces--;
      }
    }

    return score;
    console.log('getScore');
  };

  Player.prototype.updateBoard = function() {
    console.log('xxxx updateBoard xxxxxxx');

    var score = '#dcard-0 .popover-content';

    if(this === player) {
      score = '#pcard-0 .popover-content';
    }

    $(score).html(this.getScore());
    $('#cash span').html(player.getCash());
    player.getBank();
  };

  Number.prototype.formatMoney = function(c, d, t) {
    console.log('formatMoney');
    var n = this, 
        s = n < 0 ? '-' : '',
        i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + '',
        j = i.length;
        j = j > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : '');
  };

  /*****************************************************************/
  /************************** Functions ****************************/
  /*****************************************************************/

  (function($) {
    $.fn.disableSelection = function() {
      return this.attr('unselectable', 'on')
                 .css('user-select', 'none')
                 .on('selectstart', false);
    };
  }(jQuery));

  (function($) {
    $.fn.numOnly = function() {
      this.on('keydown', function(e) {
        if(e.keyCode === 46 || e.keyCode === 8 || e.keyCode === 9 || e.keyCode === 27 || e.keyCode === 13 || (e.keyCode === 65 && e.ctrlKey === true) || (e.keyCode >= 35 && e.keyCode <= 39)) {
          return true;
        } else {
          if(e.shifKey || ((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105))) {
            e.preventDefault();
          }
        }
      });
    };
  }(jQuery));

  function showAlert(msg) {
    $('#alert span').html('<strong>' + msg + '</strong>');
    $('#alert').fadeIn();
  }
 

  /**************************************************************************************/
  /***************************** Track Individual Game Actions *************************/
  /***************************** used to determine skill, luck, decision time ***********/
  /**************************************************************************************/

  function trackAction(user_Action){

    var gameActions = [];
    // Retrieve
    var stored_datas = JSON.parse(localStorage["datas"]);
    var cards_dealt  = stored_datas[0];
    var player_score = stored_datas[1];
    var dealer_score = stored_datas[2];
    var dealer_shows = stored_datas[3];
    var user_Action = event.target.id;
    var player_hand = player.getHand();
    var dealer_hand = dealer.getHand();
    
    console.log('---- trackAction ('+user_Action+') ----');

    var timeInMilliseconds = Date.now();
    console.log('timeInMilliseconds '+timeInMilliseconds);
    var action_time = timeInMilliseconds;
    console.log('action_time '+action_time);

    localStorage.setItem('action_time',action_time);
    localStorage.setItem('last_verb',user_Action);

    if (user_Action == "deal") {
      var gameActions = {
        // Removed as this is in xAPI
        actor: getActorDetails(),
        verb: user_Action,
        number_of_cards_face_up: 3,
        player_hand: player_hand,
        dealer_hand: dealer_hand,
        dealer_shows: dealer_shows,
        action_time: action_time
      }
    }else{
      var gameActions = {
        // Removed as this is in xAPI
        actor: getActorDetails(),
        verb: user_Action,
        number_of_cards_face_up: cards_dealt,
        player_hand: player_hand,
        dealer_hand: dealer_hand,
        dealer_shows: dealer_shows,
        player_score: player_score,
        dealer_hidden_score: dealer_score,
        action_time: action_time
      }
    }
    game_state = gameActions;
    console.log(gameActions);
    console.log('-----------TEST end trackAction -----------');
    return gameActions;
  }

  var hand_ended = null;

  function setActions(opts,ended) {
    console.log('setActions');
// **********************************************  TODO - fix bug when Dealers first card is an ACE
    console.log('opts: '+opts);
    // Get Hand details for detemining luck and skill
    var player_ranks = [];
    // 
    hand = player.getHand();
    var v = localStorage.getItem('last_verb');

    // cards_dealt_to_table
    var stored_datas = JSON.parse(localStorage["datas"]);
    var cards_dealt  = stored_datas[0];
    console.log('cards_dealt: '+cards_dealt);
    var player_score = stored_datas[1];
    var dealer_score = stored_datas[2];
    // console.log('dealer_score from JSON: '+dealer_score);    

    console.log('player score '+player_score);
    localStorage.setItem('player_score',player_score);

    if(!running) {
      $('#deal')  .prop('disabled', false);
      $('#wager')  .prop('disabled', false);
      $('#hit')   .prop('disabled', true);
      $('#stand') .prop('disabled', true);
      $('#double').prop('disabled', true);
      $('#split') .prop('disabled', true);
      $('#insurance').prop('disabled', true);
    }
    var hand_is_ended = localStorage.getItem('hand_is_ended');
    // only post to Lumi Game Status if the Game is still running (var ended passed from getWinner) 
    if ((ended != true) || (hand_is_ended != 'true')) {

      /********************************************************/
      /*************** SETUP DATA TO POST TO LUMI ***************/
      /*********************************************************/
      var pc1 = localStorage.getItem('player_card_1_rank');
      var pc2 = ','+localStorage.getItem('player_card_2_rank');
      var pc3 = localStorage.getItem('player_card_3_rank');
      if (pc3 != '') {
        p3 = ','+pc3;  
      };

      var pcards = pc1+pc2+pc3;
      console.log('PLAYER CARDS: '+pcards);

      var current_game_status = {
        "player_cards": pcards,
        "dealer_cards": getDealerUpCard(),
        "player_count": player_score,
        "dealer_count": dealer_score,
        "game_id": checkGameID(),
        "verb": v
      };

      // var last_action_time = localStorage.getItem('action_time');
      // var right_now = Date.now();
      // console.log('VERB: '+v+', now: '+right_now+' vs last_action_time: '+last_action_time)
      // if (right_now == last_action_time) {
      //   console.log('ACTION TIME IS A MATCH');
      // }else{
      //   console.log('ACTION TIME IS not a MATCH');
      // }
      // right_now = right_now/10000;
      // last_action_time = last_action_time/10000;
      // console.log('ROUNDED now: '+right_now+' vs last_action_time: '+last_action_time);
      // right_now = parseInt(right_now);
      // last_action_time = parseInt(last_action_time);

      // if (right_now == last_action_time) {
      //   console.log('parseINT ACTION TIME IS A MATCH');
      // }else{
      //   console.log('parseINT ACTION TIME IS not a MATCH');
      // }

      // Determine what Kind of Verb to Post:
      if (v == "deal") {
        Lumi.jot(current_game_status);
        console.log('SENT - deal');
      };
      if (v == "hit") {
        Lumi.jot(current_game_status);
        console.log('SENT - hit');
      };
      if (v == "stand") {
        Lumi.jot(current_game_status);
        console.log('SENT - stand');
      };
      if (v == "double") {
        Lumi.jot(current_game_status);
        console.log('SENT - double');
      };
      if (v == "insurance") {
        Lumi.jot(current_game_status);
        console.log('SENT - insurance');
      };
      if (v == "split") {
        Lumi.jot(current_game_status);
        console.log('SENT - split');
      }; 
      // END post to Lumi
    }else{
      console.log('Hand ENDED!: '+hand_is_ended);
    }
  

    if(opts === 'run') {
      $('#deal')  .prop('disabled', true);
      $('#wager')  .prop('disabled', true);

      $('#hit')   .prop('disabled', false);
      $('#stand') .prop('disabled', false);

      if(player.checkWager(wager * 2)) {
        $('#double').prop('disabled', false);
      }
    } else if(opts === 'split') {
      $('#split').prop('disabled', false);
    } else if(opts === 'insurance') {
      $('#insurance').prop('disabled', false);
    } else if(hand.length > 2) {
      $('#double')   .prop('disabled', true);
      $('#split')    .prop('disabled', true);
      $('#insurance').prop('disabled', true);
    }
  }

  /****************************************************************************/
  /************************** Display Game to User ****************************/
  /****************************************************************************/

  function showBoard() {
    deal.dealCard(4, 0, [player, dealer, player, dealer]);
    console.log('dealCard - showBoard');
  }

  var player_cards_set = false;
  var player_cards_json = [];

  function renderCard(ele, sender, type, item) {
    console.log('getBank');
    var hand, i, card;

    if(!item) {
      hand = sender.getHand();
      i    = hand.length - 1;
      card = new Card(hand[i]);
    } else {
      hand = dealer.getHand();
      card = new Card(hand[1]);
    }

    var rank  = card.getRank(),
        suit  = card.getSuit(),
        suit_class = suit,
        color = 'red',
        posx  = 340,
        posy  = 10,
        speed = 200,
        cards = ele + ' .card-' + i;

    switch(suit){
      // suits = ['SPADES', 'CLUBS', 'HEARTS', 'DIAMONDS'],
      // suits = [, '&#9827;', '&#9829;', '&#9670;'],
      case 'SPADES':
          suit = '&#9824;';
          break;
      case 'CLUBS':
          suit = '&#9827;';
          break;
      case 'HEARTS':
          suit = '&#9829;';
          break;
      case 'DIAMONDS':
          suit = '&#9670;';
          break;
      default: 
        suit = 'error';
    } 

    if(i > 0) {
      posx -= 50 * i;
    }

    if(!item) {
      $(ele).append(
        '<div class="rank-'+rank+' suit-'+suit_class+' card-' + i + ' ' + type + '">' + 
          '<span class="pos-0">' +
            '<span class="rank">&nbsp;</span>' +
            '<span class="suit">&nbsp;</span>' +
          '</span>' +
          '<span class="pos-1">' +
            '<span class="rank">&nbsp;</span>' +
            '<span class="suit">&nbsp;</span>' +
          '</span>' +
        '</div>'
      );

      if(ele === '#phand') {
        posy  = 160;
        speed = 500;
        $(ele + ' div.card-' + i).attr('id', 'pcard-' + i);

        if(hand.length < 2) {
          $('#pcard-0').popover({
            animation: false,
            container: '#pcard-0',
            content: player.getScore(),
            placement: 'left',
            title: 'You Have',
            trigger: 'manual'
          });

          setTimeout(function() {
            $('#pcard-0').popover('show');
            $('#pcard-0 .popover').css('display', 'none').fadeIn();
          }, 500);
        }
      } else {
        $(ele + ' div.card-' + i).attr('id', 'dcard-' + i);

        if(hand.length < 2) {
          $('#dcard-0').popover({
            container: '#dcard-0',
            content: dealer.getScore(),
            placement: 'left',
            title: 'Dealer Has',
            trigger: 'manual'
          });

          setTimeout(function() {
            $('#dcard-0').popover('show');
            $('#dcard-0 .popover').fadeIn();
          }, 100);
        }
      }

      $(ele + ' .card-' + i).css('z-index', i);

      $(ele + ' .card-' + i).animate({
        'top': posy,
        'right': posx
      }, speed);

      $(ele).queue(function() {
        $(this).animate({ 'left': '-=25.5px' }, 100);
        $(this).dequeue();
      });
    } else {
      cards = item;
    }

    if(type === 'up' || item) {
      if(suit !== '&#9829;' && suit !== '&#9670;' && suit !== 'HEARTS' && suit !== 'DIAMONDS') {
        color = 'black';
      }

      $(cards).find('span[class*="pos"]').addClass(color);
      $(cards).find('span.rank').html(rank);
      $(cards).find('span.suit').html(suit);
    }
  }

  function resetBoard() {
    console.log('resetBoard');
    // create new random ID
    $('#dhand').html('');
    $('#phand').html('');
    $('#result').html('');
    $('#phand, #dhand').css('left', 0);
  }

  /****************************************************************************/
  /************************** Calculate the Winner ****************************/
  /****************************************************************************/

  function getWinner() {
    console.log('getWinner');
    localStorage.setItem('hand_is_ended','true');

    var phand    = player.getHand(),
        dhand    = dealer.getHand(),
        pscore   = player.getScore(),
        dscore   = dealer.getScore(),
        wager    = player.getWager(),
        winnings = 0,
        result;

    running = false;

    var opts = null;
    var ended = true;
    setActions(opts,ended);

    if(pscore > dscore) {
      if(pscore === 21 && phand.length < 3) {
        winnings = (wager * 2) + (wager / 2);
        player.setCash(winnings);
        player.setBank(winnings - wager);
        $('#alert').removeClass('alert-info alert-error').addClass('alert-success');
        result = 'BLACKJACK';
        msg = 'Blackjack';
      } else if(pscore <= 21) {
        winnings = wager * 2;
        player.setCash(winnings);
        player.setBank(winnings - wager);
        $('#alert').removeClass('alert-info alert-error').addClass('alert-success');
        result = 'WIN';
        msg = 'Win';
      } else if(pscore > 21) {
        winnings -= wager;
        player.setBank(winnings); 
        $('#alert').removeClass('alert-info alert-success').addClass('alert-error');
        result = 'BUSTED';
        msg = 'Bust';
      }
    } else if(pscore < dscore) {
      if(pscore <= 21 && dscore > 21) {
        winnings = wager * 2;
        player.setCash(winnings);
        player.setBank(winnings - wager);
        $('#alert').removeClass('alert-info alert-error').addClass('alert-success');
        result = 'WIN_DEALER_BUST';
        msg = 'Win - dealer bust';
      } else if(dscore <= 21) {
        winnings -= wager;
        player.setBank(winnings);
        $('#alert').removeClass('alert-info alert-success').addClass('alert-error');
        result = 'LOSS';
        msg = 'Loss';
      }
    } else if(pscore === dscore) {
      if(pscore <= 21) {
        if(dscore === 21 && dhand.length < 3 && phand.length > 2) {
          winnings -= wager;
          player.setBank(winnings);
          $('#alert').removeClass('alert-info alert-success').addClass('alert-error');
          result = 'LOSS_DEALER_BLACKJACK';
          msg = 'You lose - dealer Blackjack!';
        } else {
          winnings = wager;
          $('#alert').removeClass('alert-error alert-success').addClass('alert-info');
          player.setCash(winnings);
          result = 'PUSH';
          msg = 'Push';
        }
      } else {
        winnings -= wager;
        player.setBank(winnings);
        $('#alert').removeClass('alert-info alert-success').addClass('alert-error');
        result = 'BUSTED';
        msg = 'Bust';
      }
    }
    trackResult(pscore,dscore,result, wager);
    showAlert(msg);

    dealer.flipCards();
    dealer.updateBoard();

    if(parseInt(player.getCash()) < 1) {
      $('#myModal').modal();
      $('#newGame').on('click', function() {
        player.setCash(1000);
        $(this).unbind('click');
        $('#myModal').modal('hide');
      });
    }
   
  }

  /**********************************************************************/
  /*************************** User Actions *****************************/
  /**********************************************************************/

  $('#deal').on('click', function() {
    localStorage.setItem('hand_is_ended','false');

    var cash = parseInt(player.getCash());
    $('#alert').fadeOut();

    if(cash > 0 && !running) {
      if($.trim($('#wager').val()) > 0) {
        game.newGame();
      } else {
        $('#alert').removeClass('alert-info alert-success').addClass('alert-error');
        showAlert('The minimum bet is $1.');
      }
    } else {
      $('#myModal').modal();
    }
  });


  player_card_total_score = [];
  dealer_card_total_score = [];
  dealer_up_card = [];
  current_scores = [];
  var dealer_showing = 0;
  var datas = [];

  function trackHandTotal(player_Score,dealer_Score,cards_dealt_to_table,player_current_hand){
    // user_Action = 'deal';
     console.log('**** trackHandTotal****');
     var cards_on_table = cards_dealt_to_table;
     console.log('cards_dealt_to_table: '+cards_on_table);

    if (cards_dealt_to_table == 3) {
        dealer_showing = dealer_Score;
        localStorage.setItem('dealer_up_card',dealer_showing);
        getDealerUpCard();

        localStorage.setItem('player_current_hand',player_current_hand);

        cards_dealt_to_table = {
          cards_dealt_to_table: cards_dealt_to_table
        }
        player_card_total_score = {
          player_total_score: player_Score
        };
        dealer_up_card = {
          dealer_up_card: dealer_Score
        };
    }
    else{
        cards_dealt_to_table = {
          cards_dealt_to_table: cards_dealt_to_table
        }
        player_card_total_score = {
          player_total_score: player_Score
        };
        dealer_card_total_score = {
          dealer_card_total_score: dealer_Score
        };
    }

    // Combine player and dealer hands into single array
    var dealer_cards_extended = [];
    dealer_cards_extended = extend(dealer_card_total_score,dealer_up_card);
    
    current_scores = extend(current_scores,cards_dealt_to_table);
    current_scores = extend(current_scores,player_card_total_score);
    current_scores = extend(current_scores,dealer_cards_extended);
    
    // Save
    var datas = [cards_on_table, player_Score, dealer_Score, dealer_showing];
    localStorage["datas"] = JSON.stringify(datas);

    console.log('*** END trackHandTotal ***-');
    return current_scores;
  }

  /*****************************************************************/
  /*************************** Player Actions *****************************/
  /*****************************************************************/

  $('#actions .action').on('click', function(event) {
    trackAction(event);    
  });

  $('#deal').on('click', function(event) {
    localStorage.setItem('hand_is_ended','false');
    console.log('Deal click.');
  });

  $('#hit').on('click', function(event) {
    player.hit();
  });

  $('#stand').on('click', function(event) {
    localStorage.setItem('hand_is_ended','true');
    player.stand();
  });

  $('#double').on('click', function(event) {
    localStorage.setItem('hand_is_ended','true');
    player.dbl();
  });

  $('#insurance').on('click', function(event) {
    player.insure();
  });

  $('#split').on('click', function(event) {
    player.split();
  });
  

  /*****************************************************************/
  /*************************** Loading *****************************/
  /*****************************************************************/

  $('#wager').numOnly();
  $('#actions:not(#wager), #game, #myModal').disableSelection();
  $('#newGame, #cancel').on('click', function(e) { e.preventDefault(); });
  $('#cancel').on('click', function() { $('#myModal').modal('hide'); });
  $('#wager').val(100);
  $('#cash span').html(player.getCash());
  player.getBank();


  /*****************************************************************/
  /***************************  Setup Tracking *********************/
  /*****************************************************************/

  var GameHistory  = [];
  var GameResult   = [];
  var ActorDetails = [];
  var NewPlayer = [];
  var gameActions  = [];

  /*****************************************************************/
  /***************************  Check Variable Values *********************/
  /*****************************************************************/

  function checkGameID(){
    var my_game_id = localStorage.getItem( 'game_id' );
    return my_game_id;
  }
  
  function checkPlayerName(){
    var player_name = localStorage.getItem( 'player_name' );
    return player_name;
  }

  function checkPlayerEmail(){
    var player_email = localStorage.getItem( 'player_email' );
    return player_email;
  }
  function checkPlayerLevel(){
    var player_level = localStorage.getItem( 'player_level' );
    return player_level;
  }
  function checkActor(){
    var player_details = localStorage.getItem( 'player_details' );
    return player_details;
  }

  function getActorDetails(){
    console.log('getActorDetails');
    var game_id = checkGameID(),
    player_name = checkPlayerName(),
    player_email = checkPlayerEmail();
    player_level = checkPlayerLevel();
    player_details = checkActor();
    ActorDetails = {
      "game_id": game_id,
      "actor_name": player_name,
      "actor_email": player_email,
      "player_level": player_level
      // "actor_details": player_details
    };
    return ActorDetails;
  }
  
  /*****************************************************************/
  /***************************  Cheat Mode Functions *********************/
  /*****************************************************************/

  function cheatModeToggle(){
    $('.cheatmode').toggle();
  }

  /*****************************************************************/
  /***************************  Main Tracking *********************/
  /*****************************************************************/

  function saveLastAction(event){
    localStorage.setItem( 'last_action', event );
  }

  function trackResult(player_final_score,dealer_final_score,result,wager){
    console.log('********* trackResult *********');
    console.log('Game Outcome:');
    console.log(result);

    // Get bankroll, convert to no decimal, no comma string, convert to int.
    var bankroll = player.getCash();
    bankroll     = bankroll.substr(0, bankroll.length-3); 
    bankroll     = bankroll.replace(/,/g, '');

    console.log('bankroll: '+bankroll);
    bankroll = parseInt(bankroll);
    console.log('INT bankroll: '+bankroll);
    wager = parseInt(wager);
    
    // Determine if outcome was caused by Luck or Skill
    var p_s = localStorage.getItem('player_score');
    p_s = parseInt(p_s);
    var d_s = localStorage.getItem('dealer_up_card');
    d_s = parseInt(d_s);
    // alert('p_s = '+p_s);
    // alert('storage d_s = '+d_s);
    checkMoves(p_s,d_s);

    var v                  = localStorage.getItem('last_verb');
    var move               = localStorage.getItem('correct_move');
    var total_skill_hands  = localStorage.getItem('total_skill_hands');
    var total_luck_hands   = localStorage.getItem('total_luck_hands');
    var total_hands_played = localStorage.getItem('total_hands_played');
    
    // Update hands played
    total_hands_played     = parseInt(total_hands_played);
    total_hands_played++;
    localStorage.setItem('total_hands_played',total_hands_played);
    console.log('total_hands_played: '+total_hands_played);
    console.log('Correct Move from Storage: '+move);
    
    // Set skill or luck
    if (v == move) {
      skill_or_luck = 'skill';
      total_skill_hands = parseInt(total_skill_hands);
      total_skill_hands++;
      localStorage.setItem('total_skill_hands',total_skill_hands);
      console.log('UPDATED total_skill_hands:' +total_skill_hands);
    }else{
      skill_or_luck = 'luck';
      total_luck_hands = parseInt(total_luck_hands);
      total_luck_hands++;
      localStorage.setItem('total_luck_hands',total_luck_hands);
      console.log('UPDATED total_luck_hands:' +total_luck_hands);
    }
    console.log('OUTCOME determined by skill_or_luck = '+skill_or_luck);
  
    var total_wins   = localStorage.getItem('total_wins');
    var total_losses = localStorage.getItem('total_losses');
    var total_draws  = localStorage.getItem('total_draws');

    var total_wins_by_skill = localStorage.getItem('total_wins_by_skill');
    var total_wins_by_luck  = localStorage.getItem('total_wins_by_luck');

    switch(result) {
      case 'BLACKJACK':
      case 'WIN':
      case 'WIN_DEALER_BUST':
          total_wins++;
          localStorage.setItem('total_wins',total_wins);
          if (skill_or_luck == 'skill') {
            total_wins_by_skill++;
            localStorage.setItem('total_wins_by_skill',total_wins_by_skill);
          };
          if (skill_or_luck == 'luck') {
            total_wins_by_luck++;
            localStorage.setItem('total_wins_by_luck',total_wins_by_luck);
          };
          break;
      case 'BUSTED':
      case 'LOSS':
      case 'LOSS_DEALER_BLACKJACK':
          total_losses++;
          localStorage.setItem('total_losses',total_losses);
          break;
      default: 
          total_draws++;
          localStorage.setItem('total_draws',total_draws);
    }
    var udpated_wins   = localStorage.getItem('total_wins');
    var udpated_losses = localStorage.getItem('total_losses');
    var udpated_draws  = localStorage.getItem('total_draws');
    var udpated_total_wins_by_skill = localStorage.getItem('total_wins_by_skill');
    var udpated_total_wins_by_luck  = localStorage.getItem('total_wins_by_luck');

    var thp = localStorage.getItem('total_hands_played');
    $('#total_hands').html(thp);
    console.log('udpated_total_wins_by_skill: '+udpated_total_wins_by_skill+ ' / total_hands_played: '+total_hands_played);
    console.log('udpated_total_wins_by_luck: '+udpated_total_wins_by_luck+ ' / total_hands_played: '+total_hands_played);
    
    // Convert Skill and Luck to Percentage of hands played
    // var skill_count = localStorage.getItem('total_skill_hands');
    // var luck_count  = localStorage.getItem('total_luck_hands');

    var twb_skill = parseInt(udpated_total_wins_by_skill);
    var twb_luck = parseInt(udpated_total_wins_by_luck);
    console.log('INT total_wins_by_skill: '+twb_skill);
    console.log('INT total_wins_by_luck: '+twb_luck);

    var skill_percentage = (twb_skill/thp)*100;
    var luck_percentage  = (twb_luck/thp) *100;

    console.log('skill_percentage: '+skill_percentage+'%');
    console.log('luck_percentage: '+luck_percentage+'%');
    $('#win_average').html(parseInt(skill_percentage));
    $('#luck_average').html(parseInt(luck_percentage));
    // Lumi game result
    var LumiGameResult = {
      game_id: checkGameID(),
      result: result,
      wager: wager,
      bankroll: bankroll,
      skill_or_luck: skill_or_luck
    }

    console.log('LumiGameResult');
    console.log(LumiGameResult);
    LumiGameResult.verb = result;
    Lumi.jot(LumiGameResult);
    console.log('********* END trackResult **********');
  }
  /*****************************************************************/
  /*************************** Get New Player From Endpoint *****************/
  /*****************************************************************/

  function getActorFromEndpoint(){
    console.log('--- START getActorFromEndpoint ---');
    var base_url_GetActor = 'http://privacysphere.com/api/player/next';
    // var base_url_GetActor = 'http:/localhost:8000/offline';
    var url_new_GetActor = base_url_GetActor;
    var GetActor_json = [];

    $.getJSON( url_new_GetActor, function( GetActor_json ) {
      console.log('getting url_GetActor data...');
      console.log(GetActor_json);
      var name = _.keys(GetActor_json);
      var email = _.values(GetActor_json);
      if (name == '') {
        name = 'A Name Fail';
        email = 'fail@test.com';
      };
      // var player_name = $('#name').val();
      localStorage.setItem( 'player_name', name );
      localStorage.setItem( 'player_email', email );

      console.log('name: '+name +' email: '+email);

      $('#actor_name').html(name);
      // localStorage requires storing strings, not arrays
      var player_details = JSON.stringify(GetActor_json);
      localStorage.setItem( 'player_details', player_details );
      // verify stored
      var get_player = localStorage.getItem( 'player_details');
      console.log('NEW player_details from localStorage: '+get_player);
      

      function Setup_Lumi(){
        console.log('Setup_Lumi fired');
        Lumi.logging_enabled = true;
        Lumi.setLearner(name[0],email[0]);
        // New User Registered
        Lumi.addVerb('REGISTERED');

        // Game Interactions
        Lumi.addVerb('DEAL');
        Lumi.addVerb('HIT');
        Lumi.addVerb('STAND');
        Lumi.addVerb('DOUBLEDOWN');
        Lumi.addVerb('INSURANCE');
        Lumi.addVerb('SPLIT');

        // Blackjack, Win, Bust, Win - dealer bust, Loss, Loss - dealer Blackjack, Push, Bust
        Lumi.addVerb('RESULT');
        Lumi.addVerb('BLACKJACK');
        Lumi.addVerb('WIN');
        Lumi.addVerb('WIN_DEALER_BUST');
        Lumi.addVerb('LOSS');
        Lumi.addVerb('LOSS_DEALER_BLACKJACK');
        Lumi.addVerb('BUSTED');
        Lumi.addVerb('PUSH');
      } 
      Setup_Lumi();


      var player_level = localStorage.getItem('player_level');
      var game_id = localStorage.getItem('game_id');
      
      var new_user = {
        "game_id": game_id,
        "player_level": player_level
      };
      new_user.verb = 'REGISTERED';
      Lumi.jot(new_user);
      console.log('SENT - new_user REGISTERED');
      $('#info_show').show();
    });  
    
    console.log('--- END getActorFromEndpoint ---');
  }

  function setGameID(){
    // create new random ID
    var game_id = Math.random().toString(36).substr(2, 7);
    localStorage.setItem( 'game_id', game_id );
    console.log('game_id set: '+game_id);
  }

  function clearGame(){
    localStorage.setItem( 'game_id','');
    localStorage.setItem( 'player_name','');
    localStorage.setItem( 'player_email','');
    localStorage.setItem( 'player_level','');
    localStorage.setItem( 'player_details','');

    localStorage.setItem( 'dealer_up_card','');
    localStorage.setItem( 'player_card_1_rank','');
    localStorage.setItem( 'player_card_2_rank','');
    localStorage.setItem( 'player_card_3_rank','');
    localStorage.setItem( 'player_score','');
    localStorage.setItem( 'correct_move','');

    localStorage.setItem( 'total_hands_played','0');
    localStorage.setItem( 'total_skill_hands','0');
    localStorage.setItem( 'total_luck_hands','0');
    localStorage.setItem( 'total_wins','0');
    localStorage.setItem( 'total_losses','0');
    localStorage.setItem( 'total_draws','0');
    localStorage.setItem( 'total_wins_by_skill','0');
    localStorage.setItem( 'total_wins_by_luck','0');
    
    localStorage.setItem( 'last_verb','');
    localStorage.setItem( 'action_time','0');

    console.log('GAME CLEARED:');
  }

  function startGame(){
    // Clear stored game_id
    setGameID();
    getActorFromEndpoint();
  }

// Test Actions
  
  $('#getactor').on('click', function(event) {
    getActorFromEndpoint();
  });
  $('#checkMoves').on('click', function(event) {
    checkMoves();
  });


  // $("#actions .test_outcome").click(function() {
  //   // set test variables
  //   var result = $(this).attr('id');
  //   var bankroll = parseInt(player.getCash());
  //   var wager = '100';
  //   wager = parseInt(wager);
  //   var skill_or_luck = 'tbd';
  //   var player_final_score = '99';
  //   var dealer_final_score = '99';
    
  //   // Core current_game_status data
  //   var v = localStorage.getItem('last_verb');
  //   var current_game_status = {
  //     "game_id": checkGameID(),
  //     "count": {
  //         player: player_final_score,
  //         dealer: dealer_final_score,
  //     },
  //     "cards": {
  //         player: 'irrelevant',
  //         dealer: 'irrelevant'
  //     },
  //     "play": v
  //   };
  //   // New Lumi game result data
  //   var LumiGameResult = {
  //     result: result,
  //     wager: wager,
  //     bankroll: bankroll,
  //     skill_or_luck: skill_or_luck
  //   }
  //   current_game_status.verb = result;
  //   Lumi.jot(LumiGameResult);
  //   event.preventDefault();
  // });


  $(document).ready(function() {
      $(".restart").click(function() {
        // Setup New Lumi Instance 
        clearGame();
        var player_level = $("input[name=player_level]:checked").val();
        localStorage.setItem( 'player_level', player_level);
        console.log('player_level from storage = '+ localStorage.getItem( 'player_level'));
        startGame();
        $('#newgame').hide();
        $('#actions').show();
      });

      $("#actor").click(function() {
          getActorDetails();
      });
      $("#cheat_mode").click(function() {
          cheatModeToggle();
          event.preventDefault();
      });
      $("#landscape_warning_close").click(function() {
          $('#landscape_warning').hide();
          event.preventDefault();
      });
      $("#info_show").click(function() {
          $('#game_info').toggle();
          event.preventDefault();
      });
      $("#info_close").click(function() {
          $('#game_info').hide();
          event.preventDefault();
      });

  });

}()); // end Blackjack

$( document ).ready(function() {
  console.log('Document ready');
  $('.cheatmode').hide();
  Lumi.openLocker(E_LEARNING.locker_id, E_LEARNING.course_id, E_LEARNING.course_iri);
}); // end doc ready

function extend(obj, src) {
    Object.keys(src).forEach(function(key) { obj[key] = src[key]; });
    return obj;
}
// Reference 
// var searchresult = findStudentByID(s,attempt_user);

// function findStudentByID(arr,sid){
//     var result = $.grep(arr, function(e){ return e.id == sid; });
//     console.log("Student Search Result: ");
//     console.log(result);
//     if(result){
//         return result;
//     }else{
//         return false;
//     }
// }

function getPlayerCards(){
  var player_hand = localStorage.getItem('player_current_hand');
  console.log('getPlayerCards :');
  console.log(player_hand);
  return player_hand;
}

function getDealerUpCard(){
  var ds = localStorage.getItem('dealer_up_card');
  console.log('STORAGE dealer_showing: '+ds);
  return ds;
}

function getMoves(){

  // Only the dealers first card (Up Card) is relevant for detemining skill
    getDealerUpCard();

    // console.log('dealer score '+dealer_score);
    var v = localStorage.getItem('last_verb');
    console.log('last_verb: '+v);

    // console.log('card_1 rank: '+card_1);
    // if (ds != 11) {
    //   // card_2 = hand[1].rank;  
    //   console.log('Dealer does NOT show Ace');
    // }else{
    //   console.log('Dealer SHOWS Ace');
    //   card_2 = 11;
    //   // p_hand = player.getHand();
    //   // card_2 = p_hand[0].rank;
    // }

    // var p_hand = player.getHand();
    // var d_hand = dealer.getHand();
    // console.log('p_hand: ');
    // console.log(p_hand);
    

    // console.log('d_hand: ');
    // console.log(d_hand);

    // var pfh = JSON.parse(localStorage["player_full_hand"]);
    // console.log('player_full_hand');
    // console.log(pfh);
    
    // card_1 = pfh[0].rank;
    // card_2 = pfh[1].rank;
    card_1 = 'test';
    card_2 = 'test';

    console.log('card_1 rank: '+card_1);
    console.log('card_2 rank: '+card_2);

    var player_cards = card_1 + ',' +card_2;
    console.log('player cards '+player_cards);

    var is_pair = false;
    var is_soft = false;
    // Determine if Player has Pairs or hand is Soft (has an Ace)
    if (card_1 == card_2) {is_pair = true;};
    if ((card_1 == 'A') || (card_2 == 'A')) {is_soft = true;};
    console.log('PAIR? '+is_pair +' SOFT? '+is_soft);   
}


$("#buy_hint").click(function() {
  var p_s = localStorage.getItem('player_score');
  p_s = parseInt(p_s);
  var d_s = localStorage.getItem('dealer_up_card');
  d_s = parseInt(d_s);
  // alert('p_s = '+p_s);
  // alert('storage d_s = '+d_s);
  checkMoves(p_s,d_s);
});

function checkMoves(p_s,d_s){
  console.log('checkMoves');
  // temp Static player score
  // Hard Player Hand Totals (i.e. no Aces)
  switch(p_s) {
      case 21 :           
      case 20 :
      case 19 :
      case 18 :
      case 17 :
                pmove = 'stand'; 
                break;
      case 16 : 
      case 15 : 
      case 14 : 
      case 13 : 
                if(d_s < 7){
                  pmove = 'stand';
                }else{
                  pmove = 'hit';
                }
                break;
      case 12 : 
                if(d_s < 7){
                  pmove = 'stand';
                }else{
                  pmove = 'hit';
                } 
                if(d_s < 4){ 
                  pmove = 'hit';
                }
                break;
      case 11 :
                if(d_s != 11){
                  pmove = 'double';
                }else{
                  pmove = 'hit';
                }
                break;
      case 10 :
                if(d_s < 10){
                  pmove = 'double';
                }else{
                  pmove = 'hit';
                }
                break;
      case 9 : 
                if(d_s < 7){
                  pmove = 'double';
                }else{
                  pmove = 'hit';
                }
                if(d_s < 3){ pmove = 'hit'};
                break;
      case 8 : 
      case 7 : 
      case 6 : 
      case 5 : 
      case 4 : 
                pmove = 'hit';
                break;
      default:
                pmove = 'error';
  }
  localStorage.setItem('correct_move',pmove);
  console.log('Correct Move for ('+p_s+' vs '+d_s+') is to: '+pmove);
  $('#teacher').html(pmove);
} // end checkMoves()



/*****************************************************************/
/*************************** API Based Game Deck *****************/
/*****************************************************************/

// if (use_DeckOfCardsAPI) {
//   // get new newDeckOfCards
//     // get DeckOfCards.id
//     // get draw_Card_from_DeckOfCards
//     // show single_Card

//   var DeckOfCards = [];
//   var DeckOfCards_id = null;

//   var base_url_DeckOfCards = 'http://deckofcardsapi.com/api/deck/';
//   var url_new_DeckOfCards = base_url_DeckOfCards +'new/shuffle/?deck_count=1';
//   var url_draw_card_DeckOfCards = 'default';

//   function newDeckOfCards(){
//     console.log('------------ START newDeckOfCards ------------');
//     $.getJSON( url_new_DeckOfCards, function( DeckOfCards_json ) {
//       console.log('getting url_DeckOfCards data...');
//       console.log(DeckOfCards_json);
//         //By using javasript json parser
//       if (DeckOfCards_json['success']) {
//         console.log('success:' +DeckOfCards_json['success']);
//         console.log('shuffled:' +DeckOfCards_json['shuffled']);
//         console.log('remaining:' +DeckOfCards_json['remaining']);
//         var DeckOfCards_id = DeckOfCards_json['deck_id'];
//         console.log('DeckOfCards_id: ' +DeckOfCards_id);
//         localStorage.setItem( 'DeckOfCards_id', DeckOfCards_id );
//       }else{
//         alert('Error: Deck of Cards API not loaded. No deck ID is available.');
//       }
//       console.log('------------ END newDeckOfCards ------------');
//     });
//   }

//   $( document ).ready(function() {
//     newDeckOfCards();
//   }); // end doc ready
// };


// switch(result) {
//   case 'BLACKJACK':
//   case 'WIN':
//   case 'WIN_DEALER_BUST':
//       if (skill_or_luck == 'skill') {
//         skilled_wins++;
//       }else{
//         lucky_wins++;
//       }
//   case 'BUSTED':
//   case 'LOSS':
//   case 'LOSS_DEALER_BLACKJACK':
//       if (skill_or_luck == 'skill') {
//         skilled_losses++;
//       }else{
//         unlucky_losses++;
//       }
//   default: 
//       total_draws++;
// }

