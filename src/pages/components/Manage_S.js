import React, { useState, useEffect } from "react";
import {useSession} from "next-auth/react";

import {db} from "@/firebase";
import {
    collection,
    query,
    doc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    orderBy,
    where,
    deleteField,
  } from "firebase/firestore";

const subCollection = collection(db, "subject");

const Manage_S = () => {
  return (
    <div className="rounded border bg-white h-3/5 w-2/5">adsf</div>
  );
};

export default Manage_S;