import {
  X,
  Building2,
  User,
  Mail,
  Phone,
  Globe,
  Briefcase,
  IndianRupee,
  CalendarDays,
  MessageSquare,
  Copy,
} from "lucide-react";

import toast from "react-hot-toast";

type Proposal = {
  id: string;
  company: string;
  name: string;
  email: string;
  phone: string;
  website: string;
  service: string;
  budget: string;
  message: string;
  createdAt: string;
};

type Props = {
  proposal: Proposal | null;
  onClose: () => void;
};

function ProposalModal({ proposal, onClose }: Props) {
  if (!proposal) return null;

  const copyText = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied`);
    } catch {
      toast.error("Unable to copy");
    }
  };

  const details = [
    { icon: Building2, label: "Company", value: proposal.company },
    { icon: User, label: "Contact Person", value: proposal.name },
    { icon: Mail, label: "Email", value: proposal.email, copy: true, breakAll: true },
    { icon: Phone, label: "Phone", value: proposal.phone, copy: true },
    { icon: Globe, label: "Website", value: proposal.website || "Not Provided", breakAll: true },
    { icon: Briefcase, label: "Service", value: proposal.service },
    { icon: IndianRupee, label: "Budget", value: proposal.budget },
    {
      icon: CalendarDays,
      label: "Submitted On",
      value: new Date(proposal.createdAt).toLocaleString(),
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between bg-navy-950 px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-gold-500 text-lg font-bold text-navy-950">
              {proposal.company.charAt(0).toUpperCase()}
            </div>

            <div>
              <h2 className="text-lg font-extrabold text-white">{proposal.company}</h2>
              <p className="text-xs text-white/50">Business Proposal Details</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg bg-white/10 p-2 text-white/70 transition hover:bg-white/20 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid gap-3 md:grid-cols-2">
            {details.map((detail) => (
              <div key={detail.label} className="rounded-xl border border-navy-950/5 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <detail.icon size={16} className="text-navy-700" />
                    <span className="text-xs text-slate-500">{detail.label}</span>
                  </div>

                  {detail.copy && (
                    <button
                      onClick={() => copyText(detail.value, detail.label)}
                      className="rounded-md bg-navy-50 p-1.5 text-navy-700 transition hover:bg-navy-100"
                    >
                      <Copy size={13} />
                    </button>
                  )}
                </div>

                <h3
                  className={`mt-2 text-sm font-bold text-navy-950 ${
                    detail.breakAll ? "break-all" : ""
                  }`}
                >
                  {detail.value}
                </h3>
              </div>
            ))}
          </div>

          {/* Project Description */}
          <div className="mt-4 rounded-xl border border-navy-950/5 p-4">
            <div className="flex items-center gap-2">
              <MessageSquare size={16} className="text-navy-700" />
              <h3 className="text-sm font-bold text-navy-950">Project Description</h3>
            </div>

            <div className="mt-3 whitespace-pre-wrap rounded-lg bg-navy-50/60 p-4 text-sm leading-6 text-slate-700">
              {proposal.message}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 flex flex-col gap-3 border-t border-navy-950/5 pt-5 md:flex-row md:items-center md:justify-between">
            <p className="text-xs text-slate-500">
              Proposal submitted through the NARAYANIX Connect website.
            </p>

            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={() => copyText(proposal.email, "Email")}
                className="inline-flex items-center gap-1.5 rounded-lg bg-navy-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-navy-800"
              >
                <Mail size={15} />
                Copy Email
              </button>

              <button
                onClick={() => copyText(proposal.phone, "Phone")}
                className="inline-flex items-center gap-1.5 rounded-lg bg-gold-500 px-4 py-2 text-sm font-semibold text-navy-950 transition hover:bg-gold-400"
              >
                <Phone size={15} />
                Copy Phone
              </button>

              <button
                onClick={onClose}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <X size={15} />
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProposalModal;