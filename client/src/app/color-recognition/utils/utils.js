export const generateRandomImageUrl = (width, height) => {
	const MAX = 1_000_000;
	const baseImageUrl = `https://loremflickr.com/${width}/${height}/landscape?lock=`;
	return baseImageUrl + Math.floor(Math.random() * MAX).toString();
};

export const canLoadImage = (url) => {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.src = url;
		img.onload = () => resolve(true);
		img.onerror = () => resolve(false);
	});
};
