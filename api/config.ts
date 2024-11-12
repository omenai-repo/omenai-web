export const getApiUrl = () => {
  if (process.env.NODE_ENV === "development") {
    return process.env.NEXT_PUBLIC_URL_DEVELOPMENT!;
  } else {
    return process.env.NEXT_PUBLIC_URL_PRODUCTION_BASE!;
  }
};
export const getGalleryUrl = () => {
  if (process.env.NODE_ENV === "development") {
    return process.env.NEXT_PUBLIC_URL_DEVELOPMENT!;
  } else {
    return process.env.NEXT_PUBLIC_URL_PRODUCTION_GALLERY!;
  }
};
export const getCollectorUrl = () => {
  if (process.env.NODE_ENV === "development") {
    return process.env.NEXT_PUBLIC_URL_DEVELOPMENT!;
  } else {
    return process.env.NEXT_PUBLIC_URL_PRODUCTION_USER!;
  }
};
export const getAdminUrl = () => {
  if (process.env.NODE_ENV === "development") {
    return process.env.NEXT_PUBLIC_URL_DEVELOPMENT!;
  } else {
    return process.env.NEXT_PUBLIC_URL_PRODUCTION_ADMIN!;
  }
};
export const getBaseUrl = () => {
  if (process.env.NODE_ENV === "development") {
    return process.env.NEXT_PUBLIC_URL_DEVELOPMENT!;
  } else {
    return process.env.NEXT_PUBLIC_URL_PRODUCTION_API!;
  }
};
