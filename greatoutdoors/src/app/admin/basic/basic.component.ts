import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { RestService } from '../rest.service';
import { formatDate } from '@angular/common';
import { ResultSet } from '../ResultSet'
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})


export class BasicComponent implements OnInit {

  orderStatus = 'All';
  public show: boolean = false;
  public buttonName: any = 'Single Date';

  displayedColumns = ['category', 'val']
  table: ResultSet[];
  data: any;

  dataType = { "table": false, "number": true }
  dataHeader: string;
  dataDescription: string;
  expansion = {}
  @ViewChild('OptionA')
  optionA: NgForm;
  @ViewChild('OptionB')
  optionB: NgForm;
  @ViewChild('OptionC')
  optionC: NgForm;
  constructor(private _service: RestService, private _snackBar: MatSnackBar) {
  }
  step = 0;

  setStep(index: number) {
    this.step = index;
    this.expansion[index] = true
    for (let i = 0; i < Object.keys(this.expansion).length; i++) {
      if (i != index) { this.expansion[i] = false }
    }
  }

  ngOnInit() {
    console.log(NgModel)
  }

  toggle() {
    this.show = !this.show;
    // CHANGE THE NAME OF THE BUTTON.
    if (this.show)
      this.buttonName = "From to To";
    else
      this.buttonName = "Single Date";
  }

  submit1() {
    // console.log('>>>>>Submit: ',formatDate(this.optionA.form.getRawValue().from, 'yyyy-MM-dd', 'en'))
    if (this.optionA.form.value.status === "") {
      this.openSnackBar("Please Choose a Category", "Close")
      return
    }
    if (this.show && this.optionA.form.value.from === null && this.optionA.form.value.to === null) {
      this.openSnackBar("Please Choose Range of Date", "Close")
      return
    }
    if (!this.show && this.optionA.form.value.date === "") {
      this.openSnackBar("Please Choose Date", "Close")
      return
    }
    if (this.optionA.form.value.status === 'All') {

      this.data = 0;
      if (this.show) {
        this._service.orderPlaced(
          formatDate(this.optionA.form.getRawValue().from, 'yyyy-MM-dd', 'en'),
          formatDate(this.optionA.form.getRawValue().to, 'yyyy-MM-dd', 'en')).subscribe((data: string) => {
            this.data = parseInt(data)
          })
        this._service.orderCancelled(
          formatDate(this.optionA.form.getRawValue().from, 'yyyy-MM-dd', 'en'),
          formatDate(this.optionA.form.getRawValue().to, 'yyyy-MM-dd', 'en')).subscribe((data: string) => {
            this.data = this.data + parseInt(data)
          })
        this.dataType['number'] = true;
        this.dataType['table'] = false;
        return
      }
      else {
        this.data = 0;
        this._service.orderPlacedOn(formatDate(this.optionA.form.getRawValue().date, 'yyyy-MM-dd', 'en')).subscribe((data: number) => {
          this.data = data
        })
        this._service.orderCancelledOn(formatDate(this.optionA.form.getRawValue().date, 'yyyy-MM-dd', 'en')).subscribe((data: string) => {
          this.data = this.data + parseInt(data)
        })
        this.dataType['number'] = true;
        this.dataType['table'] = false;
        return
      }
    }
    else
      if (this.optionA.form.value.status === 'Delivered') {
        this.data = 0
        if (this.show) {
          this._service.orderPlaced(
            formatDate(this.optionA.form.getRawValue().from, 'yyyy-MM-dd', 'en'),
            formatDate(this.optionA.form.getRawValue().to, 'yyyy-MM-dd', 'en')).subscribe((data: string) => {
              this.data = this.data + parseInt(data)
            })
          this.dataType['number'] = true;
          this.dataType['table'] = false;
          return
        }
        else {
          this.data = 0;
          this._service.orderPlacedOn(formatDate(this.optionA.form.getRawValue().date, 'yyyy-MM-dd', 'en')).subscribe((data: string) => {
            this.data = this.data + parseInt(data)
          })
          this.data = this.data
          this.dataType['number'] = true;
          this.dataType['table'] = false;
          return
        }
      }
      else {
        if (this.show) {
          this.data = 0;
          this._service.orderCancelled(
            formatDate(this.optionA.form.getRawValue().from, 'yyyy-MM-dd', 'en'),
            formatDate(this.optionA.form.getRawValue().to, 'yyyy-MM-dd', 'en')).subscribe((data: string) => {
              this.data = this.data + parseInt(data)
            })
          this.dataType['number'] = true;
          this.dataType['table'] = false;
          return
        }
        else {
          this.data = 0;
          this._service.orderCancelledOn(formatDate(this.optionA.form.getRawValue().date, 'yyyy-MM-dd', 'en')).subscribe((data: string) => {
            this.data = this.data + parseInt(data)
          })
          this.dataType['number'] = true;
          this.dataType['table'] = false;
          return
        }
      }
  }

