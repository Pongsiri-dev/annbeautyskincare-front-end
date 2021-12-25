// ----------------------------------------------------------------------

import { FormikProps } from "formik";

export type UserInvoice = {
  id: string;
  createdAt: Date | string | number;
  price: number;
};

export type CreditCard = {
  id: string;
  cardNumber: string;
  cardType: string;
};

export type Follower = {
  id: string;
  avatarUrl: string;
  name: string;
  country: string;
  isFollowed: boolean;
};

export type Gallery = {
  id: string;
  title: string;
  postAt: Date | string | number;
  imageUrl: string;
};

export type UserAddressBook = {
  id: string;
  name: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  street: string;
  zipCode: string;
};

export type Profile = {
  id: string;
  cover: string;
  position: string;
  follower: number;
  following: number;
  quote: string;
  country: string;
  email: string;
  company: string;
  school: string;
  role: string;
  facebookLink: string;
  instagramLink: string;
  linkedinLink: string;
  twitterLink: string;
};

export type UserManager = {
  name: string;
  createdAt: string;
  updatedAt: string;
  id: number;
  firstName: string | null;
  lastName: string | null;
  cardid: string | null;
  email: string;
  birthDay: string | null;
  address: string | null;
  telephone: string | null;
  provinceCode: string | null;
  province: string | null;
  amphurCode: string | null;
  amphur: string | null;
  tombonCode: string | null;
  tombon: string | null;
  postCode: string | null;
  username: string;
  password: string;
  signID: string | null;
  roles: {
    id: number;
    name: string;
  }[];
  level: string | null;
  status: number;
  avatarUrl?: string
};
export type UserAbout = {
  id?: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  joinedAt?: Date;
  level?: string;
  status?: number;
  image?: {
    id?: number;
    imgPath?: string;
    imgName?: string;
    imgType?: string;
    userId?: number;
    url?: string;
  };
  address?: string;
  cardid?: string;
  email?: string;
  birthDay?: string;
  telephone?: string;
  provinceCode?: string;
  province?: string;
  amphurCode?: string;
  amphur?: string;
  tombonCode?: string;
  tombon?: string;
  postCode?: string;
}

export type UserData = {
  id: string;
  avatarUrl: string;
  cover: string;
  name: string;
  follower: number;
  following: number;
  totalPost: number;
  position: string;
};

export type NotificationSettings = {
  activityComments: boolean;
  activityAnswers: boolean;
  activityFollows: boolean;
  applicationNews: boolean;
  applicationProduct: boolean;
  applicationBlog: boolean;
};

export type Friend = {
  id: string;
  avatarUrl: string;
  name: string;
  role: string;
};

export type UserPost = {
  id: string;
  author: {
    id: string;
    avatarUrl: string;
    name: string;
  };
  isLiked: boolean;
  createdAt: Date | string | number;
  media: string;
  message: string;
  personLikes: {
    name: string;
    avatarUrl: string;
  }[];
  comments: {
    id: string;
    author: {
      id: string;
      avatarUrl: string;
      name: string;
    };
    createdAt: Date | string | number;
    message: string;
  }[];
};

export type AccountBillingFormikProps = FormikProps<{
  cardName: string;
  cardNumber: string;
  cardExpired: string;
  cardCvv: string;
}>;
