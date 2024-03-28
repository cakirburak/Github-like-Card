# GithubLikeCard

## Table of Contents
1. [Introduction](#introduction)
2. [Requirements](#requirements)
3. [Installation](#installation)
4. [Development](#development)
5. [Software Design Decisions](#software-design-decisions)
6. [License](#license)

## Introduction

This project is developed to demonstrate a **responsive** design of a real world example using:
- Angular v17.3.1
- TailwindCSS
- Firebase ( Authentication & Deployment )

## Requirements

- [Node.js](https://nodejs.org/en/download/current) to install dependencies
- [Angular CLI](https://angular.io/cli) to **run** | **test** | **build** the application
- [Firebase CLI](https://firebase.google.com/docs/cli#mac-linux-npm) to configure authentication and deployment

## Installation

```bash
# clone the repository
$ git clone https://github.com/cakirburak/Github-like-Card.git

# install dependencies
$ cd github-like-card && npm install
```

## Development
```bash
# run the application on local environment `http://localhost:4200/`
$ ng serve
```

## Deployment

- You need to login to your Firebase account with CLI before deployment

```bash
# login to firebase account
$ firebase login
```

- After executing the command below you should link it to your firebase project with following deployment configuration options

```bash
# deploy the application to Firebase hosting using Firebase CLI tool
$ ng deploy
```

## Software Design Decisions

### Authentication

- A service layer implemented for managing authentication operations
- It features signin and signup functionalities to desired components

### UI and Responsive Layouts

- TailwindCSS is used for styling the UI
- To achieve implementing responsive design: [Breakpoints](https://tailwindcss.com/docs/responsive-design) are used,

  #### Examples
  1. 
  ```js
  <div class="flex flex-col md:flex-row">...</div>
  // it switches flex direction according to device viewport
  // in this case; apply col for viewport smaller than md, row for lager than md
  ```
  2.
  ```js
  <div class="text-base sm:text-lg md:text-xl lg:text-2xl">...</div>
  // it switches text size according to device viewport
  // in this case applies; base for viewport smaller than sm,
  //                       lg for viewport larger than sm and smaller than md,
  //                       xl for viewport larger than md and smaller than lg,
  //                       2xl for viewport larger than lg
  ```

## License

📄 This project is licensed under the [MIT License](LICENSE).
