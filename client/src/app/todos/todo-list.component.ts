import { Component, OnInit } from '@angular/core';
import { TodoListService } from "./todo-list.service";
import { Todo } from "./todo";
import { FormsModule } from '@angular/forms';
import { FilterBy } from "../users/filter.pipe";
import { Md5 } from 'ts-md5/dist/md5';

@Component({
    selector: 'todo-list-component',
    // providers: [TodoListService],
    providers: [ FilterBy ],
    templateUrl: 'todo-list.component.html',
})

export class TodoListComponent implements OnInit{
    public todos: Todo[];
    public categoryColors: Map<String, String>;

    constructor(private _todoListService: TodoListService) {
        // this.todos = _todoListService.getTodos();
    }

    ngOnInit(): void {
        this._todoListService.getTodos().subscribe(
            todos => {
                this.todos = todos;
                this.categoryColors = new Map();
                for (var todo of todos) {
                    let category = todo.category;
                    if (this.categoryColors.get(category) == null) {
                        this.categoryColors.set(category, this.stringToColorString(category));
                    }
                }
            },
            err => {
                console.log(err);
            }
        );
    }

    private stringToColorString(input: string): string {
        let hashCode:any = Md5.hashStr(input);

        let r:string = hashCode.substring(0,2);
        let g:string = hashCode.substring(2,4);
        let b:string = hashCode.substring(4,6);

        return "#" + r + g + b;
    }

}


