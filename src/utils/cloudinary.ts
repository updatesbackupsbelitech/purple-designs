// Your Cloudinary account name. The hero photo is in "boxny7z4".
// Your old About photos were in "drztwn3ci", so change this if the new images are there.
//gengsurvivors@gmail.com
const CLOUD_NAME = 'dpfzdm4ze'

// Every service image is delivered at exactly 900 x 600 (3:2).
// c_fill + g_auto = crop to that shape, keeping the most interesting part of the photo.
// f_auto + q_auto = best format and compression for each visitor's browser.
export function cloudinaryImage(publicId: string, width = 900, height = 600): string {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto,c_fill,g_auto,w_${width},h_${height}/${publicId}`
}