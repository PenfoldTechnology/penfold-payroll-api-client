// This file is auto-generated by @hey-api/openapi-ts

import { client, type Options } from "@hey-api/client-fetch";
import type {
  GetEmployersError,
  GetEmployersResponse,
  PostEmployersData,
  PostEmployersError,
  PostEmployersResponse,
  PatchEmployersByEmployerIdData,
  PatchEmployersByEmployerIdError,
  PatchEmployersByEmployerIdResponse,
  GetEmployersByEmployerIdEmployeesData,
  GetEmployersByEmployerIdEmployeesError,
  GetEmployersByEmployerIdEmployeesResponse,
  PostEmployersByEmployerIdEmployeesData,
  PostEmployersByEmployerIdEmployeesError,
  PostEmployersByEmployerIdEmployeesResponse,
  PatchEmployersByEmployerIdEmployeesByEmployeeIdData,
  PatchEmployersByEmployerIdEmployeesByEmployeeIdError,
  PatchEmployersByEmployerIdEmployeesByEmployeeIdResponse,
  GetEmployersByEmployerIdEmployeesByEmployeeIdContributionsData,
  GetEmployersByEmployerIdEmployeesByEmployeeIdContributionsError,
  GetEmployersByEmployerIdEmployeesByEmployeeIdContributionsResponse,
  GetEmployersByEmployerIdContributionsData,
  GetEmployersByEmployerIdContributionsError,
  GetEmployersByEmployerIdContributionsResponse,
  PostEmployersByEmployerIdContributionsData,
  PostEmployersByEmployerIdContributionsError,
  PostEmployersByEmployerIdContributionsResponse,
  PatchEmployersByEmployerIdContributionsByContributionIdData,
  PatchEmployersByEmployerIdContributionsByContributionIdError,
  PatchEmployersByEmployerIdContributionsByContributionIdResponse,
  DeleteEmployersByEmployerIdContributionsByContributionIdData,
  DeleteEmployersByEmployerIdContributionsByContributionIdError,
  DeleteEmployersByEmployerIdContributionsByContributionIdResponse,
  PostUploadsData,
  PostUploadsError,
  PostUploadsResponse,
  GetUploadsData,
  GetUploadsError,
  GetUploadsResponse,
  GetUploadsByUploadIdData,
  GetUploadsByUploadIdError,
  GetUploadsByUploadIdResponse,
  GetUploadsByUploadIdErrorsData,
  GetUploadsByUploadIdErrorsError,
  GetUploadsByUploadIdErrorsResponse,
  GetUploadsByUploadIdContributionsData,
  GetUploadsByUploadIdContributionsError,
  GetUploadsByUploadIdContributionsResponse,
  GetUploadsByUploadIdEnrolmentsData,
  GetUploadsByUploadIdEnrolmentsError,
  GetUploadsByUploadIdEnrolmentsResponse,
} from "./types.gen";

/**
 * Retrieve a list of employers.
 */
export const getEmployers = (options?: Options) => {
  return (options?.client ?? client).get<
    GetEmployersResponse,
    GetEmployersError
  >({
    ...options,
    url: "/employers",
  });
};

/**
 * Create an employer.
 */
export const postEmployers = (options: Options<PostEmployersData>) => {
  return (options?.client ?? client).post<
    PostEmployersResponse,
    PostEmployersError
  >({
    ...options,
    url: "/employers",
  });
};

/**
 * Update an employer.
 */
export const patchEmployersByEmployerId = (
  options: Options<PatchEmployersByEmployerIdData>
) => {
  return (options?.client ?? client).patch<
    PatchEmployersByEmployerIdResponse,
    PatchEmployersByEmployerIdError
  >({
    ...options,
    url: "/employers/{employer_id}/",
  });
};

/**
 * Retrieve a list of employees for a specified employer.
 */
export const getEmployersByEmployerIdEmployees = (
  options: Options<GetEmployersByEmployerIdEmployeesData>
) => {
  return (options?.client ?? client).get<
    GetEmployersByEmployerIdEmployeesResponse,
    GetEmployersByEmployerIdEmployeesError
  >({
    ...options,
    url: "/employers/{employer_id}/employees",
  });
};

/**
 * Create a new employee for a specified employer.
 */
export const postEmployersByEmployerIdEmployees = (
  options: Options<PostEmployersByEmployerIdEmployeesData>
) => {
  return (options?.client ?? client).post<
    PostEmployersByEmployerIdEmployeesResponse,
    PostEmployersByEmployerIdEmployeesError
  >({
    ...options,
    url: "/employers/{employer_id}/employees",
  });
};

/**
 * Update an existing employee's information for a specified employer. This can be used to update the employee's details, mark them as a leaver or opt them out of the pension scheme.
 */
export const patchEmployersByEmployerIdEmployeesByEmployeeId = (
  options: Options<PatchEmployersByEmployerIdEmployeesByEmployeeIdData>
) => {
  return (options?.client ?? client).patch<
    PatchEmployersByEmployerIdEmployeesByEmployeeIdResponse,
    PatchEmployersByEmployerIdEmployeesByEmployeeIdError
  >({
    ...options,
    url: "/employers/{employer_id}/employees/{employee_id}",
  });
};

