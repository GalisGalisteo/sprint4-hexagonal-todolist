import { Request, Response, NextFunction } from "express";

export const basicAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    console.log("Authorization Header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Basic ")) {
        return res.status(401).send("Unauthorized");
    }

    // Extract the Base64-encoded credentials from the header
    const encodedCredentials = authHeader.split(" ")[1];

    // Decode the credentials to get the username and password
    const decodedCredentials = Buffer.from(encodedCredentials, "base64").toString("utf-8");

    // Split the username and password
    const [username, password] = decodedCredentials.split(":");

    // Replace 'your_username' and 'your_password' with your actual credentials
    if (username !== "user" || password !== "1234") {
        return res.status(401).send("Unauthorized");
    }

    next();
}