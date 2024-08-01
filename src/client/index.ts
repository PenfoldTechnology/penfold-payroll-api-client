import { getAuthToken } from "./auth";
import { ApiConfig, AuthToken } from "./types";
import { createClient } from "@hey-api/client-fetch";
import {
  getEmployers,
  getUploads,
  getUploadsByUploadId as getUpload,
  getUploadsByUploadIdErrors as getUploadErrors,
  getUploadsByUploadIdContributions as getUploadContributions,
  postUploads as postUpload,
  getUploadsByUploadIdEnrolments as getUploadEnrollments,
} from "../generated/index";
import debug from "debug";
import { Readable } from "stream";
import { Blob } from "buffer";

const log = debug("payroll-api-client");

type PublicMethod = (...args: any[]) => Promise<any>;

class PayrollApiClient {
  private config: ApiConfig;
  private authToken: AuthToken | null = null;
  private tokenPromise: Promise<string> | null = null;
  private client: ReturnType<typeof createClient>;

  constructor(config: ApiConfig) {
    this.config = config;
    this.client = createClient({
      baseUrl: config.baseUrl,
      fetch: fetch,
    });
    this.client.interceptors.request.use(async (request, options) => {
      request.headers.set("Authorization", `Bearer ${await this.getToken()}`);
      log(request);
      return request;
    });
    log("Initialized PayrollApiClient with config: %O", config);
  }

  private async getToken(): Promise<string> {
    if (this.authToken) {
      log("Using cached auth token");
      return this.authToken.access_token;
    }
    if (!this.tokenPromise) {
      log("Fetching new auth token");
      this.tokenPromise = (async () => {
        this.authToken = await getAuthToken(this.config);
        this.tokenPromise = null;
        log("Fetched new auth token: %O", this.authToken);
        return this.authToken.access_token;
      })();
    }
    return this.tokenPromise;
  }

  private createMethodWrapper(method: PublicMethod) {
    return async (...args: any[]) => {
      log("Calling method %s with args: %O", method.name, args);
      const response = await method({
        ...args[0],
        client: this.client,
      });
      log("Response: %O", response);
      return response;
    };
  }

  public async getEmployers(
    ...args: Parameters<typeof getEmployers>
  ): ReturnType<typeof getEmployers> {
    return this.createMethodWrapper(getEmployers)(...args);
  }

  public async getUploads(
    ...args: Parameters<typeof getUploads>
  ): ReturnType<typeof getUploads> {
    return this.createMethodWrapper(getUploads)(...args);
  }

  public async getUpload(
    ...args: Parameters<typeof getUpload>
  ): ReturnType<typeof getUpload> {
    return this.createMethodWrapper(getUpload)(...args);
  }

  public async postUpload(
    ...args: Parameters<typeof postUpload>
  ): ReturnType<typeof postUpload> {
    return this.createMethodWrapper(postUpload)(...args);
  }

  public async postUploadFile(
    putDestinationUrl: string,
    file: NodeJS.ReadableStream
  ): Promise<void> {
    const blob = await new Promise<Blob>((resolve, reject) => {
      const chunks: any[] = [];
      file.on("data", (chunk) => chunks.push(chunk));
      file.on("end", () => resolve(new Blob(chunks)));
      file.on("error", reject);
    });

    const response = await fetch(putDestinationUrl, {
      method: "PUT",
      body: new Uint8Array(await blob.arrayBuffer()),
    });

    if (!response.ok) {
      throw new Error(`Failed to upload file: ${response.statusText}`);
    }
  }

  public async getUploadErrors(
    ...args: Parameters<typeof getUploadErrors>
  ): ReturnType<typeof getUploadErrors> {
    return this.createMethodWrapper(getUploadErrors)(...args);
  }

  public async getUploadContributions(
    ...args: Parameters<typeof getUploadContributions>
  ): ReturnType<typeof getUploadContributions> {
    return this.createMethodWrapper(getUploadContributions)(...args);
  }

  public async getUploadEnrollments(
    ...args: Parameters<typeof getUploadEnrollments>
  ): ReturnType<typeof getUploadEnrollments> {
    return this.createMethodWrapper(getUploadEnrollments)(...args);
  }

  static async build(config: ApiConfig): Promise<PayrollApiClient> {
    return new PayrollApiClient(config);
  }
}

export default PayrollApiClient;
