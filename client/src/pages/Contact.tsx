import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/api";
import toast from "react-hot-toast";

import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  Building2,
  User,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";

import Container from "../components/ui/Container";

const contactChannels = [
  {
    icon: MapPin,
    title: "Office Address",
    lines: ["NARAYANIX Connect", "India"],
  },
  {
    icon: Mail,
    title: "Email Address",
    lines: ["info@narayanixconnect.com"],
  },
  {
    icon: Phone,
    title: "Phone Number",
    lines: ["+91 XXXXX XXXXX"],
  },
  {
    icon: Clock,
    title: "Business Hours",
    lines: ["Monday – Saturday", "9:00 AM – 6:00 PM"],
  },
];

const reasons = [
  "Free business consultation",
  "Customized, platform-led program design",
  "Experienced, industry-trained specialists",
  "Fast response time",
  "Secure & confidential process",
];

const inputClass =
  "w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-4 text-navy-950 placeholder:text-slate-400 outline-none transition focus:border-navy-600 focus:ring-4 focus:ring-navy-100";

function Contact() {

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
        "/contact",
        formData
      );

      toast.success(res.data.message);

      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        message: "",
      });

    } catch (err) {

      toast.error("Something went wrong!");
      console.error(err);

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
              <Building2 size={14} className="text-gold-400" />
              Contact Narayanix Connect
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 text-[2.4rem] font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl"
            >
              Let's Start A{" "}
              <span className="text-gradient-gold">Conversation</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/60"
            >
              Whether you need customer experience, sales enablement,
              business operations or a fully custom program, our team is
              ready to help your business grow.
            </motion.p>
          </div>
        </Container>
      </section>

      {/* Main section */}
      <section className="bg-surface py-24 lg:py-28">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Contact form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-[28px] border border-navy-950/5 bg-white p-8 shadow-[0_2px_16px_-6px_rgba(11,46,109,0.08)] sm:p-10"
            >
              <h2 className="text-2xl font-extrabold tracking-tight text-navy-950 sm:text-3xl">
                Send Us a Message
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                Fill out the form below and our team will contact you
                shortly.
              </p>

              <form onSubmit={handleSubmit} className="mt-9 space-y-5">
                <div>
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

                <div>
                  <div className="relative">
                    <Building2 size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Company Name"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
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

                <div>
                  <div className="relative">
                    <Phone size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      required
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <MessageSquare size={19} className="absolute left-4 top-5 text-slate-400" />
                    <textarea
                      rows={6}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your business requirements..."
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
                  {loading ? "Sending..." : "Send Message"}
                  {!loading && <ArrowRight size={18} />}
                </button>
              </form>
            </motion.div>

            {/* Contact information */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="rounded-[28px] border border-navy-950/5 bg-white p-8 shadow-[0_2px_16px_-6px_rgba(11,46,109,0.08)] sm:p-10"
              >
                <h2 className="text-2xl font-extrabold tracking-tight text-navy-950 sm:text-3xl">
                  Contact Information
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Reach out to us through any of the following channels.
                </p>

                <div className="mt-9 space-y-7">
                  {contactChannels.map((channel) => (
                    <div key={channel.title} className="flex items-start gap-4">
                      <span className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-navy-50 text-navy-700">
                        <channel.icon size={20} />
                      </span>
                      <div>
                        <h3 className="font-bold text-navy-950">{channel.title}</h3>
                        <p className="mt-1 text-sm leading-6 text-slate-500">
                          {channel.lines.map((line, idx) => (
                            <span key={line}>
                              {line}
                              {idx < channel.lines.length - 1 && <br />}
                            </span>
                          ))}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Why contact us */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-[28px] bg-navy-950 p-8 sm:p-10"
              >
                <h3 className="text-xl font-bold text-white">
                  Why Contact Narayanix Connect?
                </h3>

                <div className="mt-7 space-y-4">
                  {reasons.map((reason) => (
                    <div key={reason} className="flex items-center gap-3">
                      <CheckCircle2 size={19} className="flex-none text-gold-400" />
                      <span className="text-sm text-white/70">{reason}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom CTA */}
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
                  Ready to Grow Your Business?
                </h3>
                <p className="mt-4 max-w-2xl text-white/60 leading-7">
                  Connect with our team today and discover how our
                  platform-led programs can improve customer satisfaction,
                  reduce operational costs and help your business scale
                  faster.
                </p>
              </div>

              <Link
                to="/proposal"
                className="group inline-flex flex-none items-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 font-semibold text-navy-950 shadow-[0_10px_30px_-8px_rgba(212,175,55,0.55)] transition-all duration-300 hover:bg-gold-400"
              >
                Request Proposal
                <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}

export default Contact;