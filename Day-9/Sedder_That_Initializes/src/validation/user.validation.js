export const validateUserInput = ({ fullname, username, email, password, role }) => {
    if ([fullname, username, email, password, role].some(field => !field || field.trim() === '')) {
        throw new Error('All fields are required');
    }
};

export const validateSuperAdminExists = async (UserModel) => {
    const superAdminExists = await UserModel.findOne({ username: 'superadmin' });
    if (!superAdminExists) {
        throw new Error('Super Admin must be created first. Please run the seeder endpoint.');
    }
};

export const validateUserNotExists = async (UserModel, username) => {
    const existingUser = await UserModel.findOne({ username: username.toLowerCase() });
    if (existingUser) {
        throw new Error('User already exists!');
    }
};
