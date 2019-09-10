# portfolio-dashboard-front-end

> Front end for the portfolio dashboard project.

[Click here for portfolio dashboard in production](https://tm-portfolio-dashboard.herokuapp.com/)  

I'm interested in personal finance and wanted a tool to help me show my web development skills in a way that's interesting to me.  

This site attempts to be accurate, but **I cannot guarantee that it is accurate**.  

**Do not make financial decisions based on this site.**  

## Business Problem Solved  
Save time and effort on checking important but time-consuming tasks.  It's important to maintain a portfolio composition / asset allocation that matches your risk profile, but it takes time to do it.  This site automates the process so you can spend more time thinking strategically.  

Convey information in a dashboard with graphics.    

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```  

## Technologies Used
* Vue.js
* JavaScript / HTML / SCSS  

## Libraries & Plugins
* Twitter Bootstrap  

## APIs
* none: the back end part of the project uses the AlphaVantage stock price API  

## Future Implementations  
* Use Chart.js to show the data in a chart.  
* Tag a security as needing monitoring and set thresholds for it.  Show the security against the specified thresholds in the "Monitored securities" page.  
* Allow users to log in with Google or a local username / password.  
* Allow logged-in users to save portfolios.  
* Automatically update asset allocations and friendly names based on a symbol.  

## Known issues  
* The file name for 'App.vue' is capitalized and the other .vue files are all lowercase.  I encountered a bug where the project wouldn't load consistently if I followed the all-lowercase naming convention on that file.  I'll submit an issue on this when I have the time.  