import { CreateBookingDto, Room } from "@/models/room";
import sanityClient from "./sanity";
import * as queries from "./sanityQueries";
import axios from "axios";
import { Booking } from "@/models/booking";
import { CreateReviewDto, Review, UpdateReviewDto } from "@/models/review";
import { use } from "react";

export async function getFeaturedRoom() {
  const result = await sanityClient.fetch<Room>(
    queries.getFeaturedRoomQuery,
    {},
    { cache: "no-cache" }
  );
  return result;
}

export async function getRooms() {
  try {
    const result = await sanityClient.fetch<Room[]>(
      queries.getRoomsQuery,
      {},
      { cache: "no-cache" }
    );
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function getRoom(slug: string) {
  const result = await sanityClient.fetch<Room>(
    queries.getRoom,
    { slug },
    { cache: "no-cache" }
  );

  return result;
}

export const createBooking = async ({
  adults,
  checkinDate,
  checkoutDate,
  children,
  discount,
  hotelRoom,
  numberOfDays,
  user,
  totalPrice,
}: CreateBookingDto) => {
  const mutation = {
    mutations: [
      {
        create: {
          _type: "booking",
          user: { _type: "reference", _ref: user },
          hotelRoom: { _type: "reference", _ref: hotelRoom },
          checkinDate,
          checkoutDate,
          numberOfDays,
          adults,
          children,
          totalPrice,
          discount,
        },
      },
    ],
  };

  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.NEXT_PUBLIC_SANITY_PROJECT_DATASET}`,
    mutation,
    {
      headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` },
    }
  );

  return data;
};

export async function updateHotelRoom(hoterRoomId: string) {
  const mutation = {
    mutations: [
      {
        patch: {
          id: hoterRoomId,
          set: {
            isBooked: true,
          },
        },
      },
    ],
  };

  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.NEXT_PUBLIC_SANITY_PROJECT_DATASET}`,
    mutation,
    {
      headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` },
    }
  );

  return data;
}

export const getUserBooking = async (userId: string) => {
  const result = await sanityClient.fetch<Booking[]>(
    queries.getUserBookingsQuery,
    { userId },
    { cache: "no-cache" }
  );
  return result;
};

export async function getUserData(userId: string) {
  const result = await sanityClient.fetch(
    queries.getUserDataQuery,
    { userId },
    { cache: "no-cache" }
  );
  return result;
}

export async function checkReviewExists(
  userId: string,
  hotelRoomId: string
): Promise<null | { _id: string }> {
  const query = `*[_type == 'review' && user._ref == $userId && hotelRoom._ref == $hotelRoomId][0]{
    _id
  }`;

  const params = {
    userId,
    hotelRoomId,
  };

  const result = await sanityClient.fetch(query, params);

  return result ?? null;
}

export async function updateReview({
  reviewId,
  reviewText,
  userRating,
}: UpdateReviewDto) {
  const mutation = {
    mutations: [
      {
        patch: {
          id: reviewId,
          set: {
            text: reviewText,
            userRating,
          },
        },
      },
    ],
  };

  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.NEXT_PUBLIC_SANITY_PROJECT_DATASET}`,
    mutation,
    {
      headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` },
    }
  );

  return data;
}

export async function createReview({
  hotelroomid,
  reviewText,
  userId,
  userRating,
}: CreateReviewDto) {
  const mutation = {
    mutations: [
      {
        create: {
          _type: "review",
          user: {
            _type: "reference",
            _ref: userId,
          },
          hotelRoom: {
            _type: "reference",
            _ref: hotelroomid,
          },
          userRating,
          text: reviewText,
        },
      },
    ],
  };

  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.NEXT_PUBLIC_SANITY_PROJECT_DATASET}`,
    mutation,
    {
      headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` },
    }
  );

  return data;
}

export async function getRoomReviews(roomId: string) {
  const result = await sanityClient.fetch<Review[]>(
    queries.getRoomReviewsQuery,
    { roomId },
    { cache: "no-cache" }
  );
  return result;
}
