/* 
Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).
*/

async function getOneCard() {
  try {
    let res = await axios.get('http://deckofcardsapi.com/api/deck/new/shuffle')
    if (res.data.success) {
      let card_res = await axios.get(`http://deckofcardsapi.com/api/deck/${res.data.deck_id}/draw/?count=1`)
      console.log(`${card_res.data.cards[0].value} of ${card_res.data.cards[0].suit}`)
    }

  } catch(e) {
    console.error(e);
  }
}

getOneCard();

/*
Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the same deck.
Once you have both cards, console.log the values and suits of both cards.
*/

async function getTwoCards() {
  try {
    let res = await axios.get('http://deckofcardsapi.com/api/deck/new/shuffle')
    if (res.data.success) {
      let card_res = await axios.get(`http://deckofcardsapi.com/api/deck/${res.data.deck_id}/draw/?count=1`)
      first_card_str = (`${card_res.data.cards[0].value} of ${card_res.data.cards[0].suit}`)

      card_res = await axios.get(`http://deckofcardsapi.com/api/deck/${res.data.deck_id}/draw/?count=1`)
      second_card_str = (`${card_res.data.cards[0].value} of ${card_res.data.cards[0].suit}`)

      console.log(first_card_str, second_card_str)
    }

  } catch(e) {
    console.error(e);
  }
}

getTwoCards()

/*
Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.
*/

let deck_id;

$(document).ready(async function() {

  $("#draw-button").click(async function(e) {
    $('#draw-button').attr('disabled', true)
    $("#message-area").empty()

    try {
      
      if (!deck_id) {
        deck_res = await axios.get('http://deckofcardsapi.com/api/deck/new/shuffle')
        deck_id = deck_res.data.deck_id;
        console.log(deck_id)
      }

      let card_res = await axios.get(`http://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)

      $("#card-display-area").append(`<p>${card_res.data.cards[0].value} of ${card_res.data.cards[0].suit}</p>`)

      if (card_res.data.remaining == 0) {
        $("#message-area").append("<span>There are no more cards remaining! Refresh! </span>")
      } else {
        $('#draw-button').attr('disabled', false)  
      }


    } catch(e) {
      $("#mesage-area").append("<span>Something went wrong!</span>")
      console.error(e);
      $('#draw-button').attr('disabled', false)
    }
  })
})
