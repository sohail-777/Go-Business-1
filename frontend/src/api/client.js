import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api";

export async function signIn(email, password) {
  const res = await fetch(`${BASE_URL}/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  const json = await res.json();
  if (!res.ok) {
    const message = (json && json.message) || "Invalid email or password";
    const err = new Error(message);
    err.status = res.status;
    throw err;
  }
  return json;
}

export async function fetchReferrals({ search, sort } = {}) {
  const token = Cookies.get("jwt_token");
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (sort) params.set("sort", sort);

  const url = `${BASE_URL}/referrals${params.toString() ? `?${params.toString()}` : ""}`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const json = await res.json();
  if (!res.ok) {
    const message = (json && json.message) || "Something went wrong";
    const err = new Error(`${message} (${res.status})`);
    err.status = res.status;
    throw err;
  }
  return json;
}

export async function fetchReferralById(id) {
  const token = Cookies.get("jwt_token");
  const url = `${BASE_URL}/referrals?id=${encodeURIComponent(id)}`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const json = await res.json();
  if (!res.ok) {
    const message = (json && json.message) || "Referral not found";
    const err = new Error(message);
    err.status = res.status;
    throw err;
  }
  return json;
}
