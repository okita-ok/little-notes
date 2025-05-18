import fp from "fastify-plugin";
import { Schema } from "joi";
import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

const validatePlugin = async (fastify: FastifyInstance) => {
  fastify.decorate(
    "validate",
    (schema: Schema) =>
      async function (req: FastifyRequest, res: FastifyReply) {
        const { error } = schema.validate(req.body, {
          abortEarly: false,
        });
        if (error) {
          res.status(422).send(error.details);
          return;
        }
      }
  );
};

export default fp(validatePlugin);

// import { FastifyPluginAsync } from "fastify";

// const validatePlugin: FastifyPluginAsync = async (fastify, options, done) => {
//   fastify.decorate("validate", (schema: Schema) => {
//     return async function (req, res) {
//       const { error } = schema.validate(req.body, { abortEarly: false });
//       if (error) {
//         res.status(422).send(error.details);
//         return;
//       }
//     };
//   });
//   done();
// };

// export default fp(
//   async (fastify: FastifyInstance, options: FastifyPluginOptions) => {
//     fastify.decorate(
//       "validate",
//       (schema: Schema) =>
//         async function (req: FastifyRequest, res: FastifyReply) {
//           const { error } = schema.validate(req.body, {
//             abortEarly: false,
//           });
//           if (error) {
//             res.status(422).send(error.details);
//             return;
//           }
//         }
//     );
//   },
//   {
//     name: "validate-plugin",
//   }
// );
