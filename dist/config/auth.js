export const basicAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("Authorization Header:", authHeader);
    if (!authHeader || !authHeader.startsWith("Basic ")) {
        return res.status(401).send("Unauthorized");
    }
    const encodedCredentials = authHeader.split(" ")[1];
    const decodedCredentials = Buffer.from(encodedCredentials, "base64").toString("utf-8");
    const [username, password] = decodedCredentials.split(":");
    if (username !== "user" || password !== "1234") {
        return res.status(401).send("Unauthorized");
    }
    next();
};
