export interface FormInputData {
  [key: string]: string;
}

export interface ILoginData {
  email: string;
  password: string;
  // healthProgramCode: string;
}

export interface IChangePasswordData {
  Email: string;
  OldPassword: string;
  NewPassword: string;
  ConfirmPassword: string;
}

export interface IForgetPasswordData {
  email: string;
}

export interface IDoctorInfoByCRM {
  crm: string;
  ufcrm: string;
}

export interface ISendLaudo {
  FileName: string;
  DocumentBody: string;
  ProgramCode: string;

  Diagnostic: {
    Cpf: string;
  };
}

export interface IActivateHeathProfessional {
  ProgramCode: string;
  Name: string;
  LicenseNumberCoren: string;
}

export interface IRescueHeathProfessional {
  ProgramCode: string;
  Name: string;
  LicenseNumberCoren: string;
}

export interface IDoctorData {
  addressPostalCode: string;
  doctorName: string;
  cpf: string;
  licenseNumber: string | number;
  licenseState: string;
  medicalSpecialty: string;
  emailAddress1: string;
  telephoneNumber: string;
  HealthProgramCode: string;
  [key: string]: string | number | undefined;
}

export interface IDoctorDataCrm {
  DoctorName: string;
  LicenseNumber: string;
  LicenseState: string;
  EmailAddress1: string;
  HealthProgramCode: string;
  MobileNumber: string;
}

export interface IOtherData {
  LicenseNumberCoren: string;
  Cpf: string;
  EmailAddress: string;
  ProgramCode: string;
  Telefone: string;
  Mobilephone: string;
  DoctorLicenseNumber: string;
  DoctorLicenseState: string;
  ProfessionalName: string;
}

export interface IUpdateDoctorData {
  LicenseNumber: string;
  LicenseState: string;
  EmailAddress: string;
  TelephoneNumber: string;
  MobileNumber: string;
  AddressCity: string;
  Name: string;
  Password: string;
  NewPassword: string;
}

export interface IInactiveDoctor {
  ProgramCode: string;
  DoctorByProgramId: string;
  InactiveType: string;
}

export interface DiagnosticData {
  typePatient: string;
  doctorId: string;
  name: string;
  birthdate: string;
  cpf: string;
  mobilephone?: string;
  telephone?: string;
  email: string;
  nameCaregiver?: string;
  birthdateCaregiver?: string;
  cpfCaregiver?: string;
  addressPostalCode: string;
  addressName: string;
  addressCity: string;
  addressState: string;
  addressNumber: string;
  addressDistrict: string;
  addressComplement?: string;
  genderId: string;
  medicalRequestAttach: {
    fileName: string;
    contentType: string;
    documentBody: string;
    fileSize: string;
    name: string;
    healthProgramCode: string;
  };
}

export interface TreatmentData {
  id: string;
  patientName: string;
  cpf: string;
  medicamentId: string;
  email: string;
  telephone: string;
  doctorName: string;
  licenseNumber: string;
  licenseState: string;
  programCode: string;
  medicalPrescriptionAttach: {
    fileName: string;
    contentType: string;
    documentBody: string;
    fileSize: string;
    fileType: string;
    annotationTypeStringMapCode: string;
    annotationTypeStringMapId: string;
    healthProgramCode: string;
    name: string;
    annotationTypeName: string;
    pendencyDescription: string;
  };
}

export interface TreatmentDataProfissional {
  id: string;
  patientName: string;
  cpf: string;
  medicamentId: string;
  email: string;
  telephone: string;
  doctorName: string;
  licenseNumber: string;
  licenseState: string;
  programCode: string;
  medicalPrescriptionAttach: {
    fileName: string;
    contentType: string;
    documentBody: string;
    fileSize: string;
    fileType: string;
    annotationTypeStringMapCode: string;
    annotationTypeStringMapId: string;
    healthProgramCode: string;
    name: string;
    annotationTypeName: string;
    pendencyDescription: string;
  };
}
