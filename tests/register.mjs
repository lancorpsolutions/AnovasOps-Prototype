// Lets Node's built-in TypeScript type stripping resolve the extensionless
// relative imports used in src/ (e.g. "./schema" -> "./schema.ts").
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`
      export async function resolve(specifier, context, next) {
        try {
          return await next(specifier, context);
        } catch (err) {
          if (specifier.startsWith(".") && !/\\.[cm]?[jt]s$/.test(specifier)) {
            return next(specifier + ".ts", context);
          }
          throw err;
        }
      }
    `),
  import.meta.url
);
