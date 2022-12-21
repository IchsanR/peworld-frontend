import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Profile.module.css";
import { useRouter } from "next/router";
import Footer from "./Footer";

const NavbarUser = (props) => {
	const { children } = props;
	const [photo, setPhoto] = useState({
		isLoading: true,
		data: "",
	});

	const [data, setData] = useState({
		isLoading: true,
		data: {},
	});

	const userRole = data.data.levels;

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("data"));

		if (user) {
			setPhoto({ ...photo, isLoading: false, data: user.profile_pic });
		}

		if (user) {
			setData({ ...data, isLoading: false, data: user });
		}
	}, []);

	const router = useRouter();
	const logout = (e) => {
		localStorage.clear();
		return router.push("/login");
	};

	return (
		<>
			<nav className="navbar navbar-expand-lg pt-4 px-5">
				<div className="container-fluid px-5">
					<Link className="navbar-brand" href="/home">
						<Image
							src="/Logo1.png"
							width={127}
							height={35}
							alt=""
							className={`${styles.logoNavMobile}`}
						/>
					</Link>
					<div className={`d-flex ${styles.menuNavMobile}`}>
						<div className="dropdown">
							<button
								className="btn me-3"
								type="button"
								data-bs-toggle="dropdown"
								aria-expanded="false">
								<Image src="/bell.png" width={24} height={24} alt="" />
							</button>
							<ul className="dropdown-menu dropdown-menu-end">
								<li>
									<Link className="dropdown-item" href="#">
										Action
									</Link>
								</li>
								<li>
									<Link className="dropdown-item" href="#">
										Another action
									</Link>
								</li>
								<li>
									<Link className="dropdown-item" href="#">
										Something else here
									</Link>
								</li>
							</ul>
						</div>
						<div className="dropdown">
							<button
								className="btn me-3"
								type="button"
								data-bs-toggle="dropdown"
								aria-expanded="false">
								<Image src="/mail.png" width={24} height={24} alt="" />
							</button>
							<ul className="dropdown-menu dropdown-menu-end">
								<li>
									<Link className="dropdown-item" href="#">
										Action
									</Link>
								</li>
								<li>
									<Link className="dropdown-item" href="#">
										Another action
									</Link>
								</li>
								<li>
									<Link className="dropdown-item" href="#">
										Something else here
									</Link>
								</li>
							</ul>
						</div>
						<div className="dropdown">
							<button
								className="btn me-3"
								type="button"
								data-bs-toggle="dropdown"
								aria-expanded="false">
								{photo.isLoading ? (
									<div
										className={`rounded-circle mx-2`}
										width={40}
										height={40}></div>
								) : (
									<Image
										src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${photo.data}`}
										width={24}
										height={24}
										alt=""
										className={`${styles.profileImg}`}
										priority={true}
									/>
								)}
							</button>
							<ul className="dropdown-menu dropdown-menu-end">
								<li>
									{userRole === 0 ? (
										<Link
											className="dropdown-item"
											href={`/company/${data.data.id_recruiter}`}>
											Profile
										</Link>
									) : (
										<Link
											className="dropdown-item"
											href={`/profile/${data.data.id_user}`}>
											Profile
										</Link>
									)}
								</li>
								<li>
									{userRole === 0 ? (
										<Link
											className="dropdown-item"
											href={`/company/editcompany/${data.data.id_recruiter}`}>
											Edit Profile
										</Link>
									) : (
										<Link
											className="dropdown-item"
											href={`/profile/editprofile/${data.data.id_user}`}>
											Edit Profile
										</Link>
									)}
								</li>
								<li>
									<Link
										className="dropdown-item"
										href="/"
										onClick={(e) => logout(e)}>
										Logout
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</nav>
			<main>{children}</main>
			<Footer />
		</>
	);
};

export default NavbarUser;
