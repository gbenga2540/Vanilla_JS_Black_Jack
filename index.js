//declare variables
let firstcard = 0;   
let secondcard = 0;
let totalcards = 0;
let hasBlackJack = false;
let isAlive = false;
let message = '';
let user_cash = 50;

//get elements from html
let js_txt_user_cash = document.getElementById('txt_user_cash');
let js_txt_message = document.getElementById('txt_message');
let js_txt_sum = document.getElementById('txt_sum');
let js_txt_cards = document.getElementById('txt_cards');

let js_btn_new_card = document.getElementById('btn_new_card');
let js_btn_new_game = document.getElementById('btn_new_game');


//sets user cash to 100 by default
js_txt_user_cash.textContent = user_cash;

//disables the new card functionality on start
js_btn_new_card.disabled = true;
if(!js_btn_new_card.classList.contains('btn_no_hover')){
    js_btn_new_card.classList.add('btn_no_hover');
}


function new_game(){
    //gets a random value between 1 and 10 for the first card
    //gets 1 and 9 for the second card
    //sums it up (totalcards)
    //gets a max of 20 or 22 
    //This is done to avoid the new_game function from producing a straight win.
    firstcard = get_random_card(9); //values between 1 and 10 where {1 = 11} /// check random_card function
    secondcard = get_random_card(8); // values between 1 and 9 where {1 = 11}
    if(secondcard == 11){
        secondcard = 2;
    }
    totalcards = firstcard + secondcard;

    js_txt_cards.textContent = 'Cards: ' + firstcard + ' ' + secondcard;
    js_txt_sum.textContent = 'Sum: ' + totalcards;

    isAlive = true;
    run_logic(totalcards);
    if(totalcards < 21){
        js_btn_new_card.disabled = false
        if(js_btn_new_card.classList.contains('btn_no_hover')){
            js_btn_new_card.classList.remove('btn_no_hover');
        }
    }else{
        js_btn_new_card.disabled = true
        if(!js_btn_new_card.classList.contains('btn_no_hover')){
            js_btn_new_card.classList.add('btn_no_hover');
        }
    }
}

function new_card(){
    if(isAlive === true && hasBlackJack === false){
        let newcard = get_random_card(10);
        totalcards += newcard;
        js_txt_cards.textContent += ' ' + newcard;
        js_txt_sum.textContent = 'Sum: ' + totalcards;
        run_logic(totalcards);
    } 
}

function get_random_card(limit){
    let random_number = Math.floor(Math.random() * limit) + 1;
    if(random_number == 1){
        return 11
    }else{
        return random_number
    }
}

function run_logic(card_num){
    if(card_num > 21){
        user_cash -= 10;
        js_txt_user_cash.textContent = user_cash;
        message = "You're out of the game😭";
        hasBlackJack = false;
        isAlive = false;
        js_btn_new_card.textContent = 'Restart Game';
        if(!js_btn_new_card.classList.contains('btn_no_hover')){
            js_btn_new_card.classList.add('btn_no_hover');
        }
        js_btn_new_card.disabled = true;
    }else if(card_num === 21){
        message = "You've got BlackJack🤑";
        user_cash += 10
        js_txt_user_cash.textContent = user_cash
        hasBlackJack = true
        isAlive = true
        js_btn_new_card.textContent = 'Restart Game'
        if(!js_btn_new_card.classList.contains('btn_no_hover')){
            js_btn_new_card.classList.add('btn_no_hover')
        }
        js_btn_new_card.disabled = true
    }else{
        message = 'Please, draw a new card😉'
        hasBlackJack = false
        isAlive = true
        if(js_btn_new_card.classList.contains('btn_no_hover')){
            js_btn_new_card.classList.remove('btn_no_hover')
        }
        js_btn_new_card.textContent = 'New Card'
    }
    if(user_cash <= 0){
        user_cash = 0
        if(!js_btn_new_game.classList.contains('btn_no_hover')){
            js_btn_new_game.classList.add('btn_no_hover')
        }
        js_btn_new_game.disabled = true;
        if(!js_txt_message.classList.contains('message_alert')){
            js_txt_message.classList.add('message_alert')
        }
        message = "You Lost!!!😭";
    }
    js_txt_message.textContent = message   
}