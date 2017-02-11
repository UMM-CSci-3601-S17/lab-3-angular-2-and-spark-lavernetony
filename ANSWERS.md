# Answers

## Exploring the project

:question: Notice anything new in our `.gitignore`? There are 
  actually multiple `.gitignore` files in this project, can you find them all?
  
The top level `.gitignore` is shorter than the previous lab. Of course we can find them! 
```
find | grep gitignore
```

There is one for hiding client-side stuff in `client/.gitignore` and one in `server/.gitignore`.

:question: Note also that there are now multiple `build.gradle` files as well! Why is this?

One of the build files specifies how to build the client, and one specifies how to build the server. 
Then the top level build just specifies to pull in both the client and the server. 

#### Exploring the "client"

:question: What are a couple of these new tools? 
Explain what some of these new tools do.

Angular is a new framework for us. We will be using TypeScript, which is also something we 
haven't used before. Webpack is another new tool.

:question: Is our SparkJava server the only thing doing routing?

No, both the angular server and the spark server have their own routing systems.

:question:  How does the navbar work in this project?

If there's a tag `navbar-component`, the tag portion is converted into the contents 
of `navbar.component.html` When a link is clicked, `app.routes.ts` defines the corresponding
routing for the given value. When the Users page is loaded, another routing occurs in 
the Spark side when it gets the request. 

:question: What does the `user-list.service.ts` do? Why is it not just done in the `user-list.component.ts`?

`user-list.service.ts` is an injectable dependency for using in the component `user-list.compenent.ts`.
This structure is used to achieve robust modularity. The component doesn't have to know about where 
the data actually comes from. 