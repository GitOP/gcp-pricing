import { GcpDataLoader } from "./gcp_data_loader";
import { Utils } from "./_utils";

export class GcpServiceList {
    private static readonly manifestPath = '/static/data/pricelist.json'

    private constructor( readonly services: string) {
        // this.json_obj = null
    }

    static load(gcpLoader: GcpDataLoader) {
        let resp = gcpLoader.loadPath(this.manifestPath)
        let json = JSON.parse(resp)

        return new GcpServiceList(json.gcp_price_list)
    }
}