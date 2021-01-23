import passport from "passport";

export const userAuth = passport.authenticate("jwt", { session: false });
