export interface FormInputData {
  [key: string]: string;
}

export interface ILoginData {
  email: string;
  password: string;
  // healthProgramCode: string;
}

export interface IForgetPasswordData {
  email: string;
  crm: string;
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
  HealthProgramCode: string;
  Name: string;
  LicenseNumber: string;
  // LicenseState: string;
}

export interface IRescueHeathProfessional {
  HealthProgramCode: string;
  Name: string;
  LicenseNumber: string;
  // LicenseState: string;
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

export interface IOtherData {
  Name: string;
  cpf: string;
  licenseNumber: string;
  EmailAddress1: string;
  Telephone1: string;
  Mobilephone1: string;
  doctorResponsableLicenseNumber: string;
  doctorResponsableLicenseState: string;
  healthProgramCode: string;
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
