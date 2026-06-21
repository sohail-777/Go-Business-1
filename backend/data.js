
const metrics = [
  { id: "m1", label: "Total Balance", value: "$9,568.00" },
  { id: "m2", label: "Discount Percentage", value: "60%" },
  { id: "m3", label: "Total Referral", value: "50" },
  { id: "m4", label: "Discount Amount", value: "$300" },
  { id: "m5", label: "Commission Amount", value: "$465.00" },
  { id: "m6", label: "Total Earning", value: "$158.00" },
  { id: "m7", label: "Commission Discount", value: "40%" },
  { id: "m8", label: "Total Bank Transfer", value: "$534.00" }
];

const serviceSummary = {
  service: "some service",
  yourReferrals: "0+0",
  activeReferrals: "0+0",
  totalRefEarnings: "$0.00"
};

const referral = {
  link: "https://gobusiness.com/?referral=ABCXYZ",
  code: "ABCXYZ"
};

const names = [
  "Geeta", "Vinod", "Rekha", "Ashok", "Sonal", "Mukul", "Anjali", "Srinivas",
  "Harish", "Moumita", "Priya", "Karan", "Divya", "Suresh", "Lakshmi",
  "Manoj", "Pooja", "Ravi", "Sneha", "Arjun", "Kavya", "Deepak", "Nisha",
  "Vikram", "Swati", "Rahul", "Meena", "Sanjay", "Asha", "Naveen", "Pallavi",
  "Gopal", "Indira", "Rajesh", "Bhavna", "Yogesh", "Shanti", "Dinesh",
  "Chitra", "Mahesh", "Radha", "Vivek", "Lata", "Naresh", "Seema", "Anil",
  "Usha", "Prakash", "Geetika", "Ramesh"
];

const services = ["Frontend", "Graphics", "HR", "B2B", "PM", "QA", "DevOps", "Backend", "Marketing", "Sales"];

function seededRandom(seed) {
  let s = seed;
  return function () {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

const rand = seededRandom(42);

function pad(n) {
  return n < 10 ? "0" + n : "" + n;
}

const referrals = names.map((name, idx) => {
  const id = idx + 1;
  const service = services[Math.floor(rand() * services.length)];
  const year = 2010 + Math.floor(rand() * 14);
  const month = 1 + Math.floor(rand() * 12);
  const day = 1 + Math.floor(rand() * 28);
  const date = `${year}-${pad(month)}-${pad(day)}`;
  const profit = 50000 + Math.floor(rand() * 350000);
  return { id, name, serviceName: service, date, profit };
});

module.exports = { metrics, serviceSummary, referral, referrals };
