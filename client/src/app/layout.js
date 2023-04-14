import "./globals.css";
import Navbar from "./components/navbar/Navbar";

export const metadata = {
	title: "Color Precog",
	description: "Color image recognition",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<Navbar />
				{children}
			</body>
		</html>
	);
}