/**
 * Retrieve the contributions for a specified employee.
 */
export const getEmployersByEmployerIdEmployeesByEmployeeIdContributions = (
  options: Options<GetEmployersByEmployerIdEmployeesByEmployeeIdContributionsData>
) => {
  return (options?.client ?? client).get<
    GetEmployersByEmployerIdEmployeesByEmployeeIdContributionsResponse,
    GetEmployersByEmployerIdEmployeesByEmployeeIdContributionsError
  >({
    ...options,
    url: "/employers/{employer_id}/employees/{employee_id}/contributions",
  });
};

/**
 * Retrieve a list of contributions for a specified employer.
 */
export const getEmployersByEmployerIdContributions = (
  options: Options<GetEmployersByEmployerIdContributionsData>
) => {
  return (options?.client ?? client).get<
    GetEmployersByEmployerIdContributionsResponse,
    GetEmployersByEmployerIdContributionsError
  >({
    ...options,
    url: "/employers/{employer_id}/contributions",
  });
};

/**
 * Create multiple contributions for a specified employer in a single request.
 */
export const postEmployersByEmployerIdContributions = (
  options: Options<PostEmployersByEmployerIdContributionsData>
) => {
  return (options?.client ?? client).post<
    PostEmployersByEmployerIdContributionsResponse,
    PostEmployersByEmployerIdContributionsError
  >({
    ...options,
    url: "/employers/{employer_id}/contributions",
  });
};

/**
 * Update an existing contribution record with new information. This can only be done if the contribution is in a 'Pending' state.
 */
export const patchEmployersByEmployerIdContributionsByContributionId = (
  options: Options<PatchEmployersByEmployerIdContributionsByContributionIdData>
) => {
  return (options?.client ?? client).patch<
    PatchEmployersByEmployerIdContributionsByContributionIdResponse,
    PatchEmployersByEmployerIdContributionsByContributionIdError
  >({
    ...options,
    url: "/employers/{employer_id}/contributions/{contribution_id}",
  });
};

/**
 * Delete an existing contribution record. This can only be done if the contribution is in a 'Pending' state.
 */
export const deleteEmployersByEmployerIdContributionsByContributionId = (
  options: Options<DeleteEmployersByEmployerIdContributionsByContributionIdData>
) => {
  return (options?.client ?? client).delete<
    DeleteEmployersByEmployerIdContributionsByContributionIdResponse,
    DeleteEmployersByEmployerIdContributionsByContributionIdError
  >({
    ...options,
    url: "/employers/{employer_id}/contributions/{contribution_id}",
  });
};

/**
 * Initiate an upload.
 * Initiate an upload of a Contribution or Enrolment file. Returns a URL where the file should be sent. The employer the upload is for should be defined in the "EmployerId" column, or other known alias for non-PAPDIS files, with a value of "externalReference" from the employer record, returned on GET of an employer.
 */
export const postUploads = (options: Options<PostUploadsData>) => {
  return (options?.client ?? client).post<
    PostUploadsResponse,
    PostUploadsError
  >({
    ...options,
    url: "/uploads",
  });
};

/**
 * Retrieve all uploads.
 * Get uploads created via the Payroll API. Page size is ten and cannot be changed.
 */
export const getUploads = (options?: Options<GetUploadsData>) => {
  return (options?.client ?? client).get<GetUploadsResponse, GetUploadsError>({
    ...options,
    url: "/uploads",
  });
};

/**
 * Retrieve an upload.
 * Get the details of a file upload, including the realtime status of its processing.
 */
export const getUploadsByUploadId = (
  options: Options<GetUploadsByUploadIdData>
) => {
  return (options?.client ?? client).get<
    GetUploadsByUploadIdResponse,
    GetUploadsByUploadIdError
  >({
    ...options,
    url: "/uploads/{upload_id}",
  });
};

/**
 * Retrieve errors for an upload.
 * Get the errors of an upload. Will be an empty array unless upload status is "Error".
 */
export const getUploadsByUploadIdErrors = (
  options: Options<GetUploadsByUploadIdErrorsData>
) => {
  return (options?.client ?? client).get<
    GetUploadsByUploadIdErrorsResponse,
    GetUploadsByUploadIdErrorsError
  >({
    ...options,
    url: "/uploads/{upload_id}/errors",
  });
};

/**
 * Retrieve contributions for an upload.
 * Get the contributions created for an upload.
 */
export const getUploadsByUploadIdContributions = (
  options: Options<GetUploadsByUploadIdContributionsData>
) => {
  return (options?.client ?? client).get<
    GetUploadsByUploadIdContributionsResponse,
    GetUploadsByUploadIdContributionsError
  >({
    ...options,
    url: "/uploads/{upload_id}/contributions",
  });
};

/**
 * Retrieve enrolments for an upload.
 * Get the enrolments created for an upload, in the form of employee records.
 */
export const getUploadsByUploadIdEnrolments = (
  options: Options<GetUploadsByUploadIdEnrolmentsData>
) => {
  return (options?.client ?? client).get<
    GetUploadsByUploadIdEnrolmentsResponse,
    GetUploadsByUploadIdEnrolmentsError
  >({
    ...options,
    url: "/uploads/{upload_id}/enrolments",
  });
};
