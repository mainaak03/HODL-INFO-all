import mongoose from "mongoose";

const InfoSchema=new mongoose.Schema(
    {
        data: {
            type: Object,
            required: true
        }
    },
    {timestamps: true}
)

const Info=mongoose.model("Info", InfoSchema);
export default Info;