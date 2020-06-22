import { TestSuite } from "./_framework/test_suite";
import { TestRun } from "./_framework/test_run";
import { GCPInstance } from "../src/models/gcp_instance";

export class GCPInstanceTestSuite extends TestSuite {
    name(): string {
        return this.constructor.name
    }

    run(t: TestRun): void {
        t.describe("GCPInstance", function() {
            let inst = null

            inst = new GCPInstance("n1-standard-8")
            t.isTrue( Number(inst.getCores()) === 8 )
        })
    }

}