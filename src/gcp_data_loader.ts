import { CacheLoader } from "./cache_loader";

interface GcpDataLoaderTransform {
    (value: string): string
}

export class GcpDataLoader {
    static readonly baseHost = 'https://cloudbilling.googleapis.com'
    static readonly expireTimeSeconds = 3600

    private readonly cache: CacheLoader

    constructor() {
        this.cache = new CacheLoader(CacheService.getScriptCache())
    }

    loadPath(path: string, transform?: GcpDataLoaderTransform): string {
        let data = this.cache.get(path)
        if (data != null) {
            return data
        }

        let url = this.buildUrl(path)
        data = this.loadUrl(url)

        if (transform) {
            data = transform(data)
        }

        this.cache.put(path, data, GcpDataLoader.expireTimeSeconds)

        return data
    }

    private loadUrl(url: string) {
        let resp = UrlFetchApp.fetch(url)
        if (resp.getResponseCode() != 200) {
            throw "Unable to load the URL: " + url;
        }
    
        return resp.getContentText();
    }
    
    // Cache bust the URL by adding a timestamp
    // TODO: will not work with existing query params
    private buildUrl(path: string) : string {
        return Utilities.formatString("%s%s?timestamp=%d",
            GcpDataLoader.baseHost, path, Date.now())
    }
}