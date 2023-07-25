export const basicAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("Authorization Header:", authHeader);
    if (!authHeader || !authHeader.startsWith("Basic ")) {
        console.log("Unauthorized: No or Invalid Authorization Header");
        return res.status(401).send("Unauthorized");
    }
    const encodedCredentials = authHeader.split(" ")[1];
    const decodedCredentials = Buffer.from(encodedCredentials, "base64").toString("utf-8");
    const [username, password] = decodedCredentials.split(":");
    if (username !== "user" || password !== "1234") {
        console.log("Unauthorized: Invalid Username or Password");
        return res.status(401).send("Unauthorized");
    }
    console.log("Authentication successful");
    next();
};
