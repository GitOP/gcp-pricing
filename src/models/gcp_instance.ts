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

        if (s.length != 3) {
            throw `Invalid instance type: ${instType}`
        }

        this.instSeries = s[0]
        this.instSubType = s[1]
        this.instSize = s[2]

        let fullServiceName = this.gcpServiceName()
        let specs = this.gcpSetInstanceSpecs(fullServiceName, ctxt().gcpServiceList.services)
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
        return this.serviceName
    }

    getInstanceType(): string {
        return (this.instSeries + "-" + this.instSubType + "-" + this.instSize).toUpperCase();
    }

    getInstanceSeries(): string{
        return this.instSeries
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

    setCores(cores: number){
        this.cores = cores.toString()
    }

    setMem(memory: number){
        this.memory = memory.toString()
    }
}
