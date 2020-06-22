import { GCP_OD, GCP_LINUX_OD, GCP } from "../../src/functions/gcp_od";
import { TestSuite } from "../_framework/test_suite";
import { TestRun } from "../_framework/test_run";
// import { GCP_LINUX_CONV_RI_ALL, GCP_LINUX_MSSQL_CONV_RI_ALL, GCP_RHEL_CONV_RI_ALL, GCP_WINDOWS_MSSQL_STD_RI_PARTIAL } from "../../src/functions/gen/gcp_ri_gen";

export class GCPFunctionTestSuite extends TestSuite {
    name() {
        return this.constructor.name
    }

    run(t: TestRun): void {
        t.describe("GCP on-demand", function() {
            t.areEqual(0.428, GCP_OD("n1-standard-8", "us-east4", "linux"))
            t.areEqual(0.4184, GCP_OD("n1-standard-8", "northamerica-northeast1", "linux"))

            t.areEqual(0.428, GCP_LINUX_OD("n1-standard-8", "us-east4"))
            t.areEqual(0.4184, GCP_LINUX_OD("n1-standard-8", "northamerica-northeast1"))

            t.willThrow(function() {
                GCP_OD("n1-standard-8", "us-east4", undefined)
            }, "platform")

            t.willThrow(function() {
                GCP_LINUX_OD("mX5.xlarge", "us-east4")
            }, "Can not find instance")
        })

        // t.describe("EC2 case sensitivity", function() {
        //     t.areEqual(0.192, EC2_LINUX_OD("M5.XLARGE", "US-EAST-1"))
        // })

        // t.describe("EC2 with invalid settings", function() {
        //     t.willThrow(function() {
        //         GCP(undefined, undefined)
        //     }, "missing")

        //     t.willThrow(function() {
        //         GCP([], "m5.xlarge")
        //     }, "missing required")

        //     t.willThrow(function() {
        //         GCP([["region"]], "m5.xlarge")
        //     }, "missing required")

        //     t.willThrow(function() {
        //         GCP([["region", ""]], "m5.xlarge")
        //     }, "missing required")

        //     t.willThrow(function() {
        //         GCP([["region", undefined]], "m5.xlarge")
        //     }, "missing required")
        // })

        // t.describe("GCP with valid settings", () => {
        //     let settings = [
        //         ["region", "us-east-1"],
        //         ["purchase_term", "ondemand"],
        //         ["operating_system", "linux"]
        //     ]

        //     t.areEqual(0.192, GCP(settings, "m5.xlarge"))

        //     // test override
        //     t.areEqual(0.214, GCP(settings, "m5.xlarge", "ca-central-1"))

        //     t.areEqual(0.214,
        //          GCP(this.settings("ca-central-1", "linux", "ondemand", "standard", 1, "all_upfront"), "m5.xlarge"))
        // })

        // t.describe("EC2 RI", () => {
        //     t.areClose(0.116447, EC2(this.linuxRi('us-east-1', 'standard', 1, 'partial_upfront'), "m5.xlarge"), 0.00001)
        //     t.areClose(0.134123, EC2(this.linuxRi('us-east-1', 'convertible', 1, 'partial_upfront'), "m5.xlarge"), 0.00001)
        //     t.areClose(0.123, EC2(this.linuxRi('us-east-1', 'standard', 1, 'no_upfront'), "m5.xlarge"), 0.00001)
        //     t.areClose(0.114498, EC2(this.linuxRi('us-east-1', 'standard', 1, 'all_upfront'), "m5.xlarge"), 0.00001)
        //     t.areClose(0.073706, EC2(this.linuxRi('us-east-1', 'standard', 3, 'all_upfront'), "m5.xlarge"), 0.00001)

        //     t.areClose(0.099201, EC2(this.linuxRi('us-west-1', 'standard', 3, 'all_upfront'), "m5.xlarge"), 0.00001)
        // })

        // t.describe("EC2 RI functions", () => {
        //     t.areClose(0.131621, EC2_LINUX_CONV_RI_ALL("m5.xlarge", "us-east-1", "1"), 0.00001)
        //     t.areClose(0.191667, EC2_RHEL_CONV_RI_ALL("m5.xlarge", "us-east-1", "1"), 0.00001)
        //     t.areClose(0.199201, EC2_LINUX_MSSQL_CONV_RI_ALL("m5.xlarge", "us-east-1", "web", "1"), 0.00001)
        //     t.areClose(0.742195, EC2_WINDOWS_MSSQL_STD_RI_PARTIAL("m5.xlarge", "us-east-2", "std", "3"), 0.00001)
        // })
    }

    // private linuxRi(region: string, offeringClass: string, term: number, paymentOption: string) {
    //     return this.ri(region, 'linux',offeringClass, term, paymentOption)
    // }

    // private ri(region: string, platform: string, offeringClass: string, term: number, paymentOption: string) {
    //     return this.settings(region, platform, 'reserved', offeringClass, term, paymentOption)
    // }

    // private settings(region: string, platform: string, purchaseType: string, offeringClass: string, term: number, paymentOption: string) {
    //     return [
    //         ['region', region],
    //         ['platform', platform],
    //         ['purchase_type', purchaseType],
    //         ['offering_class', offeringClass],
    //         ['purchase_term', term.toString()],
    //         ['payment_option', paymentOption]
    //     ]
    // }
}