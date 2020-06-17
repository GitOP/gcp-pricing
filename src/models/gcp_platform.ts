export enum GCPPlatformType {Linux, Rhel, Windows}

export class GCPPlatform {
    static nameToType(name: string): GCPPlatformType {
        switch (name.toLowerCase()) {
            case "linux": {
                return GCPPlatformType.Linux
            }
            case "rhel": {
                return GCPPlatformType.Rhel
            }
            case "windows": {
                return GCPPlatformType.Windows
            }
            default: {
                return null
            }
        }
    }

    static typeToUriPath(os: GCPPlatformType): string {
        return GCPPlatform.typeToString(os).replace("_", "-").toLowerCase()
    }

    static typeToString(os: GCPPlatformType): string {
        return GCPPlatformType[os]
    }

    // static msSqlLicenseToType(basePlatform: string, sqlLicense: string) {
    //     if (basePlatform != "linux" && basePlatform != "windows") {
    //         throw `Invalid base platform: ${basePlatform}`
    //     }

    //     if (!sqlLicense) {
    //         throw `Missing SQL License`
    //     }

    //     sqlLicense = sqlLicense.toLowerCase()

    //     if (sqlLicense != "std" && sqlLicense != "web" && sqlLicense != "enterprise") {
    //         throw `Invalid Microsoft SQL license: ${sqlLicense}`
    //     }

    //     return Utilities.formatString("%s_%s", basePlatform, sqlLicense)
    // }
}