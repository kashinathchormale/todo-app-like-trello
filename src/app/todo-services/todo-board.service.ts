import { Injectable } from '@angular/core';
import { data } from "../models/data";
import { Board, Card } from "../models/todo-board.model";
import { Subject, BehaviorSubject, Observable } from "rxjs";

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class TodoBoardService {
  private data: any;
  constructor() {
    const localdata = localStorage.getItem('todo');
    if(localdata){
      this.data = JSON.parse(localdata)
    }else{
      localStorage.setItem('todo', JSON.stringify(data))
      this.data = data;
    }
   }
 

   private priorityCards$ = new BehaviorSubject<Card[]>(
    this.initializePriorityCards()
  );
  private modalState$ = new Subject();

  /*
   Get the data table
  */
  getBoard(): Board {
    return this.data;
  }

  /*
Add a card to the board
  */
  addCard(listId:any, cardTitle:any): void {
    let list = this.data.find(list => list.id == listId);

    let cardExist = true;
  
    cardExist =  list?.cards && list.cards.some( card => cardTitle === card.title  )
    if(cardExist){
      alert('this card name is already exist')
    }

    if(!cardExist)
    list.cards = [
      ...list.cards,
      { id: Date.now(), title: cardTitle, content: "", priority: 3 },
    ];

    // const updatedData = this.data.map( (list:any) => {
    //   if(list.id == listId){
    //     return {
    //       ...list,
    //       cards:[...list.cards, { id: Date.now(), title: cardTitle, content: "", priority: 3 }]
    //     }
    //       // return list.cards = [
    //       //   ...list.cards,
    //       //   { id: Date.now(), title: cardTitle, content: "", priority: 3 },
    //       // ];
    //   }else{
    //     return list
    //   }
    // } )

   // this.data = {...updatedData};

    localStorage.setItem('todo', JSON.stringify(this.data))

    //this.setPriorityCards();
  }

  /*
    Remove a card from the board
  */
  deleteCard(listId:any, cardId:any): void {
    let list = this.data.find(list => list.id == listId);
    console.log(list);
    let card = list.cards.find(card => card.id == cardId);
    console.log(card);
    let index = list.cards.indexOf(card);
    list.cards.splice(index, 1);

    // this.data.forEach(list => {
    //   if(list.id == listId){
    //     let card = list.cards.find(card => card.id == cardId);

    //   }
    // });

    localStorage.setItem('todo', JSON.stringify(this.data))

    //this.setPriorityCards();
  }

  /*    
Update a card
  */
  updateCard(listIndex, cardIndex, newCard): void {
    this.data[listIndex].cards[cardIndex] = newCard;
   localStorage.setItem('todo', JSON.stringify(this.data))

   // this.setPriorityCards();
  }

  /*    
Add new list
  */
  addList(listName): void {
    let listExist = true;
  
    listExist =  this.data.some( card => listName === card.name  )
    if(listExist){
      alert('this list name is already exist')
    }

    if(!listExist)
    this.data.push({ id: Date.now(), name: listName, cards: [] });
    localStorage.setItem('todo', JSON.stringify(this.data))

  }

  /*
   Delete a list
  */
  deleteList(listId): void {
    let list = this.data.find(list => list.id == listId);
    let index = this.data.indexOf(list);
    this.data.splice(index, 1);
    localStorage.setItem('todo', JSON.stringify(this.data))

    //this.setPriorityCards();
  }

  /*    
Initialize the list of urgent cards
    return: array of Card
  */
  initializePriorityCards(): Card[] {
    const localdata = localStorage.getItem('todo');
    if(localdata){
      this.data = JSON.parse(localdata)
    }else{
      localStorage.setItem('todo', JSON.stringify(data))
      this.data = data;
    }
    let cards = [];
    for (let list of this.data) {
      for (let card of list.cards) {
        if (card.priority === 1) {
          cards.push(card);
        }
      }
    }
    return cards;
  }

  /*
  update the subject this.priorityCards $
   (a subject is able to modify the value it contains with the .next () method)
  */
  // setPriorityCards(): void {
  //   let cards: Card[] = [];
  //   for (let list of this.data) {
  //     for (let card of list.cards) {
  //       if (card.priority === 1) {
  //         cards.push(card);
  //       }
  //     }
  //   }
  //   this.priorityCards$.next(cards);
  // }

  /*
    Get the subject priorityCards $
    components that use this method will be able to subscribe to the subject through .subsribe ()
    This will have the effect of signaling to the component any change in the value of the Subject
    thanks to the reactive programming principle of RxJs
  */
  getPriorityCards() {
    return this.priorityCards$;
  }

  /*
   Set the modal state that displays a cardId
    Param 1: true or false
    Param 2: card: Card
    (used by PriorityComponent component)
  */
  setModalState(bool: boolean, card: Card): void {
    let state = {
      open: bool,
      card: card
    };
    this.modalState$.next(state);
  }

  /*   
return the subject of modalState
    a compoment can subscribe
    (used by the BoardComponent component)
  */
  getModalState() {
    return this.modalState$;
  }
}
