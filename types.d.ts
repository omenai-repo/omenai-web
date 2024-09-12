type InputProps = {
  label: string;
  labelText: string;
  type: HTMLInputTypeAttribute;
  placeholder: string;
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  buttonType?: "button" | "submit";
  buttonText?: "Next" | "Submit";
  onClick?: () => void;
  id?: number;
  onClickPrev?: () => void;
};

type IndividualSignupData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};
type AdminSignupData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type GallerySignupData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  address: string;
  country: string;
  admin: string;
  description: string;
  logo: File | null;
};

type GalleryLocation = {
  address: string;
  country: string;
};

type IndividualRegisterData = Omit<IndividualSignupData, "confirmPassword"> & {
  preferences: string[];
};

type GalleryRegisterData = Pick<
  GallerySignupData,
  "name" | "admin" | "email" | "password" | "description"
> & {
  location: GalleryLocation;
  logo: string;
};

type RouteIdentifier = "individual" | "gallery";

type Form = {
  email: string;
  password: string;
};

type GallerySchemaTypes = {
  name: string;
  email: string;
  password: string;
  gallery_id: string;
  admin: string;
  location: GalleryLocation;
  description: string;
  gallery_verified: boolean;
  verified: boolean;
  role: string;
  logo?: string;
  subscription_active: boolean;
  status: "active" | "blocked";
  connected_account_id: string | null;
};

type IndividualSchemaTypes = {
  name: string;
  email: string;
  password: string;
  user_id: string;
  preferences: string[];
  verified: boolean;
  role: string;
  address?: IndividualAddressTypes;
};

type IndividualAddressTypes = {
  address_line: string;
  city: string;
  country: string;
  state: string;
  zip: string;
  [key: string]: string;
};

type ArtworkSchemaTypes = {
  artist: string;
  year: number;
  title: string;
  medium: string;
  rarity: string;
  materials: string;
  dimensions: ArtworkDimensions;
  url: string;
  pricing: ArtworkPricing;
  art_id: string;
  gallery_id: string;
  impressions?: number;
  like_IDs?: string[];
  artist_birthyear: string;
  artist_country_origin: string;
  certificate_of_authenticity: string;
  artwork_description?: string;
  framing: string;
  signature: string;
  should_show_on_sub_active?: boolean;
  availability: boolean;
};

type ArtworkDimensions = {
  width: string;
  height: string;
  depth?: string;
  weight: string;
};

type ArtworkPricing = {
  price: number;
  usd_price: number;
  currency: string;
  shouldShowPrice: "Yes" | "No" | string;
};

type ArtworkPriceFilterData = {
  "pricing.price": number;
  "pricing.usd_price": number;
  "pricing.shouldShowPrice": string;
  "pricing.currency": string;
};

type ArtworkResultTypes = ArtworkSchemaTypes & {
  _id: string;
  updatedAt: string;
  createdAt: string;
};

type ArtworkUploadStateTypes = {
  artist: string;
  year: number;
  title: string;
  medium: string;
  rarity: string;
  materials: string;
  height: string;
  width: string;
  depth?: string;
  weight: string;
  price: number;
  usd_price: number;
  shouldShowPrice: "Yes" | "No" | string;
  artist_birthyear: string;
  artist_country_origin: string;
  certificate_of_authenticity: string;
  artwork_description?: string;
  framing: string;
  signature: string;
  currency: string;
};

type CreateOrderModelTypes = {
  createdAt: string | number | Date;
  artwork_data: Pick<
    ArtworkSchemaTypes,
    "artist" | "pricing" | "title" | "url" | "art_id"
  > & { _id: ObjectId };
  buyer: {
    name: string;
    email: string;
    user_id: string;
    _id: ObjectId;
  };
  gallery_id: string;
  order_id: string;
  status: string;
  shipping_address: IndividualAddressTypes;
  shipping_quote: ShippingQuoteTypes;
  payment_information: PaymentStatusTypes;
  tracking_information: TrackingInformationTypes;
  order_accepted: OrderAcceptedStatusTypes;
  delivery_confirmed: boolean;
  availability: boolean;
};

type OrderAcceptedStatusTypes = {
  status: "accepted" | "declined" | "";
  reason?: string;
};
type TrackingInformationTypes = {
  tracking_id: string;
  tracking_link: string;
};
type PaymentStatusTypes = {
  status: "pending" | "completed";
  transaction_value: string;
  transaction_date: string;
  transaction_reference: string;
};

type ShippingQuoteTypes = {
  package_carrier: string;
  shipping_fees: string;
  taxes: string;
  additional_information?: string;
};

type LockModelTypes = {
  lock_id: string;
  user_id: string;
  art_id: string;
};

