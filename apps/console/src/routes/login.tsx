import { createFileRoute } from "@tanstack/react-router";
import { signIn, signUp, signOut, useSession } from "../auth-client";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (session) {
    return (
      <div>
        <h1>Welcome!</h1>
        <p>Logged in as: {session.user.email}</p>
        <p>Name: {session.user.name}</p>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Login</h1>

      <h2>Social Login</h2>
      <button onClick={() => signIn.social({ provider: "github" })}>
        Sign in with GitHub
      </button>

      <button onClick={() => signIn.social({ provider: "google" })}>
        Sign in with Google
      </button>

      <h2>Email/Password</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          signIn.email({
            email: formData.get("email") as string,
            password: formData.get("password") as string,
          });
        }}
      >
        <div>
          <input name="email" type="email" placeholder="Email" required />
        </div>
        <div>
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>

      <h2>Sign Up</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          signUp.email({
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            name: formData.get("name") as string,
          });
        }}
      >
        <div>
          <input name="name" type="text" placeholder="Full Name" required />
        </div>
        <div>
          <input name="email" type="email" placeholder="Email" required />
        </div>
        <div>
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
