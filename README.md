# Mean-Stack-Example

Welcome to My Mean Stack Example

I have created this project to help build a better understanding of how the Mongodb, Express, Angular and Node technology stack can be implemented when creating a restful api, currently the project is a work in progress and and the project code and walk through is likely to be updated frequently, for each step discussed I will not go into depth about the code itself but rather try to identify some of the key pieces of information and concepts which we will need to understand in order to identify how the overall system is implemented, full code can be refered too whilst investigating the steps layed out through-out this walk through. The project is set around a online movie store where users can register to purchase and download movies from an online movie store, the following use case diagram highlights the interactions needed within the system to be implemented.

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
cross-site-forgery, dotenv to help load our configuration file and finally nodemon to ensure the server compiles and restarts when
we have made any changes to the system, mongodb for our data storage and mongoose to interact with the database



_**Building the backend**_

**Adding the index.js file**

we next added the index.js file as it will be the entry point of the backend of our system, create it using the folowing command

      touch index.js
      
**Creating the backend file strcuture**

We now need to create the file structure for the backend of the system, we need to create the following folders within the backend folder we have already created, a config folder to hold configuration files, a controller folder to hold all our controllers, a models folder to hold all our model objects, a middlewares folder to hold any middleware framworks we use, a routes folder for holding files containing our routing data, a utility (services) folder to hold our classes which will be used be the system

![backend file structure](https://github.com/Jc123uk21/Mean-Stack-Example/assets/92167481/a4ad1f18-1849-4a73-a16e-1bb7823e816d)

**_Final backend file structure_**

**Backend models**

Here we have next created our two modelled objects (movie.js and user.js) using mongoose to aide the serialization of data between the server and data storage layer, we have created these files within the models folder.

![model example](https://github.com/Jc123uk21/Mean-Stack-Example/assets/92167481/2a54f715-043d-4cee-a5aa-de548569ae2c)

**_Example of modelled object using mongoose_**

the key point to remember here is that we are creating a new database schema and then making that available by exporting it to the system as a model object.

**_Database configuration_**

Next we create the dotenv file which will hold the database configuration details, to do this we create a new file named .env and code the following configuration details 

![env screenshot](https://github.com/Jc123uk21/Mean-Stack-Example/assets/92167481/3af94a09-6fd1-4cf4-8767-1217b2a2e9ce)

here we are assigning the database url, the port to be used and a secret key to be used when validating a jwt to variables that will be used by our main configuration file for the backend system, keeping these details all in one place allows us to minimise changes which may be needed in the future to be contained to one file.


**_Routing Requests_**

Next we create the route.js files for each of the models in the routes folder, these files will route incoming request to the appropriate controller and its methods which will in turn allow us to perform our crud request to the data layer.

When implementing these files we first need to pull in express and setup a Router which will allow us to access its crud methods for handling requests, we will also need to need to bring the bodyparser package to parse any data from requests and  our respones to JSON format.

**Require modules for routing**

![routing modules needed](https://github.com/Jc123uk21/Mean-Stack-Example/assets/92167481/30f3016b-3e0a-4ead-a668-582c025764b1)


we then go on to implement the various methods to carry out crud requests over each of our models, please note the use of async and await as these are used because our requests require us to interact with the datalayer and this ensures that each method called has
responded to the method call before our routing method returns a response, also note the the contoller methods called by the routing methods within the routing files have not been implemented yet, these are the method names which we will implement in our controllers in a subsequent step.


**Routing methods example**

![routing movies](https://github.com/Jc123uk21/Mean-Stack-Example/assets/92167481/28c42316-c330-4ad1-8725-1aa187e0a0e5)

**_Configure the index.js_**

Before we move onto creating our controllers and adding any middleware functionalities to the backend we will next begin to implement our main index.js file for the backend, it will start our backend system and setup our systems routing information along with having the responsibility of setting up all the modules which are required by the system on start-up.

**Index.js example**

![setup packages needed index](https://github.com/Jc123uk21/Mean-Stack-Example/assets/92167481/88cd87ae-fc96-4787-bb3c-6f524f1c2ad8)

It is here where we declare our express app along with the middleware packages we previously installed

![index initialize middlewares](https://github.com/Jc123uk21/Mean-Stack-Example/assets/92167481/ab2f12f6-b844-4812-9835-65d1d6e47816)

And also setting out our configuration for startup and the data layer 

![startup config](https://github.com/Jc123uk21/Mean-Stack-Example/assets/92167481/45cf5fd5-1f83-4790-ac22-ebe66f9a4e2d)

**_Controllers_**

We next go on to implement the controllers which will handle request made for our models, these controllers will receive requests and then interact with the data layer when required before returning a respone, Within the controllers we can access predefined methods to interact with our data through importing our mongoose models we created earlier, also notice how we continue to use the functionality of async and await when interacting with the data layer to keep all steps asynchronous.


**Example of Controller**

![controller example](https://github.com/Jc123uk21/Mean-Stack-Example/assets/92167481/1a571c6f-c3f4-414b-81fb-196d0d916bc9)

Once all methods have been implemented we next need to export these as a module to make them available to other parts of the system when they need to call upon them

**Exporting module methods**

![export methods](https://github.com/Jc123uk21/Mean-Stack-Example/assets/92167481/75f7f633-1eab-488a-8619-ef120bcd8726)





**_setup-authentication_**

Next user authentication and authorization needs to be setup in order ensure users can only access resoures permitted to them, the next step is to create and configure our passport middleware. If you are unfamillar with passport you can get a better understanding here https://www.passportjs.org/docs/ this will help us authenticate and authorize by interacting with our users bearer tokens in the request
header.

**_passport.js_**
![passport screen](https://github.com/user-attachments/assets/a06b9150-c98c-4b61-9834-a3ed978d1ab0)

**_authUtil_**

Next we create our authorization and authentication utility class to handle requests for creating new users, logging in users. This utility class will add new users to our database, check wheather users logging in exist and handle creating our jason web tokens.

![authUtil screen](https://github.com/user-attachments/assets/d74ce184-13c8-4373-86f1-18bd1c7ca27e)




**_Screen-shots_**

**Home page**
![home-page screenshot](https://github.com/Jc123uk21/Mean-Stack-Example/assets/92167481/71bc6364-8821-4b14-9ad9-29ab71e9e9e7)

**Registration page**
![registration page screenshot](https://github.com/Jc123uk21/Mean-Stack-Example/assets/92167481/20718ed7-9c94-411f-8631-441321587cd6)

**Login page**
![login page screenshot](https://github.com/Jc123uk21/Mean-Stack-Example/assets/92167481/7cdbc8ff-e46f-45e5-bfe9-9013ecc91ebc)

**Movie List Page**
![movie-list page](https://github.com/Jc123uk21/Mean-Stack-Example/assets/92167481/8c80342a-e0e6-4688-85bc-5c45f16cc7f0)


