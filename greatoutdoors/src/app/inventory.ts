export class Inventory{
   inventoryId:InventoryId
    units: number;

    constructor(inventoryId:InventoryId, units: number){
        this.inventoryId=inventoryId;
        this.units=units;
    }
}
export class InventoryId{
    productId: string;
    retailerId: string;
    constructor(productId: string,retailerId: string){
        this.productId=productId;
        this.retailerId=retailerId;
    }
}