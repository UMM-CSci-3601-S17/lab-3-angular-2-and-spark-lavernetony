import { Component } from '@angular/core';
import { TodoListService } from "./todo-list.service";
import { FormsModule } from '@angular/forms';
// import { FilterBy } from "./filter.pipe";

@Component({
    selector: 'todo-list-component',
    providers: [TodoListService],
    templateUrl: 'todo-list.component.html',
})

export class TodoListComponent {
    private todos: any;

    constructor(private _todoListService: TodoListService) {
        // this.todos = _todoListService.getTodos();
    }

    ngOnInit(): void {
        this._todoListService.getTodos().subscribe(
            users => this.todos = users,
            err => {
                console.log(err);
            }
        );
    }
}


