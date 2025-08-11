export const ADMIN = {
  email: "admin@example.com",
  password: "admin@123",
} as const;

export function isAuthed(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem("isAuthed") === "true";
  } catch {
    return false;
  }
}

export function login(email: string, password: string): boolean {
  if (typeof window === "undefined") return false;
  const ok = email.trim().toLowerCase() === ADMIN.email && password === ADMIN.password;
  try {
    window.localStorage.setItem("isAuthed", ok ? "true" : "false");
  } catch {
    // ignore storage errors
  }
  return ok;
}

export function logout(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem("isAuthed");
  } catch {
    // ignore
  }
  window.location.href = "/login";
}


