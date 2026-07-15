import { Search, X } from "lucide-react";

type Props = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

function ContactSearch({ search, setSearch }: Props) {
  return (
    <div className="rounded-xl border border-navy-950/5 bg-white shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-navy-950/5 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="text-base font-extrabold text-navy-950">Search Contacts</h3>
          <p className="text-xs text-slate-500">
            Find contacts instantly by name, company, email or phone.
          </p>
        </div>

        <div className="inline-flex w-fit items-center rounded-full bg-navy-50 px-3 py-1">
          <span className="text-xs font-semibold text-navy-700">Live Search</span>
        </div>
      </div>

      {/* Search Box */}
      <div className="p-5">
        <div className="relative">
          <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder="Search by Name, Company, Email or Phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-10 text-sm outline-none transition-all duration-300 focus:border-navy-700 focus:ring-4 focus:ring-navy-700/10"
          />

          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-slate-100 p-1.5 text-slate-500 transition hover:bg-red-100 hover:text-red-600"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Search Status */}
        <div className="mt-3.5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">
            <Search size={12} />
            <span className="text-xs font-semibold">
              {search === "" ? "Showing all contacts" : `Searching for: "${search}"`}
            </span>
          </div>

          {search !== "" && (
            <button
              onClick={() => setSearch("")}
              className="inline-flex items-center gap-1.5 rounded-lg bg-navy-950 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-navy-800"
            >
              <X size={14} />
              Clear Search
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContactSearch;