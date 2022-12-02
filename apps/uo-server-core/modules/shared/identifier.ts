import { Generator  } from "https://deno.land/x/ulideno@v0.2.0/mod.ts";
  
  const gen = new Generator();

  export const getId = () => {
    return gen.ulid_encoded() as string;
  }

  export type Id = string;
  // TODO: make functions to convert between byte and string representations

  export const validateId = (id: Id) => {
    return true; // TODO!!: implement this
  }