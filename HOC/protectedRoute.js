import { useRouter } from "next/router";
import React, { useEffect } from "react";
import NavbarHome from "../components/NavbarHome";
import NavbarUser from "../components/NavbarUser";

const layouts = {
	L1: NavbarHome,
	L2: NavbarUser,
};

const noLayouts = ({ children }) => {
	return <>{children}</>;
};

export function protectRoute(Component) {
	return (props) => {
		const router = useRouter();

		const Layout = layouts[Component.navbar] || noLayouts;

		useEffect(() => {
			const token = localStorage.getItem("token");
			const userData = JSON.parse(localStorage.getItem("data"));
			if (!token || !userData) {
				alert("Harap login terlebih dahulu");
				router.push("/login");
			}
		}, []);
		return (
			<Layout>
				<Component {...props} />
			</Layout>
		);
	};
}
