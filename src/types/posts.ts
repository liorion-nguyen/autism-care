import { QueryConstraint, collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { IUserProfile } from "./user";
import { firebaseDb } from "../firebase";
import moment from "moment";
import { countReact, isReact } from "./react";
import { countComments } from "./comments";

export interface IPost {
  id?: string;
  user:
    | {
        phone: string;
      }
    | IUserProfile;
  content: string;
  imageUrl?: string;
  createdAt: any;
  react?: number;
  ncomments?: number;
  userReacted?: boolean;
}

export async function getPosts(userId: string, ...filters: QueryConstraint[]) {
  const postRef = collection(firebaseDb, "posts");
  const q = query(postRef, ...filters);
  const querySnapshot = await getDocs(q);

  // Get post and sort base on createdAt
  const postsLoaded = querySnapshot.docs
    .map((doc) => ({ ...doc.data(), id: doc.id } as IPost))
    .sort((a, b) => moment(b.createdAt.toDate()).diff(a.createdAt.toDate()));

  // Attach User Information
  const users = await Promise.all(
    postsLoaded.map((post) => getDoc(doc(firebaseDb, "users", post.user.phone)))
  );
  const reacts = await Promise.all(postsLoaded.map((post) => countReact(post.id!)));
  const ncomments = await Promise.all(postsLoaded.map((post) => countComments(post.id!)));
  const userReacteds = await Promise.all(postsLoaded.map((post) => isReact(userId, post.id!)));
  return postsLoaded.map(
    (post, idx) =>
      ({
        ...post,
        user: users[idx].data(),
        react: reacts[idx].data().count,
        userReacted: userReacteds[idx],
        ncomments: ncomments[idx].data().count,
      } as any)
  );
}
