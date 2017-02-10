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