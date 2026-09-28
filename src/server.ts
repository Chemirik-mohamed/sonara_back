import { app } from "./app";

export default({
  port : Number(Bun.env.PORT),
  fetch :app.fetch
})