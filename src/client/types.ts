export interface ApiConfig {
  directoryTenantId: string;
  applicationClientId: string;
  clientSecret: string;
  environment: "sandbox" | "production";
  baseUrl?: string;
}

export interface AuthToken {
  token_type: string;
  expires_in: number;
  ext_expires_in: number;
  access_token: string;
}
