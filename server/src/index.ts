import httpServer from "./server";

httpServer.listen(process.env.PORT ?? 4000);
