import { ApiConfig } from "../client/types";
import PayrollApiClient from "../client";

import { generatePapdisFile } from "../utils/generatePapdisSample";

import dotenv from "dotenv";

dotenv.config();

const apiConfig: ApiConfig = {
  directoryTenantId: process.env.DIRECTORY_TENANT_ID || "",
  applicationClientId: process.env.APPLICATION_CLIENT_ID || "",
  clientSecret: process.env.CLIENT_SECRET || "",
  environment: "sandbox",
  baseUrl: process.env.BASE_URL || "https://payroll-api.getpenfold.dev/v2/",
};

let payPeriodStart = "2025-04-01"; //Important!! you'll need to update this each time the script is run otherwise the file will not be processed correctly

async function main() {
  const client = await PayrollApiClient.build(apiConfig);

  const employers = await client.getEmployers();

  const firstEmployer = employers.data?.items?.[0] ?? null; //find the first employer to use as an example

  if (!firstEmployer) {
    throw new Error("No employers found");
  }
  console.log(`Uploading PAPDIS for employer: ${firstEmployer.name}`);

  const upload = await client.postUpload({
    body: {
      filename: `${firstEmployer.externalReference}-${payPeriodStart}.csv`,
      purpose: "contribution",
    },
    path: {
      employer_id: firstEmployer.id!,
    },
  });

  const file = generatePapdisFile(
    firstEmployer.externalReference!,
    payPeriodStart
  );
  await client.postUploadFile(upload.data!.putDestinationUrl!, file);

  let uploadStatus = "";
  while (uploadStatus !== "Processed") {
    const uploadData = await client.getUpload({
      path: {
        employer_id: firstEmployer.id!,
        upload_id: upload.data!.id!,
      },
    });
    uploadStatus = uploadData.data?.status ?? "";
    console.log(`Current upload status: ${uploadStatus}`);
    if (uploadStatus !== "Processed") {
      // Wait for 5 seconds before checking again
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
  console.log("Upload processing completed");

  const contributions = await client.getUploadContributions({
    path: {
      employer_id: firstEmployer.id!,
      upload_id: upload.data!.id!,
    },
  });
  console.log(contributions.data);

  const enrolements = await client.getUploadEnrollments({
    path: {
      employer_id: firstEmployer.id!,
      upload_id: upload.data!.id!,
    },
  });
  console.log(enrolements.data);
}

main().catch(console.error);
