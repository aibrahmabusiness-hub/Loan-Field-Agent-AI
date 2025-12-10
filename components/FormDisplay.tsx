import React from 'react';
import { LoanApplicationData } from '../types';
import { 
  User, 
  Banknote, 
  Briefcase, 
  Home, 
  CreditCard, 
  FileText, 
  AlertTriangle, 
  CheckSquare 
} from 'lucide-react';

interface Props {
  data: LoanApplicationData;
}

const FieldRow: React.FC<{ label: string; value: string | null }> = ({ label, value }) => {
  const isMissing = !value || value === 'MISSING';
  
  return (
    <div className="flex justify-between items-start py-2 border-b border-gray-100 last:border-0">
      <span className="text-gray-600 font-medium text-sm flex-1">{label}</span>
      <span className={`text-sm flex-1 text-right font-semibold ${isMissing ? 'text-red-600 bg-red-50 px-2 py-0.5 rounded' : 'text-gray-800'}`}>
        {isMissing ? 'Missing' : value}
      </span>
    </div>
  );
};

const SectionCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-4 overflow-hidden">
    <div className="bg-slate-50 px-4 py-3 border-b border-gray-200 flex items-center gap-2">
      <div className="text-blue-600">{icon}</div>
      <h3 className="font-bold text-gray-800">{title}</h3>
    </div>
    <div className="p-4">
      {children}
    </div>
  </div>
);

export const FormDisplay: React.FC<Props> = ({ data }) => {
  return (
    <div className="space-y-6 pb-20">
      
      {/* 1. Applicant Information */}
      <SectionCard title="Applicant Information" icon={<User size={18} />}>
        <FieldRow label="Full Name" value={data.applicantInformation.fullName} />
        <FieldRow label="Age" value={data.applicantInformation.age} />
        <FieldRow label="Gender" value={data.applicantInformation.gender} />
        <FieldRow label="Mobile Number" value={data.applicantInformation.mobileNumber} />
        <FieldRow label="Alternate Number" value={data.applicantInformation.alternateNumber} />
        <FieldRow label="Email ID" value={data.applicantInformation.emailId} />
        <FieldRow label="Current Address" value={data.applicantInformation.currentAddress} />
        <FieldRow label="Permanent Address" value={data.applicantInformation.permanentAddress} />
        <FieldRow label="ID Proof Type" value={data.applicantInformation.idProofType} />
        <FieldRow label="ID Number" value={data.applicantInformation.idNumber} />
      </SectionCard>

      {/* 2. Loan Requirement */}
      <SectionCard title="Loan Requirement" icon={<Banknote size={18} />}>
        <FieldRow label="Loan Type" value={data.loanRequirement.loanType} />
        <FieldRow label="Loan Amount" value={data.loanRequirement.loanAmount} />
        <FieldRow label="Loan Purpose" value={data.loanRequirement.loanPurpose} />
        <FieldRow label="Urgency Level" value={data.loanRequirement.urgencyLevel} />
      </SectionCard>

      {/* 3. Employment / Income Details */}
      <SectionCard title="Employment / Income" icon={<Briefcase size={18} />}>
        <FieldRow label="Employment Type" value={data.employmentDetails.employmentType} />
        <FieldRow label="Company Name" value={data.employmentDetails.companyName} />
        <FieldRow label="Monthly Income" value={data.employmentDetails.monthlyIncome} />
        <FieldRow label="Income Proof" value={data.employmentDetails.incomeProofDocuments} />
        <FieldRow label="Work Experience" value={data.employmentDetails.workExperience} />
        <FieldRow label="Mode of Income" value={data.employmentDetails.modeOfIncome} />
      </SectionCard>

      {/* 4. Property Details */}
      <SectionCard title="Property Details" icon={<Home size={18} />}>
        <FieldRow label="Property Type" value={data.propertyDetails.propertyType} />
        <FieldRow label="Address" value={data.propertyDetails.propertyAddress} />
        <FieldRow label="Market Value" value={data.propertyDetails.marketValue} />
        <FieldRow label="Seller/Builder" value={data.propertyDetails.sellerBuilderName} />
        <FieldRow label="Ownership" value={data.propertyDetails.ownership} />
        <FieldRow label="Documents Available" value={data.propertyDetails.propertyDocumentsAvailable} />
        <FieldRow label="Loan Category" value={data.propertyDetails.loanCategory} />
      </SectionCard>

      {/* 5. Banking & Financial */}
      <SectionCard title="Banking & Financial" icon={<CreditCard size={18} />}>
        <FieldRow label="Existing Loans" value={data.bankingDetails.existingLoans} />
        <FieldRow label="EMI Amount" value={data.bankingDetails.emiAmount} />
        <FieldRow label="Tenure Remaining" value={data.bankingDetails.tenureRemaining} />
        <FieldRow label="CIBIL Score" value={data.bankingDetails.cibilScore} />
        <FieldRow label="Bank Details" value={data.bankingDetails.bankDetailsProvided} />
        <FieldRow label="Co-applicant" value={data.bankingDetails.coApplicant} />
      </SectionCard>

      {/* 6. Documents Status */}
      <SectionCard title="Documents Status" icon={<FileText size={18} />}>
        <FieldRow label="Aadhaar" value={data.documentsStatus.aadhaar} />
        <FieldRow label="PAN" value={data.documentsStatus.pan} />
        <FieldRow label="Property Papers" value={data.documentsStatus.propertyPapers} />
        <FieldRow label="Bank Statements" value={data.documentsStatus.bankStatements} />
        <FieldRow label="Income Proof" value={data.documentsStatus.incomeProof} />
        <FieldRow label="Photographs" value={data.documentsStatus.photographs} />
        <FieldRow label="Signatures" value={data.documentsStatus.signatures} />
      </SectionCard>

      {/* Missing Information Summary */}
      {data.missingFields && data.missingFields.length > 0 && (
        <div className="bg-red-50 rounded-xl shadow-sm border border-red-200 p-4">
          <div className="flex items-center gap-2 mb-3 text-red-700">
            <AlertTriangle size={20} />
            <h3 className="font-bold">Missing Information Summary</h3>
          </div>
          <ul className="list-disc pl-5 space-y-1">
            {data.missingFields.map((field, idx) => (
              <li key={idx} className="text-red-600 text-sm">
                Missing: <span className="font-medium">{field}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tasks to Create */}
      {data.tasksToCreate && data.tasksToCreate.length > 0 && (
        <div className="bg-emerald-50 rounded-xl shadow-sm border border-emerald-200 p-4">
          <div className="flex items-center gap-2 mb-3 text-emerald-700">
            <CheckSquare size={20} />
            <h3 className="font-bold">Tasks to Create</h3>
          </div>
          <div className="space-y-2">
            {data.tasksToCreate.map((task, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-white p-2 rounded border border-emerald-100 shadow-sm">
                <input type="checkbox" className="mt-1 h-4 w-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500" />
                <span className="text-gray-800 text-sm font-medium">{task}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
