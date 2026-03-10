import RegisterForm from "@/components/auth/register-form";

export const metadata = {
  title: "Admin Register | Digital Offices",
  description: "Create your admin account to manage the platform.",
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-dvh w-full bg-white">
      
      {/* Left Side - Visuals */}
      <div className="hidden lg:flex w-1/2 bg-zinc-950 items-center justify-center relative overflow-hidden">
        {/* Background Image - Focus/Growth Context */}
        <div 
          className="absolute inset-0 opacity-40 mix-blend-overlay bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop')" }}
        ></div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/50 to-zinc-950/30"></div>

        <div className="relative z-10 p-16 text-white max-w-xl">
          <div className="mb-6 inline-flex items-center rounded-full border border-zinc-700 bg-zinc-900/50 px-3 py-1 text-sm text-zinc-300 backdrop-blur-sm shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
            Join the Team
          </div>
          <h1 className="text-5xl font-bold tracking-tight mb-6 leading-[1.1]">
            Take control, <br/> make an impact.
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed">
            Join the administrative team that keeps Digital Offices running smoothly and securely.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8 py-12 lg:p-16">
        <RegisterForm />
      </div>
    </div>
  );
}
