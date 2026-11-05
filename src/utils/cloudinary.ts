// The Cloudinary account that holds your images (the name in the web address).
// Keep the same value you already use. All project images must be in this one account.
const CLOUD_NAME = 'dpfzdm4ze'

// Cropped to an exact shape (used by the cards).
// c_fill + g_auto = fill the box exactly, keeping the most interesting part of the photo.
// f_auto + q_auto = best format and compression for each visitor's browser.
export function cloudinaryImage(publicId: string, width = 900, height = 600): string {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto,c_fill,g_auto,w_${width},h_${height}/${publicId}`
}

// The whole photo, never cropped, no bigger than maxSize on its longest side (used by the lightbox).
export function cloudinaryFit(publicId: string, maxSize = 1600): string {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto,c_limit,w_${maxSize},h_${maxSize}/${publicId}`
}