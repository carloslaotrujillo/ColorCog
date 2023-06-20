const registerUser = async (name, email, password) => {
	try {
		const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/register", {
			method: "POST",
			credentials: "include",
			withCredentials: true,
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name, email, password }),
			redirect: "follow",
		});
		return response;
	} catch (error) {
		console.log(error);
	}
};

export default registerUser;
