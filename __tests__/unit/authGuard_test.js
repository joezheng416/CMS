const authGuard = require("../../src/middleware/authGuard")
const {validateToken} = require("../../src/utils/jwt")
jest.mock("../../src/utils/jwt")

describe(
    "authentication guard middleware",
    ()=>{
        it(
            "should return 401 if authoriaztion header is missing",()=>{
                const req = {
                    header: jest.fn(),
                }
                const res = {
                    status: jest.fn(),
                    json: jest.fn(),
                }
                res.status.mockReturnValue(res)
                const next = jest.fn()
                authGuard(req,res,next)
                expect(req.header).toHaveBeenCalledWith("Authorization")
                expect(res.status).toHaveBeenCalledWith(401)
                expect(res.json).toHaveBeenCalledWith({error:"missing authorization"})
            }

        )
        it(
            "should call next when token is valid",()=>{
                const payload = []
                const token = "any_token"
                const req = {
                    header: jest.fn().mockReturnValue(`Bearer ${token}`),
                }
                const res = {
                }
                const next = jest.fn()
                validateToken.mockImplementation(
                    (token)=>{
                        return payload
                    }
                )
                authGuard(req,res,next)
                expect(validateToken).toHaveBeenCalledWith(token)
                expect(req.user).toEqual(payload)
                expect(next).toHaveBeenCalled()
            }
        )
    }
)