import { GCPResource } from "./gcp_resource"

export class GCPCore extends GCPResource {
    private resourceType: string
    
    constructor(core: string){
        super()
        this.resourceType = core
    }
}
