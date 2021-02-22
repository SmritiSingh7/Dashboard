import { Component, OnInit,ViewChild, AfterViewInit } from '@angular/core';
import {  BreakpointObserver } from '@angular/cdk/layout';
import { DataRestApiService} from '../service/data-rest-api.service'; 
import { ChartDataSets ,ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import { DatePipe } from '@angular/common';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit,AfterViewInit {
  
  death:any;
  recovered:any;
  totalcases: any;
  lastupdated:any;
  statewise:any;
  tabledata:any = [];
  displayedColumns: string[] = ['name', 'population', 'cases', 'deaths','recovered',];
  dataSource = new MatTableDataSource();
  
  statedropdown : Dropdown[] = [
    {value: 'HH', viewValue: 'Hamburg'},
    {value: 'SH', viewValue: 'Schleswig-Holstein'},
    {value: 'NI', viewValue: 'Niedersachsen'},
    {value: 'HB', viewValue: 'Bremen'},
    {value: 'NW', viewValue: 'Nordrhein-Westfalen'},
    {value: 'HE', viewValue: 'Hessen'},
    {value: 'RP', viewValue: 'Rheinland-Pfalz'},
    {value: 'BW', viewValue: 'Baden-Württemberg'},
    {value: 'BY', viewValue: 'Bayern'},
    {value: 'SL', viewValue: 'Saaland'},
    {value: 'BE', viewValue: 'Berlin'},
    {value: 'BB', viewValue: 'Brandenburg'},
    {value: 'MV', viewValue: 'Mecklenburg-Vorpommern'},
    {value: 'SN', viewValue: 'Sachsen'},
    {value: 'ST', viewValue: 'Sachsen-Anhalt'},
    {value: 'TH', viewValue: 'Thüringen'}
  ];

  dropdownItems : Dropdown[] = [
    {value: '7', viewValue: '1 week'},
    {value: '14', viewValue: '2 weeks'},
    {value: '21', viewValue: '3 weeks'},
    {value: '28', viewValue: '4 weeks'}
  ];

  selectedState = 'HH';
  selectedRegion = 'HH';
  selectedRange = "7"
  statenames:any =[];
  statedataDeath:any =[];
  statedataCase:any =[];
  statedataRecovered:any =[];
  stateData:any[] = [];
  todaycase:any;
  todayrecovered:any;
  todaydeath:any;


  /**Pie chart */
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
      labels: {
        fontSize: 20
      }
    }
  };
  public pieChartLabels: Label[] = ["Deaths","Cases","Recovered"];
  pieChartData: SingleDataSet = [300, 500, 100];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public chartColors: Array<any> = [
    { // all colors in order
      backgroundColor: ['#ff5b5b', '#21afdd', '#10c469']
    }
]


/**Bar chart */
public barChartOptions: ChartOptions = {
  responsive: true,
  legend: {
    position: 'top',
    labels: {
      fontSize: 20
    }
  },
  scales: {
  yAxes: [
   {
    display: true,
    scaleLabel: {
     display: true,
     labelString: "Number of Cases, Deaths and Recovered",
    },
   },
  ],
  
 },

};
public barChartLabels: Label[] = [];
public barChartType: ChartType = 'bar';
public barChartLegend = true;
public barChartPlugins = [];

public barChartData: ChartDataSets[] = [
  { data:  [], label: 'Deaths' },
  { data:  [], label:'Recovered'},
  { data:  [], label:'Cases'}
];
public barchartColors: Array<any> = [
    { backgroundColor: ['#ff5b5b'] },
    {backgroundColor: ['#10c469']},
    {backgroundColor: ['#21afdd'],
  }
]
/**Bar chat ends */

