export interface AuthResponse {
  accessToken: string;
  tokenType: string;
  userId: number;
  email: string;
  role: string;
}

export interface LocationResponse {
  pinCode: string;
  city: string;
  country: string;
}

export interface Incident {
  id: number;
  incidentId: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  pinCode: string;
  city: string;
  country: string;
  reportedBy: number | null;
  assignedTo: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export interface RegisterRequest {
  firstName:string
  lastName: string;
  email: string;
  mobile: string;
  password: string;
  city: string;
  address: string;
  state: string;
  country: string;
  pincode: string;
  countryCode:string,
  faxNo:string,
  phoneNo:string
}

export interface LoginRequest {
  usernameOrEmail: string; // Backend calls it 'login'
  password: string;
}

export interface UpdateIncidentRequest {
  title: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  pinCode: string;
  city: string;
  country: string;
  assignedTo?: string;
}

export interface UserResponse {
  id: number;
  firstName:string
  lastName: string;
  email: string;
  mobile: string;
  password: string;
  city: string;
  address: string;
  state: string;
  country: string;
  pincode: string;
  countryCode:string,
  faxNo:string,
  phoneNo:string
  
}


export interface User {
  id: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface AssignIncidentRequest {
  userId: number;
}