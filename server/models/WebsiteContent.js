const mongoose = require("mongoose");
const applyToJSON = require("../utils/applyToJSON");

// Website copy is edited freely from the admin panel (Settings-style key/value
// pairs), so this document is intentionally schemaless (strict: false) rather
// than locking every text field in place.
const websiteContentSchema = new mongoose.Schema({}, { strict: false, timestamps: true });

applyToJSON(websiteContentSchema);

const defaultContent = {
  heroTitle: "Transform Your Business With Smart BPO Solutions",
  heroSubtitle: "Reliable • Professional • Scalable",
  heroDescription:
    "NARAYANIX Connect provides customer support, technical support, telecalling, back office and business process outsourcing services across India.",
  heroButton: "Get Free Proposal",
  heroButtonLink: "/proposal",
  heroBadge: "Trusted Global BPO Partner",
  heroRating: "Trusted by 500+ Businesses",
  heroHighlight1: "ISO Standard Process",
  heroHighlight2: "Secure Operations",
  heroHighlight3: "Dedicated Support",
  clients: "500+",
  projects: "1200+",
  support: "24×7",
  experience: "10+",
  aboutTitle: "Why Choose NARAYANIX Connect",
  aboutDescription:
    "We deliver reliable outsourcing solutions with trained professionals, latest technology and customer-first approach.",
  ctaTitle: "Ready To Grow Your Business?",
  ctaDescription: "Let's discuss your outsourcing requirements today.",
  ctaButton: "Request Proposal",
  servicesCtaTitle: "Looking for a Reliable BPO Partner?",
  servicesCtaDescription:
    "From customer support to back-office operations, our experienced team delivers scalable outsourcing solutions that help businesses reduce costs, improve efficiency and enhance customer satisfaction.",
  servicesCtaButton: "Request Proposal",
  servicesBadge: "Professional BPO Services",
  servicesTitle: "Our Services",
  servicesDescription:
    "We help businesses reduce operational costs, improve customer satisfaction and scale faster with reliable outsourcing solutions delivered by experienced professionals.",
  service1Title: "Customer Support",
  service1Description:
    "Deliver exceptional customer experiences through phone, email and live chat with professionally trained support executives.",
  service1Feature1: "24×7 Support",
  service1Feature2: "Live Chat",
  service1Feature3: "Voice Process",
  service2Title: "Lead Generation",
  service2Description:
    "Generate qualified business leads using outbound campaigns, appointment setting and customer engagement.",
  service2Feature1: "Cold Calling",
  service2Feature2: "Qualified Leads",
  service2Feature3: "CRM Ready",
  service3Title: "Telecalling",
  service3Description:
    "Professional inbound and outbound telecalling services that improve customer relationships and sales performance.",
  service3Feature1: "Inbound",
  service3Feature2: "Outbound",
  service3Feature3: "Sales Calls",
  service4Title: "Email Support",
  service4Description:
    "Fast and professional email handling with SLA-based response times and high customer satisfaction.",
  service4Feature1: "Inbox Management",
  service4Feature2: "Ticket Support",
  service4Feature3: "Quick Response",
  service5Title: "Technical Support",
  service5Description:
    "Dedicated technical support teams providing troubleshooting, software assistance and remote helpdesk services.",
  service5Feature1: "Helpdesk",
  service5Feature2: "Remote Support",
  service5Feature3: "Issue Resolution",
  service6Title: "Back Office Support",
  service6Description:
    "Reliable data processing, documentation and administrative support to improve operational efficiency.",
  service6Feature1: "Data Entry",
  service6Feature2: "Documentation",
  service6Feature3: "Process Management",
};

const WebsiteContent = mongoose.model("WebsiteContent", websiteContentSchema);
WebsiteContent.defaultContent = defaultContent;

// Always returns the single website-content document, seeding it with the
// default copy the first time it's requested.
WebsiteContent.getSingleton = async function () {
  let doc = await this.findOne();
  if (!doc) {
    doc = await this.create(defaultContent);
  }
  return doc;
};

module.exports = WebsiteContent;
