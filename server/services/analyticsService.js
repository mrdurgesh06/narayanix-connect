const fs = require("fs");
const path = require("path");

/* ==============================
   JSON Files
============================== */

const contactsFile = path.join(
  __dirname,
  "../data/contacts.json"
);

const proposalsFile = path.join(
  __dirname,
  "../data/proposals.json"
);

/* ==============================
   Read JSON
============================== */

function readJson(file) {

  if (!fs.existsSync(file)) {

    return [];

  }

  const data =
    fs.readFileSync(file, "utf8");

  if (!data.trim()) {

    return [];

  }

  return JSON.parse(data);

}

/* ==============================
   Date Helpers
============================== */

function isToday(date) {

  const today = new Date();

  return (

    date.getDate() === today.getDate() &&

    date.getMonth() === today.getMonth() &&

    date.getFullYear() === today.getFullYear()

  );

}

function isCurrentMonth(date) {

  const today = new Date();

  return (

    date.getMonth() === today.getMonth() &&

    date.getFullYear() === today.getFullYear()

  );

}
/* ==============================
   Dashboard Analytics
============================== */

function calculateDashboardAnalytics() {

  const contacts =
    readJson(contactsFile);

  const proposals =
    readJson(proposalsFile);

  const todayContacts =
    contacts.filter((item) =>
      isToday(new Date(item.createdAt))
    );

  const todayProposals =
    proposals.filter((item) =>
      isToday(new Date(item.createdAt))
    );

  const monthContacts =
    contacts.filter((item) =>
      isCurrentMonth(new Date(item.createdAt))
    );

  const monthProposals =
    proposals.filter((item) =>
      isCurrentMonth(new Date(item.createdAt))
    );

  const latestContacts =
    [...contacts]
      .sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      )
      .slice(0, 5);

  const latestProposals =
    [...proposals]
      .sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      )
      .slice(0, 5);

  return {

    totalContacts:
      contacts.length,

    totalProposals:
      proposals.length,

    todayContacts:
      todayContacts.length,

    todayProposals:
      todayProposals.length,

    thisMonthContacts:
      monthContacts.length,

    thisMonthProposals:
      monthProposals.length,

    totalLeads:
      contacts.length +
      proposals.length,

    latestContacts,

    latestProposals,

  };

}
/* ==============================
   Last 7 Days Analytics
============================== */

  const last7Days = [];

  for (let i = 6; i >= 0; i--) {

    const current = new Date();

    current.setHours(0, 0, 0, 0);

    current.setDate(current.getDate() - i);

    const nextDay = new Date(current);

    nextDay.setDate(nextDay.getDate() + 1);

    const contactsCount = contacts.filter((item) => {

      const date = new Date(item.createdAt);

      return date >= current && date < nextDay;

    }).length;

    const proposalsCount = proposals.filter((item) => {

      const date = new Date(item.createdAt);

      return date >= current && date < nextDay;

    }).length;

    last7Days.push({

      day: current.toLocaleDateString("en-US", {
        weekday: "short",
      }),

      contacts: contactsCount,

      proposals: proposalsCount,

    });

  }

  /* ==============================
     Return Updated Dashboard
  ============================== */

  return {

    totalContacts: contacts.length,

    totalProposals: proposals.length,

    todayContacts: todayContacts.length,

    todayProposals: todayProposals.length,

    thisMonthContacts: monthContacts.length,

    thisMonthProposals: monthProposals.length,

    totalLeads:
      contacts.length +
      proposals.length,

    latestContacts,

    latestProposals,

    last7Days,

  };

}

/* ==============================
   Export
============================== */

module.exports = {

  calculateDashboardAnalytics,

};