import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { Dataset } from './module';
import { list } from './module1';
import { chartData } from './module2';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }
  save(pair:Dataset){
    return this.http.post("https://615e89e13d1491001755a97b.mockapi.io/shortUrl",pair);
  }

  getAll(){
    return this.http.get<Array<Dataset>>(`https://615e89e13d1491001755a97b.mockapi.io/shortUrl`);
  }

  getByID(id:number|undefined){
    return this.http.get<Dataset>(`https://615e89e13d1491001755a97b.mockapi.io/shortUrl/${id}`);
  }

  deleteById(id:number){
    return this.http.delete(`https://615e89e13d1491001755a97b.mockapi.io/shortUrl/${id}`)
  }

  updateById(Id:number|undefined,updateData:Dataset){
    return this.http.put(`https://615e89e13d1491001755a97b.mockapi.io/shortUrl/${Id}`,updateData);
  }

  saveLst(e:list){
    return this.http.post("https://615e89e13d1491001755a97b.mockapi.io/lst-string",e);
  }

  getLst(){
    return this.http.get<Array<list>>(`https://615e89e13d1491001755a97b.mockapi.io/lst-string`);
  }

  deleteLst(id:number){
    return this.http.delete(`https://615e89e13d1491001755a97b.mockapi.io/lst-string/${id}`)
  }

  saveDraw(d:chartData){
    return this.http.post("https://616a8ae716e7120017fa0ff1.mockapi.io/plot",d);
  }

  getallData(){
    return this.http.get<Array<chartData>>(`https://616a8ae716e7120017fa0ff1.mockapi.io/plot`);
  }

  updateDraw(Id:number|undefined,updateData:chartData){
    return this.http.put(`https://616a8ae716e7120017fa0ff1.mockapi.io/plot/${Id}`,updateData);
  }
  
}
