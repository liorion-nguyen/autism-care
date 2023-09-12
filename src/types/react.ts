/**
 * TODO: Handle react
 */

import {
  and,
  collection,
  getCountFromServer,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import { IPost } from "./posts";
import { IUserProfile } from "./user";
import { firebaseDb } from "../firebase";

const reactRef = collection(firebaseDb, "reacts");

export interface IReact {
  user: string | IUserProfile;
  post: string | IPost;
}

export async function countReact(postId: string) {
  const q = query(reactRef, where("postId", "==", postId));
  return getCountFromServer(q);
}

export async function isReact(userId: string, postId: string) {
  const q = query(reactRef, and(where("userId", "==", userId), where("postId", "==", postId)));
  const querySnapshot = await getDocs(q);

  return !!querySnapshot.size;
}

export async function onReact(userId: string, postId: string) {
  const q = query(reactRef, and(where("userId", "==", userId), where("postId", "==", postId)));
  const querySnapshot = await getDocs(q);
  
  if (querySnapshot.size) {
    const id = querySnapshot.docs[0].id;
    await deleteDoc(doc(firebaseDb, "reacts", id));
  } else {
    await addDoc(reactRef, { userId, postId });
  }
}
