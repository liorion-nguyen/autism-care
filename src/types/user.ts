import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { firebaseDb } from "../firebase";

export enum EGender {
  M,
  F,
}

export enum EUserRole {
  Doctor,
  Member,
}
export interface IUserProfile {
  phone: string;
  password: string;
  birthday: string;
  fullname: string;
  gender: EGender;
  email: string;
  role: EUserRole;
  avatarUrl?: string;
  avatarName?: string;

  // For Doctor
  degree?: string;
  position?: string;
  intro?: string[];
  expertises?: string[];
  services?: string[];
}

const userRef = collection(firebaseDb, "users");

export async function getDoctors() {
  const q = query(userRef, where("role", "==", EUserRole.Doctor));
  const querySnapshot = await getDocs(q);
  const doctors = querySnapshot.docs.map((doc) => doc.data() as IUserProfile);
  return doctors;
}
