// Gabe Poser's AP Biology videos (PoseKnows Biology, 2025-2026 series), matched to topics by the number in each video's title. They play from YouTube and aren't re-hosted here.
const VIDEO_CHANNEL="https://www.youtube.com/@poseknowsbio";
const VIDEO_LISTS={1:"PLrQji7zW6lY__lC_qgD0tKY9nE7NuEFWG",2:"PLrQji7zW6lY_qEDA-eS_43j_g9Pu3zNWG",3:"PLrQji7zW6lY-qEEmhg_UhqXxpo4kpcB6V",4:"PLrQji7zW6lY81xTWfft950oXLtbwrVTaG",5:"PLrQji7zW6lY8NbdrffuSBBA0VGPgBlYUD",6:"PLrQji7zW6lY8m-gclQGqOgPpczfAdbIo1",7:"PLrQji7zW6lY9YmD6r0W3BQZ9YwZt80-VJ",8:"PLrQji7zW6lY86MeQp2eekgpjgm3kkk1Sa"};
const VIDEOS={
"1.1":["t21f03JfGPk","13:57"],"1.2":["K5safXu2T4k","7:13"],"1.3":["Fa7JiqDfDm8","11:16"],"1.4":["9KPeTdxfNO0","10:01"],"1.5":["3bMorlrsKmY","14:48"],"1.6":["7T5BT_8lOIU","16:56"],"1.7":["Vc2RU68UDvc","16:35"],
"2.1":["B3_Yx-EFU9Q","19:00"],"2.2":["LeA-1kSRd6E","16:45"],"2.3":["LgcaIlbg_XI","10:23"],"2.4":["XiqigiDDDSM","11:06"],"2.5":["gtQEUeXNyVA","14:48"],"2.6":["o5pw2IKmSzs","7:51"],"2.7":["_FqhL_l33Ao","21:08"],"2.8":["lB3iihX2yXA","13:33"],"2.9":["tuNJP1SaaWA","14:30"],"2.10":["tuNJP1SaaWA","14:30"],
"3.1":["gO_7AwGL2nQ","13:54"],"3.2":["ztmV1fBVvYo","17:13"],"3.3":["qtcGnXxebss","11:33"],"3.4":["iuaUjv_ryJs","23:27"],"3.5":["1iYUXH9R1fM","21:17"],
"4.1":["2TDUrMFwulI","14:29"],"4.2":["s40dVRFqo98","17:06"],"4.3":["X5kFTeCOOuw","21:28"],"4.4":["mL2-1dGD-Cc","20:49"],"4.5":["h8Cc9u0Ozjc","17:51"],"4.6":["tmZk9KvxtrU","11:59"],
"5.1":["T--q_xwo704","17:46"],"5.2":["82eDJ06tN6A","16:05"],"5.3":["sMyBH76E7g4","25:55"],"5.4":["do6k-OCwuhQ","26:35"],"5.5":["DEBy_PxPV_k","10:15"],
"6.1":["Ujn6zy8GDiU","12:51"],"6.2":["Prw6yqcFBQQ","14:38"],"6.3":["WsYuZtfJhzQ","16:35"],"6.4":["wySi-XgmksQ","22:18"],"6.5":["x7NdHblMFoE","17:06"],"6.6":["rbr587_3A2o","7:56"],"6.7":["s-CwSVmyMuY","26:19"],"6.8":["u8IJjdFn0Pw","19:11"],
"7.1":["4a4oh3HVSCo","18:43"],"7.2":["1Y6Ss-mBCww","11:06"],"7.3":["Bn3iTbHd09I","8:54"],"7.4":["LYltmMPAG0s","19:43"],"7.5":["q2iIRWvgC-o","19:28"],"7.6":["ms7QjAecT_E","19:11"],"7.7":["by5cnLbVWjk","6:13"],"7.8":["gHPhQtq9xRM","11:23"],"7.9":["ESrPWah8xe8","16:08"],"7.10":["Hj0HFqiaUa8","21:33"],"7.11":["cwgGvhaNpYg","12:19"],"7.12":["oe4lV4eP_6o","8:08"],
"8.1":["2STeDEn_rrQ","18:40"],"8.2":["52h0R_90Nfw","25:11"],"8.3":["EwS38dbrEoU","9:10"],"8.4":["s13Dn_WSZfQ","11:21"],"8.5":["UNaUT43tsI0","19:58"],"8.6":["p8TQcSXlSL8","10:14"],"8.7":["InzWWBDQbBc","23:40"]
};
