import { Component, ViewChild, AfterViewInit, OnInit, Inject } from '@angular/core';
import { RetailerService } from '../retailer.service'
import { Retailer } from '../retailer';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-retailer',
  templateUrl: './retailer.component.html',
  styleUrls: ['./retailer.component.css']
})
export class RetailerComponent implements OnInit {

  constructor(public retailerService: RetailerService) {
    this.refreshRetailers();
  }
  page = 1;
  pageSize = 2;
  retailers: Retailer[];
  showUpdationForm: boolean = false;
  showSuccess: boolean = false;
  showAdditionForm: boolean = false;
  showDeleteForm: boolean = false;
  id: string;
  message: string;

  retailerForm = new FormGroup({
    retailerId: new FormControl({disabled:true}),
    retailerName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9:,.\s-]{2,30}$/)]),
    address: new FormControl('', [Validators.required]),
    zipcode: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/[6789][0-9]{9}/)]),
    email: new FormControl('', [Validators.required, Validators.email])
  })

  refreshRetailers() {
    this.retailers = this.retailerService.retailerdb
      .map((retailer, i) => ({ id: i + 1, ...retailer }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.retailerService.getRetaielrs().subscribe(resp => {
      this.retailerService.retailerdb = resp;
      this.refreshRetailers();
    });
  }
  onDelete(id: string) {
    console.log(id);
    this.id = id;
    this.showSuccess = false;
    this.showUpdationForm = false;
    this.showAdditionForm = false;
    this.showDeleteForm = true;
  }
  onUpdate(retailer: Retailer) {
    console.log(retailer);
    this.showSuccess = false;
    this.showUpdationForm = true;
    this.showAdditionForm = false;
    this.showDeleteForm = false;
    this.retailerForm.controls["retailerId"].setValue(retailer.retailerId);
    this.retailerForm.controls["retailerId"].disable();
    this.retailerForm.controls["retailerName"].setValue(retailer.retailerName);
    this.retailerForm.controls["address"].setValue(retailer.address);
    this.retailerForm.controls["zipcode"].setValue(retailer.zipcode);
    this.retailerForm.controls["city"].setValue(retailer.city);
    this.retailerForm.controls["state"].setValue(retailer.state);
    this.retailerForm.controls["phoneNumber"].setValue(retailer.phoneNumber);
    this.retailerForm.controls["email"].setValue(retailer.email);
  }
  onAdd() {
    this.showSuccess = false;
    this.showUpdationForm = false;
    this.showAdditionForm = true;
    this.showDeleteForm = false;
  }
  cancel() {
    this.showSuccess = false;
    this.showUpdationForm = false;
    this.showAdditionForm = false;
    this.showDeleteForm = false;
  }

  // getRetailerNameErrorMessage() {
  //   if (this.retailerName.value.hasError('required')) {
  //     return 'You must enter a value';
  //   }
  //   return this.retailerName.value.hasError('pattern') ? 'Invalid Name! name must starts with capital letter and has atleast 2 characters.' : '';
  // }
  // getAddressErrorMessage() {
  //   if (this.address.value.hasError('required'))
  //     return 'You must enter a value';
  // }
  // getZipcodeErrorMessage() {
  //   if (this.zipcode.value.hasError('required')) {
  //     return 'You must enter a value';
  //   }
  //   return this.zipcode.value.hasError('pattern') ? 'Invalid Zipcode! Must be of 6 digits.' : '';
  // }
  // getCityErrorMessage() {
  //   if (this.city.value.hasError('required'))
  //     return 'You must enter a value';
  // }
  // getStateErrorMessage() {
  //   if (this.state.value.hasError('required'))
  //     return 'You must enter a value';
  // }
  // getPhoneNumberErrorMessage() {
  //   if (this.phoneNumber.value.hasError('required')) {
  //     return 'You must enter a value';
  //   }
  //   return this.phoneNumber.value.hasError('pattern') ? 'Invalid Phone Number.' : '';
  // }
  // getEmailErrorMessage() {
  //   if (this.email.value.hasError('required')) {
  //     return 'You must enter a value';
  //   }
  //   return this.email.value.hasError('email') ? 'Not a valid email' : '';
  // }

  add() {
    if (this.retailerForm.valid) {
    let temp: Retailer = new Retailer("", this.retailerForm.get('retailerName').value, this.retailerForm.get('address').value, this.retailerForm.get('zipcode').value, this.retailerForm.get('city').value, this.retailerForm.get('state').value, this.retailerForm.get('phoneNumber').value, this.retailerForm.get('email').value);
    this.retailerService.addRetaIler(temp).subscribe((data: Retailer) => {
      window.alert("Retailer added with id: " + data.retailerId);
      this.retailerService.retailerdb.push(data);
      this.showAdditionForm=false;
      this.refreshRetailers();
    });}
  }
  update() {
    if (this.retailerForm.valid) {
    let temp: Retailer = new Retailer(this.retailerForm.get('retailerId').value, this.retailerForm.get('retailerName').value, this.retailerForm.get('address').value, this.retailerForm.get('zipcode').value, this.retailerForm.get('city').value, this.retailerForm.get('state').value, this.retailerForm.get('phoneNumber').value, this.retailerForm.get('email').value);
    this.retailerService.updateRetailer(temp).subscribe((data: Retailer) => {
      window.alert("Retailer updated with id: " + data.retailerId);
      this.retailerService.retailerdb.push(data);
      this.refreshRetailers();
      this.showUpdationForm=false;
    });}
  }
  delete(id: string) {
    this.retailerService.deleteRetailer(id).subscribe(response => {
      for (let i = 0; i < this.retailerService.retailerdb.length; i++) {
        if (id == this.retailerService.retailerdb[i].retailerId) {
          this.retailerService.retailerdb.splice(i, 1);
        }
      }
      this.showSuccess = true;
      this.showUpdationForm = false;
      this.showAdditionForm = false;
      this.refreshRetailers();
      this.showDeleteForm=false;
      this.message = id + " Product is deleted successfully";
    });
  }
}