function emv(id, value) {
  return id + value.length.toString().padStart(2, "0") + value;
}

function crc16(payload) {
  let crc = 0xFFFF;
  for (let c of payload) {
    crc ^= c.charCodeAt(0) << 8;
    for (let i = 0; i < 8; i++) {
      crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
      crc &= 0xFFFF;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

/*
 ⚠️ CHANGE HERE ให้ตรง ABA ของคุณ
*/
const ABA_ACCOUNT = "4942576"; // เบอร์ ABA / Account จริง
const MERCHANT_NAME = "BARDS";
const MERCHANT_CITY = "PHNOM PENH";

function buildKHQR({ amount, orderId }) {

  const payload =
    "000201" +
    "010211" +
    emv("29",
      emv("00", "KHQR") +
      emv("01", ABA_ACCOUNT)
    ) +
    emv("52", "0000") +
    emv("53", "116") +           // KHR
    emv("58", "KH") +
    emv("59", MERCHANT_NAME) +
    emv("60", MERCHANT_CITY) +
    emv("54", amount.toString()) +
    emv("62",
      emv("01", orderId)
    ) +
    "6304";

  return payload + crc16(payload);
}
