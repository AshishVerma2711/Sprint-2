export class Retailer {
    retailerId: string;
    retailerName: string;
    address: string;
    zipcode: string;
    city: string;
    state: string;
    phoneNumber: string;
    email: string;

    constructor(retailerId: string, retailerName: string, address: string, zipcode: string, city: string, state: string, phoneNumber: string, email?: string) {
        this.retailerId = retailerId;
        this.retailerName = retailerName;
        this.address = address;
        this.zipcode = zipcode;
        this.city = city;
        this.state = state;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }
    
    
}