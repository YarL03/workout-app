// @desc  Get user profile
// @route GET /api/users/profile
// @access Private
export const getUserProfile = (req, res) => {
    const user = {
        name: 'Yaroslav',
        age: 19
    }

    res.json(user)
}