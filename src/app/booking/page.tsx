"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Weight, MapPin, CheckCircle2 } from "lucide-react";

const HK_DISTRICTS = [
  "Hong Kong Island (Central & Western, Wan Chai, Eastern, Southern)",
  "Kowloon (Yau Tsim Mong, Sham Shui Po, Kowloon City, Wong Tai Sin, Kwun Tong)",
  "New Territories (Kwai Tsing, Tsuen Wan, Tuen Mun, Yuen Long, North, Tai Po, Sha Tin, Sai Kung, Islands)"
];

const MATERIAL_TYPES = [
  { id: "plastics", name: "Plastics", rate: 1.5 }, // HKD per kg
  { id: "paper", name: "Paper/Cardboard", rate: 1.0 },
  { id: "metals", name: "Metals (Aluminium/Steel)", rate: 2.5 },
  { id: "ewaste", name: "E-Waste / Small Appliances", rate: 0.5 },
];

export default function BookingPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    district: "",
    address: "",
    date: "",
    materialType: "plastics",
    estimatedWeight: 5,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Connect your database logic or API routes here
    setSubmitted(true);
  };

  const currentRate = MATERIAL_TYPES.find(m => m.id === formData.materialType)?.rate || 0;
  const estimatedPayout = (formData.estimatedWeight * currentRate).toFixed(1);

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-100 shadow-xl text-center">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Booking Confirmed!</h2>
          <p className="text-slate-600 mb-6">
            Thank you, <span className="font-semibold text-slate-800">{formData.name}</span>. Our logistics team will text you at <span className="font-semibold text-slate-800">{formData.phone}</span> to confirm your slot on {formData.date}.
          </p>
          <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-100 text-left text-sm">
            <p className="text-slate-500">Estimated Weight: <span className="text-slate-800 font-medium">{formData.estimatedWeight} kg</span></p>
            <p className="text-slate-500">Estimated Cashback: <span className="text-green-600 font-bold">HK$ {estimatedPayout}</span></p>
          </div>
          <Link href="/" className="inline-flex items-center gap-2 text-green-600 font-semibold hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 font-medium mb-8 transition">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 sm:p-10 bg-gradient-to-r from-green-50 to-emerald-50/50 border-b border-slate-100">
            <h1 className="text-3xl font-extrabold text-slate-900">Schedule a Pickup</h1>
            <p className="text-slate-600 mt-2">Fill in your location details and estimate your recycle weight to complete your booking.</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6">
            {/* Contact Details */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  required 
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  placeholder="Chan Tai Man"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">WhatsApp / Phone Number</label>
                <input 
                  type="tel" 
                  required 
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  placeholder="9123 4567"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Region / District</label>
              <select 
                required
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                value={formData.district}
                onChange={e => setFormData({...formData, district: e.target.value})}
              >
                <option value="">Select your region</option>
                {HK_DISTRICTS.map((dist, idx) => (
                  <option key={idx} value={dist}>{dist}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Street Address & Unit</label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-3.5 text-slate-400 w-4 h-4" />
                <textarea 
                  required 
                  rows={2}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition resize-none"
                  value={formData.address}
                  onChange={e => setFormData({...formData, address: e.target.value})}
                  placeholder="Flat B, 12/F, Silver Tower, Nathan Road"
                />
              </div>
            </div>

            {/* Date & Estimation Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Preferred Collection Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-3.5 text-slate-400 w-4 h-4" />
                  <input 
                    type="date" 
                    required 
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                    value={formData.date}
                    onChange={e => setFormData({...formData, date: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Primary Recycling Material</label>
                <select 
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  value={formData.materialType}
                  onChange={e => setFormData({...formData, materialType: e.target.value})}
                >
                  {MATERIAL_TYPES.map(m => (
                    <option key={m.id} value={m.id}>{m.name} (HK$ {m.rate}/kg)</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Weight Slider */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                  <Weight className="w-4 h-4 text-slate-500" /> Estimated Weight
                </label>
                <span className="text-lg font-bold text-slate-900">{formData.estimatedWeight} kg</span>
              </div>
              <input 
                type="range" 
                min="2" 
                max="100" 
                className="w-full accent-green-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                value={formData.estimatedWeight}
                onChange={e => setFormData({...formData, estimatedWeight: parseInt(e.target.value)})}
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>Min: 2kg</span>
                <span>Max: 100kg+</span>
              </div>

              {/* Dynamic Price Calculation Box */}
              <div className="mt-4 pt-4 border-t border-slate-200/60 flex justify-between items-center">
                <span className="text-xs text-slate-500 uppercase font-semibold tracking-wider">Est. Cash payout</span>
                <span className="text-2xl font-black text-green-600">HK$ {estimatedPayout}</span>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-green-600 text-white rounded-xl font-bold text-lg hover:bg-green-700 shadow-md shadow-green-100 transition duration-150"
            >
              Confirm Logistics Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}