export function generateOTP(length = 6) {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6 xonali raqam
}
