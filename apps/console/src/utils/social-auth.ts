import { signIn } from "../auth-client";

export const socialAuth = {
  github: async () => {
    try {
      const result = await signIn.social({
        provider: "github",
        callbackURL: `${window.location.origin}/databases`,
      });
      return result;
    } catch (error) {
      console.error("GitHub auth error:", error);
      throw error;
    }
  },

  google: async () => {
    try {
      const result = await signIn.social({
        provider: "google",
        callbackURL: `${window.location.origin}/databases`,
      });
      return result;
    } catch (error) {
      console.error("Google auth error:", error);
      throw error;
    }
  },
};
