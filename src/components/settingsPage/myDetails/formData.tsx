import styles from "./styles.module.scss";
import * as Yup from "yup";

const initialValues = {
  username: "",
  email: "",
  qualifications: "finance",
  displayRole: "investor",
};

const formInfo = {
  type: "detailsForm",
  formButtonText: "Save Changes",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  username: Yup.string().required("Required"),
});

const fields = [
  {
    name: "username",
    label: "Username",
    type: "text",
    placeholder: "Username",
    class_name: styles.username,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Email",
    class_name: styles.email,
    disabled: true,
  },
  {
    name: "qualification",
    label: "Professional background",
    type: "select",

    class_name: styles.qualifications,
    options: [
      { value: "accounting", label: "Accounting" },
      {
        value: "administration_office_support",
        label: "Administration & Office Support",
      },
      { value: "advertising_arts_media", label: "Advertising, Arts & Media" },
      { value: "architecture", label: "Architecture" },
      {
        value: "banking_financial_services",
        label: "Banking & Financial Services",
      },
      { value: "civil_engineer", label: "Civil Engineer" },
      { value: "construction_trades", label: "Construction Trades" },
      { value: "construction_management", label: "Construction Management" },
      { value: "construction_engineering", label: "Construction Engineering" },
      { value: "consulting_strategy", label: "Consulting & Strategy" },

      { value: "design", label: "Design (other than architecture)" },
      { value: "education_training", label: "Education & Training" },
      { value: "engineering", label: "Engineering (other than Construction)" },
      { value: "entrepreneur", label: "Entrepreneur" },
      {
        value: "farming_animals_conservation",
        label: "Farming, Animals & Conservation",
      },
      { value: "finance", label: "Finance" },
      { value: "government_defence", label: "Government & Defence" },
      { value: "gaming", label: "Gaming" },
      { value: "healthcare_medical", label: "Healthcare & Medical" },
      { value: "hospitality_tourism", label: "Hospitality & Tourism" },
      {
        value: "human_resources_recruitment",
        label: "Human Resources & Recruitment",
      },
      {
        value: "information_technology_programming",
        label: "Information Technology and Programming",
      },
      {
        value: "insurance_superannuation",
        label: "Insurance & Superannuation",
      },
      { value: "investment_trading", label: "Investment and Trading" },
      { value: "legal", label: "Legal" },
      { value: "management", label: "Management (other than Construction)" },
      {
        value: "manufacturing_transport_logistics",
        label: "Manufacturing, Transport & Logistics",
      },
      {
        value: "marketing_communications",
        label: "Marketing & Communications",
      },
      { value: "mining_resources_energy", label: "Mining, Resources & Energy" },
      {
        value: "real_estate_property_management",
        label: "Real Estate & Property Management",
      },
      {
        value: "retail_consumer_products",
        label: "Retail & Consumer Products",
      },
      { value: "sales", label: "Sales" },
      { value: "sport_recreation", label: "Sport & Recreation" },
      {
        value: "visualisation_architecture",
        label: "Visualisation (Architecture)",
      },
      { value: "other", label: "Other" },
    ],
  },

  {
    name: "displayRole",
    label: "Role",
    type: "select",

    class_name: styles.role,
    options: [
      { value: "Investor", label: "Investor" },
      { value: "Developer", label: "Property Developer" },
    ],
  },
];

export { initialValues, formInfo, validationSchema, fields };
