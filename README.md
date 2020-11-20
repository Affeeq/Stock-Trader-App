# Stock Trader App

### Website hosted on AWS S3 - [Stock Trader App](http://vue-stock-trader-app-v2.s3-website.us-east-2.amazonaws.com)

### Demo - email: test1@email.com, password: 123456

### Technology
* Vue.js
* Bootstrap-Vue
* Firebase

### About
* Add User Authorization into the app.
* Add navigation guards
* Migrated to Bootstrap-Vue 

### Database: Firebase

### Key things that I learned from this project
* Vuex as a central store 
* Vue Router for links
* Component communication with transition and animation
* Using a database and setting up put and get request
* Vuex modules communication
* Dynamic styling and events 
* Using Bootstrap-Vue instead of Bootstrap to make Vue app responsive
* Added navigation guards by using resources
* Added user authorization using Firebase authentication
* Added form validation that is responsive to user's inputs

### Pages

![Sign In](https://github.com/Affeeq/Stock-Trader-App/blob/master/images/Screen%20Shot%202020-08-20%20at%209.04.15%20PM.png)

#### Sign In

Email and password validation are implemented by validating it through Firebase.

![Sign Up](https://github.com/Affeeq/Stock-Trader-App/blob/master/images/Screen%20Shot%202020-08-20%20at%209.05.16%20PM.png)

#### Sign Up

Email is validated usign a regex test and password is validated through Firebase. Both confirm email and confirm password are validated to ensure they are similar to both email and password.

![Home](https://github.com/Affeeq/Stock-Trader-App/blob/master/images/Screen%20Shot%202020-08-20%20at%209.05.59%20PM.png)

#### Home

Home page has the instructions and the start value to use to buy stocks.

![Stocks](https://github.com/Affeeq/Stock-Trader-App/blob/master/images/Screen%20Shot%202020-08-20%20at%209.06.48%20PM.png)

#### Stocks

4 different stocks are provided with a dynamic buying price. All stocks input fields has input validation to ensure user has enough funds to buy stocks.

![Portfolio](https://github.com/Affeeq/Stock-Trader-App/blob/master/images/Screen%20Shot%202020-08-20%20at%209.08.03%20PM.png)

#### Portfolio

Portfolio shows the stocks that were bought with dynamic sellling price and its current bought price. All portfolio input fields has input validation to ensure user can only sell the right amount of stocks bought.

#### Other Features

##### End Day

End Day will end the day to buy stocks and change the value of buying stocks.

##### Save Data

Save Data will save all data including funds, bought stocks and sold stocks on that particular day.

##### Load Data

Load Data will load all data including funds, bought stocks and sold stocks on the day the data was saved.
