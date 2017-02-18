import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { Todo } from "../todos/todo";
import { TodoListComponent } from "../todos/todo-list.component";
import { TodoListService } from "../todos/todo-list.service";
import { Observable } from "rxjs";
import { PipeModule } from "../../pipe.module";
import { FilterBy } from "./filter.pipe";

describe("Todo list", () => {

    let todoList: TodoListComponent;
    let fixture: ComponentFixture<TodoListComponent>;

    let todoListServiceStub: {
        getTodos: () => Observable<Todo[]>
    };

    beforeEach(() => {
        // stub UserService for test purposes
        todoListServiceStub = {
            getTodos: () => Observable.of([
                {
                    id: "0118999",
                    owner: "Justine",
                    status: false,
                    body: "my mama dont like you but she likes everyone.",
                    category: "hater"
                },
                {
                    id: "0118991",
                    owner: "Bieber",
                    status: false,
                    body: "you know you love me I know you care.",
                    category: "hater"
                },
                {
                    id: "0118993",
                    owner: "Taylor",
                    status: false,
                    body: "haters gonna hate.",
                    category: "pop"
                }
            ])
        };

        TestBed.configureTestingModule({
            imports: [PipeModule],
            declarations: [ TodoListComponent ],
            // providers:    [ UserListService ]  // NO! Don't provide the real service!
            // Provide a test-double instead
            providers:    [ { provide: TodoListService, useValue: todoListServiceStub } ]
        })
    });

    beforeEach(async(() => {
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(TodoListComponent);
            todoList = fixture.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("contains all the todos", () => {
        expect(todoList.todos.length).toBe(3);
    });

    it("contains a todo whose owner is 'Taylor'", () => {
        expect(todoList.todos.some((todo: Todo) => todo.owner === "Taylor" )).toBe(true);
    });

    it("contain a todo whose owner is 'Justine'", () => {
        expect(todoList.todos.some((todo: Todo) => todo.owner === "Justine" )).toBe(true);
    });

    it("doesn't contain a todo whose owner is 'Santa'", () => {
        expect(todoList.todos.some((todo: Todo) => todo.owner === "Santa" )).toBe(false);
    });

    it("contains a todo whose body contains 'haters'", () => {
        let filter: FilterBy = new FilterBy();
        expect(filter.transform(todoList.todos, {body: "haters"})).toEqual([todoList.todos[2]]);
    });

    it("contains two todos whose category is 'hater'", () => {
        let filter: FilterBy = new FilterBy();
        expect(filter.transform(todoList.todos, {category: "hater"})).toEqual([todoList.todos[0],todoList.todos[1]]);
    });

});
