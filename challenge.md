## Implement a Multiple-choice Quiz application in a language/framework of your choice

### The application should have the following features:

* it should have a command line interface (unless you implement a Web UI with React or another web JavaScript framework)
* it should start by printing the rules of the quiz and ask the user for a confirmation (yes/no)
* it should go through a list of predefined questions and 3 or 4 possible answers (marked by a, b, c, d)
* after each question is printed, the application waits for the answer (must be a letter corresponding to one of the possible answers)
* if an unacceptable letter is entered (like y or z), a message is shown that it must be one of the possible answers (a, b, c, d)
* each question is scored between 10 and 100
* the total score of all asked questions must equal 1000
* total of 20 questions should be asked:
    * 3 questions with score 100
    * 4 questions with score 75
    * 5 questions with score 40
    * 8 questions with score 25
* after all questions are answered, the application should print the result:
    * total score
    * number of correct answers
    * number of wrong answers
    * percentage of correct answers
    * the list of wrong answers (question + correct answer)
    * pass/fail message (pass if sum score of correctly answered questions is greater than 600)

Please find a list of 20 questions and answers on any topic interesting to you somewhere online. 

### Bonus points:

* rest API
* web UI
* database
* random questions on each run
* random order of answers on each run
* unit/integration tests