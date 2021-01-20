import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { TodoBoardService } from '../todo-services/todo-board.service';

@Component({
  selector: 'app-card-popup',
  templateUrl: './card-popup.component.html',
  styleUrls: ['./card-popup.component.scss']
})
export class CardPopupComponent implements OnInit {

  @Input() selectedCard:any;
  @Output() formSubmitEvent: EventEmitter<Object> = new EventEmitter<Object>();

  cardForm?:FormGroup;
  openForm:boolean = false;

  constructor(private fb:FormBuilder, private boardService:TodoBoardService) { }

  ngOnInit() {
    this.cardForm = this.fb.group({
      id: this.selectedCard.id,
      title:[this.selectedCard.title, Validators.required],
      content:[ this.selectedCard.content, Validators.minLength(5)],
      priority: this.selectedCard.priority
    });
    console.log(this.cardForm);
  }

  updateCardAction(form:any) {
    console.log(form.value);
    console.log(form.valid);
    let newCard = form.value;
    newCard.priority = parseInt(newCard.priority);
    let board =  this.boardService.getBoard();
    let listIndex;
    let cardIndex;
    
    for(let [i,list] of board.entries()) {
      for(let [j,card] of list.cards.entries()) {
        if(board[i].cards[j].id  == form.value.id) {
           listIndex = i;
           cardIndex = j
        }
      }
    }
    console.log( listIndex);
    console.log( cardIndex);

     this.boardService.updateCard(listIndex, cardIndex, newCard);
     this.formSubmitEvent.emit();
  }

  openFormAction() {
    this.openForm = true;
  }

  closeFormAction() {
    this.openForm = false;
  }

}
