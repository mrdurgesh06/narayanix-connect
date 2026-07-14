import {
  Search,
  X,
} from "lucide-react";

type Props = {
  search: string;
  setSearch: React.Dispatch<
    React.SetStateAction<string>
  >;
};

function ContactSearch({
  search,
  setSearch,
}: Props) {

  return (

    <div className="rounded-[30px] border border-slate-200 bg-white shadow-lg">

      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 border-b border-slate-200 px-8 py-6">

        <div>

          <h3 className="text-2xl font-black text-slate-900">

            Search Contacts

          </h3>

          <p className="mt-2 text-slate-500">

            Find contacts instantly by name, company, email or phone.

          </p>

        </div>

        <div className="rounded-full bg-blue-100 px-5 py-2">

          <span className="font-semibold text-blue-700">

            Live Search

          </span>

        </div>

      </div>

      {/* Search Box */}

      <div className="p-8">

        <div className="relative">

          <Search
            size={22}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search by Name, Company, Email or Phone..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full rounded-2xl border border-slate-300 py-4 pl-14 pr-14 text-lg outline-none transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
                    {search && (

            <button
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-slate-100 p-2 text-slate-500 transition hover:bg-red-100 hover:text-red-600"
            >

              <X size={18} />

            </button>

          )}

        </div>

        {/* Search Status */}

        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-green-700">

            <Search size={16} />

            <span className="font-semibold">

              {search === ""
                ? "Showing all contacts"
                : `Searching for: "${search}"`}

            </span>

          </div>

          {search !== "" && (

            <button
              onClick={() => setSearch("")}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-blue-600"
            >

              <X size={18} />

              Clear Search

            </button>

          )}

        </div>

      </div>

    </div>

  );

}

export default ContactSearch;