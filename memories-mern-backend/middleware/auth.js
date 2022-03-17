import jwt from 'jsonwebtoken';


// user wants to like a post
// clisk the like button => auth middleware (confirms user is verified and next()) then call like controller

const auth = async (req, res, next) => {
    try {
        const token = req.headers.Authorization.split(" ")[1];
        // if greater than 500 this is a google auth
        // otherwise its a custom token
        const isCustomAuth = token.length < 500;

        let decodedData;

        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, 'test');

            req.userId = decodedData?.id;
        } else {

            decodedData = jwt.decode(token);

            // sub is a id that differentiate each user
            req.userId = decodedData?.sub;
        }

        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;