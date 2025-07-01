
export interface UserProfileData {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  age: number;
  job: string;
  jobSubtype: string;
  painArea: string;
  employerName?: string;
}

export interface B2BEmployeeData {
  employerName: string;
  employeeId: string;
  state?: string;
}
