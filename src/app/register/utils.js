const registerUser = async (name, email, password) => {
	try {
		const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/register", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name, email, password }),
		});
		return response;
	} catch (error) {
		console.log(error);
	}
};

export default registerUser;
