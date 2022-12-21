import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import NavbarUser from "../components/NavbarUser";
import NavbarHome from "../components/NavbarHome";
import { useEffect } from "react";

const layouts = {
	L1: NavbarHome,
	L2: NavbarUser,
};

const noLayouts = ({ children }) => {
	return <>{children}</>;
};

function MyApp({ Component, pageProps }) {
	useEffect(() => {
		require("bootstrap/dist/js/bootstrap.bundle.min.js");
	});

	const Layout = layouts[Component.navbar] || noLayouts;

	return (
		<>
			<Head>
				<title>Peworld</title>
				<meta name="description" content="Hirejob Application" />
				<link rel="icon" href="/Logo.png" />
			</Head>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</>
	);
}

export default MyApp;
