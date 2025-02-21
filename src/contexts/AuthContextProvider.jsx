import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import axiosCredentialInstance from "../axios/credentialAxios";
import auth from "../firebase/firebase.init";
import AuthContext from "./AuthContext";

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  const signUpWithEmailAndPassword = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginWithEmailAndPassword = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const updateUser = (updatedObj) => {
    return updateProfile(auth.currentUser, { ...updatedObj });
  };

  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      const fetchToken = async () => {
        if (currentUser) {
          setUser(currentUser);
          // cookie set when login
          try {
            // console.log(currentUser);
            const response = await axiosCredentialInstance.post(`jwt`, {
              userEmail: currentUser?.email,
            });
          } catch (error) {
            console.error(
              "Failed to get JWT token:",
              error.response?.data || error.message
            );
          }
        }
        setLoading(false);
      };

      fetchToken();
    });
    return () => unSubscribe();
  }, [user]);

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    signUpWithEmailAndPassword,
    loginWithEmailAndPassword,
    loginWithGoogle,
    logOut,
    updateUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
