export interface AppSprintConfig {
    apiKey: string;
    apiUrl?: string;
    enableAppleAdsAttribution?: boolean;
    isDebug?: boolean;
    logLevel?: 0 | 1 | 2 | 3;
    customerUserId?: string | null;
}
export type LogLevel = 0 | 1 | 2 | 3;
export type EventType = "session_start" | "login" | "sign_up" | "register" | "purchase" | "subscribe" | "start_trial" | "add_to_cart" | "add_to_wishlist" | "initiate_checkout" | "view_content" | "view_item" | "search" | "share" | "tutorial_complete" | "level_start" | "level_complete" | "custom";
export interface EventParams {
    revenue?: number;
    currency?: string;
    [key: string]: unknown;
}
export interface AttributionLink {
    id: string;
    name: string;
}
export interface AppleAdsAttribution {
    campaignId: string;
    adGroupId?: string | null;
    keywordId?: string | null;
    countryOrRegion?: string | null;
    conversionType?: string | null;
}
export interface AttributionResult {
    isAttributed?: boolean;
    source?: "tracking_link" | "apple_ads" | "organic" | "fingerprint" | string;
    matchType?: "idfa" | "idfv" | "ip_user_agent" | "apple_ads" | "organic" | string;
    link?: AttributionLink | null;
    appleAds?: AppleAdsAttribution | null;
    confidence?: number;
    campaignName?: string | null;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    utmContent?: string | null;
    utmTerm?: string | null;
}
export interface InstallResponse {
    appsprintId: string;
    attribution: AttributionResult;
}
export interface TestEventResult {
    success: boolean;
    message: string;
}
export interface DeviceInfo {
    deviceModel?: string;
    screenWidth?: number;
    screenHeight?: number;
    locale?: string;
    timezone?: string;
    osVersion?: string;
    appVersion?: string;
    gaid?: string;
    idfv?: string;
    idfa?: string;
    adServicesToken?: string;
    attStatus?: "not_determined" | "restricted" | "denied" | "authorized";
}
export interface NativeAppSprintModule {
    configure(config: Record<string, unknown>): Promise<void>;
    sendEvent(eventType: string, name: string | null, revenue: number | null, currency: string | null, parameters: Record<string, unknown> | null): Promise<void>;
    sendTestEvent(): Promise<TestEventResult>;
    flush(): Promise<void>;
    clearData(): Promise<void>;
    setCustomerUserId(userId: string): Promise<void>;
    enableAppleAdsAttribution(): Promise<void>;
    getAppSprintId(): Promise<string | null>;
    getAttribution(): Promise<AttributionResult | null>;
    isInitialized(): Promise<boolean>;
    isSdkDisabled(): Promise<boolean>;
    destroy(): Promise<void>;
    getDeviceInfo(): Promise<DeviceInfo>;
    getAdServicesToken(): Promise<string | null>;
    requestTrackingAuthorization(): Promise<boolean>;
}
//# sourceMappingURL=types.d.ts.map