import { GCPResource } from "./gcp_resource"

export class GCPRam extends GCPResource {
    private resourceType: string
    
    constructor(ram: string){
        super()
        this.resourceType = ram
    }
}