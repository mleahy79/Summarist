"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInAnonymously,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { RootState } from "@/redux/store";
import { closeModal } from "@/redux/slices/modalSlice";

export default function AuthModal() {
  const dispatch = useDispatch();
  const router = useRouter();
  const isOpen = useSelector((state: RootState) => state.modal.isOpen);
  const initialMode = useSelector((state: RootState) => state.modal.initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLogIn, setIsLogIn] = useState(initialMode === 'login');
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsLogIn(initialMode === 'login');
      setForgotPassword(false);
      setEmail("");
      setPassword("");
      setError("");
      setResetSent(false);
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  function resetForm() {
    setEmail("");
    setPassword("");
    setError("");
    setResetSent(false);
  }

  function switchMode(login: boolean) {
    setIsLogIn(login);
    setForgotPassword(false);
    resetForm();
  }

  async function handleGoogleSignIn() {
    try {
      await signInWithPopup(auth, googleProvider);
      dispatch(closeModal());
      router.push("/for-you");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Google sign-in failed");
    }
  }

  async function handleGuestSignIn() {
    try {
      await signInAnonymously(auth);
      dispatch(closeModal());
      router.push("/for-you");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Guest sign-in failed");
    }
  }

  async function handleEmailAuth() {
    setError("");
    try {
      if (isLogIn) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      dispatch(closeModal());
      router.push("/for-you");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    }
  }

  async function handleForgotPassword() {
    setError("");
    if (!email) {
      setError("Enter your email address above first.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to send reset email");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 relative">
        <button
          onClick={() => dispatch(closeModal())}
          className="absolute top-4 right-4 font-bold text-2xl text-red-900 cursor-pointer"
        >
          ✕
        </button>

        <h2 className="text-2xl text-gray-950 font-bold text-center mb-6">
          {forgotPassword
            ? "Reset your password"
            : isLogIn
            ? "Log in to Summarist"
            : "Sign up to Summarist"}
        </h2>

        {!forgotPassword && (
          <>
            <button
              onClick={handleGuestSignIn}
              className="w-full flex items-center bg-[#1f4574] rounded overflow-hidden hover:bg-[#173659] cursor-pointer transition-colors mb-4"
            >
              <svg viewBox="0 0 24 24" className="w-7 h-7 ml-2" fill="white">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
              <span className="flex-1 text-center text-white font-medium py-2">
                {isLogIn ? "Login as a Guest" : "Continue as Guest"}
              </span>
            </button>

            <div className="flex items-center gap-2 my-3">
              <hr className="flex-1 border-gray-300" />
              <span className="text-gray-400 text-sm">or</span>
              <hr className="flex-1 border-gray-300" />
            </div>

            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center bg-[#4285F4] rounded overflow-hidden hover:bg-[#357ae8] cursor-pointer transition-colors mb-4"
            >
              <div className="bg-white p-2 m-1 rounded flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              </div>
              <span className="flex-1 text-center text-white font-medium py-2">
                {isLogIn ? "Login with Google" : "Sign up with Google"}
              </span>
            </button>

            <div className="flex items-center gap-2 my-3">
              <hr className="flex-1 border-gray-300" />
              <span className="text-gray-400 text-sm">or</span>
              <hr className="flex-1 border-gray-300" />
            </div>
          </>
        )}

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded mb-3 text-gray-700"
        />

        {!forgotPassword && (
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded mb-3 text-gray-700"
          />
        )}

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        {resetSent && (
          <p className="text-green-600 text-sm mb-3">
            Password reset email sent — check your inbox.
          </p>
        )}

        {forgotPassword ? (
          <>
            <button
              onClick={handleForgotPassword}
              className="w-full bg-[#2bd97c] text-white p-2 rounded mb-3 cursor-pointer hover:bg-[#20c46e] transition-colors"
            >
              Send reset email
            </button>
            <button
              onClick={() => { setForgotPassword(false); resetForm(); }}
              className="w-full text-center text-sm text-[#2bd97c] hover:underline cursor-pointer"
            >
              Back to login
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleEmailAuth}
              className="w-full bg-[#2bd97c] text-white p-2 rounded mb-3 cursor-pointer hover:bg-[#20c46e] transition-colors"
            >
              {isLogIn ? "Login" : "Sign Up"}
            </button>

            {isLogIn && (
              <button
                onClick={() => setForgotPassword(true)}
                className="w-full text-center text-sm text-[#2bd97c] hover:underline cursor-pointer mb-3"
              >
                Forgot your password?
              </button>
            )}

            <p className="text-center text-sm text-gray-500">
              {isLogIn ? "Not a member yet?" : "Already a member?"}{" "}
              <button
                onClick={() => switchMode(!isLogIn)}
                className="text-[#2bd97c] font-semibold hover:underline cursor-pointer"
              >
                {isLogIn ? "Sign up" : "Log in"}
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
