import { Component, ViewChild, AfterViewInit, OnInit, Inject } from '@angular/core';
import { RetailerService } from '../retailer.service'
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Retailer } from '../retailer';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-retailer',
  templateUrl: './retailer.component.html',
  styleUrls: ['./retailer.component.css']
})
export class RetailerComponent implements AfterViewInit, OnInit {

  constructor(public retailerService: RetailerService, public dialog: MatDialog) { }

  displayedColumns: string[] = ['retailerId', 'retailerName', 'address', 'zipcode', 'city', 'state', 'phoneNumber', 'email', 'update/delete'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.retailerService.getRetaielrs();
    this.dataSource = new MatTableDataSource<Retailer>(this.retailerService.retailerdb);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addDialog() {
    const dialogRef = this.dialog.open(AddRetailerDialog);
  }

  updateDialog(retailer:Retailer) {
    console.log(retailer.retailerId);
    const dialogRef = this.dialog.open(UpdateRetailerDialog, {
      width: '250px',
      data: retailer
    });
  }
  deleteDialog(id: string) {
    console.log(id);
    const dialogRef = this.dialog.open(DeleteRetailerDialog, {
      width: '250px',
      data: id
    });
  }
}

@Component({
  selector: 'app-retailer-delete',
  templateUrl: './retailer.component.delete.html',
  styleUrls: ['./retailer.component.css']
})

export class DeleteRetailerDialog {
  constructor(public retailerService: RetailerService, public dialogRef: MatDialogRef<DeleteRetailerDialog>, @Inject(MAT_DIALOG_DATA) public data) { }

  delete(id: string) {
    for (let i = 0; i < this.retailerService.retailerdb.length; i++) {
      if (id == this.retailerService.retailerdb[i].retailerId) {
        this.retailerService.deleteRetailer(id).subscribe((response:string)=> {console.log(response); window.alert(response) });
        this.retailerService.retailerdb.splice(i, 1);
        this.dialogRef.close();
      }
    }
  }
}


@Component({
  selector: 'app-retailer-add',
  templateUrl: './retailer.component.add.html',
  styleUrls: ['./retailer.component.css']
})

export class AddRetailerDialog {

  constructor(public retailerService: RetailerService,public dialogRef: MatDialogRef<AddRetailerDialog>){}

  retailerName = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9:,.\s-]{2,30}$/)]);
  address = new FormControl('', [Validators.required]);
  zipcode = new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]);
  city = new FormControl('', [Validators.required]);
  state = new FormControl('', [Validators.required]);
  phoneNumber = new FormControl('', [Validators.required, Validators.pattern(/[6789][0-9]{9}/)]);
  email = new FormControl('', [Validators.required, Validators.email]);

  getRetailerNameErrorMessage() {
    if (this.retailerName.hasError('required')) {
      return 'You must enter a value';
    }
    return this.retailerName.hasError('pattern') ? 'Invalid Name! name must starts with capital letter and has atleast 2 characters.' : '';
  }
  getAddressErrorMessage() {
    if (this.address.hasError('required'))
      return 'You must enter a value';
  }
  getZipcodeErrorMessage() {
    if (this.zipcode.hasError('required')) {
      return 'You must enter a value';
    }
    return this.zipcode.hasError('pattern') ? 'Invalid Zipcode! Must be of 6 digits.' : '';
  }
  getCityErrorMessage() {
    if (this.city.hasError('required'))
      return 'You must enter a value';
  }
  getStateErrorMessage() {
    if (this.state.hasError('required'))
      return 'You must enter a value';
  }
  getPhoneNumberErrorMessage() {
    if (this.phoneNumber.hasError('required')) {
      return 'You must enter a value';
    }
    return this.phoneNumber.hasError('pattern') ? 'Invalid Phone Number.' : '';
  }
  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  add() {
    let temp:Retailer=new Retailer("",this.retailerName.value,this.address.value,this.zipcode.value,this.city.value,this.state.value,this.phoneNumber.value,this.email.value);
    this.retailerService.addRetaIler(temp).subscribe((data:Retailer)=>{
      window.alert("Retailer added with id: "+data.retailerId);
      this.retailerService.retailerdb.push(temp);
      this.dialogRef.close();
    })
  }
}

@Component({
  selector: 'app-retailer-update',
  templateUrl: './retailer.component.update.html',
  // styleUrls: ['./retailer.component.css']
})

export class UpdateRetailerDialog{
  constructor(public retailerService: RetailerService, public dialogRef: MatDialogRef<UpdateRetailerDialog>, @Inject(MAT_DIALOG_DATA) public retailer:Retailer) { }
  
  retailerId=new FormControl(this.retailer.retailerId);
  retailerName = new FormControl(this.retailer.retailerName, [Validators.required, Validators.pattern(/^[a-zA-Z0-9:,.\s-]{2,30}$/)]);
  address = new FormControl(this.retailer.address, [Validators.required]);
  zipcode = new FormControl(this.retailer.zipcode, [Validators.required, Validators.pattern(/^[0-9]{6}$/)]);
  city = new FormControl(this.retailer.city, [Validators.required]);
  state = new FormControl(this.retailer.state, [Validators.required]);
  phoneNumber = new FormControl(this.retailer.phoneNumber, [Validators.required, Validators.pattern(/[6789][0-9]{9}/)]);
  email = new FormControl(this.retailer.email, [Validators.required, Validators.email]);
  
  update(){
    let temp:Retailer=new Retailer(this.retailerId.value,this.retailerName.value,this.address.value,this.zipcode.value,this.city.value,this.state.value,this.phoneNumber.value,this.email.value);
      this.retailerService.updateRetailer(temp).subscribe((data:Retailer)=>{
        window.alert("Retailer updated with id: "+data.retailerId);
        // this.retailerService.retailerdb.push(temp);
        this.dialogRef.close();
      });
  }
}