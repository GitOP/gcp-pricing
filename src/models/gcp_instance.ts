import { Utils } from "../_utils";
import { ctxt } from "../context";

export class GCPInstance {
    private readonly serviceName: string
    private readonly instSeries: string
    private readonly instSize: string
    private instSubType: string
    private cores: string
    private memory: string

    constructor(instType: string) {
        this.serviceName='CP-COMPUTEENGINE'
        let s = instType.toLowerCase().split("-")

        this.instSeries = s[0]
        if (this.instSeries != "n1") {
            throw `Invalid instance series: ${this.instSeries}`
        }
        
        this.instSize = s[1]+"-"+s[2]
        this.instSubType = s[1]

        if(this.instSubType == "custom"){
            if (s.length != 4) {
                throw `Invalid instance type: ${instType}`
            }
            this.setCores(s[2])
            this.setMem(s[3].slice(0,-3))
        }
        else {
            if (s.length != 3) {
                throw `Invalid instance type: ${instType}`
            }
            let fullServiceName = this.gcpServiceName()
            let specs = this.gcpSetInstanceSpecs(fullServiceName, ctxt().gcpServiceList.services)

        } 
    }

    private gcpServiceName(): string {
        let serviceNameSuffix = null
        serviceNameSuffix = Utilities.formatString('-VMIMAGE-%s',this.getInstanceType())
        return this.serviceName+serviceNameSuffix
    }

    private gcpSetInstanceSpecs(serviceName: string, data: any) {
        let cores = data[serviceName].cores
        let memory = data[serviceName].memory
        if (!(cores && memory)) {
            throw `Invalid service name: ${serviceName}`
        }
        this.setCores(cores)
        this.setMem(memory)
    }

    getServiceName(): string {
        return this.serviceName.toUpperCase()
    }

    getInstanceType(): string {
        return (this.instSeries + "-" + this.instSize).toUpperCase();
    }

    getInstanceSeries(): string{
        return this.instSeries.toUpperCase()
    }

    getInstanceSize(): string{
        return this.instSize
    }

    getCores(){
        return this.cores
    }

    getMem(){
        return this.memory
    }

    setCores(cores: string){
        this.cores = cores
    }

    setMem(memory: string){
        this.memory = memory
    }
}
