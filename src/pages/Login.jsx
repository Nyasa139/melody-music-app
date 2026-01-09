import { supabase } from "../supabase";

export default function Login() {
  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="text-center">
        <h1 className="text-white text-4xl mb-8">Sign in to Melody</h1>
        <button
          onClick={signInWithGoogle}
          className="bg-green-500 px-6 py-3 rounded-full text-black font-semibold"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
