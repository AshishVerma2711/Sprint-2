import { Component, OnInit } from '@angular/core';
import {  NgForm, NgModel } from '@angular/forms';
import {ViewChild} from '@angular/core';
import { RestService } from '../rest.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})

export class BasicComponent implements OnInit {

  orderStatus = 'All';
  public show:boolean = false;
  public buttonName:any = 'Single Date';

  data:any;
  dataType = {"table": false, "number": true}
  dataHeader: string;
  dataDescription: string;
  expansion = {}
  @ViewChild('OptionA')
  optionA: NgForm;
  constructor(private _service: RestService) {
  }
  step = 0;

  setStep(index: number) {
    this.step = index;
    this.expansion[index] = true
    for (let i = 0; i < Object.keys(this.expansion).length; i++) {
      if(i != index){ this.expansion[i] = false}
    }
  }

  ngOnInit () { 
    console.log(NgModel)
   }

  toggle() {
    this.show = !this.show;
    // CHANGE THE NAME OF THE BUTTON.
    if(this.show)  
      this.buttonName = "From to To";
    else
      this.buttonName = "Single Date";
  }
  reset(){

  }
  submit1() {
    // console.log('>>>>>Submit: ',formatDate(this.optionA.form.getRawValue().from, 'yyyy-MM-dd', 'en'))
    if(this.optionA.form.value.status==='All'){
      if(this.show){
        let qty = 0;
        this._service.orderPlaced(
          formatDate(this.optionA.form.getRawValue().from, 'yyyy-MM-dd', 'en'),
          formatDate(this.optionA.form.getRawValue().to, 'yyyy-MM-dd', 'en')).subscribe((data:string)=>{
          qty=qty+parseInt(data)
        })
        this._service.orderCancelled(
          formatDate(this.optionA.form.getRawValue().from, 'yyyy-MM-dd', 'en'),
          formatDate(this.optionA.form.getRawValue().to, 'yyyy-MM-dd', 'en')).subscribe((data:string)=>{
          qty=qty+parseInt(data)
        })
        this.data = qty
        this.dataType['number']=true;
        this.dataType['table']=false;
        return
      }
      else{
        let qty = 0;
        this._service.orderPlacedOn(formatDate(this.optionA.form.getRawValue().date, 'yyyy-MM-dd', 'en')).subscribe((data:string)=>{
          qty=qty+parseInt(data)
        })
        this._service.orderCancelledOn(formatDate(this.optionA.form.getRawValue().date, 'yyyy-MM-dd', 'en')).subscribe((data:string)=>{
          qty=qty+parseInt(data)
        })
        this.data = qty
        this.dataType['number']=true;
        this.dataType['table']=false;
        return
      }
    }
    else
    if(this.optionA.form.value.status==='Delivered'){
      if(this.show){
        let qty = 0;
        this._service.orderPlaced(
          formatDate(this.optionA.form.getRawValue().from, 'yyyy-MM-dd', 'en'),
          formatDate(this.optionA.form.getRawValue().to, 'yyyy-MM-dd', 'en')).subscribe((data:string)=>{
          qty=qty+parseInt(data)
        })
        this.data = qty
        this.dataType['number']=true;
        this.dataType['table']=false;
        return
      }
      else{
        let qty = 0;
        this._service.orderPlacedOn(formatDate(this.optionA.form.getRawValue().date, 'yyyy-MM-dd', 'en')).subscribe((data:string)=>{
          qty=qty+parseInt(data)
        })
        this.data = qty
        this.dataType['number']=true;
        this.dataType['table']=false;
        return
      }
    }
    else{
      if(this.show){
        let qty = 0;
        this._service.orderCancelled(
          formatDate(this.optionA.form.getRawValue().from, 'yyyy-MM-dd', 'en'),
          formatDate(this.optionA.form.getRawValue().to, 'yyyy-MM-dd', 'en')).subscribe((data:string)=>{
          qty=qty+parseInt(data)
        })
        this.data = qty
        this.dataType['number']=true;
        this.dataType['table']=false;
        return
      }
      else{
        let qty = 0;
        this._service.orderCancelledOn(formatDate(this.optionA.form.getRawValue().date, 'yyyy-MM-dd', 'en')).subscribe((data:string)=>{
          qty=qty+parseInt(data)
        })
        this.data = qty
        this.dataType['number']=true;
        this.dataType['table']=false;
        return
      }
    }
  }

  submit2(){

  }

  submit3(){

  }

}
