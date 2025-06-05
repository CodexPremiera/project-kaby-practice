"use client";
import { useState, useEffect } from "react"; // <-- import useEffect
import { useRouter } from "next/navigation";
import SuccessModal from "@/components/modal/SuccessModal";
import ErrorModal from "@/components/modal/ErrorModal";
import ButtonPrimary from '@/components/ui/buttons/ButtonPrimary';

export default function AppointmentClientForm({ regions }) {
  const [modalType, setModalType] = useState(null);
  const [cities, setCities] = useState([]);

  const router = useRouter();
  const [form, setForm] = useState({
    barangay_name: "",
    city: "",
    region: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    async function fetchCities() {
      if (!form.region) {
        setCities([]);
        setForm((prev) => ({ ...prev, city: "" }));
        return;
      }
      try {
        const res = await fetch(`/api/cities?regionId=${form.region}`);
        if (res.ok) {
          const data = await res.json();
          setCities(data);
          setForm((prev) => ({ ...prev, city: "" }));
        }
      } catch (error) {
        console.error("Failed to load cities", error);
      }
    }
    fetchCities();
  }, [form.region]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCloseModal = () => {
    setModalType(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/register/barangay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setModalType("success");
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } else {
      setModalType("error");
    }
  };

  return (
    <div>
      {modalType === "success" && (
        <SuccessModal
          title="Success!"
          content="Your appointment request has been submitted. Kaby hears you."
          onClose={handleCloseModal}
        />
      )}
      {modalType === "error" && (
        <ErrorModal
          title="Oops!"
          content="Failed to submit your request. Please try again."
          onClose={handleCloseModal}
        />
      )}
      <form onSubmit={handleSubmit} className="w-full mt-6">
        <div className="flex gap-3 justify-between">
          <div className="relative w-full">
            <input
              className="floating-input mt-1 w-full text-black"
              type="text"
              id="barangay_name"
              name="barangay_name"
              placeholder=" "
              required
              onChange={handleChange}
              value={form.barangay_name}
            />
            <label htmlFor="barangay_name" className="floating-label">
              Barangay Name
            </label>
          </div>

          <div className="relative w-full">
            <select
              id="region"
              name="region"
              required
              onChange={handleChange}
              value={form.region}
              className="floating-input mt-1 w-full text-black"
            >
              <option value="">Select Region</option>
              {regions.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
            <label htmlFor="region" className="floating-label">
              Region
            </label>
          </div>
        </div>

        <div className="relative mt-4">
          <select
            id="city"
            name="city"
            required
            onChange={handleChange}
            value={form.city}
            className="floating-input mt-1 w-full text-black"
            disabled={!cities.length}
          >
            <option value="">Select City</option>
            {cities.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <label htmlFor="city" className="floating-label">
            City
          </label>
        </div>

        <div className="relative mt-4">
          <input
            className="floating-input mt-1 w-full text-black"
            type="email"
            id="email"
            name="email"
            placeholder=" "
            required
            onChange={handleChange}
            value={form.email}
          />
          <label htmlFor="email" className="floating-label">
            Email
          </label>
        </div>

        <div className="relative mt-4">
          <textarea
            className="floating-input mt-1 w-full text-black h-[100px] resize-none"
            id="message"
            name="message"
            placeholder=" "
            required
            onChange={handleChange}
            value={form.message}
          />
          <label htmlFor="message" className="floating-label">
            Message
          </label>
        </div>

        <div className="mt-6 flex justify-center items-center">
          <ButtonPrimary type="submit" className="min-w-[50%]">
            Submit
          </ButtonPrimary>
        </div>
      </form>
    </div>
  );
}
