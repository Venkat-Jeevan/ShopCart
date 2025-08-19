import { Inngest } from "inngest";
import { prisma } from "@/lib/prisma"; // <-- make sure you created lib/prisma.ts

// Create a client to send and receive events
export const inngest = new Inngest({ id: "ShopCart" });

/**
 * Clerk User Created → Add user into Postgres via Prisma
 */
export const inngestClient = inngest.createFunction(
  { id: "shop-cart-next" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    await prisma.user.create({
      data: {
        id, // should match your Prisma schema field
        email: email_addresses[0].email_address, // fixed field name
        name: `${first_name} ${last_name}`,
        imageUrl: image_url,
      },
    });
  }
);

/**
 * Clerk User Updated → Update user in Postgres
 */
export const inngestClientUpdate = inngest.createFunction(
  { id: "shop-cart-next-update" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    await prisma.user.update({
      where: { id },
      data: {
        email: email_addresses[0].email_address,
        name: `${first_name} ${last_name}`,
        imageUrl: image_url,
      },
    });
  }
);

/**
 * Clerk User Deleted → Delete user from Postgres
 */
export const inngestClientDelete = inngest.createFunction(
  { id: "shop-cart-next-delete" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;

    await prisma.user.delete({
      where: { id },
    });
  }
);
