import { GCPResource } from "./gcp_resource"

export class GCPLicense extends GCPResource {
    private resourceType: string
    
    constructor(license: string){
        super()
        this.resourceType = license
    }
}
