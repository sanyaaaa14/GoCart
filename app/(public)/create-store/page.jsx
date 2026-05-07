"use client";

import { assets } from "@/assets/assets";
import { useEffect, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import Loading from "@/components/Loading";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function CreateStorePage() {
  const { user } = useUser();
  const { getToken } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(""); // pending / approved / rejected
  const [message, setMessage] = useState("");
  const [storeInfo, setStoreInfo] = useState({
    name: "",
    username: "",
    description: "",
    email: "",
    contact: "",
    address: "",
    image: null,
  });

  const onChangeHandler = (e) => {
    setStoreInfo({ ...storeInfo, [e.target.name]: e.target.value });
  };

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setStoreInfo({ ...storeInfo, image: e.target.files[0] });
    }
  };

  const fetchSellerStatus = async () => {
    if (!user) {
      setLoading(false); // no user, stop loading
      return;
    }

    try {
      const token = await getToken();
      const { data } = await axios.get("/api/store/create", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (data.status && data.status !== "not registered") {
        setStatus(data.status);
        switch (data.status) {
          case "pending":
            setMessage("Your store application is pending approval.");
            break;
          case "approved":
            setMessage("Your store has been approved! Redirecting to your store...");
            setTimeout(() => router.push("/store"), 5000);
            break;
          case "rejected":
            setMessage("Your store application was rejected. Please contact support.");
            break;
        }
      }
    } catch (err) {
      console.error("Fetch store status error:", err);
    } finally {
      setLoading(false);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("Please login to continue");
    if (!storeInfo.image) return toast.error("Please upload a store logo");

    try {
      const token = await getToken();
      const formData = new FormData();
      Object.keys(storeInfo).forEach((key) => formData.append(key, storeInfo[key]));

      const { data } = await axios.post("/api/store/create", formData, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (data.success) toast.success(data.message);
      else toast.error(data.error || "Something went wrong");

      fetchSellerStatus(); // refresh status after submission
    } catch (err) {
      toast.error(err?.response?.data?.error || err.message);
    }
  };

  useEffect(() => {
    fetchSellerStatus();
  }, [user]); // only run when user is available

  if (!user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center text-slate-400">
        <h1 className="text-2xl sm:text-4xl font-semibold">
          Please <span className="text-slate-500">Login</span> to continue
        </h1>
      </div>
    );
  }

  if (loading) return <Loading />;

  if (status) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
        <p className="sm:text-2xl lg:text-3xl font-semibold text-slate-600">{message}</p>
        {status === "approved" && (
          <p className="mt-4 text-slate-500">
            Redirecting to your store in <span className="font-semibold">5 seconds</span>...
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="mx-6 min-h-[70vh] my-16">
      <form
        onSubmit={(e) =>
          toast.promise(onSubmitHandler(e), { loading: "Submitting data..." })
        }
        className="max-w-7xl mx-auto flex flex-col items-start gap-3 text-slate-500"
      >
        <h1 className="text-3xl">
          Add Your <span className="text-slate-800 font-medium">Store</span>
        </h1>

        <label className="mt-10 cursor-pointer">
          Store Logo
          <Image
            src={storeInfo.image ? URL.createObjectURL(storeInfo.image) : assets.upload_area}
            className="rounded-lg mt-2 h-16 w-auto"
            alt=""
            width={150}
            height={100}
          />
          <input type="file" accept="image/*" onChange={onImageChange} hidden />
        </label>

        {["username", "name", "description", "email", "contact", "address"].map((field) => (
          <div key={field} className="w-full max-w-lg flex flex-col gap-1">
            <p className="capitalize">{field}</p>
            {field === "description" || field === "address" ? (
              <textarea
                rows={5}
                name={field}
                onChange={onChangeHandler}
                value={storeInfo[field]}
                className="border border-slate-300 outline-slate-400 p-2 rounded resize-none"
                placeholder={`Enter your store ${field}`}
              />
            ) : (
              <input
                name={field}
                onChange={onChangeHandler}
                value={storeInfo[field]}
                type={field === "email" ? "email" : "text"}
                placeholder={`Enter your store ${field}`}
                className="border border-slate-300 outline-slate-400 p-2 rounded"
              />
            )}
          </div>
        ))}

        <button className="bg-slate-800 text-white px-12 py-2 rounded mt-10 mb-40 active:scale-95 hover:bg-slate-900 transition">
          Submit
        </button>
      </form>
    </div>
  );
}
