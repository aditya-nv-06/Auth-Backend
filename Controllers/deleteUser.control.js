import User from "../models/User.models.js";

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            console.log(user);
            return res.status(404).json({
                message: "User not found"
            });
        }
        return res.status(200).json({
            message: "User deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server Error"
        });
    }
};

export { deleteUser };
   