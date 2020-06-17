import { DefaultSettings } from "./settings/default_settings";
import { RegionsList } from "./regions_list";
import { AwsDataLoader } from "./aws_data_loader";
import { GcpDataLoader } from "./gcp_data_loader";


export class Context {
    constructor(readonly spreadsheetApp: GoogleAppsScript.Spreadsheet.SpreadsheetApp,
         readonly defaultSettings: DefaultSettings,
         readonly regionsList: RegionsList,
         readonly awsDataLoader: AwsDataLoader,
         readonly gcpDataLoader: GcpDataLoader) {
    }

    static Builder = class {
        private gcpDataLoader: GcpDataLoader
        private awsDataLoader: AwsDataLoader
        private spreadsheetApp: GoogleAppsScript.Spreadsheet.SpreadsheetApp
        private regionsList: RegionsList

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

        withRegionsList(regionsList: RegionsList): this {
            this.regionsList = regionsList
            return this
        }

        build(): Context {
            return new Context(this.spreadsheetApp,
                new DefaultSettings(this.regionsList),
                this.regionsList, this.awsDataLoader, 
                this.gcpDataLoader)
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

    let context = new Context.Builder()
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