# Availity’s Fullstack Homework Assignment

## Written Responses

#### 1. Tell me about your proudest professional achievement. It can also be a personal or school project.

In my first personal project, I worked with a group of my friends to develop an app that helped improve our performance in our favorite video game. Our preferred specialization in the game required a calculator to be effective, and all the calculators that were available at the time were too slow or difficult to use so we decided to build our own. We developed a workflow for how we liked to play the game and from that we derived a list of features and requirements. From there we split assigned roles to each group member including project manager, designer and developer. Because of this tool, we became one of the most well known and notorious groups within our specialization within the game's community.

#### 2. Tell me about something you have read recently that you would recommend and why. (Can be a Github Repo, Article, Blog, Book, etc

#### 3. How would you explain what Availity does to your grandmother?

Availity makes websites that hospitals and doctors can access to talk with insurance companies about patients' coverage, and to collect money from the insurance companies for covered patient care.

## Coding Challenges

#### 4. You are tasked to write a checker that validates the parentheses of a LISP code. Write a program (in Java or JavaScript) which takes in a string as an input and returns true if all the parentheses in the string are properly closed and nested.

##### Notes

Written in JavaScript. Can be found in the `4-LISP-checker` directory.
I faced few issues while completing this challenge. My original solution did not take nesting into account, and had to be altered to fix this. However, very little was needed to implement this change.

#### 5. Healthcare providers request to be part of the Availity system. Using a modern JavaScript framework (React preferred, or Vue or Angular), create a registration user interface so healthcare providers can electronically join Availity. The following data points should be collected:

-  First Name
-  Last Name
-  NPI number
-  Business Address
-  Telephone Number
-  Email address

##### Notes

Written in React. Can be found in the `5-react-register` directory.
This challenge took me the longest to complete, but was also the most fun. I decided to forego Material UI, which is my goto for stylized components, and build all styled and functional components from scratch using JSX and CSS.
When I got to a point that I was happy with the design of the page, I started to add in some basic validation that triggers as soon as a field loses focus. If there is a problem detected with the entered data, then the user is alerted to the problem and has a chance to fix it before submitting the form.
On submit, if there are still problems with the entered data, then a message displays near the submit button and the submit is cancelled. If everything is in order, then a table is printed to the console containing the data that would have been sent to the backend.

##### Optimizations

There are a few changes I would have made to this form if I had more time.
The first change would be to add a sanity validation check to make sure that there are no empty fields. Currently, if no fields are ever focused, and the user submits, then empty data is sent to the server.
Secondly, I would split up the registration form into two steps. The first would be to collect personal information as well as the NPI number. The second step would be to collect the address information. This change is debatable, but the main reason would be to add a little extra UX into the design.
I would also change the way address information is gathered. Currently the user has to manually enter all of their address information and I would change to make it a little easier to use. At the very least, change the State field to a dropdown menu with options available.

#### 6. Availity receives enrollment files from various benefits management and enrollment solutions (I.e. HR platforms, payroll platforms). Most of these files are typically in EDI format. However, there are some files in CSV format. For the files in CSV format, write a program that will read the content of the file and separate enrollees by insurance company in its own file. Additionally, sort the contents of each file by last and first name (ascending). Lastly, if there are duplicate User Ids for the same Insurance Company, then only the record with the highest version should be included. The following data points are included in the file:

-  User Id (string)
-  First Name (string)
-  Last Name (string)
-  Version (integer)
-  Insurance Company (string)

##### Notes

Written in JavaScript. Can be found in the `6-csv-parser` directory.
This challenge probably the one I had to do the most Google-ing. I've done file I/O before, but mostly during my time at university and always in C++. I knew the main concepts and had pseudo code ready. The parts I needed help with the most was finding the NodeJS equivilents of `std::ifstream` and `std::ofstream`.
The other challenge was coming up with datasets that sufficiently tested my code.

##### Optimizations

I'm not the biggest fan of how I internally structured the data from the input files. I'd like to take some time to really look over the alogrithm and see if there is a better way to organize the data so there are less conversions needed between reading, sorting, and writing the data.
