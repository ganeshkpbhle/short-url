import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { chartData, draw, drawList, linkData } from '../module2';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { drawModel } from '../module1';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dateData: Array<chartData> = [];
  drawData:Array<draw>=[];
  drawMonth:Array<drawList>=[];
  totalcnt: number = 0;
  todaycnt: number = 0;
  currDate: string = new Date().toISOString().slice(0, 10);
  currWeek: number = 0;
  currYear: string = this.currDate.slice(0, 4);
  view: any = [500, 400];
  view1:any=[560,500];
  view2:any=[600,500];
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'Day';
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'Number Of Links Generated';
  showLabels: boolean = true;
  yAxisLabel1: string = 'Number Of clicks';
  xAxisLabel1: string = 'ShortenedLinks-Thisweek';
  timeline:boolean=true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';
  days:string[]=[];
  colorScheme: any = {
    domain: []
  };
  colorScheme1:any={
    domain:[]
  };
  colorScheme2:any={
    domain:[]
  }
  single: Array<drawModel> = [
  ];
  constructor(private service: DataService) {
    this.colorScheme1.domain=[];
    this.colorScheme1.domain.push( "#" + Math.floor(Math.random() * 16777216).toString(16));
  }
  ngOnInit(): void {
    this.randColors();
    console.log(this.weekNumber());
    this.load();
  }
  load() {
    this.single=[];
    this.drawData=[];
    this.totalcnt = 0;
    let tempDraw:draw={name:"Clicks",series:[]};
    this.service.getallData().subscribe((resSet) => {
      this.dateData = resSet;
      resSet.forEach((element, index) => {
        if (element.date === this.currDate) {
          this.todaycnt += element.created.length;
        }
        this.totalcnt += element.created.length;
        let temp:string=new Date(element.date).toDateString();
        if(this.days.includes(temp)){
          this.single.push({"name":temp.slice(0,3),"value":element.created.length});
          element.created.forEach((element1)=>{
            tempDraw.series.push({name:"p/"+element1.short,value:element1.count});
          });
        }
      });
      this.drawData.push(tempDraw);
      this.loadMonth();
    });
  }
  customSort(a:chartData, b:chartData) {
    return Number(a.date.slice(5, 7)) - Number(b.date.slice(5, 7));
  }
  randColors() {
    this.colorScheme.domain=[];
    this.colorScheme2.domain=[];
    let color:string;
    for (let index = 0; index < 7; index++) {
      color= "#" + Math.floor(Math.random() * 16777215).toString(16);
      this.colorScheme.domain.push(color);
    }
    for (let index = 0; index < 12; index++) {
      color= "#" + Math.floor(Math.random() * 16777215).toString(16);
      this.colorScheme2.domain.push(color);
    }
  }

  weekNumber() {
    let currentdate = new Date(this.currDate);
    let oneJan = new Date(currentdate.getFullYear(), 0, 1);
    let numberOfDays = Math.ceil((currentdate.valueOf() - oneJan.valueOf()) / (24 * 60 * 60 * 1000));
    let result=0;
    if(currentdate.getDay()!=5){
      result = Math.ceil((currentdate.getDay() + 1 + numberOfDays) / 7);
    }
    else{
      result = Math.floor((currentdate.getDay() + 1 + numberOfDays) / 7);
    }
    this.getDateOfWeek(result,Number(this.currYear));
  }

  getDateOfWeek(w: number, y: number) {
    this.days=[];
    let date = new Date(y, 0, (1 + (w - 1) * 7));
    date.setDate(date.getDate() + (1 - date.getDay()));
    let temp=new Date(date);
    for (let index = 0; index<7; index++) {
      temp.setDate(date.getDate()+index);
      this.days.push(temp.toDateString());
    }
    return this.days;
  }

  loadMonth(){
    this.drawMonth=[];
    let list:Array<draw>=[{name:"",series:[]},{name:"Jan",series:[]},{name:"Feb",series:[]},{name:"Mar",series:[]},{name:"Apr",series:[]},{name:"May",series:[]},
    {name:"Jun",series:[]},{name:"Jul",series:[]},{name:"Aug",series:[]},{name:"Sep",series:[]},{name:"Oct",series:[]},{name:"Nov",series:[]},
    {name:"Dec",series:[]}];
    this.dateData.forEach((element)=>{
      list[Number(element.date.slice(5,7))].series.push({name:element.date,value:element.created.length});
    });
    for (let index = 1; index < list.length; index++) {
      let sum:number=0;
      list[index].series.forEach((item)=>{
        sum+=item.value;
      });
      this.drawMonth.push({name:list[index].name,value:sum});
    }
    console.log(this.drawMonth);
  }
}
