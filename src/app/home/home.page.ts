import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import { TextData } from '../models/textData.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  textData: TextData

  graphData: {
    country: string,
    newCases: number
  }[];

  width: number;
  height: number;
  margin = { top: 20, right: 40, bottom: 30, left: 60 };
  svg: any;
  g: any;
  x: any;
  y: any;

  
  necessaryDataReturned = false; //Prevents console logging undefined while the app waits for data from the api

  constructor(private apiService: ApiService) {
    // set graph dimensions
    this.width = 900 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
  }

  async ngOnInit() {

    // Tell apiService to retrieve the data from summary endpoint
    await this.apiService.retrieveSummary();
    this.necessaryDataReturned = true;

    const globalData = this.apiService.summaryData['Global'];

    this.textData  = { 
      totalCases: this.numberWithCommas(globalData['TotalConfirmed']),
      totalDeaths: this.numberWithCommas(globalData['TotalDeaths']),
      totalRecovered: this.numberWithCommas(globalData['TotalRecovered']),
      newCases: this.numberWithCommas(globalData['NewConfirmed']),
      newDeaths: this.numberWithCommas(globalData['NewDeaths']),
      newRecovered: this.numberWithCommas(globalData['NewRecovered'])
    }

    await this.initialiseGraph();

  }

  async initialiseGraph(){

    this.graphData = await this.apiService.findHighestNewCases();

    // Main resource used: https://medium.com/enappd/using-d3js-in-ionic-4-apps-and-pwa-3d7759cebe33

    // Initialise chart
    this.svg = d3.select('#barChart')
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', '0 0 900 500');
    this.g = this.svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    // Initialise axis
    this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.1);
    this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
    this.x.domain(this.graphData.map((d) => d.country));
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
      .attr('font-size', '14')

      // Draw chart
      this.g.selectAll('.bar')
      .data(this.graphData)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('fill', 'rgb(84, 129, 177)')
      .attr('x', (d) => this.x(d.country))
      .attr('y', (d) => this.y(d.newCases))
      .attr('width', this.x.bandwidth())
      .attr('height', (d) => this.height - this.y(d.newCases));

  }

  // Convert number to string with commas, resource: https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

}
