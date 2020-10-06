export class Order{
    orderId:string;
    userId:string;
    status:string;
    amount:number;
    orderDate:Date;

    constructor(orderId:string,userId:string,status:string,amount:number,orderDate:Date){
        this.orderId=orderId;
        this.orderDate=orderDate;
        this.status=status;
        this.userId=userId;
        this.amount=amount;
    }
}