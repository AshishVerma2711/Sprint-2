export class Inventory{
    productId: string;
    retailerId: string;
    units: number;

    constructor(productId: string, retailerId: string, units: number){
        this.productId=productId;
        this.retailerId=retailerId;
        this.units=units;
    }
}