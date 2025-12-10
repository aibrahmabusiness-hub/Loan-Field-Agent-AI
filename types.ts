// Defines the structure of the data extracted by Gemini
// If a string field is missing, it should be null or "MISSING" in the JSON response

export interface ApplicantInformation {
  fullName: string | null;
  age: string | null;
  gender: string | null;
  mobileNumber: string | null;
  alternateNumber: string | null;
  emailId: string | null;
  currentAddress: string | null;
  permanentAddress: string | null;
  idProofType: string | null;
  idNumber: string | null;
}

export interface LoanRequirement {
  loanType: string | null;
  loanAmount: string | null;
  loanPurpose: string | null;
  urgencyLevel: string | null;
}

export interface EmploymentDetails {
  employmentType: string | null;
  companyName: string | null;
  monthlyIncome: string | null;
  incomeProofDocuments: string | null;
  workExperience: string | null;
  modeOfIncome: string | null;
}

export interface PropertyDetails {
  propertyType: string | null;
  propertyAddress: string | null;
  marketValue: string | null;
  sellerBuilderName: string | null;
  ownership: string | null;
  propertyDocumentsAvailable: string | null;
  loanCategory: string | null; // LAP or Home Loan
}

export interface BankingDetails {
  existingLoans: string | null;
  emiAmount: string | null;
  tenureRemaining: string | null;
  cibilScore: string | null;
  bankDetailsProvided: string | null;
  coApplicant: string | null;
}

export interface DocumentsStatus {
  aadhaar: string | null;
  pan: string | null;
  propertyPapers: string | null;
  bankStatements: string | null;
  incomeProof: string | null;
  photographs: string | null;
  signatures: string | null;
}

export interface LoanApplicationData {
  id?: string;
  applicationDate?: string;
  status?: 'Draft' | 'In Review' | 'Submitted';
  applicantInformation: ApplicantInformation;
  loanRequirement: LoanRequirement;
  employmentDetails: EmploymentDetails;
  propertyDetails: PropertyDetails;
  bankingDetails: BankingDetails;
  documentsStatus: DocumentsStatus;
  missingFields: string[];
  tasksToCreate: string[];
}
