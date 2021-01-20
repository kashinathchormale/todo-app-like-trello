import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";
import { TodoBoardService } from "../todo-services/todo-board.service";
import { Board, List, Card } from "../models/todo-board.model";

@Component({
  selector: 'app-todoboard',
  templateUrl: './todoboard.component.html',
  styleUrls: ['./todoboard.component.scss']
})
export class TodoboardComponent implements OnInit {

  isModalOpen: boolean = false;
  cardObject?: Card;

  //@Input() board;
  board?: Board;
  titleListEditor: boolean = false;

  editingListId?: number;

  constructor(private boardService: TodoBoardService) {}

  ngOnInit() {
    this.board = this.boardService.getBoard();   

    console.log('this.board',this.board);
    this.boardService.getModalState().subscribe((state: any) => {
      console.log(state);

      this.isModalOpen = state.open;
      this.cardObject = state.card;
    });
  }

  /*****************************
  CARD ACTIONS
 *****************************/
  addCardAction(listId: number): void {
    let res:any = [];
    let cardTitle = prompt("Card Name : ");
    if (cardTitle != null) {
      if (cardTitle.trim().length > 0) {
        console.log('this.board in if condition',this.board);
        // this.boardService.getBoard().map(function(item){
        //   var existItem = res.find(x=>x.title==item.title);
        // }
        // )   
        
          this.boardService.addCard(listId, cardTitle);
        
       
      }
    }
  }

  deleteCardAction(event, listId: number, cardId: number): void {
    event.stopPropagation();
    if (confirm("Delete this card ? ")) {
      this.boardService.deleteCard(listId, cardId);
    }
  }

  

    drop(event: CdkDragDrop<Card[]>, listIndex: number) {
    // console.log(event);
    console.log("container List: ", event.container);
    console.log("Previous Container List: ", event.previousContainer);
    if (event.previousContainer === event.container) {
      // move Card in the same List
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      // move Card in Another List
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  /*********************
    LIST ACTIONS
  **********************/
  addListAction(): void {
    let listName = prompt("Name of the list");
    if (listName != null) {
      if (listName.trim().length > 0) {
        this.boardService.addList(listName);
      }
    }
    // if (!this.board?.find((item) => item.name == listName)) {
    //   alert('same');
    //   this.boardService.addList(listName);
    // }
    
  }

  editTitleList(list: List): void {
    this.editingListId = list.id;
    this.titleListEditor = true;
  }

  getTitleListOnKeyUp(titleListInput: string, list: List): void {
    if(titleListInput.length > 0){
      list.name = titleListInput;
      this.editingListId = 0;
      this.titleListEditor = false;
    }   
  }

  deleteListAction(list:any) {
    //event.stopPropagation();
    if (confirm("Delete list " + list.name + " ? ")) {
      this.boardService.deleteList(list.id);
    }
  }

  /******************
    MODAL ACTIONS
  *******************/
  openModal(card:any) {
    console.log(card);
    this.isModalOpen = true;
    this.cardObject = card;
    console.log(this.boardService.getBoard());
  }

  closeModal() {
    this.isModalOpen = false;
    console.log(this.boardService.getBoard());
  }

  /*******************
   ADD BORDER TO Card
    - priority 1 ; 'red'
    - priority 2 ; 'orange'
    - priority 3 ; 'green'
  ********************/
  // getCardStyle(card) {
  //   let borderStyle;
  //   switch (card.priority) {
  //     case 1:
  //       borderStyle = "3px solid #db0010";
  //       break;
  //     case 2:
  //       borderStyle = "3px solid orange";
  //       break;
  //     case 3:
  //       borderStyle = "3px solid #11ff99";
  //       break;
  //   }
  //   return borderStyle;
  // }

}
