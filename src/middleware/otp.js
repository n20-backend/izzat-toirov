import express from "express"
import { sendOtp } from '../utils/sendOtp.js'; // Bu siz yozishingiz kerak bo‘lgan funksiya
import { generateOTP } from '../utils/generateOtp.js';
import { getIdUsers, createUser } from "../controllers/users.js";

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, email, phone_number, password_hash, role } = req.body;
    
    // Agar role bo‘lmasa, uni 'user' deb qo‘shamiz
    const userRole = role || 'user';
    
    try {
        const hash = await bcrypt.hash(password_hash, 10);
        const otp_code = generateOTP(); // OTP kodini yaratish

        // Foydalanuvchi yaratish
        const newUser = await createUser(username, email, phone_number, hash, userRole, otp_code);

        // SMS yoki email orqali OTP yuborishni amalga oshirish
        await sendOtp(phone_number, otp_code); // optional

        res.status(201).json({ message: 'OTP yuborildi', user: newUser });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/verify', async (req, res) => {
    const { user_id, otp_code } = req.body;

    try {
        const user = await getIdUsers(user_id); // Userni ID orqali olish
        if (!user) return res.status(404).json({ error: 'User not found' });

        if (user.otp_code === otp_code) {
            // OTP to‘g‘ri bo‘lsa, foydalanuvchini tasdiqlash
            await db.query(
                `UPDATE users SET is_verified = true, otp_code = NULL WHERE id = $1 RETURNING *`,
                [user_id]
            );
            res.status(200).json({ message: 'User verified successfully' });
        } else {
            res.status(400).json({ error: 'Invalid OTP' });
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


export default router;
