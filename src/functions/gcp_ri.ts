import { _gcp_full } from "./gcp";

/**
 * Returns the reserved instance pricing for the given instance type and purchase options.
 * 
 * @param {"n1-standard-2"} instanceType Instance type, eg. "n1-standard-2"
 * @param {"us-east1"} region
 * @param {"linux"} platform Instance platform, eg. "linux", "windows", etc.
 * @param {1} purchaseTerm Duration of RI in years (1 or 3)
 * @returns price
 * @customfunction
 */
export function GCP_RI(instanceType: string, region: string, platform: string, purchaseTerm: string | number) {
    return _gcp_full(instanceType, region, "reserved", platform, purchaseTerm)
}
