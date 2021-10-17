import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dataset } from '../module';
import { DataService } from '../data.service';

@Component({
  selector: 'app-p',
  templateUrl: './p.component.html',
  styleUrls: ['./p.component.css']
})
export class PComponent implements OnInit {
  Id:string="";
  dataSet:Array<Dataset>=[];
  constructor(private activeRoute:ActivatedRoute,private route:Router,private service:DataService) {
    this.activeRoute.params.subscribe((data)=>{
      this.Id=data.id;
    });
   }
  urlList:Array<Dataset>=[];
  ngOnInit(): void {
    this.service.getAll().subscribe((resSet)=>{
      resSet.filter((d)=>{
        if(d.shortUrl===this.Id){
          this.route.navigate(["/p"]).then(()=>{
            window.location.replace(d.longUrl);
          });
        }
      });
    });
  }
}
