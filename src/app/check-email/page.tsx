"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, ArrowRight, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function CheckEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    const emailParam = searchParams?.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [searchParams]);

  const maskedEmail = email
    ? email.replace(/^(.{2})(.*)(@.*)$/, (_, a, b, c) => a + "*".repeat(b.length) + c)
    : "your email";

  return (
    <div className="flex min-h-dvh w-full bg-white">
      {/* Left Side */}
      <div className="hidden lg:flex w-1/2 bg-zinc-950 items-center justify-center relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-40 mix-blend-overlay bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1586953208448-b95a79798f07?q=80&w=2670&auto=format&fit=crop')",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/50 to-zinc-950/30"></div>

        <div className="relative z-10 p-16 text-white max-w-xl">
          <div className="mb-6 inline-flex items-center rounded-full border border-zinc-700 bg-zinc-900/50 px-3 py-1 text-sm text-zinc-300 backdrop-blur-sm shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
            Check Your Email
          </div>
          <h1 className="text-5xl font-bold tracking-tight mb-6 leading-[1.1]">
            Almost there! <br /> Just one more step.
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed">
            We've sent a verification link to your email address. Click the link to complete your admin account setup.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8 py-12 lg:p-16">
        <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 shadow-lg mb-4">
              <Mail className="h-8 w-8" />
            </div>
            
            <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-zinc-900 text-white shadow-lg">
              <Shield className="h-6 w-6" />
            </div>
            
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
              Check your email
            </h1>
            
            <p className="text-sm text-zinc-500 max-w-xs">
              We've sent a verification link to{" "}
              <span className="font-medium text-zinc-900">{maskedEmail}</span>
            </p>
          </div>

          <div className="bg-zinc-50 rounded-lg p-4 border border-zinc-200">
            <h3 className="font-medium text-zinc-900 mb-2">What happens next?</h3>
            <ol className="text-sm text-zinc-600 space-y-1">
              <li>1. Check your inbox for our verification email</li>
              <li>2. Click the verification link in the email</li>
              <li>3. You'll be redirected to complete your setup</li>
            </ol>
          </div>

          <div className="space-y-4">
            <Button
              onClick={() => router.push("/login")}
              className="w-full h-11 bg-zinc-900 hover:bg-zinc-800 text-white font-medium shadow-lg transition-all duration-200"
            >
              Open Email App <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            <div className="text-center text-sm text-zinc-500">
              Didn't receive the email?{" "}
              <button
                onClick={() => router.push("/register")}
                className={cn(
                  "font-semibold text-zinc-900 hover:underline hover:text-zinc-700 transition-colors",
                  countdown > 0 && "opacity-50 cursor-not-allowed"
                )}
                disabled={countdown > 0}
              >
                {countdown > 0 ? `Try again in ${countdown}s` : "Try again"}
              </button>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => router.push("/register")}
              className="text-xs text-zinc-400 hover:text-zinc-600 transition-colors"
            >
              Wrong email? Go back to registration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
