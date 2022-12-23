import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { React, useEffect, useRef, useState } from "react";
import styles from "../../../styles/Profile.module.css";
import axios from "axios";
import { protectRoute } from "../../../HOC/protectedRoute";

const EditProfile = () => {
	const router = useRouter();
	const { id_user } = router.query;

	const [data, setData] = useState([]);

	const [form, setForm] = useState({
		names: null,
		jobdesk: null,
		domisili: null,
		tempatkerja: null,
		bio: null,
		skill: null,
	});
	const [addImage, setAddImage] = useState();
	const [delAccout, setDelAccount] = useState([]);
	const [portoImage, setPortoImage] = useState();
	const [portfolio, setPortfolio] = useState({
		title: "",
		repository: "",
		portfolio_type: 0,
	});
	const [experience, setExperience] = useState({
		iduser: "",
		posisi: "",
		perusahaan: "",
		datefrom: "",
		descriptions: "",
	});

	const fileInput = useRef(null);
	const inputFile = useRef(null);

	// Get user data
	useEffect(() => {
		if (id_user) {
			axios
				.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${id_user}`)
				.then((response) => {
					setData(response.data.data.rows);
				})
				.catch((error) => {
					// console.log(error);
				});
		}
	}, [router.isReady, id_user]);
	// Batas get user data

	// Delete account
	const deleteAccount = (id_user, e) => {
		e.preventDefault();

		axios
			.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${id_user}`)
			.then((response) => {
				const posts = delAccout.filter((item) => item.id_user !== id_user);

				setDelAccount({ data: posts });
				alert("Data berhasil dihapus");
				localStorage.clear();
				router.push("/login");
			});
	};
	// Batas delete account

	// Update Image
	const handleClick = (e) => {
		fileInput.current.click();
	};

	const handleChange = (e) => {
		const fileUploaded = e.target.files[0];
		document.getElementById("updatePics").innerHTML = fileUploaded.name;
		setAddImage(fileUploaded);
	};

	const updatePhoto = (e) => {
		e.preventDefault();
		const { id_user } = router.query;

		let inputImage = new FormData();
		inputImage.append("profile_pic", addImage);

		// console.log(addImage);

		axios
			.put(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/image/${id_user}`,
				inputImage
			)
			.then((response) => {
				console.log(response);
				alert(response.data.message);
				router.push(`/profile/${id_user}`);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	// Batas update image

	// Update informasi user
	const updateUser = (e) => {
		e.preventDefault();

		const { id_user } = router.query;

		axios
			.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${id_user}`, form)
			.then((response) => {
				alert("Profil berhasil diupdate");
				return router.push(`/profile/${id_user}`);
			})
			.catch((error) => {
				// console.log(error);
			});
	};
	// batas update informasi user

	// insert portfolio
	const handleClickPorto = (e) => {
		inputFile.current.click();
	};

	const handleChangePorto = (e) => {
		const fileUploadedPorto = e.target.files[0];
		document.getElementById("portoImg").innerHTML = fileUploadedPorto.name;
		setPortoImage(fileUploadedPorto);
	};

	const addPorto = (e) => {
		e.preventDefault();

		const { id_user } = router.query;

		let inputPorto = new FormData();
		inputPorto.append("iduser", id_user);
		inputPorto.append("title", portfolio.title);
		inputPorto.append("repository", portfolio.repository);
		inputPorto.append("portfolio_type", portfolio.portfolio_type);
		inputPorto.append("images", portoImage);

		axios
			.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/porto`, inputPorto)
			.then((response) => {
				console.log(response);
				if (response.data.data.command === "INSERT") {
					alert("Portfolio berhasil ditambahkan");
					return router.push(`/profile/${id_user}`);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	// insert experience
	const insertExperience = (e) => {
		e.preventDefault();

		const { id_user } = router.query;

		const body = {
			iduser: id_user,
			posisi: experience.posisi,
			perusahaan: experience.perusahaan,
			datefrom: experience.datefrom,
			descriptions: experience.descriptions,
		};

		axios
			.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/exp`, body)
			.then((response) => {
				if (response.data.data.command === "INSERT") {
					alert("Experience berhasil ditambahkan");
					return router.push(`/profile/${id_user}`);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<>
			<Head>
				<title>Edit Profile</title>
				<meta name="bio" content="Generated by create next app" />
				<link rel="icon" href="/Logo.png" />
			</Head>
			<div className="container-fluid row">
				<div className="position-absolute translate-middle-y ps-5 my-5">
					<div className="row col-11 ms-5 position-absolute my-5">
						<div className=" col-md-3 col-9 me-md-4 mb-3 position-relative">
							<form onSubmit={(e) => updatePhoto(e)}>
								<section className={`${styles.cards} p-3`}>
									<Image
										src={
											data.length === 1
												? `${data[0].profile_pic.split("|&&|")[0]}`
												: ""
										}
										width={135}
										height={135}
										className={`mx-auto d-block my-3 ${styles.profileImg}`}
										priority={true}
										alt={`Profile picture`}
									/>
									<div className={`row ${styles.editPicture} my-3 d-flex`}>
										<input
											style={{ display: "none" }}
											id="updatePics"
											type="file"
											ref={fileInput}
											onChange={handleChange}
										/>
										<Image
											src="/edit.png"
											width={16}
											height={16}
											className="col-auto"
											alt="Edit"
										/>
										<p
											className={`col-auto ${styles.text} ${styles.textAddress}`}
											onClick={handleClick}>
											Edit
										</p>
									</div>
									<h4>{data.length === 1 ? data[0].names : ""}</h4>
									<p>{data.length === 1 ? data[0].jobdesk : ""}</p>
									<div className="row">
										<Image
											src="/map.png"
											width={14}
											height={14}
											className="col-auto"
											alt="Domisili"
										/>
										<p
											className={`col-auto ${styles.text} ${styles.textAddress}`}>
											{data.length === 1 ? data.domisili : ""}
										</p>
									</div>
									<p className={`${styles.text}`}>
										{data.length === 1 ? data.tempatkerja : ""}
									</p>
								</section>
								<button
									type="submit"
									className={`${styles.searchBtn} px-md-4 col-md-12 col-9 my-3`}>
									Simpan
								</button>
							</form>
							<button
								type="button"
								className={`${styles.cancelBtn} px-4 col-md-12 col-9`}
								onClick={(e) => deleteAccount(data[0].id_user, e)}>
								Delete Account
							</button>
						</div>
						<div className="position-relative col-md-8 col-9 ms-md-4">
							<section className={`${styles.cards} p-3`}>
								<div className="p-3">
									<h3>Data Diri</h3>
								</div>
								<div className="border"></div>
								<form className="col-12 p-3" onSubmit={(e) => updateUser(e)}>
									<div className="mb-4">
										<label
											htmlFor="nameInput"
											className={`form-label ${styles.text}`}>
											Nama Lengkap
										</label>
										<input
											type="text"
											className={`form-control ${styles.input}`}
											id="nameInput"
											defaultValue={data.length === 1 ? data[0].names : ""}
											placeholder="Masukan nama lengkap"
											onChange={(e) => {
												setForm({ ...form, names: e.target.value });
											}}
										/>
									</div>
									<div className="mb-4">
										<label
											htmlFor="jobDesc"
											className={`form-label ${styles.text}`}>
											Job desc
										</label>
										<input
											type="text"
											className={`form-control ${styles.input}`}
											id="jobDesc"
											defaultValue={data.length === 1 ? data[0].jobdesk : ""}
											placeholder="Masukan job desc"
											onChange={(e) => {
												setForm({ ...form, jobdesk: e.target.value });
											}}
										/>
									</div>
									<div className="mb-4">
										<label
											htmlFor="domisili"
											className={`form-label ${styles.text}`}>
											Domisili
										</label>
										<input
											type="text"
											className={`form-control ${styles.input}`}
											id="domisili"
											defaultValue={data.length === 1 ? data[0].domisili : ""}
											placeholder="Masukan domisili"
											onChange={(e) => {
												setForm({ ...form, domisili: e.target.value });
											}}
										/>
									</div>
									<div className="mb-4">
										<label
											htmlFor="tempatKerja"
											className={`form-label ${styles.text}`}>
											Tempat kerja
										</label>
										<input
											type="text"
											className={`form-control ${styles.input}`}
											id="tempatKerja"
											defaultValue={
												data.length === 1 ? data[0].tempatkerja : ""
											}
											placeholder="Masukkan Tempat kerja"
											onChange={(e) => {
												setForm({ ...form, tempatkerja: e.target.value });
											}}
										/>
									</div>
									<div className="mb-4">
										<label
											htmlFor="tempatKerja"
											className={`form-label ${styles.text}`}>
											Deskripsi singkat
										</label>
										<textarea
											type="text"
											className={`form-control ${styles.textarea}`}
											id="textarea"
											defaultValue={data.length === 1 ? data[0].bio : ""}
											placeholder="Masukkan deskripsi singkat"
											onChange={(e) => {
												setForm({ ...form, bio: e.target.value });
											}}
										/>
									</div>
									<button
										className={`${styles.searchBtn} col-12`}
										type="submit">
										Submit
									</button>
								</form>
							</section>
							<section className={`${styles.cards} p-3 my-3`}>
								<div className="p-3">
									<h3>Skill</h3>
								</div>
								<div className="border my-3"></div>
								<form className="col-12 p-3" onSubmit={(e) => updateUser(e)}>
									<input
										type="text"
										className={`${styles.input} col-md-9 col-12 me-5`}
										id="skill"
										placeholder="Masukkan skill"
										onChange={(e) => {
											setForm({ ...form, skill: e.target.value });
										}}
									/>
									<button
										type="submit"
										className={`col-md-2 col-12 ${styles.btnSkill}`}>
										Simpan
									</button>
								</form>
							</section>
							<section className={`${styles.cards} p-3 my-3`}>
								<div className="p-3">
									<h3>Pengalaman kerja</h3>
								</div>
								<div className="border"></div>
								<div className={`row container-fluid`}>
									<form
										className="col-12 p-3"
										onSubmit={(e) => insertExperience(e)}>
										<div className="mb-4">
											<label
												htmlFor="posisiJabatan"
												className={`form-label ${styles.text}`}>
												Posisi
											</label>
											<input
												type="text"
												className={`form-control ${styles.input}`}
												id="posisiJabatan"
												placeholder="Web developer"
												onChange={(e) => {
													setExperience({
														...experience,
														posisi: e.target.value,
													});
												}}
											/>
										</div>
										<div className="row">
											<div className="mb-4 col-6">
												<label
													htmlFor="namaPerusahaan"
													className={`form-label ${styles.text}`}>
													Nama perusahaan
												</label>
												<input
													type="text"
													className={`${styles.input} col-12`}
													id="namaPerusahaan"
													placeholder="PT. Harus Bisa"
													onChange={(e) => {
														setExperience({
															...experience,
															perusahaan: e.target.value,
														});
													}}
												/>
											</div>
											<div className="mb-4 col-6">
												<label
													htmlFor="tahunBekerja"
													className={`form-label ${styles.text}`}>
													Bulan/tahun
												</label>
												<input
													type="text"
													className={`${styles.input} col-12`}
													id="tahunBekerja"
													placeholder="Januari 2018"
													onChange={(e) => {
														setExperience({
															...experience,
															datefrom: e.target.value,
														});
													}}
												/>
											</div>
										</div>
										<div className="mb-4">
											<label
												htmlFor="tempatKerja"
												className={`form-label ${styles.text}`}>
												Deskripsi singkat
											</label>
											<textarea
												type="text"
												className={`form-control ${styles.textarea}`}
												id="textarea"
												placeholder="Masukkan deskripsi singkat"
												onChange={(e) => {
													setExperience({
														...experience,
														descriptions: e.target.value,
													});
												}}
											/>
										</div>
										<button
											className={`col-12 ${styles.btnSkill}`}
											type="submit">
											Tambah pengalaman kerja
										</button>
									</form>
								</div>
							</section>
							<section className={`${styles.cards} p-3 my-3`}>
								<div className="p-3">
									<h3>Portofolio</h3>
								</div>
								<div className="border"></div>
								<div className={`row container-fluid`}>
									<form className="col-12 p-3" onSubmit={(e) => addPorto(e)}>
										<div className="mb-4">
											<label
												htmlFor="aplikasi"
												className={`form-label ${styles.text}`}>
												Nama aplikasi
											</label>
											<input
												type="text"
												className={`form-control ${styles.input}`}
												id="aplikasi"
												placeholder="Masukkan nama aplikasi"
												onChange={(e) => {
													setPortfolio({ ...portfolio, title: e.target.value });
												}}
											/>
										</div>
										<div className="mb-4">
											<label
												htmlFor="repositori"
												className={`form-label ${styles.text}`}>
												Link repositori
											</label>
											<input
												type="text"
												className={`form-control ${styles.input}`}
												id="repositori"
												placeholder="Masukkan link repositori"
												onChange={(e) => {
													setPortfolio({
														...portfolio,
														repository: e.target.value,
													});
												}}
											/>
										</div>
										<div className="mb-4 col-12">
											<label className="mx-2 text-gray">Type Portofolio</label>
											<div className="d-flex flex-row gap-2">
												<div className="d-flex flex-row align-items-center radioActive border border-dark p-2">
													<input
														className="m-2 form-label rounded"
														type={"radio"}
														id={"mobile"}
														name={"web"}
														value={"0"}
														onChange={(e) =>
															setPortfolio({
																...portfolio,
																portfolio_type: parseInt(e.target.value),
															})
														}
													/>
													<label htmlFor="mobile">Aplikasi mobile</label>
												</div>
												<div className="d-flex flex-row align-items-center radioActive border border-dark p-2">
													<input
														className="m-2 form-label rounded"
														type={"radio"}
														id={"web"}
														name={"web"}
														value={1}
														onChange={(e) =>
															setPortfolio({
																...portfolio,
																portfolio_type: parseInt(e.target.value),
															})
														}
													/>
													<label htmlFor="web">Aplikasi web</label>
												</div>
											</div>
										</div>
										<div className="mb-4">
											<label
												htmlFor="uploadFotoPortfolio"
												className={`form-label ${styles.text}`}>
												Upload gambar
											</label>
											<div className={`${styles.uploads}`}>
												<div className="p-5" onClick={handleClickPorto}>
													<input
														type="file"
														style={{ display: "none" }}
														id="uploadFotoPortfolio"
														placeholder="Masukkan nama aplikasi"
														ref={inputFile}
														onChange={handleChangePorto}
													/>
													<Image
														src={"/cloud.png"}
														width={114}
														height={64}
														alt={`upload`}
														id="portoImg"
														className="mx-auto d-block"
													/>
													<p className="text-center">
														Drag & Drop untuk Upload Gambar Aplikasi Mobile
													</p>
													<p className="text-center">
														Atau cari untuk mengupload file dari direktorimu.
													</p>
												</div>
											</div>
										</div>
										<button
											className={`col-12 ${styles.btnSkill}`}
											type="submit">
											Tambah portfolio
										</button>
									</form>
								</div>
							</section>
						</div>
					</div>
				</div>
			</div>
			<div className={`${styles.bgUngu} position-relative top-0`}></div>
			<div className={`${styles.bgPutihEdit}`}></div>
		</>
	);
};

EditProfile.navbar = "L2";

export default protectRoute(EditProfile);
