import {
  addDoc,
  collection,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { firebaseDb } from "../firebase";
import moment from "moment";
import { IPost } from "./posts";
import { IUserProfile } from "./user";

/**
 * TODO: Handle comments
 */
export interface IComment {
  id?: string;
  user: string | IUserProfile;
  post: string | IPost;
  content: string;
  createdAt: any;
}

const commentRef = collection(firebaseDb, "comments");

export async function countComments(postId: string) {
  const q = query(commentRef, where("post", "==", postId));
  return getCountFromServer(q);
}

export function getAllComments(postId: string, setState: any) {
  const q = query(commentRef, where("post", "==", postId));
  const unsubscribe = onSnapshot(q, async (querySnapshot) => {
    const commentsLoaded = querySnapshot.docs
      .map(
        (doc) =>
          ({ ...doc.data(), id: doc.id, createdAt: doc.data().createdAt.toDate() } as IComment)
      )
      .sort((a, b) => moment(b.createdAt).diff(a.createdAt));

    const users = await Promise.all(
      commentsLoaded.map((comment) => getDoc(doc(firebaseDb, "users", comment.user as string)))
    );
    setState(
      commentsLoaded.map(
        (comment, idx) =>
          ({
            ...comment,
            user: users[idx].data(),
            // react: reacts[idx].data().count,
            // userReacted: userReacteds[idx],
          } as any)
      )
    );
  });
  return unsubscribe;
}

async function createComment(comment: IComment) {
  await addDoc(commentRef, comment);
}
