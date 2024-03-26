import { createBooking, updateHotelRoom } from "@/libs/apis";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const checkout_session_completed = "checkout.session.completed";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

export async function POST(req: Request, res: Response) {
  const reqBody = await req.text();
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  console.log("Endpoint Activated");

  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) {
      return;
    }
    event = stripe.webhooks.constructEvent(reqBody, sig, webhookSecret);
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 500 });
  }

  // Load Event
  switch (event.type) {
    case checkout_session_completed:
      const session: any = event.data.object;

      const {
        // @ts-ignore
        metadata: {
          adults,
          checkinDate,
          checkoutDate,
          children,
          hotelRoomSlug,
          hotelRoom,
          numberOfDays,
          discount,
          user,
          totalPrice,
        },
      } = session;

      // Create A Booking
      await createBooking({
        adults: Number(adults),
        checkinDate,
        checkoutDate,
        children: Number(children),
        discount: Number(discount),
        hotelRoom,
        numberOfDays: Number(numberOfDays),
        user,
        totalPrice: Number(totalPrice),
      });

      // Update Room To Booked
      await updateHotelRoom(hotelRoom);

      return NextResponse.json("Booking Successful", {
        status: 200,
        statusText: "Booking Successful",
      });
      break;

    default:
      console.log(`Unhandled Event Type: ${event.type}`);
      break;
  }
  return NextResponse.json("Booking Successful", {
    status: 200,
    statusText: "Event Recieved",
  });
}
