const MAX = 1_000_000;

export const fetchUrlColors = async (src) => {
	try {
		const response = await fetch(
			process.env.NEXT_PUBLIC_SERVER_URL + process.env.NEXT_PUBLIC_API_VERSION + "/color/url",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					src: src,
				}),
			}
		);
		const result = await response.json();
		return result;
	} catch (error) {
		console.log(error);
	}
};

export const fetchFileColors = async (src) => {
	const formData = new FormData();
	formData.append("image", src);

	try {
		const response = await fetch(
			process.env.NEXT_PUBLIC_SERVER_URL + process.env.NEXT_PUBLIC_API_VERSION + "/color/file",
			{
				method: "POST",
				body: formData,
			}
		);
		const result = await response.json();
		return result;
	} catch (error) {
		console.log(error);
	}
};

export const generateRandomImageUrl = (width, height) => {
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

export const DataList = ({ width, height, id }) => {
	return (
		<datalist id={id}>
			<option value={`https://dummyimage.com/${width}x${height}/ff0000/000000&text=+`} label="Red"></option>
			<option value={`https://dummyimage.com/${width}x${height}/00ff00/000000&text=+`} label="Green"></option>
			<option value={`https://dummyimage.com/${width}x${height}/0000ff/000000&text=+`} label="Blue"></option>
			<option value={`https://dummyimage.com/${width}x${height}/ffff00/000000&text=+`} label="Yellow"></option>
			<option value={`https://dummyimage.com/${width}x${height}/ff00ff/000000&text=+`} label="Magenta"></option>
		</datalist>
	);
};
