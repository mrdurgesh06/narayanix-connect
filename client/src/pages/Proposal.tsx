import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/api";
import toast from "react-hot-toast";

import {
  Building2,
  User,
  Mail,
  Phone,
  Globe,
  Briefcase,
  IndianRupee,
  FileText,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Sparkles,
} from "lucide-react";

import Container from "../components/ui/Container";

const benefits = [
  "Free initial consultation",
  "Customized pricing & solution",
  "Dedicated account manager",
  "Transparent communication",
  "Fast response within 24 hours",
];

const process = [
  {
    step: "1",
    title: "Submit Your Requirements",
    description: "Complete the proposal request form.",
  },
  {
    step: "2",
    title: "Requirement Analysis",
    description: "Our team evaluates your goals and current setup.",
  },
  {
    step: "3",
    title: "Custom Proposal",
    description: "We prepare pricing, timeline and a platform-backed plan.",
  },
  {
    step: "4",
    title: "Project Kickoff",
    description: "Once approved, your program goes live on our platform.",
  },
];

const inputClass =
  "w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-4 text-navy-950 placeholder:text-slate-400 outline-none transition focus:border-navy-600 focus:ring-4 focus:ring-navy-100";

function Proposal() {

  const [formData, setFormData] = useState({
    company: "",
    name: "",
    email: "",
    phone: "",
    website: "",
    service: "",
    budget: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault();

    setLoading(true);

    try {

      const res = await api.post(
        "/proposal",
        formData
      );

      toast.success(res.data.message);

      setFormData({
        company: "",
        name: "",
        email: "",
        phone: "",
        website: "",
        service: "",
        budget: "",
        message: "",
      });

    } catch (error) {

      toast.error("Something went wrong!");

      console.log(error);

    }

    setLoading(false);

  };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950 pt-14 pb-24 lg:pt-16 lg:pb-28">
        <div className="pointer-events-none absolute inset-0 bg-grid" />
        <div className="pointer-events-none absolute -top-32 left-[10%] h-[420px] w-[420px] rounded-full bg-navy-600/30 blur-[110px]" />
        <div className="pointer-events-none absolute top-24 right-[6%] h-[380px] w-[380px] rounded-full bg-gold-500/10 blur-[110px]" />

        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/70"
            >
              <ClipboardCheck size={14} className="text-gold-400" />
              Request A Proposal
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 text-[2.4rem] font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl"
            >
              Request Your{" "}
              <span className="text-gradient-gold">Custom Proposal</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/60"
            >
              Tell us about your business and our team will map out a plan —
              clear pricing, a dedicated contact and a program built on our
              platform, not a generic package.
            </motion.p>
          </div>
        </Container>
      </section>

      {/* Main section */}
      <section className="bg-surface py-24 lg:py-28">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Proposal form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-[28px] border border-navy-950/5 bg-white p-8 shadow-[0_2px_16px_-6px_rgba(11,46,109,0.08)] sm:p-10"
            >
              <h2 className="text-2xl font-extrabold tracking-tight text-navy-950 sm:text-3xl">
                Proposal Information
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                Complete the form below and we'll get back to you with a
                custom proposal.
              </p>

              <form onSubmit={handleSubmit} className="mt-9 space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
                  {/* Company */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-navy-950">
                      Company Name
                    </label>
                    <div className="relative">
                      <Building2 size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your Company"
                        required
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Contact person */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-navy-950">
                      Contact Person
                    </label>
                    <div className="relative">
                      <User size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Full Name"
                        required
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-navy-950">
                    Business Email
                  </label>
                  <div className="relative">
                    <Mail size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                      required
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-navy-950">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                      required
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Website */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-navy-950">
                    Website
                  </label>
                  <div className="relative">
                    <Globe size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://yourcompany.com"
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Service + Budget */}
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-navy-950">
                      Solution You Need
                    </label>
                    <div className="relative">
                      <Briefcase size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                        className={`${inputClass} appearance-none`}
                      >
                        <option value="">Select Solution</option>
                        <option>Customer Experience</option>
                        <option>Sales & Lead Management</option>
                        <option>Business Operations</option>
                        <option>Digital Engagement</option>
                        <option>AI & Analytics</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-navy-950">
                      Estimated Budget
                    </label>
                    <div className="relative">
                      <IndianRupee size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        required
                        className={`${inputClass} appearance-none`}
                      >
                        <option value="">Select Budget</option>
                        <option>Less than ₹50,000</option>
                        <option>₹50,000 - ₹2,00,000</option>
                        <option>₹2,00,000 - ₹10,00,000</option>
                        <option>More than ₹10,00,000</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Project description */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-navy-950">
                    Project Description
                  </label>
                  <div className="relative">
                    <FileText size={19} className="absolute left-4 top-5 text-slate-400" />
                    <textarea
                      rows={6}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe your project requirements..."
                      required
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gold-500 px-8 py-4 font-semibold text-navy-950 shadow-[0_10px_30px_-8px_rgba(212,175,55,0.55)] transition-all duration-300 hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Submitting..." : "Submit Proposal"}
                  {!loading && <ArrowRight size={18} />}
                </button>
              </form>
            </motion.div>

            {/* Right panel */}
            <div className="space-y-6">
              {/* Benefits */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="rounded-[28px] border border-navy-950/5 bg-white p-8 shadow-[0_2px_16px_-6px_rgba(11,46,109,0.08)] sm:p-10"
              >
                <h2 className="text-2xl font-extrabold tracking-tight text-navy-950 sm:text-3xl">
                  Why Request a Proposal?
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Our team maps out a program tailored to your business,
                  backed by the same platform behind every solution we run.
                </p>

                <div className="mt-8 space-y-4">
                  {benefits.map((benefit) => (
                    <div key={benefit} className="flex items-center gap-3">
                      <CheckCircle2 size={20} className="flex-none text-gold-500" />
                      <span className="text-sm text-navy-950/75">{benefit}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Process */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-[28px] bg-navy-950 p-8 sm:p-10"
              >
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold-400">
                  <Sparkles size={13} />
                  How It Works
                </span>
                <h3 className="mt-3 text-xl font-bold text-white">
                  Proposal Process
                </h3>

                <div className="mt-8 space-y-6">
                  {process.map((item) => (
                    <div key={item.step} className="flex items-start gap-4">
                      <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-white/[0.08] text-sm font-bold text-gold-400">
                        {item.step}
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{item.title}</h4>
                        <p className="mt-1 text-sm leading-6 text-white/55">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative mt-8 overflow-hidden rounded-[28px]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-navy-800 via-navy-700 to-navy-950" />
            <div className="pointer-events-none absolute -top-24 right-10 h-72 w-72 rounded-full bg-gold-500/20 blur-[110px]" />

            <div className="relative flex flex-col items-center justify-between gap-8 px-8 py-12 lg:flex-row lg:px-12">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                  Ready to Build a Long-Term Partnership?
                </h3>
                <p className="mt-4 max-w-2xl text-white/60 leading-7">
                  Every business is different. Our team will put together a
                  proposal that matches your goals, budget and operational
                  needs with complete transparency.
                </p>
              </div>

              <Link
                to="/contact"
                className="group inline-flex flex-none items-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 font-semibold text-navy-950 shadow-[0_10px_30px_-8px_rgba(212,175,55,0.55)] transition-all duration-300 hover:bg-gold-400"
              >
                Contact Our Team
                <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}

export default Proposal;