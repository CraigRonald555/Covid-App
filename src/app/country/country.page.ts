import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import * as d3Shape from "d3-shape";
import { TextData } from '../models/textData.model';

@Component({
  selector: 'app-country',
  templateUrl: './country.page.html',
  styleUrls: ['./country.page.scss'],
})
export class CountryPage implements OnInit {

  currentCountry: string; // Is taken from the URL segment

  textData: TextData;

  graphData: {
    day: string,
    newCases: number
  }[];

  // Graph variables
  width: number;
  height: number;
  margin = { top: 20, right: 40, bottom: 30, left: 60 };
  svg: any;
  g: any;
  x: any;
  y: any;
  line: d3Shape.Line<[number, number]>;

  necessaryDataReturned = false; // Used to determine whether summary data has been loaded into component
  noDataFound = false; // If the covid api doesn't have the data or it returns an error

  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService) { 
    // set graph dimensions
    this.width = 900 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
  }

  async ngOnInit() {

    this.currentCountry = this.activatedRoute.snapshot.url[0].path;
    let country;

    // We may not find data on lesser known countries, which can lead to errors therefore try to populate the data and catch error
    try {
     
      country = await this.apiService.findCountryInSummary(this.currentCountry);
      this.necessaryDataReturned = true;
      
      this.textData  = { 
        totalCases: this.numberWithCommas(country['TotalConfirmed']),
        totalDeaths: this.numberWithCommas(country['TotalDeaths']),
        totalRecovered: this.numberWithCommas(country['TotalRecovered']),
        newCases: this.numberWithCommas(country['NewConfirmed']),
        newDeaths: this.numberWithCommas(country['NewDeaths']),
        newRecovered: this.numberWithCommas(country['NewRecovered'])
      }

      await this.initialiseGraph();

    } catch (error) {
      console.log(error);
      this.noDataFound = true;
    }

  }

  async initialiseGraph(){

    const slug = await this.apiService.findSlugByCountryName(this.currentCountry);

    this.graphData = await this.apiService.getPast7DaysNewCases(slug);

    // Main resource used: https://medium.com/enappd/using-d3js-in-ionic-4-apps-and-pwa-3d7759cebe33

    // Initialise chart
    this.svg = d3.select('#lineChart')
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', '0 0 900 500');
    this.g = this.svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    // Initialise axis
    this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.1);
    this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
    this.x.domain(this.graphData.map((d) => d.day));
    this.y.domain([0, d3Array.max(this.graphData, (d) => d.newCases)]);

    // Draw axis
    this.g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3Axis.axisBottom(this.x))
      .attr('font-size', '14');

    this.g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3Axis.axisLeft(this.y))
      .attr('font-size', '14');

    // Draw chart
    this.g.selectAll('.scatter-dots')
    .data(this.graphData)
    .enter()
    .append('circle')
    .attr('class', 'svg:circle')
    .attr('fill', 'rgb(84, 129, 177)')
    .attr("cx", (d) =>  this.x(d.day))
    .attr("cy", (d) => this.y(d.newCases))
    .attr('width', this.x.bandwidth())
    .attr('height', (d) => this.height - this.y(d.newCases))
    .attr('transform', 'translate(50,0)')
    .attr("r", 10);

  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

}
