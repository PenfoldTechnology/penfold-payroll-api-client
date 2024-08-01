import { faker } from "@faker-js/faker";
import { Readable } from "stream";
import Papa from "papaparse";

function generatePapdisRow(
  employerId: string,
  payPeriodStart: string
): Record<string, string> {
  //calculate the pay period end date assumes monthly frequency
  const payPeriodEnd = new Date(
    new Date(payPeriodStart).getFullYear(),
    new Date(payPeriodStart).getMonth() + 1,
    0
  )
    .toISOString()
    .split("T")[0];

  const title = faker.person.prefix();
  const forename1 = faker.person.firstName();
  const forename2 = faker.person.firstName();
  const surname = faker.person.lastName();
  const employeeId = faker.string.uuid().replace(/-/g, "");
  const birthDate = faker.date
    .past({ years: 50, refDate: new Date(2000, 0, 1) })
    .toISOString()
    .split("T")[0];
  const gender = faker.person.sex()[0].toUpperCase();
  const nationalInsuranceNumber = faker.helpers.replaceSymbols("??######A");
  const address1 = faker.location.streetAddress();
  const address2 = faker.location.secondaryAddress();
  const address3 = faker.location.city();
  const address4 = faker.location.county();
  const postcode = faker.location.zipCode("??# #??");
  const country = "United Kingdom";
  const emailAddress = faker.internet.email();
  const employmentStartDate = faker.date
    .past({ years: 1 })
    .toISOString()
    .split("T")[0];
  const contributionDeductionDate = new Date(
    new Date(payPeriodEnd).setDate(new Date(payPeriodEnd).getDate() + 15)
  )
    .toISOString()
    .split("T")[0];
  const payPeriodStartDate = payPeriodStart;
  const payPeriodEndDate = payPeriodEnd;
  const frequencyCode = "M1";
  const taxPeriod = faker.number.int({ min: 1, max: 12 }).toString();
  const employerContributionsAmount = faker.finance.amount({
    min: 100,
    max: 200,
    dec: 2,
  });
  const employeeContributionsAmount = faker.finance.amount({
    min: 100,
    max: 200,
    dec: 2,
  });
  const pensionableEarningsAmount = faker.finance.amount({
    min: 3000,
    max: 4000,
    dec: 2,
  });
  const employerContributionsPercent = "3";
  const employeeContributionsPercent = "5";
  const annualSalary = faker.finance.amount({ min: 25000, max: 50000, dec: 2 });

  return {
    PAPDISVersion: "PAP01",
    PensionProviderId: "",
    EmployerId: employerId,
    Group: "Employees",
    SubGroup: "",
    PayPeriodStartDate: payPeriodStartDate,
    PayPeriodEndDate: payPeriodEndDate,
    ContributionDeductionDate: contributionDeductionDate,
    FrequencyCode: frequencyCode,
    TaxPeriod: taxPeriod,
    Title: title,
    Forename1: forename1,
    Forename2: forename2,
    Surname: surname,
    EmployeeId: employeeId,
    BirthDate: birthDate,
    Gender: gender,
    NationalInsuranceNumber: nationalInsuranceNumber,
    Address1: address1,
    Address2: address2,
    Address3: address3,
    Address4: address4,
    Postcode: postcode,
    Country: country,
    EmailAddress: emailAddress,
    EmploymentStartDate: employmentStartDate,
    ExitDate: "",
    ExitReasonCode: "",
    AssessmentCode: "1",
    EventCode: "0",
    EventDate: "",
    DeferralDate: "",
    AEOptOutDate: "",
    AEOptOutReference: "",
    EnrolmentCommunicationsIssuedDate: "",
    EmployerContributionsAmount: employerContributionsAmount,
    EmployeeContributionsAmount: employeeContributionsAmount,
    AdditionalVoluntaryContributionsAmount: "0",
    AdditionalVoluntaryContributionsPercent: "",
    PensionableEarningsAmount: pensionableEarningsAmount,
    EmployerContributionsPercent: employerContributionsPercent,
    EmployeeContributionsPercent: employeeContributionsPercent,
    SalarySacrificeIndicator: "0",
    AnnualSalary: annualSalary,
  };
}

function generatePapdisFile(
  employerId: string,
  payPeriodStart: string
): Readable {
  const rows = [
    generatePapdisRow(employerId, payPeriodStart),
    generatePapdisRow(employerId, payPeriodStart),
    generatePapdisRow(employerId, payPeriodStart),
  ];

  const csvContent = Papa.unparse(rows, { header: true });

  return Readable.from(csvContent);
}

export { generatePapdisFile };
