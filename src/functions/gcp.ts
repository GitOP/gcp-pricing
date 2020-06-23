import { PriceDuration } from "../price_converter";
import { GCPPrice } from "../gcp_price";
import { InvocationSettings } from "../settings/invocation_settings";
import { _initContext } from "../context";
import { SettingKeys } from "../settings/setting_keys";
import { GCPSettingsValidator } from "../settings/gcp_settings_validator";

export function _gcp(settings: InvocationSettings, instanceType: string)  {
    if (!instanceType) {
        throw "Instance type is not set"
    }

    let [ret, msg] = new GCPSettingsValidator(settings).validate()
    if (!ret) {
        throw msg
    }

    let gcpPrices = new GCPPrice(settings, instanceType)

    return gcpPrices.get(PriceDuration.Hourly)
}

export function _gcp_full(instanceType: string, region: string, purchaseType: string, platform: string,
    purchaseTerm?: string | number) {
    _initContext()

    if (!instanceType) {
        throw "Instance type is not set"
    }

    if (!region) {
        throw "Region is not set"
    }

    if (!purchaseType) {
        throw "Purchase type is not set"
    }

    if (!platform) {
        throw "Platform is not set"
    }

    let settingsMap = {}
    settingsMap[SettingKeys.Region] = region
    settingsMap[SettingKeys.PurchaseType] = purchaseType
    settingsMap[SettingKeys.Platform] = platform

    if (purchaseType === "reserved") {

        if (!purchaseTerm) {
            throw "Purchase term is not set"
        }
        settingsMap[SettingKeys.PurchaseTerm] = purchaseTerm
    }

    let settings = InvocationSettings.loadFromMap(settingsMap)

    return _gcp(settings, instanceType)
}
