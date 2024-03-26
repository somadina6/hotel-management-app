import {
  checkReviewExists,
  createReview,
  getUserData,
  updateReview,
} from "@/libs/apis";
import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  const session = await getServerSession(authOptions);
  console.log("Retrieving user");

  if (!session) {
    return new NextResponse("Authentication Required", { status: 500 });
  }

  const userId = session.user.id;

  try {
    const data = await getUserData(userId);
    return NextResponse.json(data, { status: 200 });
  } catch {}
  return new NextResponse("Unable to fetch", { status: 400 });
}

export async function POST(req: Request, res: Response) {
  const session = await getServerSession(authOptions);
  console.log("Retrieving user");

  if (!session) {
    return new NextResponse("Authentication Required", { status: 500 });
  }

  const { roomId, reviewText, ratingValue } = await req.json();

  if (!roomId || !reviewText || !ratingValue) {
    return new NextResponse("All values are required", { status: 500 });
  }

  const userId = session.user.id;

  try {
    // Check if a review already exist
    const alreadyExist = await checkReviewExists(userId, roomId);

    let data;
    if (alreadyExist) {
      data = await updateReview({
        reviewId: alreadyExist._id,
        reviewText,
        userRating: ratingValue,
      });
    } else {
      data = await createReview({
        hotelroomid: roomId,
        reviewText,
        userId,
        userRating: ratingValue,
      });
    }

    return NextResponse.json(data, { status: 200, statusText: "successful" });
  } catch (error: any) {
    console.log(error.response.data);

    // console.log("Error Updating", error);
    return new NextResponse("Unable to Create review", { status: 400 });
  }
}
