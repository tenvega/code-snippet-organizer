import dbs 
mongoimport --db codesnippets --collection users --out users.json ,
mongoimport --db codesnippets --collection snippets --out snippets.json
sign in using: email: 
-luis@gmail.com password: dos 
-ki@gmail.com password: tres
or regiter for an accoutn.

Project Details:
Using Express and Mongoose, create an application that organizes code snippets that you save for later use.

At a minimum, snippets should have:

-a title
-a body (the code)
-optional notes
-a language
-tags -- that is, user-defined words or phrases that classify the code, like "authentication", "front-end", "middleware", or    "database".

Your application must:

-have a comprehensive set of tests for all controllers and models
-have registration and login
-allow you to create a snippet
-allow you to see a list of all your snippets
-allow you to see a list of all your snippets for a specific language
-allow you to see a list of all your snippets for a specific tag
-allow you to look at an individual snippet
-have an API to allow for creating and viewing of snippets as listed above
