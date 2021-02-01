# Covid App

## Brief

This app was designed using Ionic 5 and Angular 10, there is a live version available at: [GitHub Pages](https://craigronald555.github.io/Covid-App/). I managed to create a signed apk version of the app however do not have access to a mac to create an iOS app at the moment. You can install the apk on a test device simply by downloading it from [here](https://github.com/CraigRonald555/Covid-App/blob/main/app-release.apk).

Warnings: Sometimes the API will return 503 http errors which leads to data not being displayed in the app. I believe this is caused by a restriction on how many api calls can be made within a time frame. If you find the page not loading please wait a minute or two before refreshing.

Also, some smaller countries which are included in the countries list from the covid api do not have any covid data. A suitable message is displayed for these countries.

Also if using the web version... due to an issue between github pages and angular routing, refreshing any URLs other than "https://craigronald555.github.io/Covid-App/", will lead to errors. This doesn't occur on a proper hosting sites but does when using GitHub pages unfortunately.

## Components

Each component in the /app directory represents a page within the app. There are three components: home, search and country. These are used to add components from ionic and display data returned from the api service 

## Service

The api service is used to communicate the covid api, each component uses this service to retrieve data by calling methods depending on what data is required.

## Models

There are two model data types: country & textData. country is used to store data from the covid api's /countries endpoint, this data is then used in the search list. textData holds the total and new data for cases, deaths and recoveries - this is the data which is shown in text format on the main page, and the country page.

I was going to create a generic data type for holding graph data, however, as the axis are different between the main page's graph, and the country page's graph. I decided that it'd be better to use more specific names for the 'graphData' object's attributes, as opposed to generic 'x-axis' and "y-axis" as this doesn't explain what the data represents.

## Summary

I'd say the biggest struggle of developing the app came from the d3 chart formatting, and it took me a while to gain an understanding of how the library works.

I think the app could be improved once I gain a further understanding of d3 - the text can appear quite small on mobile screens, and the graph can become a bit tall on PC screens as it's difficult to scale from device-to-device. I also wanted to have a line going from each point in the country graph but decided that the current solution was sufficient after trying multiple different solutions to no avail.

That being said, I am happy with how the app turned out. Although I hadn't used ionic, d3 graphs or andorid studio before, I was confident in my approach to break the app down into useful components and services - making it easier to understand what needed to be done and where. 

Once I had a structure and developed an understanding of the covid api, I was able to create the views and display the text data fairly quickly. The app is optimised to only load data once the page which requires it has been navigated to; and it only loads it once, regardless if they click away and come back to the page. This prevents unnecessarily loading fairly large JSON files which won't be used or reloading them once we already have the data.