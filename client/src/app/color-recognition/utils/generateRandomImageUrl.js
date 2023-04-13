const MAX = 1_000_000;
const baseImageUrl = "https://loremflickr.com/1200/630/landscape?lock=";
const generateRandomImageUrl = () => baseImageUrl + Math.floor(Math.random() * MAX).toString();

export default generateRandomImageUrl;
