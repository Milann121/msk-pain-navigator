
export interface UserProfileData {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  age: number;
  departmentId: string;
  jobType: string;
  jobProperties: string[];
  painArea: string;
  employerName?: string;
  b2bPartnerId?: number | null;
  employeeId?: string;
  painLevelInitial?: number | null;
  painLevelFollowup?: number | null;
}

export interface B2BEmployeeData {
  employerName: string;
  employeeId: string;
  state?: string;
  sourceTable?: string;
}
