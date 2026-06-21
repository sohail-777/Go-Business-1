import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { fetchReferralById } from "../api/client";
import { formatDate, formatProfit } from "../utils/format";

function extractRow(json, id) {
  if (!json) return null;
  const data = json.data;
  if (!data) return null;

  if (data.id !== undefined) {
    return data;
  }

  if (Array.isArray(data.referrals)) {
    return data.referrals.find((r) => String(r.id) === String(id)) || null;
  }

  return null;
}

export default function ReferralDetail() {
  const { id } = useParams();
  const [row, setRow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setNotFound(false);

    fetchReferralById(id)
      .then((json) => {
        if (!active) return;
        const found = extractRow(json, id);
        if (found) {
          setRow(found);
        } else {
          setNotFound(true);
        }
      })
      .catch(() => {
        if (active) setNotFound(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id]);

  return (
    <div className="app-shell">
      <Navbar />

      <main className="dashboard-main">
        <Link to="/" className="detail-back-link">
          ← Back to dashboard
        </Link>

        {loading ? (
          <div className="loading-state">Loading...</div>
        ) : notFound || !row ? (
          <div className="detail-header">
            <h1>Referral not found</h1>
          </div>
        ) : (
          <>
            <div className="detail-header">
              <h1>Referral Details</h1>
              <p className="detail-subtitle">Full information for this referral partner.</p>
            </div>

            <div className="detail-card">
              <div className="detail-card-header">
                <h2>{row.name}</h2>
                <span className="detail-badge">{row.serviceName}</span>
              </div>

              <dl>
                <div className="detail-row">
                  <dt>Referral ID</dt>
                  <dd>{row.id}</dd>
                </div>
                <div className="detail-row">
                  <dt>Name</dt>
                  <dd>{row.name}</dd>
                </div>
                <div className="detail-row">
                  <dt>Service Name</dt>
                  <dd>{row.serviceName}</dd>
                </div>
                <div className="detail-row">
                  <dt>Date</dt>
                  <dd>{formatDate(row.date)}</dd>
                </div>
                <div className="detail-row">
                  <dt>Profit</dt>
                  <dd>{formatProfit(row.profit)}</dd>
                </div>
              </dl>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
