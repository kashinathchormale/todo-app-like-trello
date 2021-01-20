import { TestBed } from '@angular/core/testing';

import { TodoBoardService } from './todo-board.service';

describe('TodoBoardService', () => {
  let service: TodoBoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoBoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
