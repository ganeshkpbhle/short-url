import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { Dataset } from '../module';
import { chartData } from '../module2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  urls: Array<Dataset> = [];
  currUrl: string = "";
  draw: Array<chartData> = [];
  constructor(private activeRoute: ActivatedRoute, private route: Router, private service: DataService) {
    this.currUrl = "localhost:4200/p" + "/";
  }
  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.service.getAll().subscribe((result) => {
      this.urls = result;
    });
    this.service.getallData().subscribe((result) => {
      this.draw = result;
    });
  }

  clickEvent(value: Dataset) {
    let index: number = 0, index1: number = 0;
    for (index = 0; index < this.draw.length; index++) {
      if (value.date === this.draw[index].date) {
        for (index1 = 0; index1 < this.draw[index].created.length; index1++) {
          if (this.draw[index].created[index1].short == value.shortUrl) {
            this.draw[index].created[index1].count += 1;
            console.log(this.draw[index].created[index1]);
            break;
          }
        }
        break;
      }
    }
    this.urls.filter((element) => {
      if (element.id == value.id) {
        element.clicks += 1;
        this.service.updateById(element.id, element).subscribe(() => {
          this.service.updateDraw(this.draw[index].id, this.draw[index]).subscribe(() => {
            this.loadData();
            return;
          });
        });
      }
    });
  }
}
