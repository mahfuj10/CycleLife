import { useEffect, useState } from 'react';
import firebaseInitalize from '../Firebase/Firebaseinitalize';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, createUserWithEmailAndPassword, signOut, updateProfile, signInWithEmailAndPassword } from "firebase/auth";

firebaseInitalize();

const useFirebase = () => {



    const [user, setUser] = useState({});
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [admin, setAdmin] = useState(false);

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();


    // register new user

    const registerUser = (email, password, name, history, location) => {

        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)

            .then((userCredential) => {
                setError('');
                const newUser = { email, displayName: name };
                setUser(newUser);
                saveUser(email, name, 'POST');
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then((user) => {
                    setSuccess("Your account create successfully");
                    const destination = location?.state?.from || '/';
                    history.replace(destination);
                }).catch((error) => {
                });
            })
            .catch((error) => {
                setSuccess("");
                setError(error.message);

            })
            .finally(() => setIsLoading(false));
    }

    // login user
    const loginUser = (email, password, location, history) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const destination = location?.state?.from || '/';
                history.replace(destination);
                setSuccess("Your login successfully");
                setError('');
            })
            .catch((error) => {
                setError(error.message);
                setSuccess("");
            })
            .finally(() => setIsLoading(false));
    }


    // sign with google
    const handaleGoogleSign = (location, history) => {

        setIsLoading(true);
        signInWithPopup(auth, googleProvider)
            .then(result => {
                setUser(result.user);
                const user = result.user;
                saveUser(user.email, user.displayName, 'PUT');
                const destination = location?.state?.from || '/';
                setSuccess("Your login successfully");
                history?.replace(destination);
            })
            .catch((error) => {
                setError(error.message);
                setSuccess("");;
            })
            .finally(() => setIsLoading(false));
    }


    useEffect(() => {
        setIsLoading(true);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            } else {
                setUser({})
            }
            setIsLoading(false);
        })
    }, [auth]);


    // log out method

    const handaleLogOut = () => {
        setIsLoading(true);
        signOut(auth)
            .then(() => {
                setUser({});
                setError("");
                setSuccess("");
            })
            .catch(error => setError(error.message))
            .finally(() => setIsLoading(false));
    }


    // save user on database 
    const saveUser = (email, displayName, method) => {
        const user = { email, displayName };
        fetch('     https://cyclelifeexclusive-backend-production.up.railway.app/users', {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then()
    };

    // get web admin
    useEffect(() => {
        fetch(`     https://cyclelifeexclusive-backend-production.up.railway.app/users/${user?.email}`)
            .then(res => res.json())
            .then(data => setAdmin(data.Admin))
    }, [user?.email])









    return {
        handaleGoogleSign,
        user,
        loginUser,
        error,
        admin,
        isLoading,
        registerUser,
        handaleLogOut,
        success
    }
};

export default useFirebase;