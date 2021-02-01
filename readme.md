# Covid App

## Brief

This app was designed using Ionic 5 and Angular, there is a live version available at: [GitHub Pages](https://craigronald555.github.io/Covid-App/). I managed to create an signed apk version of the app however do not have access to a mac to create an iOS app at the moment.

Warnings: Sometimes the API will return 503 http errors which leads to data not being displayed in the app. I believe this is caused by a restriction on how many api calls can be made within a time frame. If you find the page not loading please wait a minute or two before refreshing.

Also due to an issue between github pages and angular routing, refreshing any URLs other than "https://craigronald555.github.io/Covid-App/", will lead to errors. This doesn't occur on a proper hosting site but does when using GitHub pages unfortunately.

## Components

Each component in the /app directory represents a page within the app. There are three components: home, search and country.

## Service

The api service is used to communicate the covid api, all of the components use this service to retrieve data by calling methods depending on what data is required.

## Models

There are two model data types: country & textData. country is used to store data from the covid api's /countries endpoint, this data is then used in the search list. textData holds the total and new data for cases, deaths and recoveries - this is the data which is shown in text format on the main page, and the country page.

I was going to create a generic data type for holding graph data, however, as the axis are different between the main page's graph, and the country page's graph. I decided that it'd be better to use more specific names for the 'graphData' object's attributes, as opposed to generic 'x-axis' and "y-axis" as this doesn't explain what the data represents.

## Summary

I am happy with the way the app turned out, although there 

