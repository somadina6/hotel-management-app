type CoverImage = {
  url: string;
};

export type Images = {
  _key: string;
  url: string;
};

type Amenity = {
  _key: string;
  amenity: string;
  icon: string;
};

type Slug = {
  _type: string;
  current: string;
};

export type Room = {
  _id: string;
  room: string;
  coverImage: CoverImage;
  desciption: string;
  dimension: string;
  discount: number;
  images: Images[];
  isBooked: boolean;
  isFeatured: boolean;
  name: string;
  numberOfBeds: number;
  offeredAmenities: Amenity[];
  price: number;
  slug: Slug;
  specialNote: string;
  type: string;
};

export type CreateBookingDto = {
  user: string;
  hotelRoom: string;
  checkinDate: string;
  checkoutDate: string;
  numberOfDays: number;
  adults: number;
  children: number;
  discount: number;
  totalPrice: number;
};
