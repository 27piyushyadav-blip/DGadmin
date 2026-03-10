import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import LoginForm from "@/components/auth/login-form";

export const metadata = {
  title: "Admin Login | Digital Offices",
  description: "Manage your admin account and system settings.",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-dvh w-full bg-white">
      {/* Left Side - Visuals */}
      <div className="hidden lg:flex w-1/2 bg-zinc-950 items-center justify-center relative overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 opacity-40 mix-blend-overlay bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop')" }}
        ></div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/50 to-zinc-950/30"></div>

        <div className="relative z-10 p-16 text-white max-w-xl">
          <div className="mb-6 inline-flex items-center rounded-full border border-zinc-700 bg-zinc-900/50 px-3 py-1 text-sm text-zinc-300 backdrop-blur-sm shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2"></span>
            Admin Portal
          </div>
          <h1 className="text-5xl font-bold tracking-tight mb-6 leading-[1.1]">
            System control, <br /> perfectly organized.
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed">
            Manage users, monitor system performance, and control platform settings—all from one powerful admin dashboard.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8 lg:p-16">
        <Suspense fallback={<div className="flex items-center gap-2"><Loader2 className="animate-spin" /> Loading login...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
