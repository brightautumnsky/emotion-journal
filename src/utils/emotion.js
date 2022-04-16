const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

export const emotionList = [
  { e_id: 5, e_img: process.env.PUBLIC_URL + "assets/5.png", e_des: "행복" },
  { e_id: 4, e_img: process.env.PUBLIC_URL + "assets/4.png", e_des: "기쁨" },
  { e_id: 3, e_img: process.env.PUBLIC_URL + "assets/3.png", e_des: "무난" },
  { e_id: 2, e_img: process.env.PUBLIC_URL + "assets/2.png", e_des: "차분" },
  { e_id: 1, e_img: process.env.PUBLIC_URL + "assets/1.png", e_des: "슬픔" },
];