@ViewChild(MatSort) sort: MatSort;
ngAfterViewInit() {
  this.dataSource.sort = this.sort;
}


  constructor(private breakpointObserver: BreakpointObserver, private dataRestApiService: DataRestApiService,private datePipe: DatePipe ) {
    
    
  }

  ngOnInit(): void {
    
    this.getGermanyTotal(); //Top four cards displayes germany total 
    this.getStatewise();  //To display data in Table for all states
    this.getSelectedStateData(); //To display data in Pie chart for selected state
    this.getSelectedRegionHistory();//To display data in Bar chart for selected state and week
  
   
 }

 


  getGermanyTotal() {
    this.dataRestApiService.getDataGermany().subscribe(data => {

      this.death = data.deaths;
      this.totalcases = data.cases;
      this.recovered = data.recovered;
      this.lastupdated = data.meta.lastCheckedForUpdate;
      this.todaycase = data.delta.cases;
      this.todayrecovered = data.delta.recovered;
      this.todaydeath = data.delta.deaths;
     
    },
      err => {
        console.log(err)
      })
  }



  getStatewise() {
    this.dataRestApiService.getDataStateWise().subscribe(data => {  
      this.tabledata=Object.values(data.data); 
      this.dataSource.data = this.tabledata
       
    },
      err => {
        console.log(err)
      })
  }



  getSelectedStateData() {
    this.dataRestApiService.getSelectedStateData(this.selectedState).subscribe(data => {     
      let newData:any = [];
      Object.keys(data.data).forEach(function(prop) {
        newData.push(data.data[prop].deaths)
        newData.push(data.data[prop].cases)
        newData.push(data.data[prop].recovered)
        
    });
    this.pieChartData = newData;
    },
      err => {
        console.log(err)
      })
  }

  

  updatePieChartData(event:any){
    console.log(event.value);
    this.getSelectedStateData();
  }


  updateChartData(event:any){
  console.log(event.value);
  this.getSelectedRegionHistory();
  }
  
  getSelectedRegionHistory(){

    this.barChartData[0].data = [];
    this.barChartData[1].data = [];
    this.barChartData[2].data = [];
    this.barChartLabels = [];

    /**fetch total deaths */
    this.dataRestApiService.getSelectedRegionDeathHistory(this.selectedRegion,this.selectedRange).subscribe(data => {
     
      var dataArray = Object.keys(data.data).map(val => data.data[val].history)
      const deathCount: any[] = dataArray[0].map(function(data :any){
        return data.deaths
      });
      this.barChartData[0].data?.push(deathCount.reduce((a, b) => a + b, 0),)
    },
    err => {
      console.log(err)
    })

    /**fetch total recoveries */
    this.dataRestApiService.getSelectedRegionRecoveryHistory(this.selectedRegion,this.selectedRange).subscribe(data => {
      
      var dataArray = Object.keys(data.data).map(val => data.data[val].history)
      const recoveryCount: any[] = dataArray[0].map(function(data :any){
        return data.recovered
      });
      
     this.barChartData[1].data?.push(recoveryCount.reduce((a, b) => a + b, 0),) 
    },
      err => {
        console.log(err)
      })

       /**fetch total cases */
    this.dataRestApiService.getSelectedRegionCasesHistory(this.selectedRegion,this.selectedRange).subscribe(data => {
      
     
      var dataArray = Object.keys(data.data).map(val => data.data[val].history)
      const casesCount: any[] = dataArray[0].map(function(data :any){
        return data.cases
      });
      const date: any[] = dataArray[0].map(function(data :any){
        return data.date
      });
      
      const range:any[] = [this.transformDate(date[0]),this.transformDate(date[date.length-1])]
      this.barChartData[2].data?.push(casesCount.reduce((a, b) => a + b, 0),)
      this.barChartLabels.push(range.join('-------'))
      
      
    },
      err => {
        console.log(err)
      })

      
}

transformDate(date : Date) {
   return this.datePipe.transform(date, 'yyyy-MM-dd');
}


}



interface Dropdown {
  value: string;
  viewValue: string;
}


