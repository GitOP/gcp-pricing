import { GcpDataLoader } from "./gcp_data_loader";

export class GcpPriceList {
    private static readonly manifestPath = '/static/data/pricelist.json'

    private constructor(readonly services: Array<string>) {
    }

    static load(gcpLoader: GcpDataLoader) {
        let resp = gcpLoader.loadPath(this.manifestPath)
        let json = JSON.parse(resp)

        return new GcpPriceList(json.gcp_price_list)
    }
}