import React, { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "./SupabaseClient";

export default function Authgate({ mode = "full" }) {
  const [user, setUser] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isReady, setIsReady] = useState(Boolean(supabase));
  const [email, setEmail] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [statusTone, setStatusTone] = useState("info");
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const popupRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (!supabase) return;
    let isMounted = true;

    const initSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!isMounted) return;
      const nextUser = data?.session?.user ?? null;
      setUser(nextUser);
      if (nextUser) {
        setStatusMessage("");
        setStatusTone("info");
        setShowLoginPopup(false);
      }
    };

    initSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) return;
      const nextUser = session?.user ?? null;
      setUser(nextUser);
      if (nextUser) {
        setStatusMessage("");
        setStatusTone("info");
        setShowLoginPopup(false);
      }
    });

    return () => {
      isMounted = false;
      listener?.subscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!showLoginPopup) return;

    const onPointerDown = (event) => {
      if (popupRef.current?.contains(event.target)) return;
      if (triggerRef.current?.contains(event.target)) return;
      setShowLoginPopup(false);
    };

    const onKeyDown = (event) => {
      if (event.key === "Escape") setShowLoginPopup(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [showLoginPopup]);

  const handleLogin = async (event) => {
    event?.preventDefault();
    if (!supabase) return;
    const trimmedEmail = email.trim();
    if (!trimmedEmail) return;
    setStatusMessage("");

    setIsSending(true);
    const { error } = await supabase.auth.signInWithOtp({
      email: trimmedEmail,
      options: { emailRedirectTo: window.location.origin },
    });
    setIsSending(false);

    if (error) {
      setStatusTone("error");
      setStatusMessage(`Login failed: ${error.message}`);
      return;
    }

    setStatusTone("success");
    setStatusMessage(`Check your email for ${trimmedEmail}.`);
  };

  const handleLogout = async () => {
    if (!supabase) return;
    setStatusMessage("");
    setIsSigningOut(true);
    const { error } = await supabase.auth.signOut();
    setIsSigningOut(false);

    if (error) {
      setStatusTone("error");
      setStatusMessage(`Logout failed: ${error.message}`);
    }
  };

  const statusTooltip = statusMessage ? (
    <span className={`authgate-tooltip authgate-tooltip-${statusTone}`}>{statusMessage}</span>
  ) : null;
  const isLinkSent = statusTone === "success" && statusMessage;
  const userEmailLabel = useMemo(() => user?.email ?? "", [user?.email]);

  const loginPopup = isReady && !user?.email && showLoginPopup ? (
    <div className="auth-popup" ref={popupRef} role="dialog" aria-label="Login">
      <div className="auth-popup-title">Login</div>
      <form
        className="auth-popup-form"
        onSubmit={(event) => {
          handleLogin(event);
        }}
      >
        <input
          className="authgate-input auth-popup-input"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter email..."
          autoComplete="email"
          disabled={isSending || isLinkSent}
          required
          autoFocus
        />
        <button
          className="auth-popup-submit"
          type="submit"
          disabled={isSending || !email.trim() || isLinkSent}
          aria-label={isSending ? "Sending login link" : "Send login link"}
          title={isSending ? "Sending..." : "Send login link"}
        >
          <span className="auth-popup-submit-icon" aria-hidden="true">
            {isSending ? "…" : "➜"}
          </span>
        </button>
      </form>
      {isLinkSent ? <div className="auth-popup-note">{statusMessage}</div> : null}
      {!isLinkSent && statusTone === "error" && statusMessage ? (
        <div className="auth-popup-error">{statusMessage}</div>
      ) : null}
    </div>
  ) : null;

  if (mode === "triggerOnly") {
    if (!isReady) {
      return <button className="ghost-btn auth-mini-btn" type="button" disabled>Login</button>;
    }

    if (user?.email) {
      return (
        <div className="auth-mini-authenticated" title={userEmailLabel}>
          <span className="authgate-email auth-mini-email">{userEmailLabel}</span>
        </div>
      );
    }

    return (
      <div className="auth-popup-anchor">
        <button
          ref={triggerRef}
          className="ghost-btn auth-mini-btn"
          type="button"
          onClick={() => {
            setStatusMessage("");
            setStatusTone("info");
            setShowLoginPopup((prev) => !prev);
          }}
          aria-expanded={showLoginPopup}
          aria-haspopup="dialog"
        >
          Login
        </button>
        {loginPopup}
      </div>
    );
  }

  if (mode === "menuPanel") {
    if (!isReady) {
      return <div className="auth-menu-panel"><div className="auth-menu-muted">Login disabled</div></div>;
    }

    if (user?.email) {
      return (
        <div className="auth-menu-panel">
          <div className="auth-menu-label">Signed in</div>
          <div className="auth-menu-email" title={userEmailLabel}>{userEmailLabel}</div>
          <button className="ghost-btn auth-menu-logout" type="button" onClick={handleLogout} disabled={isSigningOut}>
            {isSigningOut ? "Signing out..." : "Logout"}
          </button>
          {statusTooltip}
        </div>
      );
    }

    return (
      <div className="auth-menu-panel">
        <div className="auth-menu-label">Account</div>
        <div className="auth-menu-muted">Not logged in</div>
      </div>
    );
  }

  return (
    <div className="authgate">
      {!isReady && (
        <span className="authgate-email" title="Supabase not configured">
          Login disabled
        </span>
      )}
      {isReady && user?.email ? (
        <>
          <span className="authgate-email" title={user.email}>
            {user.email}
          </span>
          <button className="ghost-btn" type="button" onClick={handleLogout} disabled={isSigningOut}>
            {isSigningOut ? "Signing out..." : "Logout"}
          </button>
          {statusTooltip}
        </>
      ) : isReady ? (
        isLinkSent ? (
          <span className="authgate-notice">{statusMessage}</span>
        ) : (
          <form className="authgate-form" onSubmit={handleLogin}>
            <input
              className="authgate-input"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email for magic link"
              autoComplete="email"
              disabled={isSending}
              required
            />
            <button className="ghost-btn" type="submit" disabled={isSending || !email.trim()}>
              {isSending ? "Sending..." : "Log in"}
            </button>
            {statusTooltip}
          </form>
        )
      ) : null}
    </div>
  );
}

