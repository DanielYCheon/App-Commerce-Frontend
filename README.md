<a id="top"></a>
# Online Commerce Application - Frontend

<br/>
<div align="left">
A React-based e-commerce web application designed to provide a seamless shopping experience. It includes features such as user authentication, product management, and a shopping cart, all styled with Tailwind CSS and managed through various React components and contexts.
</div>
<br/><br/>

## :clipboard: Table of Contents

1. [Introduction](#Introduction)
2. [Demo](#Demo)  
3. [Key Features](#Key-Features)
4. [Functionality](#Functionality)
5. [Built With](#Built-With)
6. [Getting Started](#Getting-Started)
   - [Prerequisites](#Prerequisites)
   - [Installation](#Installation)
7. [Usage](#Usage)
8. [License](#License)
7. [References](#References)

<br/>
<!--- -----------------------------------------------------------------------------------------Section Divide--------------------------------------------------------------- --->

<a id="Introduction"></a>
## Introduction
The Commerce Client application delivers user-friendly shopping experience through a responsive interface built with React and Tailwind CSS.  Users can explore product categories, man or woman,  view detailed information, add items to their cart, and manage their accounts effortlessly. User authentication and access authorization are securely managed by a backend server, with each login verified via a RESTful API to ensure only authorized users can access their accounts. Using Axios, the application dynamically retrieves images from the database, enhancing content display. The app also provides admin functionality, offering an admin panel where administrators can upload new products, images, and detailed information. Key features, including wishlist management,  and robust user authentication, make this application a comprehensive e-commerce platform.

<br/>
<!--- -----------------------------------------------------------------------------------------Section Divide--------------------------------------------------------------- --->

<a id="Demo"></a>
## :floppy_disk: Demo

<br/>

| Landing  | Admin Panel |
| ------------- | ------------- |
| ![Navbar](https://github.com/user-attachments/assets/0e7905d9-119b-4330-bfec-10f519065683)  | ![AdminPage](https://github.com/user-attachments/assets/974dd0d8-bb72-4d18-827f-b0b4aafdb1e3)|

<br/>

| Login  | Register |
| ------------- | ------------- |
| ![LoginPage](https://github.com/user-attachments/assets/33698f61-31c6-4a4b-a4a8-829c93fc0640)  | ![Register](https://github.com/user-attachments/assets/862dbf95-4cfc-44e7-b921-7d59ad13e0b6)|

<br/>

| Man Section  | Women Section  |
| ------------- | ------------- |
| ![MenSection](https://github.com/user-attachments/assets/9bbaf49a-1867-44d8-95e3-683e90c8a146) | ![WomenSection_Desktop](https://github.com/user-attachments/assets/17191a95-aa9f-405a-bdeb-e9a2ffa78da8)|

<br/>

| Account  | Address  |
| ------------- | ------------- |
| ![Account](https://github.com/user-attachments/assets/6a6c26f5-8603-4ce9-af8d-bf539a4514d7) | ![Address](https://github.com/user-attachments/assets/6846b2db-06f2-44d5-901e-3853515276ec)|

<br/>

| Wishlist  | Click Cart  |
| ------------- | ------------- |
| ![WishlistUser](https://github.com/user-attachments/assets/60d458b3-f923-44cf-b679-b268cec24fdb) | ![ShoppingCart](https://github.com/user-attachments/assets/32772553-07ee-4ccc-b8d9-21326809d595)|


<br/>

![Animation](https://github.com/user-attachments/assets/51d55f48-3e0c-4eb3-b6f3-ce6e626132e7)



<!--- -----------------------------------------------------------------------------------------Section Divide--------------------------------------------------------------- --->

<a id="Key-Features"></a>
## :star: Key Features

1. **User Authentication**
    - Secure registration and login with session managmenmt.
    - Token base authentication with refresh token support.
    - Protected routes for authenticated users.

2. **Product Management**
    - Display products by gender.
    - Products can add to shopping cart.
    - Product detail view with [zoom feature](#Functionality)

3. **Shopping Cart**
    - Add and view items in the shopping cart.
    - Display total quantity and price of items in the cart.

4. **User Account Management**
    - View and update user account details in user account page.
    - Change user password in account page.

5. **Admin Features**
    - Upload products details with image.

6. **Responsive Design**
    - Using TailwindCSS enables responsive design and enhances UI design.
    - Using TailwindCSS Web, tablet, and mobile

7. **API Integration**
    - Using Axios for making API requests.

<div align="right">
   
   [Go To Top](#top)
   
</div>

<!--- -----------------------------------------------------------------------------------------Section Divide--------------------------------------------------------------- --->

<a id="Functionality"></a>
## :gear: Functionality 
This functionality allows the image to zoom in when the user hovers the mouse over it. It calculates the mouse position as a percentage of the image’s width and height, then adjusts the zoom box to be 20% of the image’s total size, providing an zoom effect based on the mouse's position.

<span>
<img src="https://github.com/user-attachments/assets/da1b3e3d-a0f0-46ec-887c-434426b61e7d" alt="ZoomIn" width="400">
<img src="https://github.com/user-attachments/assets/9c381716-1dea-4282-b090-286e97eef963" alt="ZoomFomula" width="600">
</span>
   
 >To find the **coordinate(x,y) of the mouse on the image**
           
      
<div align="center">
<img src="https://latex.codecogs.com/svg.image?X_{\text{total}}=\left(\frac{\text{Coordinate&space;of&space;the&space;mouse}{(X_{axis})}-\text{left}}{\text{Total&space;width&space;of&space;the&space;image(W)}}\right)\times&space;100\%"/>
</div>
<br/>
 
Where:     
  - **Coordinate of the mouse (X-axis)** : The current X-axis position of the mouse.
  - **left** : The X-coordinate of the leftmost point of the image.
  - **W** : The total width of the image.
  - **100%** : Represents the relative percentage of the image width.

<br/>

<div align="center">
<div style="overflow-x: auto; white-space: nowrap;">
 <img src="https://latex.codecogs.com/svg.image?Y_{\text{total}}=\left(\frac{\text{Coordinate&space;of&space;the&space;mouse}{(Y_{axis})}-\text{top}}{\text{Total&space;width&space;of&space;the&space;image(H)}}\right)\times&space;100\%"/>
</div>
</div>

<br/>

Where:
 - **Coordinate of the mouse (Y-axis)** : The current Y-axis position of the mouse.
 - **Top** : The Y-coordinate of the hight of the image.
 - **H** : The total hight of the image.
 - **100%** : Represents the relative percentage of the image hight.

<br/>

>To Determine the ZoomBox Area using ratio, (Width : w_zoomBox) = (100% : 20%)

<div align="center">
<img src="https://latex.codecogs.com/svg.image?[\frac{W_{total}}{W_{zoomBox}}]=[\frac{1}{0.2}]"/>
<br/><br/>
<div align="center">By multiplying both sides by <img src="https://latex.codecogs.com/svg.image?(W_{zoomBox})"/>, we get: </div>
<br/>
<img src="https://latex.codecogs.com/svg.image?[W_{zoomBox}\times&space;100]"/>
</div>


Where:
- **$\( W_{\text{total}} \)$** is the total width.
- **$\( W_{\text{zoomBox}} \)$** is the width of the zoom box.
- **$Width$** is the original width of the image.
- **$20%$**  is used to determine that the zoom box should be 20% of the image's width and height.

<div align="right">
   
   [Go To Top](#top)
   
</div>

<!--- -----------------------------------------------------------------------------------------Section Divide--------------------------------------------------------------- --->
<a id="Built-With"></a>
## :wrench: Built With

  - React : Javascript library.
    
  - Axios : a promise-based JavaScript library used to make HTTP requests.
    
  - Tailwind CSS: A utility-first CSS framework packed with classes, enabling the composition of any design directly within markup.
    
  - Babel :  JavaScript compiler that converts modern JavaScript code into backwards-compatible versions for older browsers and environments.

<div align="right">
   
   [Go To Top](#top)
   
</div>

<!--- -----------------------------------------------------------------------------------------Section Divide--------------------------------------------------------------- --->

<a id="Getting-Started"></a>
## :globe_with_meridians: Getting Started


> [!CAUTION]
> This frontend application requires the backend server and database to be set up for full functionality. Please read **_Prerequisites_**


<br/>
<!--- -----------------------------------------------------------------------------------------Section Divide--------------------------------------------------------------- --->

<a id="Prerequisites"></a>
### :rotating_light: Prerequisites

- Backend Server : This Frontend, **Online Commerce Application - Frontend**, requires a backend server implemented with Spring Boot, for full functionality. Make sure to set up and run the backend project, [Online Commerce Application - Backend](https://github.com/DanielYCheon/App-Commerce-Backend)
  
- Database : The database uses **MySQL** to store product and user information. Ensure the database is set up and configured according to the [Online Commerce Application - Backend](https://github.com/DanielYCheon/App-Commerce-Backend) 

<br/>

<!--- -----------------------------------------------------------------------------------------Section Divide--------------------------------------------------------------- --->

<a id="Installation"></a>
### Installation
Follow these steps to set up the project on your local machine:

#### 1. Clone the repository
```sh
git clone https://github.com/DanielYCheon/App-Commerce-Frontend.git
```

#### 2. Navigate to the project directory:
```sh
cd App-Commerce-Frontend
```

#### 3. Install the dependencies
Run the following command to install all necessary packages
```sh
npm install
```

#### 4. Run the Backend Server. 
Start the backend server and database for the API endpoints to work with the frontend. Instructions for setting up the backend server can be found in the [Online Commerce Application - Backend](https://github.com/DanielYCheon/App-Commerce-Backend) 


<div align="right">
   
   [Go To Top](#top)
   
</div>

<!--- -----------------------------------------------------------------------------------------Section Divide--------------------------------------------------------------- --->

<a id="Usage"></a>
## :rocket: Usage 
Start the development server: Launch the application locally
```sh
npm start
```
Open http://localhost:3000 to view it in your browser.

<div align="right">
   
   [Go To Top](#top)
   
</div>

<!--- -----------------------------------------------------------------------------------------Section Divide--------------------------------------------------------------- --->

<a id="License"></a>
## :octocat: License
This project is licensed under the MIT License - see the ```LICENSE.md``` file for details.

<div align="right">
   
   [Go To Top](#top)
   
</div>

<!--- -----------------------------------------------------------------------------------------Section Divide--------------------------------------------------------------- --->

<a id="References"></a>
## :books: Reference

- Axios Documentation :  Referenced the official [Axios Documentation](https://axios-http.com/docs/api_intro) to handling HTTP requests.
  
- TailwindCSS <code><img width="24" src="https://user-images.githubusercontent.com/25181517/202896760-337261ed-ee92-4979-84c4-d4b829c7355d.png" alt="Tailwind CSS" title="Tailwind CSS"/></code>: [TailwindCSS Documentation](https://tailwindcss.com/docs/using-with-preprocessors) for integrating TailwindCSS with preprocessors in the project.

- React Router Documentation : Used [React Router Documentation](https://reactrouter.com/en/main/routers/picking-a-router) for guidance on appropriate router for managing routes in the application.

<div align="right">
   
   [Go To Top](#top)
   
</div>








