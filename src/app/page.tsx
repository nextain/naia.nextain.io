import { redirect } from "next/navigation";

// Middleware handles Accept-Language detection and redirects to /{lang}.
// This fallback only fires if middleware is bypassed (e.g., direct SSR).
export default function RootPage() {
  redirect("/en");
}
