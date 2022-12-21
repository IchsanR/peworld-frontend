import React, { useEffect, useState } from "react";
import styles from "../styles/Profile.module.css";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

const ProfileTabs = () => {
	const router = useRouter();
	const { id_user } = router.query;

	const [active, setActive] = useState(1);
	const [porto, setPorto] = useState([{}]);
	const [delPorto, setDelPorto] = useState([]);
	const [exp, setExp] = useState([{}]);
	const [userData, setUserData] = useState({
		isLoading: true,
		data: {},
	});
	const self = userData.data.id_user;
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("data"));

		if (user) {
			setUserData({ ...userData, isLoading: false, data: user });
		}
	}, []);

	// get porto
	useEffect(() => {
		axios
			.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/porto/${id_user}`)
			.then((response) => {
				setPorto(response.data.data.rows);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [id_user]);

	// delete porto
	const deletePorto = (id_portfolio, e) => {
		e.preventDefault();

		axios
			.delete(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/porto/${id_portfolio}`
			)
			.then((response) => {
				const posts = delPorto.filter(
					(item) => item.id_portfolio !== id_portfolio
				);

				setDelPorto({ data: posts });
				alert("Data berhasil dihapus");
				router.push("/home");
			});
	};

	// get experience
	useEffect(() => {
		axios
			.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/exp/${id_user}`)
			.then((response) => {
				setExp(response.data.data.rows);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [id_user]);

	console.log(exp);

	return (
		<>
			<section className={`${styles.cards} p-3`}>
				<div className={`w-100 justify-content-md-start d-flex`}>
					<button
						title="Portfolio"
						className={
							active === 1
								? `col-md-2 col-6 ${styles.tabBtns} ${styles.active}`
								: `col-md-2 col-6 ${styles.tabBtns} ${styles.text}`
						}
						onClick={() => setActive(1)}>
						<h4>Portfolio</h4>
					</button>
					<button
						title="Pengalaman Kerja"
						className={
							active === 2
								? `col-md-4 col-5 m-1 ${styles.tabBtns} ${styles.active}`
								: `col-md-4 col-5 m-1 ${styles.tabBtns} ${styles.text}`
						}
						onClick={() => setActive(2)}>
						<h4>Pengalaman Kerja</h4>
					</button>
				</div>
				<div className="content-tab">
					{active === 1 ? (
						<div className={`${styles.displayMobile}`}>
							{porto.length === 0 ? (
								<h3>No portfolio</h3>
							) : (
								porto.map((item, index) => (
									<div className="text-center p-2" key={index}>
										<Image
											src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${item.images}`}
											width={200}
											height={130}
											alt=""
											priority="true"
										/>
										<Link
											href={`${item.repository}`}
											className={`text-primary ${styles.links}`}>
											<p>{item.title}</p>
										</Link>
										{id_user === self ? (
											<div className="d-flex">
												<button
													type="button"
													className="btn btn-danger mx-auto"
													onClick={(e) => deletePorto(item.id_portfolio, e)}>
													Delete Portfolio
												</button>
											</div>
										) : (
											<></>
										)}
									</div>
								))
							)}
						</div>
					) : active === 2 ? (
						<div className="row p-3">
							{exp.length === 0 ? (
								<h3>No job experience</h3>
							) : (
								exp.map((item, index) => (
									<div key={index} className="d-flex">
										<div className="text-center me-2">
											<p className="my-auto">({index + 1})</p>
										</div>
										<div className="col-10">
											<h5>{item.posisi}</h5>
											<p>{item.perusahaan}</p>
											<div className="row">
												<p
													className={`col-auto ${styles.text} ${styles.topMin}`}>
													{item.datefrom}
												</p>
											</div>
											<p>{item.descriptions || "No description"}</p>
										</div>
									</div>
								))
							)}
						</div>
					) : (
						<></>
					)}
				</div>
			</section>
		</>
	);
};

export default ProfileTabs;
