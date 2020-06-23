import { GCPPlatformType, GCPPlatform } from "./models/gcp_platform";
import { InstancePrice } from "./models/instance_price";
import { GCPInstance } from "./models/gcp_instance";
import { PriceDuration } from "./price_converter";
import { ctxt } from "./context";
import { SettingKeys } from "./settings/setting_keys";
import { Utils } from "./_utils";

export class GCPPrice {
    private readonly instance: GCPInstance

    constructor(private readonly settings: any, instType: string) {
        this.instance = new GCPInstance(instType)
    }

    get(duration: PriceDuration): number {
        let instPrice = this.gcpGetPrice(this.instance, this.setting(SettingKeys.Region),
            this.setting(SettingKeys.PurchaseType), this.platformType())

        return instPrice.getPrice()
    }

    private platformType(): GCPPlatformType {
        let platform = this.setting(SettingKeys.Platform)

        let pType = GCPPlatform.nameToType(platform)
        if (pType == null) {
            throw `Unknown GCP platform: ${platform}`
        }

        return pType
    }

    private gcpGetPrice(instance: GCPInstance, region: string, purchaseType: string, platform: GCPPlatformType): InstancePrice {
        let pricePath = null
        let instPrice = null
        if (this.isReserved()) {
            pricePath = Utilities.formatString('%s-%s-CUD-%s-',instance.getServiceName(), instance.getInstanceSeries(),this.purchaseTermAttr())
            let memoryPrice = parseFloat(ctxt().gcpServiceList.services[pricePath + "RAM"][region])
            let corePrice = parseFloat(ctxt().gcpServiceList.services[pricePath + "CPU"][region])
            instPrice = memoryPrice * Number(instance.getMem()) + corePrice * Number(instance.getCores())
        } else {
            pricePath = instance.getServiceName() + "-VMIMAGE-" + instance.getInstanceType()
            instPrice = ctxt().gcpServiceList.services[pricePath][region]            
            //Logger.log(inst);
        }
        if (instPrice == null) {
            throw `Can not find instance type ${instance.getInstanceType()} of ${GCPPlatform.typeToString(platform)} in ${region}`
        }
        
        return new InstancePrice(instPrice, this.isReserved())
    }

    private isReserved(): boolean {
        return this.setting(SettingKeys.PurchaseType) === "reserved"
    }

    private setting(name: SettingKeys): string {
        return this.settings.get(name)
    }

    private paymentOptionAttr(): string {
        switch(this.setting(SettingKeys.PaymentOption)) {
            case 'all_upfront': {
                return 'All Upfront'
            }
            case 'no_upfront': {
                return 'No Upfront'
            }
            case 'partial_upfront': {
                return 'Partial Upfront'
            }
        }
    }

    private purchaseTermAttr(): string {
        return Utilities.formatString('%s-YEAR', this.setting(SettingKeys.PurchaseTerm))
    }
}
