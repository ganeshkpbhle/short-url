import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Dataset } from '../module';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { list } from '../module1';
import { chartData } from '../module2';
@Component({
  selector: 'app-tiny-url',
  templateUrl: './tiny-url.component.html',
  styleUrls: ['./tiny-url.component.css']
})
export class TinyUrlComponent implements OnInit {

  shortUrl:string="";
  longUrl:string="";
  form:FormGroup;
  characters:string="";
  invalidUrl:boolean=false;
  short:boolean=false;
  rnd:string="";
  Id:number|undefined;
  links:Array<Dataset>=[];
  shorts:Array<list>=[];
  exists:Array<string>=[];
  currDate:string=new Date().toISOString().slice(0,10);
  draw:Array<chartData>=[];
  constructor(private dataservice:DataService,private route:Router) {
    this.form=new FormGroup({
      urlbox:new FormControl("",Validators.required)
    });
    this.genStr("A","Z");
    this.genStr("a","z");
    this.genStr("0","9");
   }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.exists=[];
    this.dataservice.getLst().subscribe((l)=>{
      l.forEach((element,index)=>{
        this.exists.push(element.link);
      });
    });
    this.dataservice.getallData().subscribe((res)=>{
      this.draw=res;
    });
    this.dataservice.getAll().subscribe((data)=>{
      if(data.length>3){
        for (let index =data.length-2; index <data.length; index++) {
          this.links.push(data[index]);
        }
      }
      else{
        this.links=data;
      }
    });
  }

  listen(){
    this.shortUrl="";
    this.longUrl="";
    this.rnd="";
    if(this.form.valid){
      this.rnd=this.genRandom();
      let temp:Dataset={longUrl:this.form.controls['urlbox'].value,shortUrl:"",clicks:0,date:this.currDate};
      temp.shortUrl=this.rnd;
      this.dataservice.save(temp).subscribe(()=>{
        this.shortUrl="localhost/p/"+this.rnd;
        this.longUrl=this.form.controls['urlbox'].value;
        this.short=true;
        this.addDraw();
      });
    }
    else{
      this.invalidUrl=true;
      setTimeout(()=>{
        this.invalidUrl=false;
      },2000);
    }
  }
  genStr(charA:string,charB:string){
    let i:number=charA.charCodeAt(0);
    let j:number=charB.charCodeAt(0);
    for(;i<=j;i++){
      this.characters+=String.fromCharCode(i);
    };
  }

  genRandom() {
     let rndResult:string="";
     let len:number=this.characters.length;
     if(this.exists.length>0){
      while(true){
        rndResult="";
       for (let index = 0; index <6; index++) {
         rndResult+=this.characters.charAt(
           Math.floor(Math.random()*len)
         );
       }
       if(!this.exists.includes(rndResult)){
         break;
       }
      }
      this.dataservice.saveLst({"link":rndResult}).subscribe(()=>{
        console.log(rndResult);
      });
      return rndResult;
     }
     else{
      for (let index = 0; index <6; index++) {
        rndResult+=this.characters.charAt(
          Math.floor(Math.random()*len)
        );
      }
      this.dataservice.saveLst({"link":rndResult}).subscribe(()=>{
        console.log(rndResult);
      });
      return rndResult;
     }
  }

  clear(){
    this.shortUrl="";
    this.longUrl="";
    this.short=false;
    this.form.setValue({"urlbox":""});
    this.loadData();
  }

  addDraw(){
    let ind:number=-1;
    if(this.draw.length>0){
      for (let index = 0; index < this.draw.length; index++) {
        if(this.draw[index].date===this.currDate){
          ind=index;break;
        }
      }
      if(ind!=-1){
        this.draw[ind].created.push({short:this.rnd,count:0});
        this.dataservice.updateDraw(this.draw[ind].id,this.draw[ind]).subscribe(()=>{
           this.loadData();
        });
      }
      else{
        let temp:chartData={date:this.currDate,created:[]};
        temp.created.push({short:this.rnd,count:0});
        this.dataservice.saveDraw(temp).subscribe(()=>{
          this.loadData();
        });
      }
    }
    else{
      let temp:chartData={date:this.currDate,created:[]};
      temp.created.push({short:this.rnd,count:0});
      this.dataservice.saveDraw(temp).subscribe(()=>{
        this.loadData();
      });
    }
  }

  trigger(){
    this.loadData();
    let index:number=0,index1:number=0;

    this.dataservice.getAll().subscribe((dt)=>{
      dt.filter((element)=>{
        if(element.shortUrl===this.rnd){
          element.clicks+=1;
          for (index = 0; index < this.draw.length; index++) {
            if(element.date===this.draw[index].date){
              for (index1 = 0; index1 < this.draw[index].created.length; index1++) {
                if(this.draw[index].created[index1].short==this.rnd){
                  this.draw[index].created[index1].count+=1;
                  console.log(this.draw[index].created[index1]);
                break;
              }
            }
              break;
            }
          }
          this.dataservice.updateById(element.id,element).subscribe(()=>{
            this.dataservice.updateDraw(this.draw[index].id,this.draw[index]).subscribe(()=>{
              return;
            });
          });
        }
      });
    });
  }

}