interface Image {
  bucketId: string;
  fileId: string;
}

type GalleryProfileUpdateData = {
  location?: string;
  admin?: string;
  description?: string;
};
type IndividualProfileUpdateData = {
  name?: string;
  preferences?: string[];
};

type InputData = {
  author: string;
  date: Date;
  tag?: string;
  summary: string;
  slug: string;
  cover?: File;
  content: string;
  title: string;
  minutes: string;
};

type Input = {
  label: string;
  description: string;
  placeholder: string;
  type: string;
  name: string;
  register?: UseFormRegister<FieldValues>;
  onchange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  value?: string;
  disabled?: boolean;
};

interface Image {
  bucketId: string;
  fileId: string;
}

type EditorialFormData = {
  title: string;
  summary?: string;
  slug?: string;
  minutes?: string;
  content: string;
};

type WalletModelSchemaTypes = {
  owner_id: string;
  wallet_id: string;
  available_balance: number;
  withdrawable_balance: number;
};

type PurchaseTransactionModelSchemaTypes = {
  trans_id: string;
  trans_reference: string;
  trans_amount: string;
  trans_owner_id: string;
  trans_owner_role: "user" | "gallery";
  trans_gallery_id: string;
  trans_type: "purchase_payout" | "subscription";
  trans_date: Date;
};

type SubscriptionTransactionModelSchemaTypes = {
  trans_id: string;
  reference: string;
  amount: string;
  gallery_id: string;
  type: "purchase_payout" | "subscription";
  date: Date;
};

type SubscriptionModelSchemaTypes = {
  customer: {
    id: number;
    name: string;
    phone_number?: string;
    email: string;
    created_at: string;
    gallery_id: string;
  };
  start_date: Date;
  expiry_date: Date;
  status: "active" | "canceled" | "expired";
  card: SubscriptionCardDetails;
  payment: SubscriptionPaymentTypes;
  plan_details: {
    type: string;
    value: { monthly_price: string; annual_price: string };
    currency: string;
    interval: "monthly" | "yearly";
  };
  next_charge_params: NextChargeParams;
};

type NextChargeParams = {
  value: number;
  currency: string;
  type: string;
  interval: string;
  id: string;
};
type SubscriptionPaymentTypes = {
  status: string;
  value: string;
  trans_ref: string;
  flw_ref: string;
  currency: string;
  type: string;
};

type SubscriptionTokenizationTypes = {
  amount: number;
  email: string;
  tx_ref: string;
  token: string;
  gallery_id: string;
  plan_id: string;
  plan_interval: string;
};

type SubscriptionCardDetails = {
  first_6digits: string;
  last_4digits: string;
  issuer: string;
  country: string;
  type: string;
  expiry: string;
  token: string;
};

type CardInputTypes = {
  card: string;
  cvv: string;
  month: string;
  year: string;
  name: string;
};

type AdminGalleryListItemTypes = {
  name: string;
  location: GalleryLocation;
  description: string;
  _id: string;
  email: string;
  admin: string;
  logo: string;
  gallery_id: string;
  status: "active" | "blocked";
};

type PromotionalSchemaTypes = {
  headline: string;
  subheadline: string;
  image: string;
  cta: string;
};

type EditorialSchemaTypes = {
  title: string;
  link: string;
  cover: string;
  date: Date | null;
  minutes: string
};

type PromotionalDataUpdateTypes = {
  headline?: string;
  subheadline?: string;
  cta?: string;
};

type AccountAdminSchemaTypes = {
  name: string;
  email: string;
  password: string;
  admin_id: string;
  // verified: boolean;
  role: string;
};

type FLWDirectChargeDataTypes = CardInputTypes & {
  card: string;
  cvv: string;
  month: string;
  year: string;
  tx_ref: string;
  amount: string;
  customer: {
    name: string;
    email: string;
    gallery_id: string;
    plan_id?: string;
    plan_interval?: string;
  };
  redirect: string;
  charge_type: string | null;
};

type SubscriptionPlanDataTypes = {
  name: string;
  pricing: {
    annual_price: string;
    monthly_price: string;
  };
  plan_id: string;
  currency: string;
  benefits: string[];
};

type PinAuthorizationData = {
  mode: "pin";
  pin: string;
};

type AvsAuthorizationData = {
  mode: "avs_noauth";
  country?: string;
  state?: string;
  city?: string;
  zip?: string;
  address?: string;
};
type filterOptionsType = {
  price: {
    min: number;
    max: number;
  }[];
  year: {
    min: number;
    max: number;
  }[];
  medium: string[];
  rarity: string[];
};

type ProrationSchemaTypes = {
  gallery_id: string;
  value: number;
};

type artworkCollectionTypes = "trending" | "curated" | "recent";
