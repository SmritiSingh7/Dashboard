<h1 align="center">Welcome to Germany Corona Statistics Dashboard  👋</h1>


# About
The application shows real-time data for the number of cases of Corona Virus across Germany.

![4zekt6](https://user-images.githubusercontent.com/46601438/109130318-e0a68d80-7751-11eb-84b5-5d95d691b436.gif)

### ✨ Click to see the live data [DEMO](https://angular-app-dashboard.herokuapp.com/)




## Technology Used
Angular 11

Typescript

Javascript 

Bootstrap

Angular Material

## Key Features of App :
1 Real-Time data of no of cases of Corona Virus.

2 Shows number of total cases, recovered and deaths.

3 Show Data of All affected States.

4 Show Data of selected state for a selected time period- (1 week - 4 week)

5 Can sort Data in ascending /descending order 




## Run Locally

Prerequisite :  Node.js, npm and Angular CLI


### STEP 1: Install Node.js https://nodejs.org/en/download/
Click the Windows Installer button to download the latest default version.

### STEP 2: npm package manager
The Node.js installer includes the NPM package manager, so no need to install manually.

### STEP 3: Verify installation
Open a command prompt (or PowerShell), and enter the following to verify installion. Below command will give you the version installed.
```sh
node -v
```
```sh
npm -v
```
### STEP 4: Install Angular CLI
```sh
npm install -g @angular/cli
```

### STEP 5: Clone the repository 

```sh
git clone https://github.com/SmritiSingh7/Dashboard.git
```
### STEP 6: Move to project location and Install dependencies 
```sh
cd corona-dashboard
npm install
```
### STEP 7: Run
```sh
ng serve
```
Navigate to `http://localhost:4200/`. 



## CoronaDashboard

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.1.


## Rest API :Robert Koch-Institut API (v2): https://api.corona-zahlen.org/docs/
A Rest API to query all relevant corona data for Germany based on the figures of the Robert Koch-Institut.

* https://api.corona-zahlen.org/states
* https://api.corona-zahlen.org/germany

