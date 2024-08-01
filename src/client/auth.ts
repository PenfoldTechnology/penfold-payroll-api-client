import { AuthConfig, AuthToken } from "./types";

function scopeBaseUrl(environment: "sandbox" | "production") {
  return `https://${
    environment === "sandbox" ? "penfoldstaging" : "penfoldprod"
  }.onmicrosoft.com`;
}

async function getAuthToken(config: AuthConfig): Promise<AuthToken> {
  const url = `https://login.microsoftonline.com/${config.directoryTenantId}/oauth2/v2.0/token`;

  const params = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: config.applicationClientId,
    scope: `${scopeBaseUrl(config.environment)}/${
      config.applicationClientId
    }/.default`,
    client_secret: config.clientSecret,
  });

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = (await response.json()) as AuthToken;
  return data;
}

export { getAuthToken };
