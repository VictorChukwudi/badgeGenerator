import multer from "multer";
import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
    process.env;
const cloudinaryInstance = cloudinary.v2;

const upload = multer({ storage: multer.memoryStorage() });

cloudinaryInstance.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
});

const uploadBadge = async (badgePath: string, type: string, id: string) => {
    const folder = type === "moga" ? "/badges/moga" : "/badges/top";
    try {
        const result = await cloudinaryInstance.uploader.upload(badgePath, { folder, public_id: id });
        // console.log(result.public_id)
        // console.log(result.secure_url)

        const downloadUrl = cloudinaryInstance.url(result.public_id, {
            resource_type: "image",
            secure: true,
            // sign_url: true,
            flags: "attachment",
        });

        console.log(downloadUrl)
        return {
            downloadUrl,
            imageUrl: result.secure_url
        };
    } catch (error) {
        console.error("Cloudinary upload error:", error);
        return null; // Return null in case of error
    }
};

export { upload, uploadBadge, cloudinaryInstance };