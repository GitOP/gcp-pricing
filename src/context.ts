import { DefaultSettings } from "./settings/default_settings";
import { RegionsList } from "./regions_list";
import { AwsDataLoader } from "./aws_data_loader";
import { GcpDataLoader } from "./gcp_data_loader";
import { GcpServiceList } from "./gcp_service_list";


export class Context {
    constructor(readonly spreadsheetApp: GoogleAppsScript.Spreadsheet.SpreadsheetApp,
         readonly defaultSettings: DefaultSettings,
         readonly regionsList: RegionsList,
         readonly awsDataLoader: AwsDataLoader,
         readonly gcpServiceList: GcpServiceList,
         readonly gcpDataLoader: GcpDataLoader) {
    }

    static Builder = class {
        private gcpDataLoader: GcpDataLoader
        private awsDataLoader: AwsDataLoader
        private spreadsheetApp: GoogleAppsScript.Spreadsheet.SpreadsheetApp
        private regionsList: RegionsList
        private gcpServiceList: GcpServiceList

        withGcpDataLoader(gcpDataLoader: GcpDataLoader): this {
            this.gcpDataLoader = gcpDataLoader
            return this
        }

        withAwsDataLoader(awsDataLoader: AwsDataLoader): this {
            this.awsDataLoader = awsDataLoader
            return this
        }

        withSpreadsheetApp(spreadsheetApp: GoogleAppsScript.Spreadsheet.SpreadsheetApp): this {
            this.spreadsheetApp = spreadsheetApp
            return this
        }

        withGcpServiceList(gcpServiceList: GcpServiceList): this {
            this.gcpServiceList = gcpServiceList
            return this
        }

        withRegionsList(regionsList: RegionsList): this {
            this.regionsList = regionsList
            return this
        }

        build(): Context {
            return new Context(this.spreadsheetApp,
                new DefaultSettings(this.regionsList),
                this.regionsList, this.awsDataLoader, this.gcpServiceList, this.gcpDataLoader)
        }
    }
}

// Provide a single static reference to context
let _mainContext: Context = null

export function _initContext(app = SpreadsheetApp) {
    if (_mainContext != null) {
        return
    }

    Logger.log("Initializing context")

    let awsLoader = new AwsDataLoader()
    let gcpLoader = new GcpDataLoader()

    let context = new Context.Builder()
        .withGcpDataLoader(gcpLoader)
        .withGcpServiceList(GcpServiceList.load(gcpLoader))
        .withAwsDataLoader(awsLoader)
        .withSpreadsheetApp(app)
        .withRegionsList(RegionsList.load(awsLoader))
        .build()
    _setContext(context)
    
}

export function _setContext(context: Context) {
    _mainContext = context
}

export function ctxt(): Context {
    return _mainContext
}

// export function filterOnDemand(prices: any) {
//     return prices.filter(price => {
//         return price.attributes['CP-COMPUTEENGINE-VMIMAGE-N1-STANDARD-8'] === "us-central1"
//     })
// }