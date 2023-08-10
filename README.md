# Mean-Stack-Example

Welcome to My Mean Stack Example

I have created this project to help build a better understanding of how the Mongodb, Express, Angular and Node technology stack can be implemented when creating a restful api, currently the project is a work in progress and is likely to be updated frequently. The project is set around a online movie store where users can register to purchase and download movies from an online movie store, the following
use case diagram highlights the interactions needed within the system to be implemented.

Use case diagram
![Movies$You usecase](https://github.com/Jc123uk21/Mean-Stack-Example/assets/92167481/2948d55e-3692-4b0f-b879-88adebce51e3)




System Overview

![System overview rest api](https://github.com/Jc123uk21/Mean-Stack-Example/assets/92167481/43f70a2b-ccd3-46ac-852a-a0517d554aeb)


Initial Class Diagram

![movies4you class diagram](https://github.com/Jc123uk21/Mean-Stack-Example/assets/92167481/b817a05c-7c97-4744-b3b6-9ba62f6b1437)

**_Project Setup_**

**Step 1**

The initial step to be taken is to decide which IDE to use to when developing the system, I have decided to use VS Code as it is light
weight, easy to use and provides all the neccesary functionalities needed. It can be downloaded from here https://code.visualstudio.com/download and you will also find links to offical installation and user guides there too.

**Step 2**

Next a folder needs to be created to hold the project files, the location of the folder should be accesable to VS Code (the IDE)
as it will need to access the files within it, I simpley created a new folder on the desktop.

**Step 3**

As we will be using node on the server side it will also need to be installed, you can find the latest version and 
links to the installation guide here https://nodejs.org/en , once installed open VS Code run the following commands in the
terminal to check node and NPM (Node Package Manager) has been installed and which versions are being used, 

node --version

npm --version


**Step 4**

As we will be using Angular on the frontend Angular/CLI will also need to be installed, this will help create the project
structure and also allow us to us simple commands to carry out various tasks. It can be install globally using the node package manager (NPM) via the following command 

      npm install -g @angular/cli

**Step 5**

Next because Mongodb is the choosen database it will also need to be installed via https://www.mongodb.com/pricing Selecting the option which best suits your needs,  there are also links with that page which can navigate you to numerous MongoDB tutorials to help fully understand how the database is used.

**Step 6**

This step requires us to generate a new angular project within vs code using angluar/cli via the following command
      
      ng new < your project name>   
      
when prompted add angular routing and css to the project, once npm has finished installing the required packages and created the project
file structure two new folders will need to be created to hold the frontend and backend of the application as follows

![initial file structure](https://github.com/Jc123uk21/Mean-Stack-Example/assets/92167481/7e3b0e74-20d8-4e2a-be3d-0d27790efaf7)

**Step 7**

Here we will begin to create the backend of our application, within vs code change the working directory of the terminal to the backend folder with the following command

    cd backend

Next we need to add a package.json file to the backend file structure to keep record of all the packages which are needed by the backend
of the application and we can add this file with the following command

            npm init -y

we have stuck with the default value for simplicity


Next we need to import all the necessary packages to the backend of the project, here we use the NPM to install them for us with the 
following command 

    nmp install express consola body-parser jsonwebtoken passport passport-jwt cors dotenv nodemon mongoose mongodb

Here we have choosen express for the server side, consola to give the console a better feel, body-parser to parse JSON data,
jsonwebtoken for securing our application, passport and passport-jwt to aid securing rest endpoints, cors to protect against
cross-sight-forgery, dotenv to help load our configuration file and finally nodemon to ensure the server compiles and restarts when
we have made any changes to the system, mongodb for our data storage and mongoose to interact with the database



_**Building the backend**_

**Adding the index.js file**
we next added the index.js file using the folowing command

      touch index.js


**The Models**

Next we need to add a new folder within the backend folder we created earlier named models, within this folder we will place all our
model objects


![models folder added](https://github.com/Jc123uk21/Mean-Stack-Example/assets/92167481/27054c30-77fc-4b5e-baa3-ba8f04ef2aac)


_**File structure**_

Here is where we have created mongoose schema's of all of our model objects and their attributes as they will be held and accessed within the database
            
![user model](https://github.com/Jc123uk21/Mean-Stack-Example/assets/92167481/aaf6bce3-94d2-406f-868b-ed1b8d6152bc)

_**User.js**_





**_Screen-shots_**

**Home page**
![home-page screenshot](https://github.com/Jc123uk21/Mean-Stack-Example/assets/92167481/71bc6364-8821-4b14-9ad9-29ab71e9e9e7)

**Registration page**
![registration page screenshot](https://github.com/Jc123uk21/Mean-Stack-Example/assets/92167481/20718ed7-9c94-411f-8631-441321587cd6)

**Login page**
![login page screenshot](https://github.com/Jc123uk21/Mean-Stack-Example/assets/92167481/7cdbc8ff-e46f-45e5-bfe9-9013ecc91ebc)

**Movie List Page**
![movie-list page](https://github.com/Jc123uk21/Mean-Stack-Example/assets/92167481/8c80342a-e0e6-4688-85bc-5c45f16cc7f0)


