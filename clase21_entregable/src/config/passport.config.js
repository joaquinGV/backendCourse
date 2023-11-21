import passport from "passport";
import local from "passport-local";
import { usersModel } from "../dao/dbManagers/models/users.model.js";
import { createHash, isValidPassword } from "../utils.js";
import GitHubStrategy from "passport-github2";

//local es autenticacion con usuario y contraseña
const LocalStrategy = local.Strategy;

const initializePassport = () => {
  //Implementación de nuestro registro
  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true, //permite acceder al objeto request como cualquier otro middleware
        usernameField: "email",
      },
      async (req, username, password, done) => {
        try {
          const { first_name, last_name, email, age, password } = req.body;
          const user = await usersModel.findOne({ email: username });

          if (!first_name || !last_name || !email || !age || !password) {
            return done("incomplete values", false);
          }

          if (user) {
            return done("user already exists", false);
          }

          const userToSave = {
            first_name,
            last_name,
            email: username,
            age,
            password: createHash(password),
          };

          const result = await usersModel.create(userToSave);
          return done(null, result); //req.user {first,last,age,email}
        } catch (error) {
          return done(`Incorrect credentials`);
        }
      }
    )
  );

  //Implementación de nuestro login
  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async (username, password, done) => {
        try {
          const user = await usersModel.findOne({ email: username });

          if (!user || !isValidPassword(password, user.password)) {
            return done(null, false);
          }

          return done(null, user); //req.user
        } catch (error) {
          return done(`Incorrect credentials`);
        }
      }
    )
  );

  //Implementación de nuestro mecanismo de autenticación con github
  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: "Iv1.9f64f1bf264725d4",
        clientSecret: "82c6e3bb0dc3e97a4646f2690e1bf3184ad445d5",
        callbackURL: "http://localhost:8080/api/sessions/github-callback",
        scope: ["user:email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          //   console.log(profile);
          // {
          // _json: {
          //     name: 'alex'
          // }
          //     emails: [{value: 'ap@hotmail.com'}]
          // }
          const email = profile.emails[0].value;
          const user = await usersModel.findOne({ email });

          if (!user) {
            //crear la cuenta o usuario desde cero
            const newUser = {
              first_name: profile._json.name
                ? profile._json.name
                : profile.username,
              last_name: "",
              age: 18,
              email,
              password: createHash("password"),
            };

            const result = await usersModel.create(newUser);
            return done(null, result); //req.user {first,last,age,email}
          } else {
            return done(null, user);
          }
        } catch (error) {
          return done(`Incorrect credentials`);
        }
      }
    )
  );

  //Serializaccion y DeSerializaccion
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await usersModel.findById(id);
    done(null, user);
  });
};

export { initializePassport };
