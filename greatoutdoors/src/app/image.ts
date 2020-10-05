export class Image{
    productId:string;
    image:any;

    constructor(productId:string,image:any){
        this.image=image;
        this.productId=productId;
    }
}