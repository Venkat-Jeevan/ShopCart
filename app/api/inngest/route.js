import { serve } from "inngest/next";
import { inngest, inngestClient, inngestClientDelete, inngestClientUpdate  } from "@/config/inngest";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [  
    inngestClient,
    inngestClientUpdate,
    inngestClientDelete
    /* your functions will be passed here later! */
  ],
});