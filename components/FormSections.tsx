import React, { useState } from 'react';
import { LoanApplicationData } from '../types';
import { 
  User, Banknote, Briefcase, Home, 
  CreditCard, FileText, Edit2, Check, CheckSquare, X
} from 'lucide-react';

interface SectionProps {
  data: LoanApplicationData;
  onUpdate: (section: keyof LoanApplicationData, field: string, value: string) => void;
}

const EditableFieldRow: React.FC<{ 
  label: string; 
  value: string | null; 
  isEditing: boolean;
  onChange: (val: string) => void;
}> = ({ label, value, isEditing, onChange }) => {
  const isMissing = !value || value === 'MISSING';
  
  if (isEditing) {
    return (
      <div className="py-2 border-b border-slate-100 last:border-0">
        <label className="text-xs font-semibold text-slate-500 mb-1 block">{label}</label>
        <input 
          type="text" 
          className={`w-full text-sm p-2 rounded border ${isMissing ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'} focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
          value={value === 'MISSING' ? '' : value || ''}
          placeholder={isMissing ? "Enter details..." : ""}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center py-3 border-b border-slate-100 last:border-0 group">
      <span className="text-sm font-medium text-slate-500">{label}</span>
      <span className={`text-sm font-semibold px-2 py-1 rounded text-right max-w-[60%] truncate ${
        isMissing 
          ? 'text-red-600 bg-red-50 border border-red-100' 
          : 'text-slate-900'
      }`}>
        {isMissing ? 'Required' : value}
      </span>
    </div>
  );
};

const Card: React.FC<{ 
  title: string; 
  icon?: React.ReactNode; 
  children: React.ReactNode;
  onToggleEdit?: () => void;
  isEditing?: boolean;
}> = ({ title, icon, children, onToggleEdit, isEditing }) => (
  <div className={`bg-white rounded-xl shadow-sm border ${isEditing ? 'border-blue-300 ring-1 ring-blue-100' : 'border-slate-200'} overflow-hidden mb-4 transition-all`}>
    <div className="bg-slate-50/50 px-4 py-3 border-b border-slate-100 flex items-center justify-between">
      <div className="flex items-center gap-2">
        {icon && <div className="text-blue-600">{icon}</div>}
        <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide">{title}</h3>
      </div>
      {onToggleEdit && (
        <button 
          onClick={onToggleEdit}
          className={`p-1.5 rounded-lg transition-colors flex items-center gap-1 text-xs font-bold ${
            isEditing 
              ? 'bg-blue-100 text-blue-700' 
              : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'
          }`}
        >
          {isEditing ? <><Check size={14} /> Done</> : <><Edit2 size={14} /> Edit</>}
        </button>
      )}
    </div>
    <div className="p-4">
      {children}
    </div>
  </div>
);

// STAGE 1: BASIC INTAKE (Applicant + Loan Request)
export const StageOneView: React.FC<SectionProps> = ({ data, onUpdate }) => {
  const [editingSection, setEditingSection] = useState<string | null>(null);

  const toggleEdit = (section: string) => {
    setEditingSection(prev => prev === section ? null : section);
  };

  const update = (section: keyof LoanApplicationData) => (field: string) => (val: string) => {
    onUpdate(section, field, val);
  };

  return (
    <div className="animate-fade-in space-y-2">
      <Card 
        title="Applicant Details" 
        icon={<User size={18} />} 
        isEditing={editingSection === 'applicant'}
        onToggleEdit={() => toggleEdit('applicant')}
      >
        <EditableFieldRow 
          label="Full Name" 
          value={data.applicantInformation.fullName} 
          isEditing={editingSection === 'applicant'}
          onChange={update('applicantInformation')('fullName')}
        />
        <EditableFieldRow 
          label="Age / DOB" 
          value={data.applicantInformation.age} 
          isEditing={editingSection === 'applicant'}
          onChange={update('applicantInformation')('age')}
        />
        <EditableFieldRow 
          label="Gender" 
          value={data.applicantInformation.gender} 
          isEditing={editingSection === 'applicant'}
          onChange={update('applicantInformation')('gender')}
        />
        <EditableFieldRow 
          label="Mobile Number" 
          value={data.applicantInformation.mobileNumber} 
          isEditing={editingSection === 'applicant'}
          onChange={update('applicantInformation')('mobileNumber')}
        />
        <EditableFieldRow 
          label="Alternate Number" 
          value={data.applicantInformation.alternateNumber} 
          isEditing={editingSection === 'applicant'}
          onChange={update('applicantInformation')('alternateNumber')}
        />
        <EditableFieldRow 
          label="Email ID" 
          value={data.applicantInformation.emailId} 
          isEditing={editingSection === 'applicant'}
          onChange={update('applicantInformation')('emailId')}
        />
        <EditableFieldRow 
          label="Current Address" 
          value={data.applicantInformation.currentAddress} 
          isEditing={editingSection === 'applicant'}
          onChange={update('applicantInformation')('currentAddress')}
        />
        <EditableFieldRow 
          label="Permanent Address" 
          value={data.applicantInformation.permanentAddress} 
          isEditing={editingSection === 'applicant'}
          onChange={update('applicantInformation')('permanentAddress')}
        />
        <EditableFieldRow 
          label="ID Proof Type" 
          value={data.applicantInformation.idProofType} 
          isEditing={editingSection === 'applicant'}
          onChange={update('applicantInformation')('idProofType')}
        />
        <EditableFieldRow 
          label="ID Number" 
          value={data.applicantInformation.idNumber} 
          isEditing={editingSection === 'applicant'}
          onChange={update('applicantInformation')('idNumber')}
        />
      </Card>

      <Card 
        title="Loan Requirement" 
        icon={<Banknote size={18} />}
        isEditing={editingSection === 'loan'}
        onToggleEdit={() => toggleEdit('loan')}
      >
        <EditableFieldRow 
          label="Loan Type" 
          value={data.loanRequirement.loanType} 
          isEditing={editingSection === 'loan'}
          onChange={update('loanRequirement')('loanType')}
        />
        <EditableFieldRow 
          label="Loan Amount" 
          value={data.loanRequirement.loanAmount} 
          isEditing={editingSection === 'loan'}
          onChange={update('loanRequirement')('loanAmount')}
        />
        <EditableFieldRow 
          label="Loan Purpose" 
          value={data.loanRequirement.loanPurpose} 
          isEditing={editingSection === 'loan'}
          onChange={update('loanRequirement')('loanPurpose')}
        />
        <EditableFieldRow 
          label="Urgency Level" 
          value={data.loanRequirement.urgencyLevel} 
          isEditing={editingSection === 'loan'}
          onChange={update('loanRequirement')('urgencyLevel')}
        />
      </Card>
    </div>
  );
};

// STAGE 2: ASSESSMENT (Employment + Property + Banking + Documents)
export const StageTwoView: React.FC<SectionProps> = ({ data, onUpdate }) => {
  const [editingSection, setEditingSection] = useState<string | null>(null);

  const toggleEdit = (section: string) => {
    setEditingSection(prev => prev === section ? null : section);
  };

  const update = (section: keyof LoanApplicationData) => (field: string) => (val: string) => {
    onUpdate(section, field, val);
  };

  return (
    <div className="animate-fade-in space-y-2">
      
      {/* 1. EMPLOYMENT */}
      <Card 
        title="Employment & Income" 
        icon={<Briefcase size={18} />}
        isEditing={editingSection === 'employment'}
        onToggleEdit={() => toggleEdit('employment')}
      >
        <EditableFieldRow 
          label="Employment Type" 
          value={data.employmentDetails.employmentType} 
          isEditing={editingSection === 'employment'}
          onChange={update('employmentDetails')('employmentType')}
        />
        <EditableFieldRow 
          label="Company Name" 
          value={data.employmentDetails.companyName} 
          isEditing={editingSection === 'employment'}
          onChange={update('employmentDetails')('companyName')}
        />
        <EditableFieldRow 
          label="Monthly Income" 
          value={data.employmentDetails.monthlyIncome} 
          isEditing={editingSection === 'employment'}
          onChange={update('employmentDetails')('monthlyIncome')}
        />
        <EditableFieldRow 
          label="Income Proof" 
          value={data.employmentDetails.incomeProofDocuments} 
          isEditing={editingSection === 'employment'}
          onChange={update('employmentDetails')('incomeProofDocuments')}
        />
        <EditableFieldRow 
          label="Work Experience" 
          value={data.employmentDetails.workExperience} 
          isEditing={editingSection === 'employment'}
          onChange={update('employmentDetails')('workExperience')}
        />
        <EditableFieldRow 
          label="Mode of Income" 
          value={data.employmentDetails.modeOfIncome} 
          isEditing={editingSection === 'employment'}
          onChange={update('employmentDetails')('modeOfIncome')}
        />
      </Card>

      {/* 2. PROPERTY */}
      <Card 
        title="Property Details" 
        icon={<Home size={18} />}
        isEditing={editingSection === 'property'}
        onToggleEdit={() => toggleEdit('property')}
      >
        <EditableFieldRow 
          label="Property Type" 
          value={data.propertyDetails.propertyType} 
          isEditing={editingSection === 'property'}
          onChange={update('propertyDetails')('propertyType')}
        />
        <EditableFieldRow 
          label="Address" 
          value={data.propertyDetails.propertyAddress} 
          isEditing={editingSection === 'property'}
          onChange={update('propertyDetails')('propertyAddress')}
        />
        <EditableFieldRow 
          label="Market Value" 
          value={data.propertyDetails.marketValue} 
          isEditing={editingSection === 'property'}
          onChange={update('propertyDetails')('marketValue')}
        />
        <EditableFieldRow 
          label="Seller/Builder" 
          value={data.propertyDetails.sellerBuilderName} 
          isEditing={editingSection === 'property'}
          onChange={update('propertyDetails')('sellerBuilderName')}
        />
        <EditableFieldRow 
          label="Ownership" 
          value={data.propertyDetails.ownership} 
          isEditing={editingSection === 'property'}
          onChange={update('propertyDetails')('ownership')}
        />
        <EditableFieldRow 
          label="Documents Available" 
          value={data.propertyDetails.propertyDocumentsAvailable} 
          isEditing={editingSection === 'property'}
          onChange={update('propertyDetails')('propertyDocumentsAvailable')}
        />
        <EditableFieldRow 
          label="Loan Category" 
          value={data.propertyDetails.loanCategory} 
          isEditing={editingSection === 'property'}
          onChange={update('propertyDetails')('loanCategory')}
        />
      </Card>

      {/* 3. BANKING */}
      <Card 
        title="Banking & Obligations" 
        icon={<CreditCard size={18} />}
        isEditing={editingSection === 'banking'}
        onToggleEdit={() => toggleEdit('banking')}
      >
        <EditableFieldRow 
          label="Existing Loans" 
          value={data.bankingDetails.existingLoans} 
          isEditing={editingSection === 'banking'}
          onChange={update('bankingDetails')('existingLoans')}
        />
        <EditableFieldRow 
          label="EMI Amount" 
          value={data.bankingDetails.emiAmount} 
          isEditing={editingSection === 'banking'}
          onChange={update('bankingDetails')('emiAmount')}
        />
        <EditableFieldRow 
          label="Tenure Remaining" 
          value={data.bankingDetails.tenureRemaining} 
          isEditing={editingSection === 'banking'}
          onChange={update('bankingDetails')('tenureRemaining')}
        />
        <EditableFieldRow 
          label="CIBIL Score" 
          value={data.bankingDetails.cibilScore} 
          isEditing={editingSection === 'banking'}
          onChange={update('bankingDetails')('cibilScore')}
        />
        <EditableFieldRow 
          label="Bank Details" 
          value={data.bankingDetails.bankDetailsProvided} 
          isEditing={editingSection === 'banking'}
          onChange={update('bankingDetails')('bankDetailsProvided')}
        />
        <EditableFieldRow 
          label="Co-applicant" 
          value={data.bankingDetails.coApplicant} 
          isEditing={editingSection === 'banking'}
          onChange={update('bankingDetails')('coApplicant')}
        />
      </Card>

      {/* 4. DOCUMENTS CHECKLIST */}
      <Card 
        title="Documents Checklist" 
        icon={<FileText size={18} />}
        isEditing={editingSection === 'docs'}
        onToggleEdit={() => toggleEdit('docs')}
      >
        <EditableFieldRow 
          label="Aadhaar" 
          value={data.documentsStatus.aadhaar} 
          isEditing={editingSection === 'docs'}
          onChange={update('documentsStatus')('aadhaar')}
        />
        <EditableFieldRow 
          label="PAN Card" 
          value={data.documentsStatus.pan} 
          isEditing={editingSection === 'docs'}
          onChange={update('documentsStatus')('pan')}
        />
        <EditableFieldRow 
          label="Property Papers" 
          value={data.documentsStatus.propertyPapers} 
          isEditing={editingSection === 'docs'}
          onChange={update('documentsStatus')('propertyPapers')}
        />
        <EditableFieldRow 
          label="Bank Statements" 
          value={data.documentsStatus.bankStatements} 
          isEditing={editingSection === 'docs'}
          onChange={update('documentsStatus')('bankStatements')}
        />
        <EditableFieldRow 
          label="Income Proof" 
          value={data.documentsStatus.incomeProof} 
          isEditing={editingSection === 'docs'}
          onChange={update('documentsStatus')('incomeProof')}
        />
        <EditableFieldRow 
          label="Photos" 
          value={data.documentsStatus.photographs} 
          isEditing={editingSection === 'docs'}
          onChange={update('documentsStatus')('photographs')}
        />
        <EditableFieldRow 
          label="Signature" 
          value={data.documentsStatus.signatures} 
          isEditing={editingSection === 'docs'}
          onChange={update('documentsStatus')('signatures')}
        />
      </Card>

      {/* TASKS */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-4">
        <div className="flex items-center gap-2 mb-3 text-slate-800">
          <CheckSquare size={18} className="text-blue-600" />
          <h3 className="font-bold text-sm uppercase">Tasks & Actions</h3>
        </div>
        {data.tasksToCreate && data.tasksToCreate.length > 0 ? (
          <div className="space-y-2">
            {data.tasksToCreate.map((task, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                <input type="checkbox" className="mt-1 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                <span className="text-slate-700 text-sm font-medium leading-tight">{task}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-400 italic">No specific tasks generated.</p>
        )}
      </div>
    </div>
  );
};