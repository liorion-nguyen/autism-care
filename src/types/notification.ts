import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { firebaseDb } from "../firebase";
import { IUserProfile } from "./user";
import moment from "moment";

export interface INotification {
  id?: string;
  fromUser: string | IUserProfile;
  toUser: string | IUserProfile;
  content: string;
  createdAt: any;
}

const notiRef = collection(firebaseDb, "notifications");

export function getAllNoti(user: string, setState: any) {
  const q = query(notiRef, where("toUser", "==", user));

  const unsubscribe = onSnapshot(q, async (querySnapshot) => {
    // Get post and sort base on createdAt
    const notiLoaded = querySnapshot.docs
      .map((doc) => ({ ...doc.data(), id: doc.id } as INotification))
      .sort((a, b) => moment(b.createdAt.toDate()).diff(a.createdAt.toDate()));
    // Attach User Information
    const fromUsers = await Promise.all(
      notiLoaded.map((noti) => getDoc(doc(firebaseDb, "users", noti.fromUser as string)))
    );
    setState(
      notiLoaded.map(
        (noti, idx) =>
          ({
            ...noti,
            fromUser: fromUsers[idx].data(),
          } as INotification)
      )
    );
  });
  return unsubscribe;
}

export async function createNoti(noti: INotification) {
  await addDoc(notiRef, noti);
}
