export class Product
{
    productId:string;
    productName:string;
    category:string;
    description:string;
    price:Number;
    manufacturer:string;
    

    constructor(productId:string,prductName:string,category:string,description:string,price:Number,manufacturer:string)
    {
        this.productId=productId;
        this.productName=prductName;
        this.category=category;
        this.description=description;
        this.price=price;
        this.manufacturer=manufacturer;
    }

    


}