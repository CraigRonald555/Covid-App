# Covid App

This app was designed using Ionic 5 and Angular, there is a live version available at: [GitHub Pages](https://craigronald555.github.io/Covid-App/).

Warnings: Sometimes the API will return 503 http errors which leads to data not being displayed in the app. I believe this is caused by a restriction on how many api calls can be made within a time frame. If you find the page not loading please wait a minute or two before refreshing.

Also due to an issue between github pages and angular routing, refreshing any URLs other than "https://craigronald555.github.io/Covid-App/", will lead to errors. This doesn't occur on a proper hosting site but does when using GitHub pages unfortunately.

## Components

Each component in the /app directory represents a page within the app. There are three components: home, search and country.

## Service

The api service is used to communicate the covid api, each of the components use this service to retrieve data. There are multiple methods with different purposes. 

