import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Profile.module.css";
import { useRouter } from "next/router";
import Footer from "./Footer";
import axios from "axios";

const NavbarUser = (props) => {
	const { children } = props;

	const [data, setData] = useState({
		isLoading: true,
		data: {},
	});

	const userRole = data.data.levels;
	let userId;
	if (userRole === 0) {
		userId = data.data.id_recruiter;
	} else {
		userId = data.data.id_user;
	}

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("data"));

		if (user) {
			setData({ ...data, isLoading: false, data: user });
		}
	}, []);

	const [dataUser, setDataUser] = useState([]);

	useEffect(() => {
		if (userId && userRole === 1) {
			axios
				.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${userId}`)
				.then((response) => {
					setDataUser(response.data.data.rows);
				})
				.catch((error) => {
					// console.log(error);
				});
		} else {
			axios
				.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/recruiter/${userId}`)
				.then((response) => {
					setDataUser(response.data.data.rows);
				})
				.catch((error) => {
					// console.log(error);
				});
		}
	}, [userId, userRole]);

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
								<Image
									src={
										dataUser.length === 1
											? `${dataUser[0].profile_pic.split("|&&|")[0]}`
											: "/"
									}
									width={24}
									height={24}
									alt=""
									className={`${styles.profileImg}`}
									priority={true}
								/>
							</button>
							<ul className="dropdown-menu dropdown-menu-end">
								<li>
									{userRole === 0 ? (
										<Link
											className="dropdown-item"
											href={
												dataUser.length === 1
													? `/company/${dataUser[0].id_recruiter}`
													: "/"
											}>
											Profile
										</Link>
									) : (
										<Link
											className="dropdown-item"
											href={
												dataUser.length === 1
													? `/profile/${dataUser[0].id_user}`
													: "/"
											}>
											Profile
										</Link>
									)}
								</li>
								<li>
									{userRole === 0 ? (
										<Link
											className="dropdown-item"
											href={
												dataUser.length === 1
													? `/company/editcompany/${dataUser[0].id_recruiter}`
													: "/"
											}>
											Edit Profile
										</Link>
									) : (
										<Link
											className="dropdown-item"
											href={
												dataUser.length === 1
													? `/profile/editprofile/${dataUser[0].id_user}`
													: "/"
											}>
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
