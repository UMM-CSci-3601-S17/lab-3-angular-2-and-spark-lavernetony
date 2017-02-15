import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { Todo } from "../todos/todo";
import { TodoListComponent } from "../todos/todo-list.component";
import { TodoListService } from "../todos/todo-list.service";
import { Observable } from "rxjs";
import { PipeModule } from "../../pipe.module";

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

    // it("contains all the users", () => {
    //     expect(userList.users.length).toBe(3);
    // });
    //
    // it("contains a user named 'Chris'", () => {
    //     expect(userList.users.some((user: User) => user.name === "Chris" )).toBe(true);
    // });
    //
    // it("contain a user named 'Jamie'", () => {
    //     expect(userList.users.some((user: User) => user.name === "Jamie" )).toBe(true);
    // });
    //
    // it("doesn't contain a user named 'Santa'", () => {
    //     expect(userList.users.some((user: User) => user.name === "Santa" )).toBe(false);
    // });
    //
    // it("has two users that are 37 years old", () => {
    //     expect(userList.users.filter((user: User) => user.age === 37).length).toBe(2);
    // });

});
