import { createClient as createOpenApiClient } from "@hey-api/openapi-ts";

function generateClient() {
  createOpenApiClient({
    client: "@hey-api/client-fetch",
    input: "https://bump.sh/penfold-api/doc/penfold-payroll-api-v2.yaml",
    output: "src/generated",
  });
}

generateClient();
