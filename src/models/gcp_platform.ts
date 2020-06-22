export enum GCPPlatformType {Linux, Rhel, Windows }

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
}