import { Component, OnInit } from '@angular/core';
import { TodoListService } from "./todo-list.service";
import { Todo } from "./todo";
import { FormsModule } from '@angular/forms';
import { FilterBy } from "../users/filter.pipe";

@Component({
    selector: 'todo-list-component',
    // providers: [TodoListService],
    providers: [ FilterBy ],
    templateUrl: 'todo-list.component.html',
})

export class TodoListComponent implements OnInit{
    public todos: Todo[];

    constructor(private _todoListService: TodoListService) {
        // this.todos = _todoListService.getTodos();
    }

    ngOnInit(): void {
        this._todoListService.getTodos().subscribe(
            todos => this.todos = todos,
            err => {
                console.log(err);
            }
        );
    }
}


