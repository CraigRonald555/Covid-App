import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { count } from 'console';
import { Country } from './models/country.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  summaryData;
  countriesList: Country[];

  constructor(private http: HttpClient) { }

  // Populate this.summaryData with data from /summary endpoint
  async retrieveSummary() {

    // if summary data hasn't been loaded yet
    if(this.summaryData === undefined) {
      this.summaryData = await this.http.get("https://api.covid19api.com/summary").toPromise();
    }

    console.log(this.summaryData);

  }

  // Populate this.countriesList with data from /countries endpoint
  async retrieveCountries() {

    console.log('Loading countries from API');
    
    // If list hasn't been loaded yet
    if(this.countriesList === undefined) {
      
      this.countriesList = await this.http.get<Country[]>("https://api.covid19api.com/countries").toPromise();

      // Order countries alphabetically
      this.countriesList.sort(function(a, b){
        if(a.Country < b.Country) { return -1; }
        if(a.Country > b.Country) { return 1; }
        return 0;
      });

    }

  }

  // Returns the top five countries with highest new cases
  async findHighestNewCases() {

    // Make sure summary has been retrieved
    await this.retrieveSummary();

    // Sorts the 'Countries' data into a top five based on 'NewConfirmed'
    const highestNewCases = this.summaryData['Countries'].sort((a,b) => b['NewConfirmed']-a['NewConfirmed']).slice(0,5);

    // Filter out unnecessary data
    const cleanedHighestNewCases: {
      country: string,
      newCases: number
    }[] = [];

    // Loop through the top five from the original array but only push the data we need to make the graph
    highestNewCases.forEach(currentCountry => {
      cleanedHighestNewCases.push({country: currentCountry['Country'], newCases: currentCountry['NewConfirmed']});
    });

    console.log(highestNewCases);
    console.log(cleanedHighestNewCases);

    return cleanedHighestNewCases;

  }

  // Returns country object from summary (useful for text data.. total and new for: cases/deaths/recovered)
  async findCountryInSummary(countryName: string) {

    // Make sure summary has been retrieved
    await this.retrieveSummary();

    const country = this.summaryData['Countries'].find(currentCountry => {
      return currentCountry['Country'] === countryName;
    })

    return country;

  }

  // A slug is basically a URL friendly format for a country which is used in endpoint calls e.g. Passing "United Kingdom" returns "united-kingdom"
  async findSlugByCountryName(countryName: string) {

    // Make sure countries list is loaded
    await this.retrieveCountries();

    const countryObj = this.summaryData['Countries'].find(currentCountry => {
      return currentCountry['Country'] === countryName;
    })

    return countryObj['Slug'];

  }

  /* Use endpoint https://api.covid19api.com/total/country/${slug} to get all daily data for a country, then filter for just the past 7 days
   */ 
  async getPast7DaysNewCases(slug: string) {

    // Returns an array where each element represents a day (is in descending order, i.e. most recent day is at the end)
    const allDailyDataForCountry  = await this.http.get<[]>(`https://api.covid19api.com/total/country/${slug}`).toPromise();

    console.log(allDailyDataForCountry);
    
    // We need 8 days initially
    const past8days = allDailyDataForCountry.splice(Math.max(allDailyDataForCountry.length - 8, 0));
    console.log(past8days);

    // The array which will be returned to use in graph
    let past7days: {
      day: string
      newCases: number,
    }[] = [];

    // This is need to determine the name of the day using the index returned from getDay() method in date object
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    past8days.forEach((currentDay, index) => {

      let day: string;
      let newCases;

      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

      // this skips element 0, which is 8 days ago, as we only want to push 7 days into the past7days array but still need the 8th day for calculations
      if (index > 0) {

        // Get day name using the days array and 'Date' value in returned json date
        // day = days[new Date (currentDay['Date']).getDay()];
        day = currentDay['Date'];
        day = months[parseInt(day.substring(5,7))-1] + " " + day.substring(8, 10) //Get month as XX from original day value (using substring) then subtract 1 to get the month index

        // Get new cases by subtract the current day's comfirmed total by the previous day's confirmed total
        newCases = currentDay['Confirmed'] - past8days[index-1]['Confirmed'];
        past7days.push({
          day: day,
          newCases: newCases
        });

      }

    });

    console.log(past7days);

    return past7days;

  }


}