  submit2() {
    if (this.optionB.form.value.status === "") {
      this.openSnackBar("Please Choose a Category", "Close")
      return
    }
    if (this.show && this.optionB.form.value.from === null && this.optionB.form.value.to === null) {
      this.openSnackBar("Please Choose Range of Date", "Close")
      return
    }
    if (!this.show && this.optionB.form.value.date === "") {
      this.openSnackBar("Please Choose Date", "Close")
      return
    }
    this.table = []
    if (this.optionB.form.value.status === 'All') {
      if (this.show) {
        this._service.costOfOrderForStatue(
          formatDate(this.optionB.form.getRawValue().from, 'yyyy-MM-dd', 'en'),
          formatDate(this.optionB.form.getRawValue().to, 'yyyy-MM-dd', 'en'), "Delivered").subscribe((data: ResultSet[]) => {
            // this.data.concat(data)
            this.table = data
          })
        this._service.costOfOrderForStatue(
          formatDate(this.optionB.form.getRawValue().from, 'yyyy-MM-dd', 'en'),
          formatDate(this.optionB.form.getRawValue().to, 'yyyy-MM-dd', 'en'), "Cancelled").subscribe((data: ResultSet[]) => {
            // this.data.concat(data)
            this.table = this.table.concat(data)
          })
        this.dataType['number'] = false;
        this.dataType['table'] = true;
        return
      }
      else {
        this._service.costOfOrderForStatueOn(formatDate(this.optionB.form.getRawValue().date, 'yyyy-MM-dd', 'en'), "Delivered").subscribe((data: ResultSet[]) => {
          this.table = data
        })
        this._service.costOfOrderForStatueOn(formatDate(this.optionB.form.getRawValue().date, 'yyyy-MM-dd', 'en'), "Cancelled").subscribe((data: ResultSet[]) => {
          this.table = this.table.concat(data)
        })
        this.dataType['number'] = false;
        this.dataType['table'] = true;
        return
      }
    }
    else {
      if (this.show) {
        this._service.costOfOrderForStatue(
          formatDate(this.optionB.form.getRawValue().from, 'yyyy-MM-dd', 'en'),
          formatDate(this.optionB.form.getRawValue().to, 'yyyy-MM-dd', 'en'), this.optionB.form.value.status).subscribe((data: ResultSet[]) => {
            this.table = data
          })
        this.dataType['number'] = false;
        this.dataType['table'] = true;
        return
      }
      else {
        this._service.costOfOrderForStatueOn(formatDate(this.optionB.form.getRawValue().date, 'yyyy-MM-dd', 'en'), this.optionB.form.value.status).subscribe((data: ResultSet[]) => {
          this.table = this.table.concat(data)
        })
        this.dataType['number'] = false;
        this.dataType['table'] = true;
        return
      }
    }
  }

  submit3() {
    if (this.show && this.optionA.form.value.from === null && this.optionA.form.value.to === null) {
      this.openSnackBar("Please Choose Range of Date", "Close")
      return
    }
    if (!this.show && this.optionA.form.value.date === "") {
      this.openSnackBar("Please Choose Date", "Close")
      return
    }
    this.data = 0;
    if (this.show) {
      this._service.revenueGenerated(
        formatDate(this.optionC.form.getRawValue().from, 'yyyy-MM-dd', 'en'),
        formatDate(this.optionC.form.getRawValue().to, 'yyyy-MM-dd', 'en')).subscribe((data: string) => {
          this.data = parseInt(data)
        })
    }
    else {
      this._service.revenueGeneratedOn(
        formatDate(this.optionC.form.getRawValue().date, 'yyyy-MM-dd', 'en')).subscribe((data: string) => {
          this.data = parseInt(data)
        })
      this.dataType['number'] = true;
      this.dataType['table'] = false;
      return
    }

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
