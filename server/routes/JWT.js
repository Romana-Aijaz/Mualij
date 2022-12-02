const {sign, verify} = require("jsonwebtoken");
//Creating json web token to send this to the user.
const createTokens = (user) => {
     const accessToken = sign({username: user.username, id: user._id, email: user.email, isAdmin: user.isAdmin},
        "Mualij3199");
      const signedToken = {
        tokenKey: accessToken,
        _id: user._id.toString(),
        email: user.email,
        username: user.username,
        age: user.age,
        city: user.city,
        profilePicture: user.profilePicture,
        coverPicture: user.coverPicture,
        occupation: user.occupation,
        followers: user.followers,
        following: user.following,
        relationshipStatus: user.relationshipStatus,
        dateOfBirth: user.dateOfBirth,
        isAdmin: user.isAdmin
      }
   return accessToken;
   //return signedToken;
}

//validating token with data in request body.
const validateTokenBody = (req, res, next) => {
    if (req.body.token) {
        const validate = verify(req.body.token, "Mualij3199");
        if (validate.id === req.body.userId) {
            console.log(validate);
            return next();
        }
        else {
            res.status(400).json({error: "User not Authenticated!"})
        }
    }
    else {
        console.log(req.body.token)
        return res.status(400).json({error: "User not Authenticated!"});
    }
}

//validating token with data in request params.
const validateTokenParams = (req, res, next) => {
    if (req.params.token) {
        const validate = verify(req.params.token, "Mualij3199");
        if (validate.id === req.params.userId) {
            console.log(validate);
            return next();
        }
        else {
            res.status(400).json({error: "User not Authenticated!"})
        }
    }
    else {
        console.log(req.params.token)
        return res.status(400).json({error: "User not Authenticated!"});
    }
}
module.exports = {createTokens, validateTokenBody, validateTokenParams};