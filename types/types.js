const zod = require("zod")

const signup = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstname : zod.string(),
    lastname: zod.string()
})
const update = zod.object({
    password: zod.string().optional(),
    firstname: zod.string().optional(),
    lastname: zod.string().optional()
})

const signin = zod.object({
    username: zod.string().email(),
	password: zod.string()
})

module.exports={
    signup,
    update,
    signin
}