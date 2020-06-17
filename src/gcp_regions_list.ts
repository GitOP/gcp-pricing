import { GcpDataLoader } from "./gcp_data_loader";

export class RegionsList {
    // Use available EC2 regions as an authorative list
    private static readonly manifestPath = '/static/data/pricelist.json'

    private constructor(readonly regions: Array<string>) {
    }

    static load(awsLoader: GcpDataLoader) {
        let resp = awsLoader.loadPath(this.manifestPath)
        let json = JSON.parse(resp)

        return new RegionsList(json.ec2)
    }
}