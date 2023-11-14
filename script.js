const playerform = document.getElementById('playerform');
const cardContainer = document.getElementById('card-container');



const users = JSON.parse(localStorage.getItem('players')) || [];
let index = 0;
function addPlayer(e){
    e.preventDefault();
    const name = e.target.children[0].value;
    const lastName = e.target.children[1].value;
    const country = e.target.children[2].value;
    const score = e.target.children[3].value;
    
    if(name && lastName && country && score){
        const player = createPlayer(name , lastName , country , score);
        cardContainer.append(player)
        this.reset();
        users.push({name , lastName , country , score})
        // addToLoacaStorage(users);
        sortThePlayer();
        document.getElementsByClassName('error-message')[0].classList.remove('active');
    }else{

        document.getElementsByClassName('error-message')[0].classList.add('active');
        return;
    }
}


// create player;


function createPlayer(name , lastName , country , score){
    const formattedDate = new Date().toLocaleString('default', { month: 'short' }).toUpperCase() + ' ' + new Date().getFullYear() + ': ' + new Date().toLocaleTimeString();
console.log(formattedDate);
    const card = `
                 <div class="name box">
                    <span>${name}</span>
                    <span class="date">${formattedDate}</span>
                </div>
                <div class="lastName box">
                    <span>${lastName}</span>
                </div>
                    
                <div class="country box">
                    <span>${country}</span>
                 </div>
                    
                <div class="score box">
                    <span>${score}</span>
                </div>
                <div class="list-items box">
                    <ul>
                    <li><button class="btn delete">Delete</button></li>
                    <li><button class="plus btn">+5</button></li>
                    <li><button class="minus btn">-5</button></li>
                    </ul>
                
                </div>
                `;
    let cardContent = document.createElement('div'); 
    cardContent.className = "card";
    cardContent.innerHTML =  card;
    index++;
    cardContent.children[4].addEventListener('click' , removePlayer);
   return cardContent;
}

function removePlayer(e){

   let text = e.target.innerText;
   const btn = e.target.parentElement.parentElement.parentElement.parentElement;
   const index = parseInt(btn.dataset.index); 
   console.log(e.target);
   if(text == "Delete") {
          btn.remove();
    //    console.log(index);
    //    users.splice(index , 1);//
    //    addToLoacaStorage(users);
    
}else if(text == '+5'){
     const ele = e.target.parentElement.parentElement.parentElement.parentElement.children[3];
     ele.innerHTML = parseInt(ele.innerText) + 5;
     sortThePlayer();
    }
    else if(text == '-5'){
        const ele = e.target.parentElement.parentElement.parentElement.parentElement.children[3];
        ele.innerHTML = parseInt(ele.innerText) - 5;
        sortThePlayer();
  }
}


function sortThePlayer(){
    const cards = Array.from(document.querySelectorAll('.card'));
    cards.sort((card1 , card2) => {
        const score1 = parseInt(card1.children[3].innerText);
        const score2 = parseInt(card2.children[3].innerText);
        if(score1 > score2) return -1;
        else if(score2 > score1) return 1;
        return 0;
    })

    cards.forEach((card , index) => {
        cardContainer.append(card)
    });
}

// render all player is that was already added
// function renderPlayersUsers(){
//   if(users){
//     users.sort((a , b) =>  b.score - a.score);
//     users.forEach(user => {
//         // console.log(user)
//         const html = createPlayer(user.name , user.lastName , user.country , user.score);
//         cardContainer.append(html)
//     })
//   }
// }


// // // add to localstorage
// function addToLoacaStorage(data){
//     data.sort((a , b) =>  b.score - a.score);
//     localStorage.setItem('players', JSON.stringify(data));
// }

// renderPlayersUsers();

playerform.addEventListener('submit' , addPlayer);


