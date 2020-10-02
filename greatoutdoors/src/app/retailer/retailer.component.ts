import { Component,ViewChild,AfterViewInit, OnInit, Inject } from '@angular/core';
import { RetailerService } from '../retailer.service'
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Retailer } from '../retailer';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-retailer',
  templateUrl: './retailer.component.html',
  styleUrls: ['./retailer.component.css']
})
export class RetailerComponent implements AfterViewInit,OnInit {

  constructor(public retailerService:RetailerService,public dialog: MatDialog) { }

    displayedColumns: string[] = ['retailerId', 'retailerName', 'address', 'zipcode','city','state','phoneNumber','email','update/delete'];
    dataSource = new MatTableDataSource<Retailer>(this.retailerService.retailerdb);

    @ViewChild(MatPaginator) paginator: MatPaginator;


    ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void{
    this.retailerService.getRetaielrs();
    }

  updateRetailer(retailerId:string){

  }
  deleteDialog(id:string){
    console.log(id);
    const dialogRef = this.dialog.open(DeleteRetailerDialog,{
      width: '250px',
      data:id
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Delete operation canceled!');
    });
  }
}

@Component({
  selector: 'app-retailer-delete',
  templateUrl: './retailer.component.delete.html'
})

export class DeleteRetailerDialog{
  constructor(public retailerService:RetailerService, public dialogRef: MatDialogRef<DeleteRetailerDialog>,@Inject(MAT_DIALOG_DATA) public data) {}

  delete(id:string){
    for(let i=0;i<this.retailerService.retailerdb.length;i++){
      if(id==this.retailerService.retailerdb[i].retailerId){
        this.retailerService.deleteRetailer(id).subscribe(response=>{console.log(response);window.alert(response)});
        this.retailerService.retailerdb.splice(i,1);
      }
   }
 }
}