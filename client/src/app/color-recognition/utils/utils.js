// Move this to a .env file
const PAT = process.env.PAT;
const APP_ID = process.env.APP_ID;
const USER_ID = process.env.USER_ID;
const MODEL_ID = process.env.MODEL_ID;

const fetchOptions = (type, payload) => {
	if (type === "base64") {
		payload = payload.split(",")[1];
	}

	const raw = JSON.stringify({
		user_app_id: {
			user_id: USER_ID,
			app_id: APP_ID,
		},
		inputs: [
			{
				data: {
					image: {
						[type]: payload,
					},
				},
			},
		],
	});

	const requestOptions = {
		method: "POST",
		headers: {
			Accept: "application/json",
			Authorization: "Key " + PAT,
		},
		body: raw,
	};

	return requestOptions;
};

export async function fetchColors(type, payload) {
	const response = await fetch(
		"https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs",
		fetchOptions(type, payload)
	);
	const result = await response.json();
	return result;
}

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
