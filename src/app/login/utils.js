const loginUser = async (email, password) => {
	try {
		const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
		});
		return response;
	} catch (error) {
		console.log(error);
	}
};

export default loginUser;
