// Move this to a .env file
const USER_ID = "krloslao90";
const APP_ID = "color-precog";
const MODEL_ID = "color-recognition";
const PAT = "3f8003a72aee4c9cb2c46af28832f94d";

const fetchOptions = (imgUrl) => {
	const raw = JSON.stringify({
		user_app_id: {
			user_id: USER_ID,
			app_id: APP_ID,
		},
		inputs: [
			{
				data: {
					image: {
						url: imgUrl,
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

export default async function fetchClarifaiAPI(imageURL) {
	const response = await fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", fetchOptions(imageURL));
	const result = await response.json();
	return result;
}
