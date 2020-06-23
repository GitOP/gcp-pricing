export class InstancePrice {
    constructor(private readonly price: any, private readonly reserved: boolean) {
    }
    
    getPrice() : any {
        return this.price
    }

    // RS: Only valid for AWS
    // TODO: manage conversion to different durations
    unitPrice(): number {
        if (this.reserved) {
            return parseFloat(this.price.calculatedPrice.effectiveHourlyRate.USD)
        } else {
            return parseFloat(this.price.price.USD);
        }
    }
}